import { useState } from "react";
import { useNavigate } from "react-router-dom";

function PatientMedicalRecords() {
  const navigate = useNavigate();

  const [activeMenu, setActiveMenu] = useState("Medical Records");
  const [searchTerm, setSearchTerm] = useState("");
  const [recordType, setRecordType] = useState("All");
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  // =====================================================
  // PATIENT DATA
  // =====================================================

  const patient = {
    name: "Diya Saheta",
    firstName: "Diya",
    patientId: "PAT-2026-001",
  };

  // =====================================================
  // MEDICAL RECORDS DATA
  // Later this data will come from MongoDB
  // =====================================================

  const records = [
    {
      id: "REC-001",
      date: "15 Aug 2026",
      doctor: "Dr. Rajesh Mehta",
      specialization: "Cardiologist",
      type: "Consultation",
      diagnosis: "Regular Cardiac Checkup",
      description:
        "Routine cardiac consultation and health assessment.",
      status: "Completed",
      icon: "🩺",
    },

    {
      id: "REC-002",
      date: "10 Aug 2026",
      doctor: "Dr. Priya Sharma",
      specialization: "General Physician",
      type: "Lab Report",
      diagnosis: "Blood Test",
      description:
        "Complete blood count and routine blood examination.",
      status: "Available",
      icon: "🧪",
    },

    {
      id: "REC-003",
      date: "05 Aug 2026",
      doctor: "Dr. Amit Patel",
      specialization: "Dermatologist",
      type: "Consultation",
      diagnosis: "Skin Allergy",
      description:
        "Consultation regarding skin irritation and allergy symptoms.",
      status: "Completed",
      icon: "👨‍⚕️",
    },

    {
      id: "REC-004",
      date: "28 Jul 2026",
      doctor: "Dr. Neha Shah",
      specialization: "Dentist",
      type: "Dental Report",
      diagnosis: "Dental Examination",
      description:
        "Routine dental examination and oral health assessment.",
      status: "Completed",
      icon: "🦷",
    },

    {
      id: "REC-005",
      date: "20 Jul 2026",
      doctor: "Dr. Karan Joshi",
      specialization: "Orthopedic",
      type: "X-Ray",
      diagnosis: "Knee Examination",
      description:
        "X-ray examination of the knee joint.",
      status: "Available",
      icon: "🦴",
    },

    {
      id: "REC-006",
      date: "12 Jul 2026",
      doctor: "Dr. Anjali Desai",
      specialization: "Pediatrician",
      type: "Consultation",
      diagnosis: "General Health Checkup",
      description:
        "General health consultation and routine examination.",
      status: "Completed",
      icon: "👩‍⚕️",
    },

    {
      id: "REC-007",
      date: "02 Jul 2026",
      doctor: "Dr. Rajesh Mehta",
      specialization: "Cardiologist",
      type: "ECG Report",
      diagnosis: "ECG Examination",
      description:
        "Electrocardiogram examination and cardiac assessment.",
      status: "Available",
      icon: "❤️",
    },

    {
      id: "REC-008",
      date: "25 Jun 2026",
      doctor: "Dr. Priya Sharma",
      specialization: "General Physician",
      type: "Prescription",
      diagnosis: "Routine Medication",
      description:
        "Prescription issued after general health consultation.",
      status: "Completed",
      icon: "💊",
    },
  ];

  // =====================================================
  // RECORD TYPES
  // =====================================================

  const recordTypes = [
    "All",
    "Consultation",
    "Lab Report",
    "Dental Report",
    "X-Ray",
    "ECG Report",
    "Prescription",
  ];

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
      icon: "🗓️",
    },
    {
      name: "Doctors",
      icon: "🩺",
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
      navigate("/patient-dashboard");
    }
    if (menuName === "Appointments") {
      navigate("/patient-appointments");
    }
    if (menuName === "Doctors") {
      navigate("/patient-doctors");
    }
    if (menuName === "Medical Records") {
      navigate("/patient-medical-records");
    }
    if (menuName === "Prescriptions") {
      navigate("/patient-prescriptions");
    }
    if (menuName === "Profile") {
      navigate("/patient-profile");
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
    const matchesSearch =
      record.doctor
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      record.diagnosis
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      record.type
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      record.specialization
        .toLowerCase()
        .includes(searchTerm.toLowerCase());

    const matchesType =
      recordType === "All" ||
      record.type === recordType;

    return matchesSearch && matchesType;
  });

  // =====================================================
  // VIEW RECORD DETAILS
  // =====================================================

  const handleViewDetails = (record) => {
    alert(
      `Medical Record Details\n\n` +
      `Record ID: ${record.id}\n` +
      `Date: ${record.date}\n` +
      `Doctor: ${record.doctor}\n` +
      `Specialization: ${record.specialization}\n` +
      `Record Type: ${record.type}\n` +
      `Diagnosis: ${record.diagnosis}\n` +
      `Status: ${record.status}\n\n` +
      `${record.description}`
    );
  };

  // =====================================================
  // DOWNLOAD RECORD
  // =====================================================

  const handleDownload = (record) => {
    alert(
      `Download requested for ${record.id}\n\n` +
      `${record.type} - ${record.date}`
    );
  };

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

          font-family:
            Arial,
            Helvetica,
            sans-serif;

          background: #f5f8fc;
        }

        .medical-records-page {
          width: 100%;
          min-height: 100vh;

          display: flex;

          background: #f5f8fc;
        }


        /* =====================================================
           SIDEBAR
        ===================================================== */

        .patient-sidebar {
          width: 288px;
          min-height: 100vh;

          position: fixed;
          left: 0;
          top: 0;
          bottom: 0;

          display: flex;
          flex-direction: column;

          background: #ffffff;

          border-right:
            1px solid #e4e9ef;

          z-index: 100;
        }


        /* =====================================================
           BRAND
        ===================================================== */

        .sidebar-brand {
          height: 99px;

          padding: 0 23px;

          display: flex;
          align-items: center;

          gap: 14px;

          border-bottom:
            1px solid #eef1f5;
        }

        .brand-icon {
          width: 49px;
          height: 49px;

          border-radius: 12px;

          display: flex;
          align-items: center;
          justify-content: center;

          background: #0f8078;

          color: white;

          font-size: 28px;
          font-weight: bold;
        }

        .brand-text h2 {
          margin: 0;

          color: #111b2d;

          font-size: 21px;
          font-weight: 700;
        }

        .brand-text p {
          margin: 3px 0 0;

          color: #7c8799;

          font-size: 11px;
        }


        /* =====================================================
           SIDEBAR MENU
        ===================================================== */

        .sidebar-menu {
          flex: 1;

          padding: 28px 12px;
        }

        .menu-title {
          margin:
            0 14px 14px;

          color: #9aa4b3;

          font-size: 11px;
          font-weight: 700;

          text-transform: uppercase;
        }

        .menu-item {
          width: 100%;
          height: 54px;

          margin-bottom: 5px;

          padding: 0 19px;

          display: flex;
          align-items: center;

          gap: 18px;

          border: none;
          border-radius: 10px;

          background: transparent;

          color: #66748a;

          font-size: 14px;

          cursor: pointer;

          text-align: left;

          transition: all 0.2s ease;
        }

        .menu-item:hover {
          background: #f1faf9;

          color: #087c75;
        }

        .menu-item.active {
          background: #e5f7f5;

          color: #087c75;

          font-weight: 600;
        }

        .menu-icon {
          width: 22px;

          display: flex;
          align-items: center;
          justify-content: center;

          font-size: 18px;
        }


        /* =====================================================
           LOGOUT
        ===================================================== */

        .sidebar-bottom {
          padding: 20px 12px;

          border-top:
            1px solid #eef1f5;
        }

        .logout-button {
          width: 100%;
          height: 50px;

          display: flex;
          align-items: center;

          gap: 18px;

          padding: 0 19px;

          border: none;
          border-radius: 10px;

          background: transparent;

          color: #ef2029;

          font-size: 14px;

          cursor: pointer;
        }

        .logout-button:hover {
          background: #fff2f2;
        }


        /* =====================================================
           MAIN
        ===================================================== */

        .medical-records-main {
          width: calc(100% - 288px);

          margin-left: 288px;

          min-height: 100vh;
        }


        /* =====================================================
           TOPBAR
        ===================================================== */

        .topbar {
          height: 99px;

          padding: 0 40px;

          display: flex;
          align-items: center;
          justify-content: space-between;

          background: white;

          border-bottom:
            1px solid #e4e9ef;
        }

        .topbar-left h1 {
          margin: 0;

          color: #111b2d;

          font-size: 26px;
        }

        .topbar-left p {
          margin: 6px 0 0;

          color: #8490a3;

          font-size: 14px;
        }

        .topbar-right {
          display: flex;
          align-items: center;

          gap: 22px;
        }


        /* =====================================================
           NOTIFICATION
        ===================================================== */

        .notification-button {
          width: 48px;
          height: 48px;

          position: relative;

          display: flex;
          align-items: center;
          justify-content: center;

          border:
            1px solid #e2e8ef;

          border-radius: 11px;

          background: white;

          font-size: 21px;

          cursor: pointer;
        }

        .notification-dot {
          position: absolute;

          width: 8px;
          height: 8px;

          top: 10px;
          right: 10px;

          border-radius: 50%;

          background: #ef4444;

          border:
            2px solid white;
        }


        /* =====================================================
           PROFILE
        ===================================================== */

        .profile-wrapper {
          position: relative;
        }

        .profile-button {
          display: flex;
          align-items: center;

          gap: 12px;

          border: none;

          background: transparent;

          cursor: pointer;
        }

        .profile-avatar {
          width: 48px;
          height: 48px;

          display: flex;
          align-items: center;
          justify-content: center;

          border-radius: 50%;

          background: #d9f5f2;

          color: #087c75;

          font-size: 15px;
          font-weight: 700;
        }

        .profile-info {
          text-align: left;
        }

        .profile-info strong {
          display: block;

          color: #263147;

          font-size: 13px;
        }

        .profile-info span {
          display: block;

          margin-top: 3px;

          color: #8994a5;

          font-size: 11px;
        }

        .profile-arrow {
          color: #263147;

          font-size: 13px;
        }


        /* =====================================================
           PROFILE DROPDOWN
        ===================================================== */

        .profile-dropdown {
          position: absolute;

          top: 58px;
          right: 0;

          width: 180px;

          padding: 8px;

          background: white;

          border:
            1px solid #e5eaf0;

          border-radius: 10px;

          box-shadow:
            0 12px 30px
            rgba(15, 23, 42, 0.12);

          z-index: 300;
        }

        .profile-dropdown button {
          width: 100%;
          height: 38px;

          padding: 0 12px;

          border: none;
          border-radius: 7px;

          background: transparent;

          color: #596579;

          text-align: left;

          font-size: 12px;

          cursor: pointer;
        }

        .profile-dropdown button:hover {
          background: #f4f8fa;

          color: #087c75;
        }


        /* =====================================================
           CONTENT
        ===================================================== */

        .medical-records-content {
          padding: 32px 40px 50px;
        }


        /* =====================================================
           PAGE HEADER
        ===================================================== */

        .page-header {
          margin-bottom: 25px;
        }

        .page-heading h2 {
          margin: 0;

          color: #111b2d;

          font-size: 22px;
        }

        .page-heading p {
          margin: 7px 0 0;

          color: #8994a5;

          font-size: 13px;
        }


        /* =====================================================
           SUMMARY CARDS
        ===================================================== */

        .summary-grid {
          display: grid;

          grid-template-columns:
            repeat(3, 1fr);

          gap: 18px;

          margin-bottom: 25px;
        }

        .summary-card {
          min-height: 120px;

          padding: 20px;

          display: flex;
          align-items: center;

          gap: 15px;

          background: white;

          border:
            1px solid #e3e9ef;

          border-radius: 11px;
        }

        .summary-icon {
          width: 50px;
          height: 50px;

          flex-shrink: 0;

          display: flex;
          align-items: center;
          justify-content: center;

          border-radius: 11px;

          background: #e5f7f5;

          font-size: 23px;
        }

        .summary-info strong {
          display: block;

          color: #172236;

          font-size: 25px;
        }

        .summary-info span {
          display: block;

          margin-top: 4px;

          color: #435068;

          font-size: 12px;
          font-weight: 700;
        }

        .summary-info small {
          display: block;

          margin-top: 3px;

          color: #97a1b0;

          font-size: 9px;
        }


        /* =====================================================
           SEARCH FILTER
        ===================================================== */

        .search-filter-card {
          padding: 20px;

          margin-bottom: 20px;

          display: flex;
          align-items: center;

          gap: 15px;

          background: white;

          border:
            1px solid #e3e9ef;

          border-radius: 11px;
        }

        .search-box {
          flex: 1;

          position: relative;
        }

        .search-icon {
          position: absolute;

          left: 14px;
          top: 50%;

          transform:
            translateY(-50%);

          font-size: 15px;
        }

        .search-input {
          width: 100%;
          height: 44px;

          padding:
            0 15px 0 42px;

          border:
            1px solid #dce3eb;

          border-radius: 7px;

          outline: none;

          color: #334155;

          font-family: inherit;

          font-size: 11px;
        }

        .search-input:focus {
          border-color: #0f8078;

          box-shadow:
            0 0 0 3px
            rgba(15, 128, 120, 0.08);
        }

        .search-input::placeholder {
          color: #a4adba;
        }

        .filter-select {
          width: 220px;
          height: 44px;

          padding: 0 12px;

          border:
            1px solid #dce3eb;

          border-radius: 7px;

          outline: none;

          background: white;

          color: #596579;

          font-size: 11px;

          cursor: pointer;
        }

        .filter-select:focus {
          border-color: #0f8078;
        }


        /* =====================================================
           RECORDS HEADER
        ===================================================== */

        .records-header {
          margin-bottom: 14px;

          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .records-header h3 {
          margin: 0;

          color: #172236;

          font-size: 16px;
        }

        .records-count {
          color: #8994a5;

          font-size: 10px;
        }


        /* =====================================================
           RECORDS CONTAINER
        ===================================================== */

        .records-container {
          background: white;

          border:
            1px solid #e3e9ef;

          border-radius: 11px;

          overflow: hidden;
        }


        /* =====================================================
           RECORD ITEM
        ===================================================== */

        .record-item {
          min-height: 150px;

          padding: 22px 25px;

          display: flex;
          align-items: center;

          gap: 18px;

          border-bottom:
            1px solid #edf0f4;
        }

        .record-item:last-child {
          border-bottom: none;
        }

        .record-icon {
          width: 58px;
          height: 58px;

          flex-shrink: 0;

          display: flex;
          align-items: center;
          justify-content: center;

          border-radius: 12px;

          background: #e5f7f5;

          font-size: 26px;
        }

        .record-main {
          flex: 1;

          min-width: 0;
        }

        .record-top {
          display: flex;
          align-items: center;

          gap: 10px;

          margin-bottom: 5px;
        }

        .record-top h3 {
          margin: 0;

          color: #1d293b;

          font-size: 14px;
        }

        .record-type {
          padding: 4px 8px;

          border-radius: 20px;

          background: #edf8f6;

          color: #087c75;

          font-size: 8px;
          font-weight: 700;
        }

        .record-doctor {
          margin: 0;

          color: #66748a;

          font-size: 10px;
        }

        .record-description {
          margin: 7px 0 0;

          color: #98a2b1;

          font-size: 9px;
        }

        .record-date {
          margin-top: 8px;

          color: #087c75;

          font-size: 9px;
          font-weight: 600;
        }


        /* =====================================================
           STATUS
        ===================================================== */

        .record-status {
          padding: 5px 9px;

          border-radius: 20px;

          background: #eaf9f2;

          color: #16945b;

          font-size: 8px;
          font-weight: 700;
        }


        /* =====================================================
           RECORD ACTIONS
        ===================================================== */

        .record-actions {
          width: 150px;

          display: flex;
          flex-direction: column;

          gap: 8px;
        }

        .view-button,
        .download-button {
          width: 100%;
          height: 36px;

          border-radius: 7px;

          font-size: 9px;
          font-weight: 700;

          cursor: pointer;

          transition: 0.2s ease;
        }

        .view-button {
          border:
            1px solid #0f8078;

          background: white;

          color: #087c75;
        }

        .view-button:hover {
          background: #effaf8;
        }

        .download-button {
          border: none;

          background: #0f8078;

          color: white;
        }

        .download-button:hover {
          background: #0b6f68;
        }


        /* =====================================================
           NO RESULTS
        ===================================================== */

        .no-results {
          padding: 60px 20px;

          text-align: center;
        }

        .no-results-icon {
          font-size: 38px;
        }

        .no-results h3 {
          margin: 14px 0 6px;

          color: #263147;

          font-size: 16px;
        }

        .no-results p {
          margin: 0;

          color: #8994a5;

          font-size: 11px;
        }


        /* =====================================================
           RESPONSIVE
        ===================================================== */

        @media (max-width: 1100px) {

          .patient-sidebar {
            width: 240px;
          }

          .medical-records-main {
            width: calc(100% - 240px);

            margin-left: 240px;
          }

          .medical-records-content {
            padding:
              30px 25px 40px;
          }

          .topbar {
            padding: 0 25px;
          }

          .summary-grid {
            grid-template-columns:
              repeat(3, 1fr);
          }

        }


        @media (max-width: 950px) {

          .summary-grid {
            grid-template-columns:
              1fr 1fr;
          }

          .record-item {
            align-items: flex-start;
          }

        }


        @media (max-width: 900px) {

          .patient-sidebar {
            width: 75px;
          }

          .brand-text,
          .menu-title,
          .menu-item span:not(.menu-icon),
          .logout-button span:not(.menu-icon) {
            display: none;
          }

          .sidebar-brand {
            justify-content: center;

            padding: 0;
          }

          .sidebar-menu {
            padding:
              25px 10px;
          }

          .menu-item,
          .logout-button {
            justify-content: center;

            padding: 0;
          }

          .medical-records-main {
            width: calc(100% - 75px);

            margin-left: 75px;
          }

          .profile-info,
          .profile-arrow {
            display: none;
          }

          .search-filter-card {
            flex-direction: column;

            align-items: stretch;
          }

          .filter-select {
            width: 100%;
          }

        }


        @media (max-width: 700px) {

          .summary-grid {
            grid-template-columns: 1fr;
          }

          .record-item {
            flex-direction: column;
          }

          .record-icon {
            align-self: flex-start;
          }

          .record-actions {
            width: 100%;

            flex-direction: row;
          }

          .record-status {
            align-self: flex-start;
          }

        }


        @media (max-width: 650px) {

          .topbar {
            height: 80px;

            padding: 0 15px;
          }

          .topbar-left h1 {
            font-size: 20px;
          }

          .topbar-left p {
            display: none;
          }

          .topbar-right {
            gap: 8px;
          }

          .notification-button {
            width: 38px;
            height: 38px;
          }

          .profile-avatar {
            width: 38px;
            height: 38px;
          }

          .medical-records-content {
            padding:
              22px 15px 35px;
          }

        }


        @media (max-width: 450px) {

          .patient-sidebar {
            width: 62px;
          }

          .medical-records-main {
            width: calc(100% - 62px);

            margin-left: 62px;
          }

          .sidebar-brand {
            height: 80px;
          }

          .brand-icon {
            width: 40px;
            height: 40px;

            font-size: 23px;
          }

        }

      `}</style>


      {/* =====================================================
          PAGE
      ===================================================== */}

      <div className="medical-records-page">


        {/* =====================================================
            SIDEBAR
        ===================================================== */}

        <aside className="patient-sidebar">


          {/* BRAND */}

          <div className="sidebar-brand">

            <div className="brand-icon">
              +
            </div>

            <div className="brand-text">

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

        <main className="medical-records-main">


          {/* =====================================================
              TOPBAR
          ===================================================== */}

          <header className="topbar">

            <div className="topbar-left">

              <h1>
                Medical Records
              </h1>

              <p>
                View and manage your medical history and health records.
              </p>

            </div>


            <div className="topbar-right">


              {/* NOTIFICATION */}

              <button className="notification-button">

                🔔

                <span className="notification-dot"></span>

              </button>


              {/* PROFILE */}

              <div className="profile-wrapper">

                <button
                  className="profile-button"
                  onClick={() =>
                    setShowProfileMenu(
                      !showProfileMenu
                    )
                  }
                >

                  <div className="profile-avatar">
                    {patient.firstName.charAt(0)}
                  </div>

                  <div className="profile-info">

                    <strong>
                      {patient.name}
                    </strong>

                    <span>
                      Patient
                    </span>

                  </div>

                  <span className="profile-arrow">
                    ▾
                  </span>

                </button>


                {showProfileMenu && (

                  <div className="profile-dropdown">

                    <button>
                      👤 &nbsp; My Profile
                    </button>

                    <button
                      onClick={handleLogout}
                    >
                      ↪ &nbsp; Logout
                    </button>

                  </div>

                )}

              </div>

            </div>

          </header>


          {/* =====================================================
              CONTENT
          ===================================================== */}

          <section className="medical-records-content">


            {/* PAGE HEADING */}

            <div className="page-header">

              <div className="page-heading">

                <h2>
                  My Medical Records
                </h2>

                <p>
                  Access your consultations, reports, prescriptions and other medical information.
                </p>

              </div>

            </div>


            {/* =================================================
                SUMMARY CARDS
            ================================================= */}

            <div className="summary-grid">


              {/* TOTAL RECORDS */}

              <div className="summary-card">

                <div className="summary-icon">
                  📋
                </div>

                <div className="summary-info">

                  <strong>
                    {records.length}
                  </strong>

                  <span>
                    Total Records
                  </span>

                  <small>
                    Medical records available
                  </small>

                </div>

              </div>


              {/* CONSULTATIONS */}

              <div className="summary-card">

                <div className="summary-icon">
                  🩺
                </div>

                <div className="summary-info">

                  <strong>
                    {
                      records.filter(
                        (record) =>
                          record.type ===
                          "Consultation"
                      ).length
                    }
                  </strong>

                  <span>
                    Consultations
                  </span>

                  <small>
                    Doctor consultations
                  </small>

                </div>

              </div>


              {/* REPORTS */}

              <div className="summary-card">

                <div className="summary-icon">
                  🧪
                </div>

                <div className="summary-info">

                  <strong>
                    {
                      records.filter(
                        (record) =>
                          record.type !==
                          "Consultation" &&
                          record.type !==
                          "Prescription"
                      ).length
                    }
                  </strong>

                  <span>
                    Reports
                  </span>

                  <small>
                    Tests and health reports
                  </small>

                </div>

              </div>

            </div>


            {/* =================================================
                SEARCH AND FILTER
            ================================================= */}

            <div className="search-filter-card">


              {/* SEARCH */}

              <div className="search-box">

                <span className="search-icon">
                  🔍
                </span>

                <input
                  type="text"
                  className="search-input"
                  placeholder="Search by doctor, diagnosis, record type..."
                  value={searchTerm}
                  onChange={(e) =>
                    setSearchTerm(e.target.value)
                  }
                />

              </div>


              {/* FILTER */}

              <select
                className="filter-select"
                value={recordType}
                onChange={(e) =>
                  setRecordType(e.target.value)
                }
              >

                {recordTypes.map((type) => (

                  <option
                    key={type}
                    value={type}
                  >
                    {type === "All"
                      ? "All Record Types"
                      : type}
                  </option>

                ))}

              </select>

            </div>


            {/* =================================================
                RECORDS HEADER
            ================================================= */}

            <div className="records-header">

              <h3>
                Medical History
              </h3>

              <span className="records-count">
                {filteredRecords.length} records found
              </span>

            </div>


            {/* =================================================
                RECORDS
            ================================================= */}

            <div className="records-container">

              {filteredRecords.length > 0 ? (

                filteredRecords.map((record) => (

                  <div
                    className="record-item"
                    key={record.id}
                  >


                    {/* ICON */}

                    <div className="record-icon">
                      {record.icon}
                    </div>


                    {/* MAIN INFORMATION */}

                    <div className="record-main">


                      <div className="record-top">

                        <h3>
                          {record.diagnosis}
                        </h3>

                        <span className="record-type">
                          {record.type}
                        </span>

                      </div>


                      <p className="record-doctor">

                        {record.doctor}

                        {" · "}

                        {record.specialization}

                      </p>


                      <p className="record-description">
                        {record.description}
                      </p>


                      <div className="record-date">
                        📅 {record.date}
                      </div>

                    </div>


                    {/* STATUS */}

                    <span className="record-status">
                      {record.status}
                    </span>


                    {/* ACTIONS */}

                    <div className="record-actions">

                      <button
                        className="view-button"
                        onClick={() =>
                          handleViewDetails(record)
                        }
                      >
                        View Details
                      </button>

                      <button
                        className="download-button"
                        onClick={() =>
                          handleDownload(record)
                        }
                      >
                        ↓ &nbsp; Download
                      </button>

                    </div>

                  </div>

                ))

              ) : (

                <div className="no-results">

                  <div className="no-results-icon">
                    🔍
                  </div>

                  <h3>
                    No medical records found
                  </h3>

                  <p>
                    Try changing your search or record type filter.
                  </p>

                </div>

              )}

            </div>

          </section>

        </main>

      </div>
    </>
  );
}

export default PatientMedicalRecords;