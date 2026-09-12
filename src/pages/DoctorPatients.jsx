import { useState } from "react";
import { useNavigate } from "react-router-dom";

function DoctorPatients() {
  const navigate = useNavigate();

  // =====================================================
  // ACTIVE MENU
  // =====================================================

  const [activeMenu, setActiveMenu] = useState("Patients");

  // =====================================================
  // DOCTOR INFORMATION
  // =====================================================

  const doctor = {
    name: "Dr. Ruchit",
    firstName: "Ruchit",
    specialization: "Cardiologist",
  };

  // =====================================================
  // PATIENT DATA
  // =====================================================

  const [patients] = useState([
    {
      id: 1,
      name: "Aarav Patel",
      age: 28,
      gender: "Male",
      phone: "9876543210",
      email: "aarav@gmail.com",
      bloodGroup: "B+",
      lastVisit: "08 September 2026",
      condition: "Regular Checkup",
      status: "Active",
    },
    {
      id: 2,
      name: "Diya Shah",
      age: 24,
      gender: "Female",
      phone: "9876543211",
      email: "diya@gmail.com",
      bloodGroup: "O+",
      lastVisit: "06 September 2026",
      condition: "Fever and Cold",
      status: "Active",
    },
    {
      id: 3,
      name: "Rohan Mehta",
      age: 35,
      gender: "Male",
      phone: "9876543212",
      email: "rohan@gmail.com",
      bloodGroup: "A+",
      lastVisit: "05 September 2026",
      condition: "Blood Pressure",
      status: "Active",
    },
    {
      id: 4,
      name: "Kavya Patel",
      age: 31,
      gender: "Female",
      phone: "9876543213",
      email: "kavya@gmail.com",
      bloodGroup: "AB+",
      lastVisit: "03 September 2026",
      condition: "Headache",
      status: "Active",
    },
    {
      id: 5,
      name: "Manav Joshi",
      age: 42,
      gender: "Male",
      phone: "9876543214",
      email: "manav@gmail.com",
      bloodGroup: "O-",
      lastVisit: "01 September 2026",
      condition: "Diabetes",
      status: "Active",
    },
    {
      id: 6,
      name: "Krisha Desai",
      age: 26,
      gender: "Female",
      phone: "9876543215",
      email: "krisha@gmail.com",
      bloodGroup: "B-",
      lastVisit: "29 August 2026",
      condition: "General Consultation",
      status: "Active",
    },
    {
      id: 7,
      name: "Vivaan Shah",
      age: 39,
      gender: "Male",
      phone: "9876543216",
      email: "vivaan@gmail.com",
      bloodGroup: "A-",
      lastVisit: "27 August 2026",
      condition: "Chest Pain",
      status: "Active",
    },
    {
      id: 8,
      name: "Anaya Mehta",
      age: 22,
      gender: "Female",
      phone: "9876543217",
      email: "anaya@gmail.com",
      bloodGroup: "O+",
      lastVisit: "25 August 2026",
      condition: "Migraine",
      status: "Active",
    },
  ]);

  // =====================================================
  // STATES
  // =====================================================

  const [searchTerm, setSearchTerm] = useState("");

  const [selectedPatient, setSelectedPatient] = useState(null);

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
  // FILTER PATIENTS
  // =====================================================

  const filteredPatients = patients.filter((patient) => {
    const search = searchTerm.toLowerCase();

    return (
      patient.name.toLowerCase().includes(search) ||
      patient.email.toLowerCase().includes(search) ||
      patient.phone.includes(search) ||
      patient.condition.toLowerCase().includes(search)
    );
  });

  // =====================================================
  // PATIENT STATISTICS
  // =====================================================

  const totalPatients = patients.length;

  const malePatients = patients.filter(
    (patient) => patient.gender === "Male"
  ).length;

  const femalePatients = patients.filter(
    (patient) => patient.gender === "Female"
  ).length;

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
           SIDEBAR BRAND
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
           PAGE CONTENT
        ===================================================== */

        .patients-content {
          padding: 30px 35px 40px;
        }


        /* =====================================================
           PAGE HEADER
        ===================================================== */

        .page-header {
          display: flex;

          justify-content: space-between;
          align-items: center;

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

          background: white;

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

        .total-icon {
          background: #e8f8f6;
        }

        .male-icon {
          background: #e9efff;
        }

        .female-icon {
          background: #fceef5;
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
           PATIENTS CARD
        ===================================================== */

        .patients-card {
          background: white;

          border: 1px solid #e5e7eb;

          border-radius: 12px;

          overflow: hidden;

          box-shadow:
            0 2px 8px
            rgba(0, 0, 0, 0.03);
        }

        .patients-card-header {
          padding: 22px 24px;

          border-bottom: 1px solid #eef1f5;
        }

        .patients-card-header h3 {
          margin: 0 0 5px;

          color: #172033;

          font-size: 18px;
        }

        .patients-card-header p {
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

        .patients-table {
          width: 100%;

          border-collapse: collapse;
        }

        .patients-table th {
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

        .patients-table td {
          padding: 15px 18px;

          border-bottom: 1px solid #eef1f5;

          color: #4c5563;

          font-size: 12px;

          white-space: nowrap;
        }

        .patients-table tbody tr:hover {
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
           BLOOD GROUP
        ===================================================== */

        .blood-group {
          display: inline-block;

          padding: 5px 9px;

          background: #fef2f2;

          color: #dc2626;

          border-radius: 5px;

          font-size: 10px;

          font-weight: 700;
        }


        /* =====================================================
           STATUS
        ===================================================== */

        .status-badge {
          display: inline-block;

          padding: 5px 9px;

          border-radius: 5px;

          background: #ecfdf5;

          color: #059669;

          font-size: 9px;

          font-weight: 600;
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

        .patient-modal {
          width: 100%;

          max-width: 600px;

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
           MODAL PATIENT HEADER
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
           RESPONSIVE
        ===================================================== */

        @media (max-width: 1100px) {

          .stats-container {
            grid-template-columns:
              repeat(3, 1fr);
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

          .patients-content {
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

          .patients-content {
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
          MAIN LAYOUT
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
            MAIN CONTENT
        ===================================================== */}

        <main className="doctor-main">


          {/* =====================================================
              TOPBAR
          ===================================================== */}

          <header className="doctor-topbar">

            <div className="topbar-title">

              <h1>
                Patients
              </h1>

              <p>
                View and manage your registered patients.
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

              <div className="profile-wrapper">

                <button
                  className="profile-button"
                  onClick={() =>
                    navigate("/doctor-profile")
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

              </div>

            </div>

          </header>


          {/* =====================================================
              PATIENT CONTENT
          ===================================================== */}

          <section className="patients-content">


            {/* PAGE HEADER */}

            <div className="page-header">

              <div>

                <h2>
                  My Patients
                </h2>

                <p>
                  View patient information and medical details.
                </p>

              </div>

              <div className="header-info">

                <span>
                  Total Registered Patients
                </span>

                <strong>
                  {totalPatients} Patients
                </strong>

              </div>

            </div>


            {/* =================================================
                STATISTICS
            ================================================= */}

            <div className="stats-container">


              {/* TOTAL */}

              <div className="stat-card">

                <div className="stat-icon total-icon">
                  👥
                </div>

                <div>

                  <h3>
                    {totalPatients}
                  </h3>

                  <p>
                    Total Patients
                  </p>

                </div>

              </div>


              {/* MALE */}

              <div className="stat-card">

                <div className="stat-icon male-icon">
                  👨
                </div>

                <div>

                  <h3>
                    {malePatients}
                  </h3>

                  <p>
                    Male Patients
                  </p>

                </div>

              </div>


              {/* FEMALE */}

              <div className="stat-card">

                <div className="stat-icon female-icon">
                  👩
                </div>

                <div>

                  <h3>
                    {femalePatients}
                  </h3>

                  <p>
                    Female Patients
                  </p>

                </div>

              </div>


            </div>


            {/* =================================================
                PATIENT LIST
            ================================================= */}

            <div className="patients-card">


              <div className="patients-card-header">

                <h3>
                  Patient List
                </h3>

                <p>
                  Patients who have appointments or records with you.
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
                    placeholder="Search patient by name, email, phone or condition..."
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

                <table className="patients-table">

                  <thead>

                    <tr>

                      <th>
                        Patient
                      </th>

                      <th>
                        Contact
                      </th>

                      <th>
                        Blood Group
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

                    {filteredPatients.length > 0 ? (

                      filteredPatients.map(
                        (patient) => (

                          <tr
                            key={patient.id}
                          >


                            {/* PATIENT */}

                            <td>

                              <div className="patient-info">

                                <div className="patient-avatar">

                                  {patient.name
                                    .charAt(0)
                                    .toUpperCase()}

                                </div>

                                <div className="patient-details">

                                  <strong>
                                    {patient.name}
                                  </strong>

                                  <span>
                                    {patient.age} years
                                    {" • "}
                                    {patient.gender}
                                  </span>

                                </div>

                              </div>

                            </td>


                            {/* CONTACT */}

                            <td>

                              <div>
                                {patient.phone}
                              </div>

                              <div
                                style={{
                                  marginTop: "4px",
                                  color: "#929aa8",
                                  fontSize: "9px",
                                }}
                              >
                                {patient.email}
                              </div>

                            </td>


                            {/* BLOOD GROUP */}

                            <td>

                              <span className="blood-group">
                                {patient.bloodGroup}
                              </span>

                            </td>


                            {/* LAST VISIT */}

                            <td>
                              {patient.lastVisit}
                            </td>


                            {/* CONDITION */}

                            <td>
                              {patient.condition}
                            </td>


                            {/* STATUS */}

                            <td>

                              <span className="status-badge">
                                {patient.status}
                              </span>

                            </td>


                            {/* ACTION */}

                            <td>

                              <button
                                className="view-button"
                                onClick={() =>
                                  setSelectedPatient(
                                    patient
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
                          colSpan="7"
                          className="no-data"
                        >
                          No patients found.
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
          PATIENT DETAILS MODAL
      ===================================================== */}

      {selectedPatient && (

        <div
          className="modal-overlay"
          onClick={() =>
            setSelectedPatient(null)
          }
        >

          <div
            className="patient-modal"
            onClick={(e) =>
              e.stopPropagation()
            }
          >


            {/* MODAL HEADER */}

            <div className="modal-header">

              <div>

                <h2>
                  Patient Details
                </h2>

                <p>
                  Patient information
                </p>

              </div>

              <button
                className="close-button"
                onClick={() =>
                  setSelectedPatient(null)
                }
              >
                ×
              </button>

            </div>


            {/* PATIENT HEADER */}

            <div className="modal-patient">

              <div className="large-avatar">

                {selectedPatient.name
                  .charAt(0)
                  .toUpperCase()}

              </div>

              <div>

                <h3>
                  {selectedPatient.name}
                </h3>

                <p>
                  {selectedPatient.age} years
                  {" • "}
                  {selectedPatient.gender}
                </p>

              </div>

            </div>


            {/* DETAILS */}

            <div className="details-grid">


              <div className="detail-item">

                <span>
                  Phone Number
                </span>

                <strong>
                  {selectedPatient.phone}
                </strong>

              </div>


              <div className="detail-item">

                <span>
                  Email Address
                </span>

                <strong>
                  {selectedPatient.email}
                </strong>

              </div>


              <div className="detail-item">

                <span>
                  Blood Group
                </span>

                <strong>
                  {selectedPatient.bloodGroup}
                </strong>

              </div>


              <div className="detail-item">

                <span>
                  Last Visit
                </span>

                <strong>
                  {selectedPatient.lastVisit}
                </strong>

              </div>


              <div className="detail-item">

                <span>
                  Current Condition
                </span>

                <strong>
                  {selectedPatient.condition}
                </strong>

              </div>


              <div className="detail-item">

                <span>
                  Patient Status
                </span>

                <strong>
                  {selectedPatient.status}
                </strong>

              </div>


            </div>


            {/* FOOTER */}

            <div className="modal-footer">

              <button
                className="close-modal-button"
                onClick={() =>
                  setSelectedPatient(null)
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
export default DoctorPatients;