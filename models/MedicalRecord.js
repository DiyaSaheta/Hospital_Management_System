const mongoose = require("mongoose");

const medicalRecordSchema = new mongoose.Schema(
  {
    patientId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Patient",
      required: true,
    },

    doctorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Doctor",
      required: true,
    },

    appointmentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Appointment",
    },

    recordDate: {
      type: Date,
      required: true,
      default: Date.now,
    },

    recordType: {
      type: String,
      enum: [
        "Consultation",
        "Diagnosis",
        "Lab Test",
        "Imaging",
        "Follow-up",
        "Other",
      ],
      required: true,
    },

    diagnosis: {
      type: String,
      required: true,
      trim: true,
    },

    symptoms: {
      type: String,
      trim: true,
    },

    treatment: {
      type: String,
      trim: true,
    },

    notes: {
      type: String,
      trim: true,
    },

    testResults: {
      type: String,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model(
  "MedicalRecord",
  medicalRecordSchema
);