// // controllers/getFiles.js
const fs = require('fs').promises;
const path = require('path');

const getFilesInFolder = async (req, res) => {
  try {
    
    const folderName = req.params.category;
    const subFolder = req.params.subcategory;
    const folderPath = path.join(__dirname, '..', 'uploads', folderName,subFolder);

    // Read the files in the specified folder
    const files = await fs.readdir(folderPath);
    console.log(files)
    // Send the list of files as a response
    res.json({ files });
  } catch (error) {
    console.error('Error getting files:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
const clearAll=async(req,res)=>{
  const folderName= req.params.folderName;
  const subFolder = req.params.subcategory;
  const directory = path.join(__dirname,'..','uploads',`${folderName}`,subFolder)
// app.use(express.static(directory));
  const filename=req.params.filename
    const filepath= path.join(directory,filename);
    try{
        const file = await fs.readFile(filepath);
        const folder = await fs.readdir(directory)
        console.log(folder);
        // console.log(file)
        res.setHeader('Content-Type','application/vnd.openxmlformats-officedocument.spreadsheetml.sheet')
        res.setHeader('Content-Disposition',`attachment; filename=${filename}`)
        res.send(file)
    }catch(error){
        console.error(error)
        // res.status(500).send('Internal server error')
    }
}
// controllers/getFiles.js

// controllers/getFiles.js
// const fsPromises = require('fs').promises;
// const path = require('path');
// const archiver = require('archiver');

// const getFilesInFolder = async (req, res) => {
//   try {
//     const folderName = req.params.category;
//     const folderPath = path.join(__dirname, '..', 'uploads', folderName);

//     // Create a ZIP archive
//     const archive = archiver('zip', {
//       zlib: { level: 9 } // Set compression level
//     });

//     // Set the response headers
//     res.attachment(`${folderName}.zip`);
//     archive.pipe(res);

//     // Add all files and subfolders from the specified folder to the archive (recursive)
//     archive.directory(folderPath, false);

//     // Finalize the archive and send it as the response
//     archive.finalize();
//   } catch (error) {
//     console.error('Error creating ZIP archive:', error);
//     res.status(500).json({ error: 'Internal Server Error' });
//   }
// };

module.exports = { getFilesInFolder,clearAll };
