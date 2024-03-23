const { processExcelFile, haveJson,openExcelFile, babyma } = require('../controllers/getFiles');
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
  app.get('/json/:category',haveJson);
  app.post('/upload/:category/:filename', upload.single('excelFile'), processExcelFile);
  app.get('/archives/uploads/:category',getFilesInFolder);
  app.get('/archives/uploads/:folder/:filename',openExcelFile)
  app.get('/file/:folderName/:filename',clearAll)
  app.get('/data',babyma);
  module.exports=app;