const multer = require("multer");
const { diskStorage } = require("multer");
const path = require("path");
const fs = require("fs");

// Regular expression to sanitize file names
const sanitizeFileName = (imageName) => {
  return imageName.replace(/\s+/g, "-").replace(/[^a-zA-Z0-9_\-\.]/g, "");
};

// Function to handle file naming
const filename = (req, file, next) => {
  const lastDotIndex = file.originalname.lastIndexOf(".");
  const originalName = file.originalname.substring(0, lastDotIndex);
  const ext = file.originalname.substring(lastDotIndex);
  next(null, `${sanitizeFileName(originalName)}-${Date.now()}${ext}`);
};

// Function to filter file types
const filter = (req, file, next) => {
  const allowedTypes = [
    "image/jpeg",
    "image/png",
    "image/jpg",
    "video/mp4",
    "image/gif",
    "application/pdf",
  ];
  if (allowedTypes.includes(file.mimetype)) {
    return next(null, true);
  }
  return next(new Error("Only .jpeg, .jpg, .png, .mp4, .gif, and .pdf formats are allowed!"));
};

// Function to get the destination path with validation
const getDestination = (folderName) => {
  return (req, file, next) => {
    const uploadPath = path.join(__dirname, `../../uploads/${folderName}`);
    fs.mkdir(uploadPath, { recursive: true }, (err) => {
      if (err) return next(err);
      next(null, uploadPath);
    });
  };
};

// Storage configurations for profile images and product images
const storageConfig = (folderName) => diskStorage({
  destination: getDestination(folderName),
  filename,
});

// Multer instances
const profileImage = multer({
  storage: storageConfig("profiles"),
  fileFilter: filter,
});

const productImage = multer({
  storage: storageConfig("products"),
  fileFilter: filter,
});

module.exports = { profileImage, productImage };