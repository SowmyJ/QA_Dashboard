const multer = require('multer');
const ExcelJS = require('exceljs');
const path = require('path');
const fs = require('fs').promises;
const open = require('opn');
var date = new Date();
var utcDate= new Date(date.toUTCString());
const { promisify } = require('util');
const { json } = require('express');
 
const readdir = promisify(fs.readdir);
const stat = promisify(fs.stat);
 
const storage = multer.memoryStorage();
const upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    const allowedExtensions = ['.xlsx'];
    const fileExtension = path.extname(file.originalname).toLowerCase();
    if (allowedExtensions.includes(fileExtension)) {
      cb(null, true); // Accept the file
    } else {
      cb(new Error('Invalid file type. Only XLSX files are allowed.'), false);
    }
  },
});
let result_index;
 
const tabDataCache = {
  Unitrace: null,
  Insight: null,
  Unisecure:null,
  SupplySense:null
};
const processExcelFile = async (req, res) => {
  try {
    var currentDate = utcDate.getDate();
    var currentMonth = utcDate.getMonth()+1;
    var currentYear = utcDate.getFullYear();
    const arrayBuffer = req.file.buffer;
    console.log(arrayBuffer)
    const filename = req.params.filename;
    const folder = req.params.category;
    const subFolder = req.params.subCategory;
    const subsubFolder = req.params.subsubCategory;
    const Issupplysense = req.params.IsSupplysense;
    // Create the folder if it doesn't exist
    let folderPath;
    if(Issupplysense==='0'){
      folderPath = path.join(__dirname, '..', 'uploads', folder,subFolder);
      await fs.mkdir(folderPath, { recursive: true });
    }
    else{
      folderPath = path.join(__dirname, '..', 'uploads', folder,subFolder,subsubFolder);
      await fs.mkdir(folderPath, { recursive: true });    
    }
   
 
    const filePath = path.join(folderPath, currentDate+'-'+currentMonth+'-'+currentYear+'_'+filename);
 
    // Write the file to the specified path
    await fs.writeFile(filePath, arrayBuffer);
 
    const workbook = new ExcelJS.Workbook();
    await workbook.xlsx.load(arrayBuffer);
 
    // Assuming the table is on the first sheet
    const worksheet = workbook.getWorksheet(1);
    const TableArray = ['Table1', 'Table2', 'Table3', 'Table4', 'Table5', 'Table6', 'Table7', 'Table8', 'Table9', 'Table10', 'Table11'];
    const resultArray = [];
 
    for (const tableName of TableArray) {
      const result = processTable(worksheet, tableName);
      resultArray.push(result);
    }
   
    const { category,subCategory } = req.params;
    result_index=resultArray;
  // Check if data for the requested category is present in the cache
  tabDataCache[category] = resultArray;
    const cachedData = tabDataCache[category];
  const jsonString = JSON.stringify(cachedData, null, 2);
  console.log(jsonString)
  // Specify the path and filename for the .json file
  
  const folderPaths = path.join(__dirname, '..', 'jsonfiles',`${category}` );
  await fs.mkdir(folderPaths, { recursive: true });
  const filePaths = path.join(__dirname, '..', 'jsonfiles',`${category}`,`${subCategory}.json` );
  console.log(category)
  // Write JSON data to the .json file
  await fs.writeFile(filePaths, jsonString);
    res.json(resultArray);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
const haveJson=async(req,res)=>{
  try{
 
    const { category,subcategory } = req.params;
  // Check if data for the requested category is present in the cache
  // Specify the path and filename for the .json file
  const folderPath = path.join(__dirname, '..', 'jsonfiles',`${category}` );
  await fs.mkdir(folderPath, { recursive: true });
  const filePath = path.join(__dirname, '..', 'jsonfiles',`${category}`,`${subcategory}.json` );
  console.log(category)
   
  // Write JSON data to the .json file
  // await fs.writeFile(filePath, jsonString);
  const jsonData = await fs.readFile(filePath,'utf-8')
  console.log('JSON data has been stored in the .json file.');
    // If data is present in the cache, send the cached data
    res.setHeader('Access-Control-Allow-Origin','*');
    console.log(jsonData)
    res.json(JSON.parse(jsonData));
    // If data is not present in the cache, send an empty response or an appropriate message
 
  }
  catch (error) {
    console.error('Error generating or sending JSON:', error);
    res.status(500).send('Internal Server Error');
  }
  console.log('Have json')
  // res.json(result_index);
}
 
const processTable = (worksheet, table_name) => {
  const tableReference = worksheet.tables[table_name];
  const tableRange = tableReference.table.tableRef;
 
  // Extract starting and ending cell references from the tableRange
  const [startCell, endCell] = tableRange.split(':');
 
  // Convert cell references to row and column indices
  const startRowIndex = parseInt(startCell.match(/\d+/)[0], 10);
  const endRowIndex = parseInt(endCell.match(/\d+/)[0], 10);
  const startColumnIndex = startCell.match(/[A-Z]+/)[0];
  const endColumnIndex = endCell.match(/[A-Z]+/)[0];
 
  // Convert column letters to numerical indices
  const startColumnNum = columnToNumber(startColumnIndex);
  const endColumnNum = columnToNumber(endColumnIndex);
 
  // Function to convert column letter to numerical index
  function columnToNumber(column) {
    let result = 0;
    for (let i = 0; i < column.length; i++) {
      result = result * 26 + column.charCodeAt(i) - 'A'.charCodeAt(0) + 1;
    }
    return result;
  }
 
  // Convert numerical column index to letter
  function numberToColumn(number) {
    let result = '';
    while (number > 0) {
      const remainder = (number - 1) % 26;
      result = String.fromCharCode('A'.charCodeAt(0) + remainder) + result;
      number = Math.floor((number - 1) / 26);
    }
    return result;
  }
 
  // Initialize JSON object
  const resultJson = {
    [`${tableReference.name}_columns`]: [],
    [`${tableReference.name}_data`]: [],
  };
 
  // Populate column names from the first row
  for (let col = startColumnNum; col <= endColumnNum; col++) {
    const colLetter = numberToColumn(col);
    const cellReference = `${colLetter}${startRowIndex}`;
    const cellValue = worksheet.getCell(cellReference).text;
    resultJson[`${tableReference.name}_columns`].push(cellValue);
  }
 
  // Iterate through rows and columns to get table data
  for (let row = startRowIndex + 1; row <= endRowIndex; row++) {
    const rowData = {};
    for (let col = startColumnNum; col <= endColumnNum; col++) {
      const colLetter = numberToColumn(col);
      const cellReference = `${colLetter}${row}`;
      const cellValue = worksheet.getCell(cellReference).text;
      rowData[resultJson[`${tableReference.name}_columns`][col - startColumnNum]] = cellValue;
    }
    resultJson[`${tableReference.name}_data`].push(rowData);
  }
 
  // Log the resulting JSON object
  console.log(JSON.stringify(resultJson, null, 2));
 
  return resultJson;
};
const openExcelFile = async (req, res) => {
  try {
    const filename = req.params.filename;
    const folder = req.params.folder;
    const subFolder = req.params.subFolder;
    const subsubFolder = req.params.subsubFoler;
    const  Issupplysense = req.params.Issupplysense;
    // Specify the path to the uploaded Excel file
    let filePath;
    if(Issupplysense===0){
      filePath = path.join(__dirname, '..', 'uploads', folder, subFolder,filename);
    }
    else{
      filePath = path.join(__dirname, '..', 'uploads', folder, subFolder,subsubFolder,filename);
    }
 
    // Open the Excel file using the default application
    await open(filePath, { wait: false });
 
    res.json({ message: 'Excel file opened successfully' });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
 
const fileexp = async(req,res)=>{
  try{
    //just backup.
    const { category,subcategory } = req.params;
 
    const filePath = path.join(__dirname, '..', 'jsonfiles',`${category}`,`${subcategory}.json` );
    const jsonData = await fs.readFile(filePath,'utf-8')
    console.log('JSON data has been stored in the .json file.');
      // If data is present in the cache, send the cached data
      res.setHeader('Access-Control-Allow-Origin','*');
      console.log(jsonData)
      res.json(JSON.parse(jsonData));
  }
  catch (error) {
    console.error('Error generating or sending JSON:', error);
    res.status(500).send('Internal Server Error');
  }
  console.log('Have json')
}
 
 
module.exports = {
  processExcelFile,
  haveJson,
  openExcelFile,
  fileexp
};