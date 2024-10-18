const express = require('express');
const router = express.Router();
const multer = require('multer');
const XLSX = require('xlsx');

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Ensure this directory exists
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  }
});

const upload = multer({ storage });

// Route for uploading the Excel file
router.post('/upload', upload.single('file'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: 'No file uploaded' });
  }

  const filePath = req.file.path;

  // Reading the uploaded Excel file
  const workbook = XLSX.readFile(filePath);
  const sheetName = workbook.SheetNames[0]; // Getting the first sheet
  const sheetData = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName]);

  // Return the data in the response
  res.status(200).json({
    message: 'File uploaded and processed successfully',
    data: sheetData
  });
});

module.exports = router;
