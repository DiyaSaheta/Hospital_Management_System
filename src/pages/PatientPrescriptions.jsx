import { useState } from "react";
import { useNavigate } from "react-router-dom";

function PatientPrescriptions() {
  const navigate = useNavigate();

  const [activeMenu, setActiveMenu] = useState("Prescriptions");
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  // =====================================================
  // PATIENT DATA
  // =====================================================

  const patient = {
    name: "Diya Saheta",
    firstName: "Diya",
  };

  // =====================================================
  // PRESCRIPTIONS DATA
  // Later this data will come from MongoDB
  // =====================================================

  const prescriptions = [
    {
      id: "PRE-001",
      medicine: "Atorvastatin",
      dosage: "10 mg",
      frequency: "Once daily after dinner",
      duration: "30 Days",
      doctor: "Dr. Rajesh Mehta",
      specialization: "Cardiologist",
      date: "15 Aug 2026",
      status: "Active",
      instructions:
        "Take the medicine after dinner with water.",
    },
    {
      id: "PRE-002",
      medicine: "Paracetamol",
      dosage: "500 mg",
      frequency: "Twice daily",
      duration: "5 Days",
      doctor: "Dr. Priya Sharma",
      specialization: "General Physician",
      date: "10 Aug 2026",
      status: "Completed",
      instructions:
        "Take after food. Do not exceed the recommended dosage.",
    },
    {
      id: "PRE-003",
      medicine: "Cetirizine",
      dosage: "10 mg",
      frequency: "Once daily at night",
      duration: "7 Days",
      doctor: "Dr. Amit Patel",
      specialization: "Dermatologist",
      date: "05 Aug 2026",
      status: "Active",
      instructions:
        "Take at night. May cause drowsiness.",
    },
    {
      id: "PRE-004",
      medicine: "Amoxicillin",
      dosage: "500 mg",
      frequency: "Three times daily",
      duration: "5 Days",
      doctor: "Dr. Priya Sharma",
      specialization: "General Physician",
      date: "28 Jul 2026",
      status: "Completed",
      instructions:
        "Complete the full course as prescribed.",
    },
    {
      id: "PRE-005",
      medicine: "Vitamin D3",
      dosage: "60,000 IU",
      frequency: "Once weekly",
      duration: "4 Weeks",
      doctor: "Dr. Karan Joshi",
      specialization: "Orthopedic",
      date: "20 Jul 2026",
      status: "Active",
      instructions:
        "Take after a proper meal.",
    },
    {
      id: "PRE-006",
      medicine: "Omeprazole",
      dosage: "20 mg",
      frequency: "Once daily before breakfast",
      duration: "14 Days",
      doctor: "Dr. Priya Sharma",
      specialization: "General Physician",
      date: "12 Jul 2026",
      status: "Completed",
      instructions:
        "Take approximately 30 minutes before breakfast.",
    },
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
  // FILTER PRESCRIPTIONS
  // =====================================================

  const filteredPrescriptions = prescriptions.filter((prescription) => {
    const matchesSearch =
      prescription.medicine
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      prescription.doctor
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      prescription.specialization
        .toLowerCase()
        .includes(searchTerm.toLowerCase());

    const matchesStatus =
      statusFilter === "All" ||
      prescription.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  // =====================================================
  // VIEW PRESCRIPTION DETAILS
  // =====================================================

  const handleViewDetails = (prescription) => {
    alert(
      `Prescription Details\n\n` +
        `Prescription ID: ${prescription.id}\n` +
        `Medicine: ${prescription.medicine}\n` +
        `Dosage: ${prescription.dosage}\n` +
        `Frequency: ${prescription.frequency}\n` +
        `Duration: ${prescription.duration}\n` +
        `Doctor: ${prescription.doctor}\n` +
        `Specialization: ${prescription.specialization}\n` +
        `Date: ${prescription.date}\n` +
        `Status: ${prescription.status}\n\n` +
        `Instructions:\n${prescription.instructions}`
    );
  };

  // =====================================================
  // DOWNLOAD PRESCRIPTION
  // =====================================================

  const handleDownload = (prescription) => {
    alert(
      `Download requested for ${prescription.id}\n\n` +
        `Medicine: ${prescription.medicine}\n` +
        `Doctor: ${prescription.doctor}`
    );
  };

  return (
    <>
      <style>{`
        * {
          box-sizing: border-box;
        }

        body {
          margin: 0;
          padding: 0;
          font-family: Arial, Helvetica, sans-serif;
          background: #f5f8fc;
        }

        .prescriptions-page {
          width: 100%;
          min-height: 100vh;
          display: flex;
          background: #f5f8fc;
        }

        /* ================= SIDEBAR ================= */

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
          border-right: 1px solid #e4e9ef;
          z-index: 100;
        }

        .sidebar-brand {
          height: 99px;
          padding: 0 23px;
          display: flex;
          align-items: center;
          gap: 14px;
          border-bottom: 1px solid #eef1f5;
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

        .sidebar-menu {
          flex: 1;
          padding: 28px 12px;
        }

        .menu-title {
          margin: 0 14px 14px;
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
          transition: 0.2s ease;
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

        .sidebar-bottom {
          padding: 20px 12px;
          border-top: 1px solid #eef1f5;
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

        /* ================= MAIN ================= */

        .prescriptions-main {
          width: calc(100% - 288px);
          margin-left: 288px;
          min-height: 100vh;
        }

        /* ================= TOPBAR ================= */

        .topbar {
          height: 99px;
          padding: 0 40px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          background: white;
          border-bottom: 1px solid #e4e9ef;
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

        .notification-button {
          width: 48px;
          height: 48px;
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
          border: 1px solid #e2e8ef;
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
          border: 2px solid white;
        }

        /* ================= PROFILE ================= */

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

        .profile-dropdown {
          position: absolute;
          top: 58px;
          right: 0;
          width: 180px;
          padding: 8px;
          background: white;
          border: 1px solid #e5eaf0;
          border-radius: 10px;
          box-shadow: 0 12px 30px rgba(15, 23, 42, 0.12);
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

        /* ================= CONTENT ================= */

        .prescriptions-content {
          padding: 32px 40px 50px;
        }

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

        /* ================= SUMMARY CARDS ================= */

        .summary-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
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
          border: 1px solid #e3e9ef;
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

        /* ================= SEARCH ================= */

        .search-filter-card {
          padding: 20px;
          margin-bottom: 20px;
          display: flex;
          align-items: center;
          gap: 15px;
          background: white;
          border: 1px solid #e3e9ef;
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
          transform: translateY(-50%);
          font-size: 15px;
        }

        .search-input {
          width: 100%;
          height: 44px;
          padding: 0 15px 0 42px;
          border: 1px solid #dce3eb;
          border-radius: 7px;
          outline: none;
          color: #334155;
          font-family: inherit;
          font-size: 11px;
        }

        .search-input:focus {
          border-color: #0f8078;
          box-shadow: 0 0 0 3px rgba(15, 128, 120, 0.08);
        }

        .filter-select {
          width: 200px;
          height: 44px;
          padding: 0 12px;
          border: 1px solid #dce3eb;
          border-radius: 7px;
          outline: none;
          background: white;
          color: #596579;
          font-size: 11px;
          cursor: pointer;
        }

        /* ================= PRESCRIPTION LIST ================= */

        .prescriptions-header {
          margin-bottom: 14px;
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .prescriptions-header h3 {
          margin: 0;
          color: #172236;
          font-size: 16px;
        }

        .prescriptions-count {
          color: #8994a5;
          font-size: 10px;
        }

        .prescriptions-container {
          background: white;
          border: 1px solid #e3e9ef;
          border-radius: 11px;
          overflow: hidden;
        }

        .prescription-item {
          min-height: 155px;
          padding: 22px 25px;
          display: flex;
          align-items: center;
          gap: 18px;
          border-bottom: 1px solid #edf0f4;
        }

        .prescription-item:last-child {
          border-bottom: none;
        }

        .prescription-icon {
          width: 58px;
          height: 58px;
          flex-shrink: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 12px;
          background: #e5f7f5;
          font-size: 27px;
        }

        .prescription-main {
          flex: 1;
          min-width: 0;
        }

        .prescription-top {
          display: flex;
          align-items: center;
          gap: 10px;
          margin-bottom: 5px;
        }

        .prescription-top h3 {
          margin: 0;
          color: #1d293b;
          font-size: 15px;
        }

        .dosage-badge {
          padding: 4px 8px;
          border-radius: 20px;
          background: #edf8f6;
          color: #087c75;
          font-size: 8px;
          font-weight: 700;
        }

        .prescription-frequency {
          margin: 0;
          color: #66748a;
          font-size: 10px;
        }

        .prescription-doctor {
          margin: 7px 0 0;
          color: #98a2b1;
          font-size: 9px;
        }

        .prescription-date {
          margin-top: 8px;
          color: #087c75;
          font-size: 9px;
          font-weight: 600;
        }

        .prescription-status {
          padding: 6px 10px;
          border-radius: 20px;
          font-size: 8px;
          font-weight: 700;
        }

        .prescription-status.active {
          background: #eaf9f2;
          color: #16945b;
        }

        .prescription-status.completed {
          background: #f1f3f5;
          color: #788394;
        }

        .prescription-actions {
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
          border: 1px solid #0f8078;
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

        /* ================= NO RESULTS ================= */

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

        /* ================= RESPONSIVE ================= */

        @media (max-width: 1100px) {
          .patient-sidebar {
            width: 240px;
          }

          .prescriptions-main {
            width: calc(100% - 240px);
            margin-left: 240px;
          }

          .prescriptions-content {
            padding: 30px 25px 40px;
          }

          .topbar {
            padding: 0 25px;
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
            padding: 25px 10px;
          }

          .menu-item,
          .logout-button {
            justify-content: center;
            padding: 0;
          }

          .prescriptions-main {
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

          .prescription-item {
            flex-direction: column;
            align-items: flex-start;
          }

          .prescription-actions {
            width: 100%;
            flex-direction: row;
          }

          .prescription-status {
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

          .prescriptions-content {
            padding: 22px 15px 35px;
          }
        }

        @media (max-width: 450px) {
          .patient-sidebar {
            width: 62px;
          }

          .prescriptions-main {
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

      <div className="prescriptions-page">

        {/* ================= SIDEBAR ================= */}

        <aside className="patient-sidebar">

          <div className="sidebar-brand">
            <div className="brand-icon">+</div>

            <div className="brand-text">
              <h2>CureAI</h2>
              <p>Hospital Management</p>
            </div>
          </div>

          <div className="sidebar-menu">

            <div className="menu-title">
              Main Menu
            </div>

            {menuItems.map((item) => (
              <button
                key={item.name}
                className={`menu-item ${
                  activeMenu === item.name ? "active" : ""
                }`}
                onClick={() => handleMenuClick(item.name)}
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

        {/* ================= MAIN ================= */}

        <main className="prescriptions-main">

          {/* ================= TOPBAR ================= */}

          <header className="topbar">

            <div className="topbar-left">
              <h1>Prescriptions</h1>

              <p>
                View and manage your prescribed medicines.
              </p>
            </div>

            <div className="topbar-right">

              <button className="notification-button">
                🔔
                <span className="notification-dot"></span>
              </button>

              <div className="profile-wrapper">

                <button
                  className="profile-button"
                  onClick={() =>
                    setShowProfileMenu(!showProfileMenu)
                  }
                >
                  <div className="profile-avatar">
                    {patient.firstName.charAt(0)}
                  </div>

                  <div className="profile-info">
                    <strong>{patient.name}</strong>
                    <span>Patient</span>
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

                    <button onClick={handleLogout}>
                      ↪ &nbsp; Logout
                    </button>

                  </div>
                )}

              </div>

            </div>

          </header>

          {/* ================= CONTENT ================= */}

          <section className="prescriptions-content">

            <div className="page-header">
              <div className="page-heading">

                <h2>
                  My Prescriptions
                </h2>

                <p>
                  Keep track of your medicines and doctor's prescriptions.
                </p>

              </div>
            </div>

            {/* ================= SUMMARY ================= */}

            <div className="summary-grid">

              <div className="summary-card">
                <div className="summary-icon">
                  💊
                </div>

                <div className="summary-info">
                  <strong>
                    {prescriptions.length}
                  </strong>

                  <span>
                    Total Prescriptions
                  </span>

                  <small>
                    All prescriptions
                  </small>
                </div>
              </div>

              <div className="summary-card">
                <div className="summary-icon">
                  ✓
                </div>

                <div className="summary-info">
                  <strong>
                    {
                      prescriptions.filter(
                        (prescription) =>
                          prescription.status === "Active"
                      ).length
                    }
                  </strong>

                  <span>
                    Active
                  </span>

                  <small>
                    Currently active medicines
                  </small>
                </div>
              </div>

              <div className="summary-card">
                <div className="summary-icon">
                  📋
                </div>

                <div className="summary-info">
                  <strong>
                    {
                      prescriptions.filter(
                        (prescription) =>
                          prescription.status === "Completed"
                      ).length
                    }
                  </strong>

                  <span>
                    Completed
                  </span>

                  <small>
                    Previous prescriptions
                  </small>
                </div>
              </div>

            </div>

            {/* ================= SEARCH AND FILTER ================= */}

            <div className="search-filter-card">

              <div className="search-box">

                <span className="search-icon">
                  🔍
                </span>

                <input
                  type="text"
                  className="search-input"
                  placeholder="Search medicine, doctor or specialization..."
                  value={searchTerm}
                  onChange={(e) =>
                    setSearchTerm(e.target.value)
                  }
                />

              </div>

              <select
                className="filter-select"
                value={statusFilter}
                onChange={(e) =>
                  setStatusFilter(e.target.value)
                }
              >
                <option value="All">
                  All Prescriptions
                </option>

                <option value="Active">
                  Active
                </option>

                <option value="Completed">
                  Completed
                </option>

              </select>

            </div>

            {/* ================= PRESCRIPTIONS HEADER ================= */}

            <div className="prescriptions-header">

              <h3>
                Prescription History
              </h3>

              <span className="prescriptions-count">
                {filteredPrescriptions.length} prescriptions found
              </span>

            </div>

            {/* ================= PRESCRIPTION LIST ================= */}

            <div className="prescriptions-container">

              {filteredPrescriptions.length > 0 ? (

                filteredPrescriptions.map((prescription) => (

                  <div
                    className="prescription-item"
                    key={prescription.id}
                  >

                    <div className="prescription-icon">
                      💊
                    </div>

                    <div className="prescription-main">

                      <div className="prescription-top">

                        <h3>
                          {prescription.medicine}
                        </h3>

                        <span className="dosage-badge">
                          {prescription.dosage}
                        </span>

                      </div>

                      <p className="prescription-frequency">
                        {prescription.frequency}
                        {" · "}
                        {prescription.duration}
                      </p>

                      <p className="prescription-doctor">
                        {prescription.doctor}
                        {" · "}
                        {prescription.specialization}
                      </p>

                      <div className="prescription-date">
                        📅 {prescription.date}
                      </div>

                    </div>

                    <span
                      className={`prescription-status ${
                        prescription.status.toLowerCase()
                      }`}
                    >
                      {prescription.status}
                    </span>

                    <div className="prescription-actions">

                      <button
                        className="view-button"
                        onClick={() =>
                          handleViewDetails(prescription)
                        }
                      >
                        View Details
                      </button>

                      <button
                        className="download-button"
                        onClick={() =>
                          handleDownload(prescription)
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
                    💊
                  </div>

                  <h3>
                    No prescriptions found
                  </h3>

                  <p>
                    Try changing your search or filter.
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

export default PatientPrescriptions;