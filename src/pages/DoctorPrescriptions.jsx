import { useState } from "react";
import { useNavigate } from "react-router-dom";

function DoctorPrescriptions() {
  const navigate = useNavigate();

  // =====================================================
  // ACTIVE MENU
  // =====================================================

  const [activeMenu, setActiveMenu] = useState("Prescriptions");

  // =====================================================
  // DOCTOR INFORMATION
  // =====================================================

  const doctor = {
    name: "Dr. Ruchit",
    firstName: "Ruchit",
    specialization: "Cardiologist",
  };

  // =====================================================
  // PRESCRIPTIONS DATA
  // =====================================================

  const [prescriptions, setPrescriptions] = useState([
    {
      id: 1,
      patientName: "Aarav Patel",
      age: 28,
      gender: "Male",
      prescriptionDate: "08 September 2026",
      diagnosis: "Hypertension",
      medicines: [
        {
          name: "Amlodipine",
          dosage: "5 mg",
          frequency: "Once a day",
          duration: "30 days",
        },
        {
          name: "Telmisartan",
          dosage: "40 mg",
          frequency: "Once a day",
          duration: "30 days",
        },
      ],
      instructions:
        "Take medicines regularly. Monitor blood pressure and reduce salt intake.",
    },

    {
      id: 2,
      patientName: "Diya Shah",
      age: 24,
      gender: "Female",
      prescriptionDate: "06 September 2026",
      diagnosis: "Viral Fever",
      medicines: [
        {
          name: "Paracetamol",
          dosage: "500 mg",
          frequency: "Twice a day",
          duration: "5 days",
        },
        {
          name: "Vitamin C",
          dosage: "500 mg",
          frequency: "Once a day",
          duration: "10 days",
        },
      ],
      instructions:
        "Take adequate rest and drink plenty of fluids.",
    },

    {
      id: 3,
      patientName: "Rohan Mehta",
      age: 35,
      gender: "Male",
      prescriptionDate: "05 September 2026",
      diagnosis: "High Blood Pressure",
      medicines: [
        {
          name: "Losartan",
          dosage: "50 mg",
          frequency: "Once a day",
          duration: "30 days",
        },
      ],
      instructions:
        "Avoid excessive salt and monitor blood pressure regularly.",
    },

    {
      id: 4,
      patientName: "Kavya Patel",
      age: 31,
      gender: "Female",
      prescriptionDate: "03 September 2026",
      diagnosis: "Migraine",
      medicines: [
        {
          name: "Sumatriptan",
          dosage: "50 mg",
          frequency: "As required",
          duration: "7 days",
        },
        {
          name: "Ondansetron",
          dosage: "4 mg",
          frequency: "Twice a day",
          duration: "5 days",
        },
      ],
      instructions:
        "Avoid bright lights, maintain proper sleep and stay hydrated.",
    },

    {
      id: 5,
      patientName: "Manav Joshi",
      age: 42,
      gender: "Male",
      prescriptionDate: "01 September 2026",
      diagnosis: "Type 2 Diabetes",
      medicines: [
        {
          name: "Metformin",
          dosage: "500 mg",
          frequency: "Twice a day",
          duration: "30 days",
        },
      ],
      instructions:
        "Follow a balanced diet and monitor blood glucose regularly.",
    },

    {
      id: 6,
      patientName: "Krisha Desai",
      age: 26,
      gender: "Female",
      prescriptionDate: "29 August 2026",
      diagnosis: "General Consultation",
      medicines: [
        {
          name: "Multivitamin",
          dosage: "1 tablet",
          frequency: "Once a day",
          duration: "30 days",
        },
      ],
      instructions:
        "Maintain a healthy diet and regular sleep schedule.",
    },
  ]);

  // =====================================================
  // SEARCH
  // =====================================================

  const [searchTerm, setSearchTerm] = useState("");

  // =====================================================
  // SELECTED PRESCRIPTION
  // =====================================================

  const [selectedPrescription, setSelectedPrescription] =
    useState(null);

  // =====================================================
  // ADD PRESCRIPTION MODAL
  // =====================================================

  const [showAddModal, setShowAddModal] = useState(false);

  // =====================================================
  // NEW PRESCRIPTION
  // =====================================================

  const [newPrescription, setNewPrescription] = useState({
    patientName: "",
    age: "",
    gender: "",
    diagnosis: "",
    medicineName: "",
    dosage: "",
    frequency: "",
    duration: "",
    instructions: "",
  });

  // =====================================================
  // SIDEBAR MENU
  // =====================================================

  const menuItems = [
    {
      name: "Dashboard",
      icon: "⌂",
    },
    {
      name: "Appointments",
      icon: "📅",
    },
    {
      name: "Patients",
      icon: "👥",
    },
    {
      name: "Medical Records",
      icon: "📋",
    },
    {
      name: "Prescriptions",
      icon: "💊",
    },
    {
      name: "Profile",
      icon: "👤",
    },
  ];

  // =====================================================
  // SIDEBAR NAVIGATION
  // =====================================================

  const handleMenuClick = (menuName) => {
    setActiveMenu(menuName);

    if (menuName === "Dashboard") {
      navigate("/doctor-dashboard");
    }

    if (menuName === "Appointments") {
      navigate("/doctor-appointments");
    }

    if (menuName === "Patients") {
      navigate("/doctor-patients");
    }

    if (menuName === "Medical Records") {
      navigate("/doctor-medical-records");
    }

    if (menuName === "Prescriptions") {
      navigate("/doctor-prescriptions");
    }

    if (menuName === "Profile") {
      navigate("/doctor-profile");
    }
  };

  // =====================================================
  // LOGOUT
  // =====================================================

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    navigate("/login");
  };

  // =====================================================
  // SEARCH FILTER
  // =====================================================

  const filteredPrescriptions = prescriptions.filter(
    (prescription) => {
      const search = searchTerm.toLowerCase();

      const medicineNames = prescription.medicines
        .map((medicine) => medicine.name)
        .join(" ")
        .toLowerCase();

      return (
        prescription.patientName
          .toLowerCase()
          .includes(search) ||
        prescription.diagnosis
          .toLowerCase()
          .includes(search) ||
        medicineNames.includes(search)
      );
    }
  );

  // =====================================================
  // HANDLE INPUT
  // =====================================================

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setNewPrescription({
      ...newPrescription,
      [name]: value,
    });
  };

  // =====================================================
  // ADD PRESCRIPTION
  // =====================================================

  const handleAddPrescription = (e) => {
    e.preventDefault();

    if (
      !newPrescription.patientName ||
      !newPrescription.age ||
      !newPrescription.gender ||
      !newPrescription.diagnosis ||
      !newPrescription.medicineName ||
      !newPrescription.dosage ||
      !newPrescription.frequency ||
      !newPrescription.duration
    ) {
      alert("Please fill all required fields.");
      return;
    }

    const prescription = {
      id: prescriptions.length + 1,
      patientName: newPrescription.patientName,
      age: newPrescription.age,
      gender: newPrescription.gender,
      prescriptionDate: "10 September 2026",
      diagnosis: newPrescription.diagnosis,

      medicines: [
        {
          name: newPrescription.medicineName,
          dosage: newPrescription.dosage,
          frequency: newPrescription.frequency,
          duration: newPrescription.duration,
        },
      ],

      instructions:
        newPrescription.instructions ||
        "Follow the prescribed medication schedule.",
    };

    setPrescriptions([
      prescription,
      ...prescriptions,
    ]);

    setNewPrescription({
      patientName: "",
      age: "",
      gender: "",
      diagnosis: "",
      medicineName: "",
      dosage: "",
      frequency: "",
      duration: "",
      instructions: "",
    });

    setShowAddModal(false);
  };

  // =====================================================
  // STATISTICS
  // =====================================================

  const totalPrescriptions = prescriptions.length;

  const thisMonthPrescriptions =
    prescriptions.filter((prescription) =>
      prescription.prescriptionDate.includes(
        "September"
      )
    ).length;

  const totalPatients = new Set(
    prescriptions.map(
      (prescription) =>
        prescription.patientName
    )
  ).size;

  // =====================================================
  // JSX
  // =====================================================

  return (
    <>
      {/* =====================================================
          CSS
      ===================================================== */}

      <style>{`

        /* =====================================================
           GLOBAL
        ===================================================== */

        * {
          box-sizing: border-box;
        }

        body {
          margin: 0;
          padding: 0;
          font-family: Arial, Helvetica, sans-serif;
          background: #f5f8fc;
        }


        /* =====================================================
           MAIN LAYOUT
        ===================================================== */

        .doctor-layout {
          width: 100%;
          min-height: 100vh;

          display: flex;

          background: #f5f8fc;
        }


        /* =====================================================
           SIDEBAR
        ===================================================== */

        .doctor-sidebar {
          width: 250px;
          min-height: 100vh;

          position: fixed;

          top: 0;
          left: 0;
          bottom: 0;

          z-index: 100;

          display: flex;
          flex-direction: column;

          background: #ffffff;

          border-right: 1px solid #e5eaf0;
        }


        /* =====================================================
           BRAND
        ===================================================== */

        .sidebar-brand {
          height: 90px;

          padding: 0 25px;

          display: flex;
          align-items: center;

          gap: 12px;

          border-bottom: 1px solid #eef1f5;
        }

        .sidebar-brand-icon {
          width: 42px;
          height: 42px;

          border-radius: 11px;

          display: flex;
          align-items: center;
          justify-content: center;

          background: #0f766e;

          color: white;

          font-size: 28px;
          font-weight: bold;
        }

        .sidebar-brand-text h2 {
          margin: 0;

          color: #172033;

          font-size: 20px;
        }

        .sidebar-brand-text p {
          margin: 3px 0 0;

          color: #8992a2;

          font-size: 10px;
        }


        /* =====================================================
           MENU
        ===================================================== */

        .sidebar-menu {
          flex: 1;

          padding: 25px 15px;
        }

        .menu-title {
          padding: 0 12px;

          margin-bottom: 12px;

          color: #a0a8b6;

          font-size: 10px;

          font-weight: 700;

          text-transform: uppercase;

          letter-spacing: 0.8px;
        }

        .menu-item {
          width: 100%;
          height: 46px;

          margin-bottom: 6px;

          padding: 0 13px;

          display: flex;
          align-items: center;

          gap: 13px;

          border: none;

          border-radius: 9px;

          background: transparent;

          color: #697386;

          font-size: 13px;
          font-weight: 500;

          text-align: left;

          cursor: pointer;

          transition: all 0.2s ease;
        }

        .menu-item:hover {
          background: #f0fdfa;

          color: #0f766e;
        }

        .menu-item.active {
          background: #e8f8f6;

          color: #0f766e;

          font-weight: 600;
        }

        .menu-icon {
          width: 25px;

          display: flex;
          align-items: center;
          justify-content: center;

          font-size: 17px;
        }


        /* =====================================================
           SIDEBAR BOTTOM
        ===================================================== */

        .sidebar-bottom {
          padding: 15px;

          border-top: 1px solid #eef1f5;
        }

        .logout-button {
          width: 100%;
          height: 43px;

          padding: 0 13px;

          display: flex;
          align-items: center;

          gap: 13px;

          border: none;

          border-radius: 9px;

          background: transparent;

          color: #dc2626;

          font-size: 13px;

          cursor: pointer;

          transition: 0.2s ease;
        }

        .logout-button:hover {
          background: #fef2f2;
        }


        /* =====================================================
           MAIN
        ===================================================== */

        .doctor-main {
          width: calc(100% - 250px);

          min-height: 100vh;

          margin-left: 250px;
        }


        /* =====================================================
           TOPBAR
        ===================================================== */

        .doctor-topbar {
          height: 90px;

          padding: 0 35px;

          display: flex;
          align-items: center;
          justify-content: space-between;

          background: #ffffff;

          border-bottom: 1px solid #e5eaf0;
        }

        .topbar-title h1 {
          margin: 0;

          color: #172033;

          font-size: 22px;
        }

        .topbar-title p {
          margin: 5px 0 0;

          color: #8a93a3;

          font-size: 12px;
        }


        /* =====================================================
           TOPBAR RIGHT
        ===================================================== */

        .topbar-right {
          display: flex;
          align-items: center;

          gap: 20px;
        }

        .notification-button {
          width: 40px;
          height: 40px;

          position: relative;

          border: 1px solid #e5eaf0;

          border-radius: 9px;

          background: white;

          display: flex;
          align-items: center;
          justify-content: center;

          font-size: 17px;

          cursor: pointer;
        }

        .notification-dot {
          position: absolute;

          width: 7px;
          height: 7px;

          top: 8px;
          right: 8px;

          border-radius: 50%;

          background: #ef4444;

          border: 1px solid white;
        }


        /* =====================================================
           PROFILE
        ===================================================== */

        .profile-button {
          display: flex;
          align-items: center;

          gap: 10px;

          border: none;

          background: transparent;

          cursor: pointer;
        }

        .profile-avatar {
          width: 40px;
          height: 40px;

          border-radius: 50%;

          background: #d9f5f1;

          color: #0f766e;

          display: flex;
          align-items: center;
          justify-content: center;

          font-size: 14px;

          font-weight: 700;
        }

        .profile-info {
          text-align: left;
        }

        .profile-info strong {
          display: block;

          color: #273247;

          font-size: 12px;
        }

        .profile-info span {
          display: block;

          margin-top: 2px;

          color: #929aa8;

          font-size: 10px;
        }


        /* =====================================================
           CONTENT
        ===================================================== */

        .prescriptions-content {
          padding: 30px 35px 40px;
        }


        /* =====================================================
           PAGE HEADER
        ===================================================== */

        .page-header {
          display: flex;

          align-items: center;
          justify-content: space-between;

          margin-bottom: 28px;
        }

        .page-header h2 {
          margin: 0 0 8px;

          color: #172033;

          font-size: 28px;
        }

        .page-header p {
          margin: 0;

          color: #6b7280;

          font-size: 14px;
        }

        .add-prescription-button {
          padding: 12px 18px;

          border: none;

          border-radius: 8px;

          background: #0f766e;

          color: white;

          font-size: 12px;

          font-weight: 600;

          cursor: pointer;

          transition: 0.2s ease;
        }

        .add-prescription-button:hover {
          background: #0b625c;
        }


        /* =====================================================
           STATISTICS
        ===================================================== */

        .stats-container {
          display: grid;

          grid-template-columns:
            repeat(3, 1fr);

          gap: 20px;

          margin-bottom: 25px;
        }

        .stat-card {
          padding: 20px;

          display: flex;
          align-items: center;

          gap: 15px;

          background: white;

          border: 1px solid #e5e7eb;

          border-radius: 12px;

          box-shadow:
            0 2px 8px
            rgba(0, 0, 0, 0.03);
        }

        .stat-icon {
          width: 48px;
          height: 48px;

          border-radius: 10px;

          display: flex;
          align-items: center;
          justify-content: center;

          font-size: 20px;
        }

        .prescription-icon {
          background: #e8f8f6;
        }

        .month-icon {
          background: #e9efff;
        }

        .patient-icon {
          background: #fff5df;
        }

        .stat-card h3 {
          margin: 0 0 4px;

          color: #172033;

          font-size: 24px;
        }

        .stat-card p {
          margin: 0;

          color: #7b8492;

          font-size: 11px;
        }


        /* =====================================================
           PRESCRIPTION CARD
        ===================================================== */

        .prescriptions-card {
          background: white;

          border: 1px solid #e5e7eb;

          border-radius: 12px;

          overflow: hidden;

          box-shadow:
            0 2px 8px
            rgba(0, 0, 0, 0.03);
        }

        .prescriptions-card-header {
          padding: 22px 24px;

          border-bottom: 1px solid #eef1f5;
        }

        .prescriptions-card-header h3 {
          margin: 0 0 5px;

          color: #172033;

          font-size: 18px;
        }

        .prescriptions-card-header p {
          margin: 0;

          color: #7b8492;

          font-size: 12px;
        }


        /* =====================================================
           SEARCH
        ===================================================== */

        .search-container {
          padding: 20px 24px;
        }

        .search-box {
          position: relative;

          width: 100%;
        }

        .search-icon {
          position: absolute;

          left: 14px;
          top: 50%;

          transform: translateY(-50%);

          font-size: 14px;
        }

        .search-box input {
          width: 100%;
          height: 42px;

          padding: 0 14px 0 40px;

          border: 1px solid #dfe3e8;

          border-radius: 8px;

          outline: none;

          font-size: 12px;

          color: #273247;
        }

        .search-box input:focus {
          border-color: #0f766e;
        }


        /* =====================================================
           TABLE
        ===================================================== */

        .table-wrapper {
          width: 100%;

          overflow-x: auto;
        }

        .prescriptions-table {
          width: 100%;

          border-collapse: collapse;
        }

        .prescriptions-table th {
          padding: 14px 18px;

          background: #f8fafc;

          border-top: 1px solid #eef1f5;

          border-bottom: 1px solid #eef1f5;

          color: #7b8492;

          font-size: 10px;

          text-align: left;

          text-transform: uppercase;

          letter-spacing: 0.5px;
        }

        .prescriptions-table td {
          padding: 15px 18px;

          border-bottom: 1px solid #eef1f5;

          color: #4c5563;

          font-size: 12px;

          white-space: nowrap;
        }

        .prescriptions-table tbody tr:hover {
          background: #fafdfd;
        }


        /* =====================================================
           PATIENT
        ===================================================== */

        .patient-info {
          display: flex;

          align-items: center;

          gap: 10px;
        }

        .patient-avatar {
          width: 38px;
          height: 38px;

          flex-shrink: 0;

          border-radius: 50%;

          display: flex;
          align-items: center;
          justify-content: center;

          background: #d9f5f1;

          color: #0f766e;

          font-size: 13px;

          font-weight: 700;
        }

        .patient-details strong {
          display: block;

          margin-bottom: 3px;

          color: #273247;

          font-size: 12px;
        }

        .patient-details span {
          color: #929aa8;

          font-size: 9px;
        }


        /* =====================================================
           DIAGNOSIS
        ===================================================== */

        .diagnosis {
          color: #273247;

          font-weight: 600;
        }


        /* =====================================================
           MEDICINE COUNT
        ===================================================== */

        .medicine-count {
          display: inline-block;

          padding: 6px 10px;

          border-radius: 6px;

          background: #f0fdfa;

          color: #0f766e;

          font-size: 10px;

          font-weight: 600;
        }


        /* =====================================================
           DATE
        ===================================================== */

        .prescription-date {
          color: #697386;
        }


        /* =====================================================
           ACTION BUTTON
        ===================================================== */

        .view-button {
          padding: 7px 12px;

          border: none;

          border-radius: 6px;

          background: #e8f8f6;

          color: #0f766e;

          font-size: 10px;

          font-weight: 600;

          cursor: pointer;

          transition: 0.2s ease;
        }

        .view-button:hover {
          background: #d6f3ef;
        }


        /* =====================================================
           NO DATA
        ===================================================== */

        .no-data {
          padding: 40px !important;

          text-align: center;

          color: #8a93a3 !important;

          font-size: 13px !important;
        }


        /* =====================================================
           MODAL OVERLAY
        ===================================================== */

        .modal-overlay {
          position: fixed;

          inset: 0;

          z-index: 1000;

          display: flex;

          align-items: center;
          justify-content: center;

          padding: 20px;

          background:
            rgba(15, 23, 42, 0.45);
        }


        /* =====================================================
           VIEW MODAL
        ===================================================== */

        .prescription-modal {
          width: 100%;

          max-width: 700px;

          max-height: 90vh;

          overflow-y: auto;

          padding: 25px;

          background: white;

          border-radius: 12px;

          box-shadow:
            0 20px 50px
            rgba(0, 0, 0, 0.18);
        }


        /* =====================================================
           MODAL HEADER
        ===================================================== */

        .modal-header {
          display: flex;

          align-items: flex-start;
          justify-content: space-between;

          margin-bottom: 22px;
        }

        .modal-header h2 {
          margin: 0 0 5px;

          color: #172033;

          font-size: 20px;
        }

        .modal-header p {
          margin: 0;

          color: #7b8492;

          font-size: 11px;
        }

        .close-button {
          width: 30px;
          height: 30px;

          border: none;

          border-radius: 50%;

          background: #f1f3f5;

          color: #555;

          font-size: 20px;

          cursor: pointer;
        }


        /* =====================================================
           PATIENT HEADER
        ===================================================== */

        .modal-patient {
          display: flex;

          align-items: center;

          gap: 15px;

          padding: 16px;

          margin-bottom: 20px;

          background: #f0fdfa;

          border-radius: 10px;
        }

        .large-avatar {
          width: 55px;
          height: 55px;

          border-radius: 50%;

          display: flex;
          align-items: center;
          justify-content: center;

          background: #d9f5f1;

          color: #0f766e;

          font-size: 19px;

          font-weight: 700;
        }

        .modal-patient h3 {
          margin: 0 0 5px;

          color: #273247;

          font-size: 16px;
        }

        .modal-patient p {
          margin: 0;

          color: #7b8492;

          font-size: 11px;
        }


        /* =====================================================
           DETAILS
        ===================================================== */

        .details-grid {
          display: grid;

          grid-template-columns:
            1fr 1fr;

          gap: 14px;

          margin-bottom: 20px;
        }

        .detail-item {
          padding: 13px;

          border: 1px solid #e7e9ed;

          border-radius: 8px;
        }

        .detail-item span {
          display: block;

          margin-bottom: 6px;

          color: #7b828c;

          font-size: 10px;
        }

        .detail-item strong {
          color: #273247;

          font-size: 12px;
        }


        /* =====================================================
           MEDICINES
        ===================================================== */

        .medicine-section {
          margin-bottom: 20px;
        }

        .medicine-section-title {
          margin-bottom: 10px;

          color: #273247;

          font-size: 13px;

          font-weight: 700;
        }

        .medicine-table {
          width: 100%;

          border-collapse: collapse;

          border: 1px solid #e5e7eb;

          border-radius: 8px;

          overflow: hidden;
        }

        .medicine-table th {
          padding: 10px;

          background: #f8fafc;

          color: #7b8492;

          font-size: 9px;

          text-align: left;
        }

        .medicine-table td {
          padding: 11px 10px;

          border-top: 1px solid #eef1f5;

          color: #4c5563;

          font-size: 11px;
        }

        .medicine-name {
          color: #273247 !important;

          font-weight: 600;
        }


        /* =====================================================
           INSTRUCTIONS
        ===================================================== */

        .instructions-box {
          padding: 15px;

          margin-bottom: 15px;

          border: 1px solid #e7e9ed;

          border-radius: 8px;
        }

        .instructions-box span {
          display: block;

          margin-bottom: 7px;

          color: #7b828c;

          font-size: 10px;
        }

        .instructions-box p {
          margin: 0;

          color: #4c5563;

          font-size: 12px;

          line-height: 1.6;
        }


        /* =====================================================
           MODAL FOOTER
        ===================================================== */

        .modal-footer {
          display: flex;

          justify-content: flex-end;

          padding-top: 5px;
        }

        .close-modal-button {
          padding: 10px 18px;

          border: none;

          border-radius: 7px;

          background: #0f766e;

          color: white;

          font-size: 11px;

          font-weight: 600;

          cursor: pointer;
        }


        /* =====================================================
           ADD MODAL
        ===================================================== */

        .add-modal {
          width: 100%;

          max-width: 650px;

          max-height: 90vh;

          overflow-y: auto;

          padding: 25px;

          background: white;

          border-radius: 12px;

          box-shadow:
            0 20px 50px
            rgba(0, 0, 0, 0.18);
        }


        /* =====================================================
           FORM
        ===================================================== */

        .form-grid {
          display: grid;

          grid-template-columns:
            1fr 1fr;

          gap: 15px;
        }

        .form-group {
          display: flex;

          flex-direction: column;
        }

        .form-group.full-width {
          grid-column: 1 / -1;
        }

        .form-group label {
          margin-bottom: 7px;

          color: #374151;

          font-size: 11px;

          font-weight: 600;
        }

        .required {
          color: #dc2626;
        }

        .form-group input,
        .form-group select,
        .form-group textarea {
          width: 100%;

          padding: 10px 12px;

          border: 1px solid #dfe3e8;

          border-radius: 7px;

          outline: none;

          background: white;

          color: #273247;

          font-family: Arial, Helvetica, sans-serif;

          font-size: 11px;
        }

        .form-group input,
        .form-group select {
          height: 40px;
        }

        .form-group textarea {
          min-height: 80px;

          resize: vertical;
        }

        .form-group input:focus,
        .form-group select:focus,
        .form-group textarea:focus {
          border-color: #0f766e;
        }


        /* =====================================================
           FORM BUTTONS
        ===================================================== */

        .form-buttons {
          display: flex;

          justify-content: flex-end;

          gap: 10px;

          margin-top: 22px;
        }

        .cancel-button {
          padding: 10px 18px;

          border: 1px solid #dfe3e8;

          border-radius: 7px;

          background: white;

          color: #596273;

          font-size: 11px;

          cursor: pointer;
        }

        .submit-button {
          padding: 10px 18px;

          border: none;

          border-radius: 7px;

          background: #0f766e;

          color: white;

          font-size: 11px;

          font-weight: 600;

          cursor: pointer;
        }

        .submit-button:hover {
          background: #0b625c;
        }


        /* =====================================================
           RESPONSIVE
        ===================================================== */

        @media (max-width: 1000px) {

          .doctor-sidebar {
            width: 210px;
          }

          .doctor-main {
            width: calc(100% - 210px);

            margin-left: 210px;
          }

          .prescriptions-content {
            padding: 25px 20px 40px;
          }

          .doctor-topbar {
            padding: 0 20px;
          }

        }


        @media (max-width: 750px) {

          .doctor-sidebar {
            width: 70px;
          }

          .doctor-main {
            width: calc(100% - 70px);

            margin-left: 70px;
          }

          .sidebar-brand {
            justify-content: center;

            padding: 0;
          }

          .sidebar-brand-text,
          .menu-title,
          .menu-item span:not(.menu-icon),
          .logout-button span:not(.menu-icon) {
            display: none;
          }

          .sidebar-menu {
            padding: 20px 10px;
          }

          .menu-item,
          .logout-button {
            justify-content: center;

            padding: 0;
          }

          .profile-info {
            display: none;
          }

          .topbar-title h1 {
            font-size: 18px;
          }

          .topbar-title p {
            display: none;
          }

          .page-header {
            flex-direction: column;

            align-items: flex-start;

            gap: 15px;
          }

          .stats-container {
            grid-template-columns:
              repeat(2, 1fr);

            gap: 12px;
          }

        }


        @media (max-width: 500px) {

          .prescriptions-content {
            padding: 20px 12px;
          }

          .stats-container {
            grid-template-columns: 1fr;
          }

          .details-grid,
          .form-grid {
            grid-template-columns: 1fr;
          }

          .form-group.full-width {
            grid-column: auto;
          }

          .topbar-right {
            gap: 8px;
          }

          .notification-button {
            width: 35px;
            height: 35px;
          }

          .profile-avatar {
            width: 35px;
            height: 35px;
          }

        }

      `}</style>


      {/* =====================================================
          MAIN LAYOUT
      ===================================================== */}

      <div className="doctor-layout">


        {/* =====================================================
            SIDEBAR
        ===================================================== */}

        <aside className="doctor-sidebar">


          {/* BRAND */}

          <div className="sidebar-brand">

            <div className="sidebar-brand-icon">
              +
            </div>

            <div className="sidebar-brand-text">

              <h2>
                CureAI
              </h2>

              <p>
                Hospital Management
              </p>

            </div>

          </div>


          {/* MENU */}

          <div className="sidebar-menu">

            <div className="menu-title">
              Main Menu
            </div>


            {menuItems.map((item) => (

              <button
                key={item.name}
                className={
                  `menu-item ${
                    activeMenu === item.name
                      ? "active"
                      : ""
                  }`
                }
                onClick={() =>
                  handleMenuClick(item.name)
                }
              >

                <span className="menu-icon">
                  {item.icon}
                </span>

                <span>
                  {item.name}
                </span>

              </button>

            ))}

          </div>


          {/* LOGOUT */}

          <div className="sidebar-bottom">

            <button
              className="logout-button"
              onClick={handleLogout}
            >

              <span className="menu-icon">
                ↪
              </span>

              <span>
                Logout
              </span>

            </button>

          </div>

        </aside>


        {/* =====================================================
            MAIN CONTENT
        ===================================================== */}

        <main className="doctor-main">


          {/* TOPBAR */}

          <header className="doctor-topbar">

            <div className="topbar-title">

              <h1>
                Prescriptions
              </h1>

              <p>
                Create and manage prescriptions for your patients.
              </p>

            </div>


            <div className="topbar-right">


              {/* Notification */}

              <button
                className="notification-button"
                title="Notifications"
                onClick={() =>
                  navigate("/doctor-notifications")
                }
              >

                🔔

                <span className="notification-dot"></span>

              </button>


              {/* Doctor Profile */}

              <button
                className="profile-button"
                onClick={() =>
                  navigate("/doctor-profile")
                }
              >

                <div className="profile-avatar">

                  {doctor.firstName
                    .charAt(0)
                    .toUpperCase()}

                </div>

                <div className="profile-info">

                  <strong>
                    {doctor.name}
                  </strong>

                  <span>
                    {doctor.specialization}
                  </span>

                </div>

                <span>
                  ▾
                </span>

              </button>

            </div>

          </header>


          {/* =====================================================
              PAGE CONTENT
          ===================================================== */}

          <section className="prescriptions-content">


            {/* PAGE HEADER */}

            <div className="page-header">

              <div>

                <h2>
                  Prescriptions
                </h2>

                <p>
                  Create and manage medication prescriptions for your patients.
                </p>

              </div>


              <button
                className="add-prescription-button"
                onClick={() =>
                  setShowAddModal(true)
                }
              >
                + Add Prescription
              </button>

            </div>


            {/* =================================================
                STATISTICS
            ================================================= */}

            <div className="stats-container">


              {/* TOTAL */}

              <div className="stat-card">

                <div className="stat-icon prescription-icon">
                  💊
                </div>

                <div>

                  <h3>
                    {totalPrescriptions}
                  </h3>

                  <p>
                    Total Prescriptions
                  </p>

                </div>

              </div>


              {/* MONTH */}

              <div className="stat-card">

                <div className="stat-icon month-icon">
                  📅
                </div>

                <div>

                  <h3>
                    {thisMonthPrescriptions}
                  </h3>

                  <p>
                    This Month
                  </p>

                </div>

              </div>


              {/* PATIENTS */}

              <div className="stat-card">

                <div className="stat-icon patient-icon">
                  👥
                </div>

                <div>

                  <h3>
                    {totalPatients}
                  </h3>

                  <p>
                    Patients Prescribed
                  </p>

                </div>

              </div>

            </div>


            {/* =================================================
                PRESCRIPTIONS CARD
            ================================================= */}

            <div className="prescriptions-card">


              <div className="prescriptions-card-header">

                <h3>
                  Patient Prescriptions
                </h3>

                <p>
                  View prescriptions and medication details of your patients.
                </p>

              </div>


              {/* SEARCH */}

              <div className="search-container">

                <div className="search-box">

                  <span className="search-icon">
                    🔍
                  </span>

                  <input
                    type="text"
                    placeholder="Search by patient, diagnosis or medicine..."
                    value={searchTerm}
                    onChange={(e) =>
                      setSearchTerm(
                        e.target.value
                      )
                    }
                  />

                </div>

              </div>


              {/* TABLE */}

              <div className="table-wrapper">

                <table className="prescriptions-table">

                  <thead>

                    <tr>

                      <th>
                        Patient
                      </th>

                      <th>
                        Prescription Date
                      </th>

                      <th>
                        Diagnosis
                      </th>

                      <th>
                        Medicines
                      </th>

                      <th>
                        Action
                      </th>

                    </tr>

                  </thead>


                  <tbody>

                    {filteredPrescriptions.length >
                    0 ? (

                      filteredPrescriptions.map(
                        (prescription) => (

                          <tr
                            key={
                              prescription.id
                            }
                          >


                            {/* PATIENT */}

                            <td>

                              <div className="patient-info">

                                <div className="patient-avatar">

                                  {prescription.patientName
                                    .charAt(0)
                                    .toUpperCase()}

                                </div>

                                <div className="patient-details">

                                  <strong>
                                    {
                                      prescription.patientName
                                    }
                                  </strong>

                                  <span>
                                    {
                                      prescription.age
                                    }{" "}
                                    years
                                    {" • "}
                                    {
                                      prescription.gender
                                    }
                                  </span>

                                </div>

                              </div>

                            </td>


                            {/* DATE */}

                            <td>

                              <span className="prescription-date">
                                {
                                  prescription.prescriptionDate
                                }
                              </span>

                            </td>


                            {/* DIAGNOSIS */}

                            <td>

                              <span className="diagnosis">
                                {
                                  prescription.diagnosis
                                }
                              </span>

                            </td>


                            {/* MEDICINES */}

                            <td>

                              <span className="medicine-count">

                                {
                                  prescription
                                    .medicines
                                    .length
                                }{" "}
                                Medicine
                                {
                                  prescription
                                    .medicines
                                    .length > 1
                                    ? "s"
                                    : ""
                                }

                              </span>

                            </td>


                            {/* ACTION */}

                            <td>

                              <button
                                className="view-button"
                                onClick={() =>
                                  setSelectedPrescription(
                                    prescription
                                  )
                                }
                              >
                                View Details
                              </button>

                            </td>

                          </tr>

                        )
                      )

                    ) : (

                      <tr>

                        <td
                          colSpan="5"
                          className="no-data"
                        >
                          No prescriptions found.
                        </td>

                      </tr>

                    )}

                  </tbody>

                </table>

              </div>

            </div>

          </section>

        </main>

      </div>


      {/* =====================================================
          VIEW PRESCRIPTION MODAL
      ===================================================== */}

      {selectedPrescription && (

        <div
          className="modal-overlay"
          onClick={() =>
            setSelectedPrescription(null)
          }
        >

          <div
            className="prescription-modal"
            onClick={(e) =>
              e.stopPropagation()
            }
          >


            {/* HEADER */}

            <div className="modal-header">

              <div>

                <h2>
                  Prescription Details
                </h2>

                <p>
                  Complete prescription information
                </p>

              </div>

              <button
                className="close-button"
                onClick={() =>
                  setSelectedPrescription(null)
                }
              >
                ×
              </button>

            </div>


            {/* PATIENT */}

            <div className="modal-patient">

              <div className="large-avatar">

                {selectedPrescription.patientName
                  .charAt(0)
                  .toUpperCase()}

              </div>

              <div>

                <h3>
                  {
                    selectedPrescription.patientName
                  }
                </h3>

                <p>
                  {selectedPrescription.age} years
                  {" • "}
                  {selectedPrescription.gender}
                </p>

              </div>

            </div>


            {/* BASIC DETAILS */}

            <div className="details-grid">

              <div className="detail-item">

                <span>
                  Prescription Date
                </span>

                <strong>
                  {
                    selectedPrescription.prescriptionDate
                  }
                </strong>

              </div>


              <div className="detail-item">

                <span>
                  Diagnosis
                </span>

                <strong>
                  {
                    selectedPrescription.diagnosis
                  }
                </strong>

              </div>


              <div className="detail-item">

                <span>
                  Doctor
                </span>

                <strong>
                  {doctor.name}
                </strong>

              </div>


              <div className="detail-item">

                <span>
                  Specialization
                </span>

                <strong>
                  {doctor.specialization}
                </strong>

              </div>

            </div>


            {/* MEDICINES */}

            <div className="medicine-section">

              <div className="medicine-section-title">
                Prescribed Medicines
              </div>


              <table className="medicine-table">

                <thead>

                  <tr>

                    <th>
                      Medicine
                    </th>

                    <th>
                      Dosage
                    </th>

                    <th>
                      Frequency
                    </th>

                    <th>
                      Duration
                    </th>

                  </tr>

                </thead>


                <tbody>

                  {selectedPrescription.medicines.map(
                    (medicine, index) => (

                      <tr key={index}>

                        <td className="medicine-name">
                          {medicine.name}
                        </td>

                        <td>
                          {medicine.dosage}
                        </td>

                        <td>
                          {medicine.frequency}
                        </td>

                        <td>
                          {medicine.duration}
                        </td>

                      </tr>

                    )
                  )}

                </tbody>

              </table>

            </div>


            {/* INSTRUCTIONS */}

            <div className="instructions-box">

              <span>
                Instructions
              </span>

              <p>
                {
                  selectedPrescription.instructions
                }
              </p>

            </div>


            {/* FOOTER */}

            <div className="modal-footer">

              <button
                className="close-modal-button"
                onClick={() =>
                  setSelectedPrescription(null)
                }
              >
                Close
              </button>

            </div>

          </div>

        </div>

      )}


      {/* =====================================================
          ADD PRESCRIPTION MODAL
      ===================================================== */}

      {showAddModal && (

        <div
          className="modal-overlay"
          onClick={() =>
            setShowAddModal(false)
          }
        >

          <div
            className="add-modal"
            onClick={(e) =>
              e.stopPropagation()
            }
          >


            {/* HEADER */}

            <div className="modal-header">

              <div>

                <h2>
                  Add Prescription
                </h2>

                <p>
                  Create a new prescription for a patient.
                </p>

              </div>

              <button
                className="close-button"
                onClick={() =>
                  setShowAddModal(false)
                }
              >
                ×
              </button>

            </div>


            {/* FORM */}

            <form
              onSubmit={
                handleAddPrescription
              }
            >

              <div className="form-grid">


                {/* PATIENT NAME */}

                <div className="form-group">

                  <label>
                    Patient Name
                    <span className="required">
                      *
                    </span>
                  </label>

                  <input
                    type="text"
                    name="patientName"
                    placeholder="Enter patient name"
                    value={
                      newPrescription.patientName
                    }
                    onChange={
                      handleInputChange
                    }
                  />

                </div>


                {/* AGE */}

                <div className="form-group">

                  <label>
                    Age
                    <span className="required">
                      *
                    </span>
                  </label>

                  <input
                    type="number"
                    name="age"
                    placeholder="Enter age"
                    min="0"
                    max="120"
                    value={
                      newPrescription.age
                    }
                    onChange={
                      handleInputChange
                    }
                  />

                </div>


                {/* GENDER */}

                <div className="form-group">

                  <label>
                    Gender
                    <span className="required">
                      *
                    </span>
                  </label>

                  <select
                    name="gender"
                    value={
                      newPrescription.gender
                    }
                    onChange={
                      handleInputChange
                    }
                  >

                    <option value="">
                      Select Gender
                    </option>

                    <option value="Male">
                      Male
                    </option>

                    <option value="Female">
                      Female
                    </option>

                    <option value="Other">
                      Other
                    </option>

                  </select>

                </div>


                {/* DIAGNOSIS */}

                <div className="form-group">

                  <label>
                    Diagnosis
                    <span className="required">
                      *
                    </span>
                  </label>

                  <input
                    type="text"
                    name="diagnosis"
                    placeholder="Enter diagnosis"
                    value={
                      newPrescription.diagnosis
                    }
                    onChange={
                      handleInputChange
                    }
                  />

                </div>


                {/* MEDICINE */}

                <div className="form-group">

                  <label>
                    Medicine Name
                    <span className="required">
                      *
                    </span>
                  </label>

                  <input
                    type="text"
                    name="medicineName"
                    placeholder="Enter medicine name"
                    value={
                      newPrescription.medicineName
                    }
                    onChange={
                      handleInputChange
                    }
                  />

                </div>


                {/* DOSAGE */}

                <div className="form-group">

                  <label>
                    Dosage
                    <span className="required">
                      *
                    </span>
                  </label>

                  <input
                    type="text"
                    name="dosage"
                    placeholder="Example: 500 mg"
                    value={
                      newPrescription.dosage
                    }
                    onChange={
                      handleInputChange
                    }
                  />

                </div>


                {/* FREQUENCY */}

                <div className="form-group">

                  <label>
                    Frequency
                    <span className="required">
                      *
                    </span>
                  </label>

                  <select
                    name="frequency"
                    value={
                      newPrescription.frequency
                    }
                    onChange={
                      handleInputChange
                    }
                  >

                    <option value="">
                      Select Frequency
                    </option>

                    <option value="Once a day">
                      Once a day
                    </option>

                    <option value="Twice a day">
                      Twice a day
                    </option>

                    <option value="Three times a day">
                      Three times a day
                    </option>

                    <option value="Before meals">
                      Before meals
                    </option>

                    <option value="After meals">
                      After meals
                    </option>

                    <option value="As required">
                      As required
                    </option>

                  </select>

                </div>


                {/* DURATION */}

                <div className="form-group">

                  <label>
                    Duration
                    <span className="required">
                      *
                    </span>
                  </label>

                  <input
                    type="text"
                    name="duration"
                    placeholder="Example: 7 days"
                    value={
                      newPrescription.duration
                    }
                    onChange={
                      handleInputChange
                    }
                  />

                </div>


                {/* INSTRUCTIONS */}

                <div className="form-group full-width">

                  <label>
                    Instructions
                  </label>

                  <textarea
                    name="instructions"
                    placeholder="Enter instructions for the patient..."
                    value={
                      newPrescription.instructions
                    }
                    onChange={
                      handleInputChange
                    }
                  />

                </div>

              </div>


              {/* BUTTONS */}

              <div className="form-buttons">

                <button
                  type="button"
                  className="cancel-button"
                  onClick={() =>
                    setShowAddModal(false)
                  }
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="submit-button"
                >
                  Add Prescription
                </button>

              </div>

            </form>

          </div>

        </div>

      )}

    </>
  );
}

export default DoctorPrescriptions;