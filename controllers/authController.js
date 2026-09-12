const bcrypt = require("bcryptjs");

const User = require("../models/User");
const Patient = require("../models/Patient");
const Doctor = require("../models/Doctor");

// ======================================================
// REGISTER USER
// ======================================================

const registerUser = async (req, res) => {
  try {
    // ==================================================
    // GET FORM DATA
    // ==================================================

    const {
      fullName,
      email,
      phone,
      password,
      role,

      // Patient details
      dateOfBirth,
      gender,

      // Doctor details
      specialization,
      qualification,
      experience,
    } = req.body;

    // ==================================================
    // CHECK COMMON FIELDS
    // ==================================================

    if (
      !fullName ||
      !email ||
      !phone ||
      !password ||
      !role
    ) {
      return res.status(400).json({
        success: false,
        message:
          "Please fill all required fields.",
      });
    }

    // ==================================================
    // CHECK ROLE
    // ==================================================

    if (
      role !== "patient" &&
      role !== "doctor"
    ) {
      return res.status(400).json({
        success: false,
        message: "Invalid role selected.",
      });
    }

    // ==================================================
    // CHECK EXISTING EMAIL
    // ==================================================

    const existingUser = await User.findOne({
      email: email.toLowerCase().trim(),
    });

    if (existingUser) {
      return res.status(400).json({
        success: false,
        message:
          "An account with this email already exists.",
      });
    }

    // ==================================================
    // PATIENT VALIDATION
    // ==================================================

    if (role === "patient") {
      if (!dateOfBirth || !gender) {
        return res.status(400).json({
          success: false,
          message:
            "Date of birth and gender are required for patients.",
        });
      }
    }

    // ==================================================
    // DOCTOR VALIDATION
    // ==================================================

    if (role === "doctor") {
      if (
        !specialization ||
        !qualification ||
        experience === undefined ||
        experience === ""
      ) {
        return res.status(400).json({
          success: false,
          message:
            "Specialization, qualification and experience are required for doctors.",
        });
      }

      // ==================================================
      // CHECK DOCTOR DOCUMENTS
      // ==================================================

      if (
        !req.files ||
        !req.files.medicalDegree ||
        !req.files.registrationCertificate ||
        !req.files.governmentId
      ) {
        return res.status(400).json({
          success: false,
          message:
            "All doctor verification documents are required.",
        });
      }
    }

    // ==================================================
    // HASH PASSWORD
    // ==================================================

    const hashedPassword =
      await bcrypt.hash(password, 10);

    // ==================================================
    // CREATE USER
    // ==================================================

    const user = await User.create({
      fullName: fullName.trim(),

      email: email
        .toLowerCase()
        .trim(),

      phone: phone.trim(),

      password: hashedPassword,

      role,
    });

    // ==================================================
    // CREATE PATIENT RECORD
    // ==================================================

    if (role === "patient") {
      try {
        await Patient.create({
          userId: user._id,
          dateOfBirth,
          gender,
        });
      } catch (patientError) {
        // Delete user if patient creation fails
        await User.findByIdAndDelete(
          user._id
        );

        throw patientError;
      }
    }

    // ==================================================
    // CREATE DOCTOR RECORD
    // ==================================================

    if (role === "doctor") {
      try {
        // ----------------------------------------------
        // GET UPLOADED FILES
        // ----------------------------------------------

        const medicalDegree =
          req.files.medicalDegree[0];

        const registrationCertificate =
          req.files.registrationCertificate[0];

        const governmentId =
          req.files.governmentId[0];

        // ----------------------------------------------
        // CREATE DOCTOR
        // ----------------------------------------------

        await Doctor.create({
          userId: user._id,

          specialization:
            specialization.trim(),

          qualification:
            qualification.trim(),

          experience:
            Number(experience),

          medicalDegree:
            medicalDegree.path,

          registrationCertificate:
            registrationCertificate.path,

          governmentId:
            governmentId.path,

          verificationStatus:
            "Pending",
        });
      } catch (doctorError) {
        // Delete user if doctor creation fails
        await User.findByIdAndDelete(
          user._id
        );

        throw doctorError;
      }
    }

    // ==================================================
    // SUCCESS RESPONSE
    // ==================================================

    if (role === "doctor") {
      return res.status(201).json({
        success: true,

        message:
          "Registration submitted successfully. Your documents will be verified by the administrator.",

        userId: user._id,

        role: user.role,

        verificationStatus:
          "Pending",
      });
    }

    return res.status(201).json({
      success: true,

      message:
        "Registration successful.",

      userId: user._id,

      role: user.role,
    });
  } catch (error) {
    console.error(
      "Registration Error:",
      error
    );

    return res.status(500).json({
      success: false,
      message:
        "Server error during registration.",
    });
  }
};

// ======================================================
// LOGIN USER
// ======================================================

const loginUser = async (req, res) => {
  try {
    const {
      email,
      password,
      role,
    } = req.body;

    // ==================================================
    // CHECK REQUIRED FIELDS
    // ==================================================

    if (
      !email ||
      !password ||
      !role
    ) {
      return res.status(400).json({
        success: false,
        message:
          "Email, password and role are required.",
      });
    }

    // ==================================================
    // FIND USER
    // ==================================================

    const user = await User.findOne({
      email: email
        .toLowerCase()
        .trim(),
    });

    if (!user) {
      return res.status(401).json({
        success: false,
        message:
          "Invalid email or password.",
      });
    }

    // ==================================================
    // CHECK ROLE
    // ==================================================

    if (user.role !== role) {
      return res.status(401).json({
        success: false,
        message:
          "Selected role does not match this account.",
      });
    }

    // ==================================================
    // CHECK PASSWORD
    // ==================================================

    const isPasswordCorrect =
      await bcrypt.compare(
        password,
        user.password
      );

    if (!isPasswordCorrect) {
      return res.status(401).json({
        success: false,
        message:
          "Invalid email or password.",
      });
    }

    // ==================================================
    // DOCTOR VERIFICATION CHECK
    // ==================================================

    if (user.role === "doctor") {
      const doctor =
        await Doctor.findOne({
          userId: user._id,
        });

      if (!doctor) {
        return res.status(403).json({
          success: false,
          message:
            "Doctor profile not found.",
        });
      }

      if (
        doctor.verificationStatus !==
        "Approved"
      ) {
        return res.status(403).json({
          success: false,
          message:
            "Your doctor account is awaiting administrator verification.",
          verificationStatus:
            doctor.verificationStatus,
        });
      }
    }

    // ==================================================
    // LOGIN SUCCESS
    // ==================================================

    return res.status(200).json({
      success: true,

      message:
        "Login successful.",

      user: {
        id: user._id,
        fullName: user.fullName,
        email: user.email,
        phone: user.phone,
        role: user.role,
      },
    });
  } catch (error) {
    console.error(
      "Login Error:",
      error
    );

    return res.status(500).json({
      success: false,
      message:
        "Server error during login.",
    });
  }
};

// ======================================================
// EXPORT
// ======================================================

module.exports = {
  registerUser,
  loginUser,
};