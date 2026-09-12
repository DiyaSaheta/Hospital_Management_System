const express = require("express");
const multer = require("multer");
const path = require("path");

const router = express.Router();

const {
  registerUser,
  loginUser,
} = require("../controllers/authController");

// ======================================================
// MULTER CONFIGURATION
// ======================================================

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },

  filename: function (req, file, cb) {
    const uniqueName =
      Date.now() +
      "-" +
      Math.round(Math.random() * 1e9) +
      path.extname(file.originalname);

    cb(null, uniqueName);
  },
});

// ======================================================
// FILE FILTER
// ======================================================

const fileFilter = (req, file, cb) => {
  const allowedTypes = [
    "application/pdf",
    "image/jpeg",
    "image/png",
  ];

  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(
      new Error(
        "Only PDF, JPG and PNG files are allowed."
      ),
      false
    );
  }
};

// ======================================================
// MULTER UPLOAD
// ======================================================

const upload = multer({
  storage: storage,

  limits: {
    fileSize: 5 * 1024 * 1024, // 5 MB
  },

  fileFilter: fileFilter,
});

// ======================================================
// REGISTER USER
// ======================================================

router.post(
  "/register",

  upload.fields([
    {
      name: "medicalDegree",
      maxCount: 1,
    },
    {
      name: "registrationCertificate",
      maxCount: 1,
    },
    {
      name: "governmentId",
      maxCount: 1,
    },
  ]),

  registerUser
);

// ======================================================
// LOGIN USER
// ======================================================

router.post("/login", loginUser);

// ======================================================
// EXPORT ROUTER
// ======================================================

module.exports = router;