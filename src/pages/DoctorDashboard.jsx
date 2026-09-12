import { useState } from "react";
import { useNavigate } from "react-router-dom";

function DoctorDashboard() {
  const navigate = useNavigate();

  const [activeMenu, setActiveMenu] = useState("Dashboard");
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  // =====================================================
  // TEMPORARY DOCTOR DATA
  // Later this will come from MongoDB
  // =====================================================

  const doctor = {
    name: "Dr. Ruchit",
    firstName: "Ruchit",
    doctorId: "DOC-2026-001",
    specialization: "Cardiologist",
    email: "ruchit1109@gmail.com",
  };

  // =====================================================
  // DASHBOARD STATISTICS
  // =====================================================

  const dashboardStats = [
    {
      icon: "📅",
      title: "Today's Appointments",
      value: "8",
      description: "Appointments scheduled today",
    },
    {
      icon: "👥",
      title: "Total Patients",
      value: "124",
      description: "Patients under your care",
    },
    {
      icon: "📋",
      title: "Medical Records",
      value: "86",
      description: "Records created",
    },
    {
      icon: "💊",
      title: "Prescriptions",
      value: "42",
      description: "Prescriptions issued",
    },
  ];

  // =====================================================
  // TODAY'S APPOINTMENTS
  // =====================================================

  const appointments = [
    {
      id: 1,
      patient: "Diya Saheta",
      age: 24,
      gender: "Female",
      time: "09:30 AM",
      type: "Consultation",
      status: "Confirmed",
      icon: "👩",
    },
    {
      id: 2,
      patient: "Aarav Shah",
      age: 31,
      gender: "Male",
      time: "10:30 AM",
      type: "Follow-up",
      status: "Confirmed",
      icon: "👨",
    },
    {
      id: 3,
      patient: "Riya Patel",
      age: 27,
      gender: "Female",
      time: "12:00 PM",
      type: "Consultation",
      status: "Waiting",
      icon: "👩",
    },
    {
      id: 4,
      patient: "Vivek Joshi",
      age: 45,
      gender: "Male",
      time: "02:30 PM",
      type: "Check-up",
      status: "Confirmed",
      icon: "👨",
    },
  ];

  // =====================================================
  // RECENT PATIENTS
  // =====================================================

  const recentPatients = [
    {
      id: "PAT-001",
      name: "Diya Saheta",
      age: 24,
      gender: "Female",
      lastVisit: "10 Aug 2026",
      condition: "Routine Check-up",
      status: "Stable",
    },
    {
      id: "PAT-002",
      name: "Aarav Shah",
      age: 31,
      gender: "Male",
      lastVisit: "08 Aug 2026",
      condition: "Chest Pain",
      status: "Under Treatment",
    },
    {
      id: "PAT-003",
      name: "Riya Patel",
      age: 27,
      gender: "Female",
      lastVisit: "05 Aug 2026",
      condition: "Blood Pressure",
      status: "Stable",
    },
    {
      id: "PAT-004",
      name: "Vivek Joshi",
      age: 45,
      gender: "Male",
      lastVisit: "01 Aug 2026",
      condition: "Heart Check-up",
      status: "Stable",
    },
  ];

  // =====================================================
  // QUICK ACTIONS
  // =====================================================

  const quickActions = [
    {
      icon: "📅",
      title: "View Appointments",
      description: "Manage today's appointments",
    },
    {
      icon: "👥",
      title: "View Patients",
      description: "Search and manage patients",
    },
    {
      icon: "📋",
      title: "Medical Records",
      description: "Create and manage records",
    },
    {
      icon: "💊",
      title: "Prescriptions",
      description: "Manage patient prescriptions",
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
  // HANDLE MENU
  // =====================================================

  const handleMenuClick = (menuName) => {
    setActiveMenu(menuName);
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

        .doctor-dashboard {
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
           LOGOUT
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


        /* =====================================================
           NOTIFICATION
        ===================================================== */

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

        .profile-wrapper {
          position: relative;
        }

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
           PROFILE DROPDOWN
        ===================================================== */

        .profile-dropdown {
          position: absolute;

          right: 0;
          top: 52px;

          width: 180px;

          padding: 8px;

          background: white;

          border: 1px solid #e5eaf0;
          border-radius: 10px;

          box-shadow:
            0 10px 25px rgba(15, 23, 42, 0.12);

          z-index: 200;
        }

        .profile-dropdown button {
          width: 100%;
          height: 38px;

          padding: 0 10px;

          border: none;
          border-radius: 7px;

          background: transparent;

          color: #5d6676;

          text-align: left;

          cursor: pointer;

          font-size: 12px;
        }

        .profile-dropdown button:hover {
          background: #f5f8fc;
          color: #0f766e;
        }


        /* =====================================================
           CONTENT
        ===================================================== */

        .dashboard-content {
          padding: 30px 35px 45px;
        }


        /* =====================================================
           WELCOME BANNER
        ===================================================== */

        .welcome-banner {
          width: 100%;

          padding: 28px 30px;

          border-radius: 14px;

          background:
            linear-gradient(
              110deg,
              #0f766e,
              #11998e
            );

          color: white;

          display: flex;
          align-items: center;
          justify-content: space-between;

          position: relative;
          overflow: hidden;
        }

        .welcome-banner::after {
          content: "";

          position: absolute;

          width: 230px;
          height: 230px;

          border-radius: 50%;

          background: rgba(255,255,255,0.08);

          right: 50px;
          top: -120px;
        }

        .welcome-content {
          position: relative;
          z-index: 2;
        }

        .welcome-content h2 {
          margin: 0;

          font-size: 24px;
        }

        .welcome-content p {
          margin: 8px 0 0;

          font-size: 13px;

          opacity: 0.85;
        }

        .doctor-id {
          margin-top: 14px;

          display: inline-block;

          padding: 6px 11px;

          border-radius: 6px;

          background: rgba(255,255,255,0.14);

          font-size: 10px;
        }

        .welcome-icon {
          width: 90px;
          height: 90px;

          border-radius: 50%;

          display: flex;
          align-items: center;
          justify-content: center;

          background: rgba(255,255,255,0.12);

          font-size: 45px;

          position: relative;
          z-index: 2;
        }


        /* =====================================================
           SECTION HEADER
        ===================================================== */

        .section-header {
          margin-top: 30px;
          margin-bottom: 15px;

          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .section-header h3 {
          margin: 0;

          color: #172033;

          font-size: 17px;
        }

        .view-all {
          border: none;

          background: transparent;

          color: #0f766e;

          font-size: 11px;
          font-weight: 600;

          cursor: pointer;
        }

        .view-all:hover {
          text-decoration: underline;
        }


        /* =====================================================
           STATISTICS
        ===================================================== */

        .stats-grid {
          display: grid;

          grid-template-columns:
            repeat(4, 1fr);

          gap: 17px;
        }

        .stat-card {
          padding: 20px;

          background: white;

          border: 1px solid #e8ecf1;

          border-radius: 12px;

          transition: 0.2s ease;
        }

        .stat-card:hover {
          transform: translateY(-2px);

          box-shadow:
            0 7px 20px rgba(15, 23, 42, 0.06);
        }

        .stat-icon {
          width: 42px;
          height: 42px;

          border-radius: 10px;

          background: #e8f8f6;

          display: flex;
          align-items: center;
          justify-content: center;

          font-size: 20px;
        }

        .stat-number {
          margin-top: 17px;

          color: #172033;

          font-size: 25px;
          font-weight: 700;
        }

        .stat-title {
          margin-top: 5px;

          color: #475166;

          font-size: 12px;
          font-weight: 600;
        }

        .stat-description {
          margin-top: 4px;

          color: #9aa2b0;

          font-size: 10px;
        }


        /* =====================================================
           TWO COLUMN
        ===================================================== */

        .dashboard-grid {
          display: grid;

          grid-template-columns:
            1.5fr 1fr;

          gap: 20px;
        }


        /* =====================================================
           CARD
        ===================================================== */

        .dashboard-card {
          background: white;

          border: 1px solid #e8ecf1;

          border-radius: 12px;

          overflow: hidden;
        }

        .dashboard-card-header {
          height: 58px;

          padding: 0 20px;

          display: flex;
          align-items: center;
          justify-content: space-between;

          border-bottom: 1px solid #eef1f5;
        }

        .dashboard-card-header h3 {
          margin: 0;

          color: #172033;

          font-size: 14px;
        }

        .dashboard-card-header button {
          border: none;

          background: transparent;

          color: #0f766e;

          font-size: 10px;
          font-weight: 600;

          cursor: pointer;
        }


        /* =====================================================
           APPOINTMENTS
        ===================================================== */

        .appointment-list {
          padding: 8px 20px;
        }

        .appointment-item {
          display: flex;
          align-items: center;
          gap: 14px;

          padding: 15px 0;

          border-bottom: 1px solid #f0f2f5;
        }

        .appointment-item:last-child {
          border-bottom: none;
        }

        .patient-avatar {
          width: 45px;
          height: 45px;

          flex-shrink: 0;

          border-radius: 10px;

          background: #e8f8f6;

          display: flex;
          align-items: center;
          justify-content: center;

          font-size: 22px;
        }

        .appointment-details {
          flex: 1;
        }

        .appointment-details h4 {
          margin: 0;

          color: #263146;

          font-size: 12px;
        }

        .appointment-details p {
          margin: 4px 0 0;

          color: #8d96a5;

          font-size: 10px;
        }

        .appointment-time {
          text-align: right;
        }

        .appointment-time strong {
          display: block;

          color: #344054;

          font-size: 11px;
        }

        .appointment-time span {
          display: inline-block;

          margin-top: 5px;

          padding: 3px 7px;

          border-radius: 10px;

          font-size: 8px;
          font-weight: 600;
        }

        .status-confirmed {
          background: #ecfdf5;
          color: #059669;
        }

        .status-waiting {
          background: #fff7ed;
          color: #ea580c;
        }


        /* =====================================================
           QUICK ACTIONS
        ===================================================== */

        .quick-actions {
          padding: 18px 20px;
        }

        .quick-action {
          width: 100%;
          min-height: 55px;

          margin-bottom: 10px;
          padding: 10px 12px;

          display: flex;
          align-items: center;
          gap: 12px;

          border: 1px solid #edf0f4;
          border-radius: 9px;

          background: white;

          cursor: pointer;

          text-align: left;

          transition: 0.2s ease;
        }

        .quick-action:last-child {
          margin-bottom: 0;
        }

        .quick-action:hover {
          border-color: #b9e5df;

          background: #f7fffe;
        }

        .quick-action-icon {
          width: 34px;
          height: 34px;

          border-radius: 8px;

          background: #e8f8f6;

          display: flex;
          align-items: center;
          justify-content: center;

          font-size: 16px;
        }

        .quick-action-text strong {
          display: block;

          color: #334055;

          font-size: 11px;
        }

        .quick-action-text span {
          display: block;

          margin-top: 3px;

          color: #9aa2b0;

          font-size: 9px;
        }


        /* =====================================================
           PATIENT TABLE
        ===================================================== */

        .patients-card {
          margin-top: 20px;
        }

        .table-wrapper {
          overflow-x: auto;
        }

        .patients-table {
          width: 100%;

          border-collapse: collapse;
        }

        .patients-table th {
          padding: 13px 20px;

          background: #fafbfc;

          color: #8992a2;

          font-size: 9px;
          font-weight: 600;

          text-align: left;

          text-transform: uppercase;
        }

        .patients-table td {
          padding: 14px 20px;

          border-top: 1px solid #f0f2f5;

          color: #475166;

          font-size: 11px;
        }

        .patients-table td:first-child {
          color: #263146;
          font-weight: 600;
        }


        /* =====================================================
           PATIENT NAME
        ===================================================== */

        .patient-name-cell {
          display: flex;
          align-items: center;
          gap: 9px;
        }

        .small-patient-avatar {
          width: 30px;
          height: 30px;

          border-radius: 50%;

          background: #e8f8f6;

          display: flex;
          align-items: center;
          justify-content: center;

          font-size: 14px;
        }


        /* =====================================================
           STATUS
        ===================================================== */

        .patient-status {
          display: inline-block;

          padding: 4px 8px;

          border-radius: 5px;

          font-size: 8px;
          font-weight: 600;
        }

        .stable {
          background: #ecfdf5;
          color: #059669;
        }

        .treatment {
          background: #fff7ed;
          color: #ea580c;
        }


        /* =====================================================
           VIEW BUTTON
        ===================================================== */

        .view-patient {
          border: none;

          background: transparent;

          color: #0f766e;

          font-size: 10px;
          font-weight: 600;

          cursor: pointer;
        }

        .view-patient:hover {
          text-decoration: underline;
        }


        /* =====================================================
           RESPONSIVE
        ===================================================== */

        @media (max-width: 1200px) {

          .stats-grid {
            grid-template-columns:
              repeat(2, 1fr);
          }

          .dashboard-grid {
            grid-template-columns: 1fr;
          }

        }


        @media (max-width: 900px) {

          .doctor-sidebar {
            width: 210px;
          }

          .doctor-main {
            width: calc(100% - 210px);

            margin-left: 210px;
          }

          .dashboard-content {
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

          .dashboard-content {
            padding: 20px 15px 35px;
          }

          .welcome-banner {
            padding: 22px;
          }

          .welcome-content h2 {
            font-size: 20px;
          }

          .welcome-icon {
            width: 65px;
            height: 65px;

            font-size: 32px;
          }

          .stats-grid {
            grid-template-columns: 1fr 1fr;

            gap: 10px;
          }

        }


        @media (max-width: 500px) {

          .stats-grid {
            grid-template-columns: 1fr;
          }

          .appointment-item {
            align-items: flex-start;
          }

          .appointment-time {
            display: none;
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

          .welcome-icon {
            display: none;
          }

        }

      `}</style>


      {/* =====================================================
          MAIN DASHBOARD
      ===================================================== */}

      <div className="doctor-dashboard">


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
            MAIN AREA
        ===================================================== */}

        <main className="doctor-main">


          {/* =====================================================
              TOPBAR
          ===================================================== */}

          <header className="doctor-topbar">


            <div className="topbar-title">

              <h1>
                Doctor Dashboard
              </h1>

              <p>
                Manage your appointments and patients.
              </p>

            </div>


            <div className="topbar-right">


              {/* Notification */}

              <button
                className="notification-button"
                title="Notifications"
                onClick={() => navigate("/doctor-notifications")}
              >

                🔔

                <span className="notification-dot"></span>

              </button>


              {/* Profile */}

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
                    {doctor.firstName.charAt(0)}
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


                {showProfileMenu && (

                  <div className="profile-dropdown">

                    <button
                      onClick={() =>
                        setActiveMenu("Profile")
                      }
                    >
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

          <section className="dashboard-content">


            {/* =====================================================
                WELCOME
            ===================================================== */}

            <div className="welcome-banner">

              <div className="welcome-content">

                <h2>
                  Good Morning, Dr. {doctor.firstName}! 👋
                </h2>

                <p>
                  Here's an overview of your appointments,
                  patients and medical activities.
                </p>

                <span className="doctor-id">
                  Doctor ID: {doctor.doctorId}
                  {" • "}
                  {doctor.specialization}
                </span>

              </div>


              <div className="welcome-icon">
                🩺
              </div>

            </div>


            {/* =====================================================
                OVERVIEW
            ===================================================== */}

            <div className="section-header">

              <h3>
                Overview
              </h3>

            </div>


            <div className="stats-grid">

              {dashboardStats.map((stat) => (

                <div
                  className="stat-card"
                  key={stat.title}
                >

                  <div className="stat-icon">
                    {stat.icon}
                  </div>

                  <div className="stat-number">
                    {stat.value}
                  </div>

                  <div className="stat-title">
                    {stat.title}
                  </div>

                  <div className="stat-description">
                    {stat.description}
                  </div>

                </div>

              ))}

            </div>


            {/* =====================================================
                APPOINTMENTS + QUICK ACTIONS
            ===================================================== */}

            <div className="dashboard-grid">


              {/* APPOINTMENTS */}

              <div>

                <div className="section-header">

                  <h3>
                    Today's Appointments
                  </h3>

                  <button className="view-all">
                    View All
                  </button>

                </div>


                <div className="dashboard-card">

                  <div className="appointment-list">

                    {appointments.map(
                      (appointment) => (

                        <div
                          className="appointment-item"
                          key={appointment.id}
                        >

                          <div className="patient-avatar">
                            {appointment.icon}
                          </div>


                          <div className="appointment-details">

                            <h4>
                              {appointment.patient}
                            </h4>

                            <p>
                              {appointment.age} years
                              {" • "}
                              {appointment.gender}
                              {" • "}
                              {appointment.type}
                            </p>

                          </div>


                          <div className="appointment-time">

                            <strong>
                              {appointment.time}
                            </strong>

                            <span
                              className={
                                appointment.status ===
                                "Waiting"
                                  ? "status-waiting"
                                  : "status-confirmed"
                              }
                            >
                              {appointment.status}
                            </span>

                          </div>

                        </div>

                      )
                    )}

                  </div>

                </div>

              </div>


              {/* QUICK ACTIONS */}

              <div>

                <div className="section-header">

                  <h3>
                    Quick Actions
                  </h3>

                </div>


                <div className="dashboard-card">

                  <div className="quick-actions">

                    {quickActions.map(
                      (action) => (

                        <button
                          className="quick-action"
                          key={action.title}
                        >

                          <div className="quick-action-icon">
                            {action.icon}
                          </div>

                          <div className="quick-action-text">

                            <strong>
                              {action.title}
                            </strong>

                            <span>
                              {action.description}
                            </span>

                          </div>

                        </button>

                      )
                    )}

                  </div>

                </div>

              </div>


            </div>


            {/* =====================================================
                RECENT PATIENTS
            ===================================================== */}

            <div className="dashboard-card patients-card">


              <div className="dashboard-card-header">

                <h3>
                  Recent Patients
                </h3>

                <button>
                  View All
                </button>

              </div>


              <div className="table-wrapper">

                <table className="patients-table">

                  <thead>

                    <tr>

                      <th>
                        Patient
                      </th>

                      <th>
                        Patient ID
                      </th>

                      <th>
                        Age
                      </th>

                      <th>
                        Last Visit
                      </th>

                      <th>
                        Condition
                      </th>

                      <th>
                        Status
                      </th>

                      <th>
                        Action
                      </th>

                    </tr>

                  </thead>


                  <tbody>

                    {recentPatients.map(
                      (patient) => (

                        <tr key={patient.id}>

                          <td>

                            <div className="patient-name-cell">

                              <div className="small-patient-avatar">
                                {patient.gender ===
                                "Female"
                                  ? "👩"
                                  : "👨"}
                              </div>

                              {patient.name}

                            </div>

                          </td>


                          <td>
                            {patient.id}
                          </td>


                          <td>
                            {patient.age}
                          </td>


                          <td>
                            {patient.lastVisit}
                          </td>


                          <td>
                            {patient.condition}
                          </td>


                          <td>

                            <span
                              className={
                                `patient-status ${
                                  patient.status ===
                                  "Stable"
                                    ? "stable"
                                    : "treatment"
                                }`
                              }
                            >
                              {patient.status}
                            </span>

                          </td>


                          <td>

                            <button className="view-patient">
                              View
                            </button>

                          </td>

                        </tr>

                      )
                    )}

                  </tbody>

                </table>

              </div>

            </div>


          </section>

        </main>

      </div>
    </>
  );
}

export default DoctorDashboard;