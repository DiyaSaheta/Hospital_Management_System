const User = require("../models/User");
const Patient = require("../models/Patient");
const Appointment = require("../models/Appointment");
const MedicalRecord = require("../models/MedicalRecord");
const Prescription = require("../models/Prescription");
const Doctor = require("../models/Doctor");

const getPatientDashboard = async (req, res) => {
  try {
    const { userId } = req.params;

    // Find user
    const user = await User.findById(userId).select(
      "-password"
    );

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "Patient account not found.",
      });
    }

    if (user.role !== "patient") {
      return res.status(403).json({
        success: false,
        message: "Access denied. Patient account required.",
      });
    }

    // Find patient profile
    const patient = await Patient.findOne({
      userId: user._id,
    });

    if (!patient) {
      return res.status(404).json({
        success: false,
        message: "Patient profile not found.",
      });
    }

    // Find appointments
    const appointments = await Appointment.find({
      patientId: patient._id,
    })
      .populate({
        path: "doctorId",
        populate: {
          path: "userId",
          select: "fullName",
        },
      })
      .sort({
        appointmentDate: 1,
      });

    // Find medical records
    const medicalRecords =
      await MedicalRecord.find({
        patientId: patient._id,
      })
        .populate({
          path: "doctorId",
          populate: {
            path: "userId",
            select: "fullName",
          },
        })
        .sort({
          createdAt: -1,
        });

    // Find prescriptions
    const prescriptions =
      await Prescription.find({
        patientId: patient._id,
      })
        .populate({
          path: "doctorId",
          populate: {
            path: "userId",
            select: "fullName",
          },
        })
        .sort({
          createdAt: -1,
        });

    // Count upcoming appointments
    const upcomingAppointments =
      appointments.filter(
        (appointment) =>
          new Date(
            appointment.appointmentDate
          ) >= new Date() &&
          appointment.status !== "Cancelled"
      );

    // Count unique doctors visited
    const doctorIds = appointments
      .filter(
        (appointment) =>
          appointment.status !== "Cancelled"
      )
      .map((appointment) =>
        appointment.doctorId?._id?.toString()
      )
      .filter(Boolean);

    const uniqueDoctors = [
      ...new Set(doctorIds),
    ];

    // Format appointments for frontend
    const formattedAppointments =
      upcomingAppointments.slice(0, 5).map(
        (appointment) => ({
          id: appointment._id,

          doctor:
            appointment.doctorId?.userId?.fullName ||
            "Doctor",

          specialization:
            appointment.doctorId?.specialization ||
            "General Physician",

          date: appointment.appointmentDate,

          time:
            appointment.appointmentTime || "",

          type:
            appointment.type ||
            "Consultation",

          status:
            appointment.status ||
            "Pending",

          icon: "🩺",
        })
      );

    // Format medical records
    const formattedRecords =
      medicalRecords.slice(0, 5).map(
        (record) => ({
          id: record._id,

          date:
            record.date ||
            record.createdAt,

          doctor:
            record.doctorId?.userId?.fullName ||
            "Doctor",

          department:
            record.department ||
            record.doctorId?.specialization ||
            "General Medicine",

          type:
            record.type ||
            "Consultation",
        })
      );

    // Format prescriptions
    const formattedPrescriptions =
      prescriptions
        .filter(
          (prescription) =>
            prescription.status !==
            "Completed"
        )
        .slice(0, 5)
        .map((prescription) => ({
          id: prescription._id,

          medicine:
            prescription.medicine ||
            prescription.medicineName ||
            "Medicine",

          dosage:
            prescription.dosage || "",

          frequency:
            prescription.frequency || "",

          duration:
            prescription.duration || "",
        }));

    return res.status(200).json({
      success: true,

      patient: {
        name: user.fullName,

        firstName:
          user.fullName.split(" ")[0],

        email: user.email,

        patientId:
          patient.patientId ||
          `PAT-${patient._id
            .toString()
            .slice(-6)
            .toUpperCase()}`,
      },

      stats: {
        upcomingAppointments:
          upcomingAppointments.length,

        medicalRecords:
          medicalRecords.length,

        prescriptions:
          prescriptions.length,

        doctorsVisited:
          uniqueDoctors.length,
      },

      appointments:
        formattedAppointments,

      medicalRecords:
        formattedRecords,

      prescriptions:
        formattedPrescriptions,
    });
  } catch (error) {
    console.error(
      "Patient Dashboard Error:",
      error
    );

    return res.status(500).json({
      success: false,
      message:
        "Server error while loading patient dashboard.",
    });
  }
};

module.exports = {
  getPatientDashboard,
};