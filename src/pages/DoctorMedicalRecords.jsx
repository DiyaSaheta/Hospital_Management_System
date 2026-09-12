import { useState } from "react";
import { useNavigate } from "react-router-dom";

function DoctorMedicalRecords() {
  const navigate = useNavigate();

  // =====================================================
  // ACTIVE MENU
  // =====================================================

  const [activeMenu, setActiveMenu] = useState("Medical Records");

  // =====================================================
  // DOCTOR INFORMATION
  // =====================================================

  const doctor = {
    name: "Dr. Ruchit",
    firstName: "Ruchit",
    specialization: "Cardiologist",
  };

  // =====================================================
  // MEDICAL RECORDS DATA
  // =====================================================

  const [records] = useState([
    {
      id: 1,
      patientName: "Aarav Patel",
      age: 28,
      gender: "Male",
      recordDate: "08 September 2026",
      diagnosis: "Hypertension",
      symptoms: "Headache, dizziness",
      treatment: "Lifestyle modification and medication",
      notes: "Regular blood pressure monitoring advised.",
    },
    {
      id: 2,
      patientName: "Diya Shah",
      age: 24,
      gender: "Female",
      recordDate: "06 September 2026",
      diagnosis: "Viral Fever",
      symptoms: "Fever, weakness, body ache",
      treatment: "Rest, fluids and prescribed medication",
      notes: "Follow-up recommended after 5 days.",
    },
    {
      id: 3,
      patientName: "Rohan Mehta",
      age: 35,
      gender: "Male",
      recordDate: "05 September 2026",
      diagnosis: "High Blood Pressure",
      symptoms: "Fatigue, mild headache",
      treatment: "Blood pressure medication",
      notes: "Patient advised to reduce salt intake.",
    },
    {
      id: 4,
      patientName: "Kavya Patel",
      age: 31,
      gender: "Female",
      recordDate: "03 September 2026",
      diagnosis: "Migraine",
      symptoms: "Severe headache, nausea",
      treatment: "Prescribed migraine medication",
      notes: "Avoid bright light and maintain proper sleep.",
    },
    {
      id: 5,
      patientName: "Manav Joshi",
      age: 42,
      gender: "Male",
      recordDate: "01 September 2026",
      diagnosis: "Type 2 Diabetes",
      symptoms: "Increased thirst, fatigue",
      treatment: "Medication and dietary management",
      notes: "Regular blood sugar monitoring required.",
    },
    {
      id: 6,
      patientName: "Krisha Desai",
      age: 26,
      gender: "Female",
      recordDate: "29 August 2026",
      diagnosis: "General Consultation",
      symptoms: "General weakness",
      treatment: "Dietary and lifestyle advice",
      notes: "No major complications observed.",
    },
  ]);

  // =====================================================
  // SEARCH
  // =====================================================

  const [searchTerm, setSearchTerm] = useState("");

  // =====================================================
  // SELECTED RECORD
  // =====================================================

  const [selectedRecord, setSelectedRecord] = useState(null);

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
  // FILTER RECORDS
  // =====================================================

  const filteredRecords = records.filter((record) => {
    const search = searchTerm.toLowerCase();

    return (
      record.patientName.toLowerCase().includes(search) ||
      record.diagnosis.toLowerCase().includes(search) ||
      record.symptoms.toLowerCase().includes(search) ||
      record.treatment.toLowerCase().includes(search)
    );
  });

  // =====================================================
  // STATISTICS
  // =====================================================

  const totalRecords = records.length;

  const currentMonthRecords = records.filter((record) =>
    record.recordDate.includes("September")
  ).length;

  const uniquePatients = new Set(
    records.map((record) => record.patientName)
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
           SIDEBAR MENU
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
           MAIN AREA
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

          border: 1px solid #e5eaf0;

          border-radius: 9px;

          background: white;

          display: flex;
          align-items: center;
          justify-content: center;

          position: relative;

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

        .medical-records-content {
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

        .header-info {
          padding: 12px 18px;

          background: #ffffff;

          border: 1px solid #e5e7eb;

          border-radius: 10px;

          text-align: right;
        }

        .header-info span {
          display: block;

          margin-bottom: 4px;

          color: #7b8492;

          font-size: 11px;
        }

        .header-info strong {
          color: #172033;

          font-size: 13px;
        }


        /* =====================================================
           STAT CARDS
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

        .records-icon {
          background: #e8f8f6;
        }

        .month-icon {
          background: #e9efff;
        }

        .patients-icon {
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
           RECORDS CARD
        ===================================================== */

        .records-card {
          background: white;

          border: 1px solid #e5e7eb;

          border-radius: 12px;

          overflow: hidden;

          box-shadow:
            0 2px 8px
            rgba(0, 0, 0, 0.03);
        }

        .records-card-header {
          padding: 22px 24px;

          border-bottom: 1px solid #eef1f5;
        }

        .records-card-header h3 {
          margin: 0 0 5px;

          color: #172033;

          font-size: 18px;
        }

        .records-card-header p {
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

        .records-table {
          width: 100%;

          border-collapse: collapse;
        }

        .records-table th {
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

        .records-table td {
          padding: 15px 18px;

          border-bottom: 1px solid #eef1f5;

          color: #4c5563;

          font-size: 12px;

          white-space: nowrap;
        }

        .records-table tbody tr:hover {
          background: #fafdfd;
        }


        /* =====================================================
           PATIENT INFO
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
           DATE
        ===================================================== */

        .record-date {
          color: #697386;
        }


        /* =====================================================
           VIEW BUTTON
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
           MODAL
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

        .record-modal {
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
           MODAL HEADER
        ===================================================== */

        .modal-header {
          display: flex;

          justify-content: space-between;
          align-items: flex-start;

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
           RECORD INFORMATION
        ===================================================== */

        .details-grid {
          display: grid;

          grid-template-columns:
            1fr 1fr;

          gap: 14px;

          margin-bottom: 18px;
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
           NOTES / TREATMENT
        ===================================================== */

        .full-detail {
          padding: 15px;

          margin-bottom: 12px;

          border: 1px solid #e7e9ed;

          border-radius: 8px;
        }

        .full-detail span {
          display: block;

          margin-bottom: 7px;

          color: #7b828c;

          font-size: 10px;
        }

        .full-detail p {
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

          padding-top: 8px;
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
           RESPONSIVE
        ===================================================== */

        @media (max-width: 900px) {

          .doctor-sidebar {
            width: 210px;
          }

          .doctor-main {
            width: calc(100% - 210px);

            margin-left: 210px;
          }

          .medical-records-content {
            padding: 25px 20px 40px;
          }

          .doctor-topbar {
            padding: 0 20px;
          }

          .profile-info {
            display: none;
          }

        }


        @media (max-width: 700px) {

          .doctor-sidebar {
            width: 70px;
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

          .doctor-main {
            width: calc(100% - 70px);

            margin-left: 70px;
          }

          .doctor-topbar {
            height: 75px;
          }

          .topbar-title h1 {
            font-size: 18px;
          }

          .topbar-title p {
            display: none;
          }

          .medical-records-content {
            padding: 20px 15px 35px;
          }

          .page-header {
            flex-direction: column;

            align-items: flex-start;

            gap: 15px;
          }

          .header-info {
            text-align: left;
          }

          .stats-container {
            grid-template-columns:
              repeat(2, 1fr);

            gap: 10px;
          }

        }


        @media (max-width: 500px) {

          .stats-container {
            grid-template-columns: 1fr;
          }

          .details-grid {
            grid-template-columns: 1fr;
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
          PAGE
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
            MAIN
        ===================================================== */}

        <main className="doctor-main">


          {/* TOPBAR */}

          <header className="doctor-topbar">

            <div className="topbar-title">

              <h1>
                Medical Records
              </h1>

              <p>
                View and manage your patients' medical records.
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


              {/* Profile */}

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


          {/* CONTENT */}

          <section className="medical-records-content">


            {/* PAGE HEADER */}

            <div className="page-header">

              <div>

                <h2>
                  Medical Records
                </h2>

                <p>
                  Access diagnosis, treatment and other medical information.
                </p>

              </div>


              <div className="header-info">

                <span>
                  Total Medical Records
                </span>

                <strong>
                  {totalRecords} Records
                </strong>

              </div>

            </div>


            {/* =================================================
                STATISTICS
            ================================================= */}

            <div className="stats-container">


              <div className="stat-card">

                <div className="stat-icon records-icon">
                  📋
                </div>

                <div>

                  <h3>
                    {totalRecords}
                  </h3>

                  <p>
                    Total Records
                  </p>

                </div>

              </div>


              <div className="stat-card">

                <div className="stat-icon month-icon">
                  📅
                </div>

                <div>

                  <h3>
                    {currentMonthRecords}
                  </h3>

                  <p>
                    This Month
                  </p>

                </div>

              </div>


              <div className="stat-card">

                <div className="stat-icon patients-icon">
                  👥
                </div>

                <div>

                  <h3>
                    {uniquePatients}
                  </h3>

                  <p>
                    Patients With Records
                  </p>

                </div>

              </div>


            </div>


            {/* =================================================
                RECORDS LIST
            ================================================= */}

            <div className="records-card">


              <div className="records-card-header">

                <h3>
                  Patient Medical Records
                </h3>

                <p>
                  Medical history and treatment information of your patients.
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
                    placeholder="Search by patient name, diagnosis, symptoms or treatment..."
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

                <table className="records-table">

                  <thead>

                    <tr>

                      <th>
                        Patient
                      </th>

                      <th>
                        Record Date
                      </th>

                      <th>
                        Diagnosis
                      </th>

                      <th>
                        Symptoms
                      </th>

                      <th>
                        Treatment
                      </th>

                      <th>
                        Action
                      </th>

                    </tr>

                  </thead>


                  <tbody>

                    {filteredRecords.length > 0 ? (

                      filteredRecords.map(
                        (record) => (

                          <tr
                            key={record.id}
                          >


                            {/* PATIENT */}

                            <td>

                              <div className="patient-info">

                                <div className="patient-avatar">

                                  {record.patientName
                                    .charAt(0)
                                    .toUpperCase()}

                                </div>

                                <div className="patient-details">

                                  <strong>
                                    {record.patientName}
                                  </strong>

                                  <span>
                                    {record.age} years
                                    {" • "}
                                    {record.gender}
                                  </span>

                                </div>

                              </div>

                            </td>


                            {/* DATE */}

                            <td>

                              <span className="record-date">
                                {record.recordDate}
                              </span>

                            </td>


                            {/* DIAGNOSIS */}

                            <td>

                              <span className="diagnosis">
                                {record.diagnosis}
                              </span>

                            </td>


                            {/* SYMPTOMS */}

                            <td>
                              {record.symptoms}
                            </td>


                            {/* TREATMENT */}

                            <td>
                              {record.treatment}
                            </td>


                            {/* ACTION */}

                            <td>

                              <button
                                className="view-button"
                                onClick={() =>
                                  setSelectedRecord(
                                    record
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
                          colSpan="6"
                          className="no-data"
                        >
                          No medical records found.
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
          RECORD DETAILS MODAL
      ===================================================== */}

      {selectedRecord && (

        <div
          className="modal-overlay"
          onClick={() =>
            setSelectedRecord(null)
          }
        >

          <div
            className="record-modal"
            onClick={(e) =>
              e.stopPropagation()
            }
          >


            {/* HEADER */}

            <div className="modal-header">

              <div>

                <h2>
                  Medical Record Details
                </h2>

                <p>
                  Complete medical information
                </p>

              </div>

              <button
                className="close-button"
                onClick={() =>
                  setSelectedRecord(null)
                }
              >
                ×
              </button>

            </div>


            {/* PATIENT */}

            <div className="modal-patient">

              <div className="large-avatar">

                {selectedRecord.patientName
                  .charAt(0)
                  .toUpperCase()}

              </div>

              <div>

                <h3>
                  {selectedRecord.patientName}
                </h3>

                <p>
                  {selectedRecord.age} years
                  {" • "}
                  {selectedRecord.gender}
                </p>

              </div>

            </div>


            {/* BASIC DETAILS */}

            <div className="details-grid">


              <div className="detail-item">

                <span>
                  Record Date
                </span>

                <strong>
                  {selectedRecord.recordDate}
                </strong>

              </div>


              <div className="detail-item">

                <span>
                  Diagnosis
                </span>

                <strong>
                  {selectedRecord.diagnosis}
                </strong>

              </div>


              <div className="detail-item">

                <span>
                  Patient Age
                </span>

                <strong>
                  {selectedRecord.age} Years
                </strong>

              </div>


              <div className="detail-item">

                <span>
                  Gender
                </span>

                <strong>
                  {selectedRecord.gender}
                </strong>

              </div>


            </div>


            {/* SYMPTOMS */}

            <div className="full-detail">

              <span>
                Symptoms
              </span>

              <p>
                {selectedRecord.symptoms}
              </p>

            </div>


            {/* TREATMENT */}

            <div className="full-detail">

              <span>
                Treatment
              </span>

              <p>
                {selectedRecord.treatment}
              </p>

            </div>


            {/* NOTES */}

            <div className="full-detail">

              <span>
                Doctor's Notes
              </span>

              <p>
                {selectedRecord.notes}
              </p>

            </div>


            {/* FOOTER */}

            <div className="modal-footer">

              <button
                className="close-modal-button"
                onClick={() =>
                  setSelectedRecord(null)
                }
              >
                Close
              </button>

            </div>


          </div>

        </div>

      )}

    </>
  );
}
export default DoctorMedicalRecords;