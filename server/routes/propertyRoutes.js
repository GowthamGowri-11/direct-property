// Property Routes - API endpoints for property operations
const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const {
  addProperty,
  getAllProperties,
  getPropertyById,
  updateProperty,
  deleteProperty,
  getStatistics
} = require('../controllers/propertyController');

// Ensure uploads directory exists
const uploadDir = path.join(__dirname, '../uploads');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// Configure multer for image uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, 'property-' + uniqueSuffix + path.extname(file.originalname).toLowerCase());
  }
});

// VERY permissive filter for debugging
const fileFilter = (req, file, cb) => {
  console.log('Multer processing file:', {
    name: file.originalname,
    mimetype: file.mimetype
  });

  // Accept almost anything that looks like an image or has no mimetype (sometimes happens in weird environments)
  if (!file.mimetype || file.mimetype.startsWith('image/') || /\.(jpg|jpeg|png|gif|webp|avif)$/i.test(file.originalname)) {
    return cb(null, true);
  }

  cb(new Error('Invalid file type. Please upload an image file (JPG, PNG, etc.)'));
};

const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 10 * 1024 * 1024 } // 10MB limit
});

// Wrapper for multer to handle errors gracefully
const uploadSingle = (fieldName) => {
  const multerUpload = upload.single(fieldName);
  return (req, res, next) => {
    multerUpload(req, res, (err) => {
      if (err instanceof multer.MulterError) {
        console.error('Multer Error:', err);
        return res.status(400).json({ success: false, message: `Upload error: ${err.message}` });
      } else if (err) {
        console.error('Upload Filter Error:', err);
        return res.status(400).json({ success: false, message: err.message });
      }
      next();
    });
  };
};

// Routes
router.post('/', uploadSingle('landImage'), addProperty);
router.get('/', getAllProperties);
router.get('/statistics', getStatistics);
router.get('/:id', getPropertyById);
router.put('/:id', uploadSingle('landImage'), updateProperty);
router.delete('/:id', deleteProperty);

module.exports = router;
