const { processExcelFile, haveJson,openExcelFile, fileexp } = require('../controllers/getFiles');
const {getFilesInFolder,clearAll} = require('../controllers/archives');
const express = require('express')
const multer = require('multer')
const path = require('path');
const app =express();
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
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
  });
  app.get('/json/:category/:subcategory',haveJson);
  app.post('/uploads/:category/:subCategory/:filename/:IsSupplysense', upload.single('excelFile'), processExcelFile);
  app.get('/archives/uploads/:category/:subcategory',getFilesInFolder);
  app.get('/archives/uploads/:folder/:subFolder/:filename/:IsSupplysense',openExcelFile)
  app.get('/file/:folderName/:subcategory/:filename',clearAll)
  app.get('/data',fileexp);
  module.exports=app;