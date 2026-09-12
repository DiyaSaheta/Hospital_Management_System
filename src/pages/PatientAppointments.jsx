import { useState } from "react";
import { useNavigate } from "react-router-dom";

function PatientAppointments() {
  const navigate = useNavigate();

  const [activeMenu, setActiveMenu] = useState("Appointments");
  const [activeTab, setActiveTab] = useState("Upcoming");
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  // =====================================================
  // TEMPORARY PATIENT DATA
  // Later this will come from MongoDB
  // =====================================================

  const patient = {
    name: "Diya Saheta",
    firstName: "Diya",
    patientId: "PAT-2026-001",
    email: "diya@example.com",
  };

  // =====================================================
  // APPOINTMENT DATA
  // =====================================================

  const appointments = [
    {
      id: "APT-001",
      doctor: "Dr. Rajesh Mehta",
      specialization: "Cardiologist",
      type: "Consultation",
      date: "18 Aug 2026",
      time: "10:30 AM",
      status: "Confirmed",
      location: "Cardiology Department",
      reason: "Regular heart check-up",
      icon: "🩺",
    },
    {
      id: "APT-002",
      doctor: "Dr. Priya Sharma",
      specialization: "General Physician",
      type: "Follow-up",
      date: "24 Aug 2026",
      time: "04:00 PM",
      status: "Confirmed",
      location: "General Medicine",
      reason: "Follow-up consultation",
      icon: "👩‍⚕️",
    },
    {
      id: "APT-003",
      doctor: "Dr. Amit Patel",
      specialization: "Dermatologist",
      type: "Consultation",
      date: "28 Aug 2026",
      time: "11:00 AM",
      status: "Pending",
      location: "Dermatology Department",
      reason: "Skin consultation",
      icon: "👨‍⚕️",
    },
    {
      id: "APT-004",
      doctor: "Dr. Neha Shah",
      specialization: "Dentist",
      type: "Check-up",
      date: "02 Sep 2026",
      time: "03:30 PM",
      status: "Confirmed",
      location: "Dental Department",
      reason: "Dental check-up",
      icon: "🦷",
    },
  ];

  // =====================================================
  // PAST APPOINTMENTS
  // =====================================================

  const pastAppointments = [
    {
      id: "APT-005",
      doctor: "Dr. Rajesh Mehta",
      specialization: "Cardiologist",
      type: "Consultation",
      date: "10 Aug 2026",
      time: "10:00 AM",
      status: "Completed",
      location: "Cardiology Department",
      reason: "Routine check-up",
      icon: "🩺",
    },
    {
      id: "APT-006",
      doctor: "Dr. Priya Sharma",
      specialization: "General Physician",
      type: "Consultation",
      date: "05 Aug 2026",
      time: "02:30 PM",
      status: "Completed",
      location: "General Medicine",
      reason: "Fever and weakness",
      icon: "👩‍⚕️",
    },
    {
      id: "APT-007",
      doctor: "Dr. Amit Patel",
      specialization: "Dermatologist",
      type: "Follow-up",
      date: "28 Jul 2026",
      time: "11:30 AM",
      status: "Cancelled",
      location: "Dermatology Department",
      reason: "Skin treatment follow-up",
      icon: "👨‍⚕️",
    },
  ];

  // =====================================================
  // MENU ITEMS
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
  // MENU NAVIGATION
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
  // FILTER APPOINTMENTS
  // =====================================================

  const displayedAppointments =
    activeTab === "Upcoming"
      ? appointments
      : pastAppointments;

  const filteredAppointments =
    displayedAppointments.filter((appointment) => {

      const search =
        searchTerm.toLowerCase();

      return (
        appointment.doctor
          .toLowerCase()
          .includes(search) ||
        appointment.specialization
          .toLowerCase()
          .includes(search) ||
        appointment.type
          .toLowerCase()
          .includes(search) ||
        appointment.date
          .toLowerCase()
          .includes(search)
      );
    });

  // =====================================================
  // CANCEL APPOINTMENT
  // =====================================================

  const handleCancelAppointment = (appointment) => {
    const confirmCancel = window.confirm(
      `Are you sure you want to cancel your appointment with ${appointment.doctor}?`
    );

    if (confirmCancel) {
      alert("Appointment cancellation request submitted.");
    }
  };

  // =====================================================
  // BOOK APPOINTMENT
  // =====================================================

  const handleBookAppointment = () => {
    alert(
      "Doctor selection and appointment booking page will be added next."
    );
    navigate("/book-appointment");
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

        .appointments-page {
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

        .appointments-main {
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

        .appointments-content {
          padding: 35px 40px 50px;
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

        .page-header-text h2 {
          margin: 0;

          color: #111b2d;

          font-size: 21px;
        }

        .page-header-text p {
          margin: 6px 0 0;

          color: #8994a5;

          font-size: 13px;
        }


        /* =====================================================
           BOOK BUTTON
        ===================================================== */

        .book-button {
          height: 45px;

          padding: 0 19px;

          display: flex;
          align-items: center;

          gap: 8px;

          border: none;
          border-radius: 8px;

          background: #0f8078;

          color: white;

          font-size: 12px;
          font-weight: 600;

          cursor: pointer;

          transition: 0.2s ease;
        }

        .book-button:hover {
          background: #0b6f68;

          transform: translateY(-1px);
        }


        /* =====================================================
           SUMMARY CARDS
        ===================================================== */

        .summary-grid {
          display: grid;

          grid-template-columns:
            repeat(3, 1fr);

          gap: 18px;

          margin-bottom: 28px;
        }

        .summary-card {
          min-height: 115px;

          padding: 20px;

          display: flex;
          align-items: center;

          gap: 16px;

          background: white;

          border:
            1px solid #e4eaf0;

          border-radius: 11px;
        }

        .summary-icon {
          width: 47px;
          height: 47px;

          flex-shrink: 0;

          display: flex;
          align-items: center;
          justify-content: center;

          border-radius: 10px;

          background: #e6f7f5;

          font-size: 22px;
        }

        .summary-number {
          color: #111b2d;

          font-size: 25px;
          font-weight: 700;
        }

        .summary-title {
          margin-top: 3px;

          color: #536077;

          font-size: 12px;
          font-weight: 600;
        }

        .summary-description {
          margin-top: 4px;

          color: #99a2b1;

          font-size: 10px;
        }


        /* =====================================================
           APPOINTMENT SECTION
        ===================================================== */

        .appointments-card {
          background: white;

          border:
            1px solid #e4eaf0;

          border-radius: 12px;

          overflow: hidden;
        }


        /* =====================================================
           CARD TOP
        ===================================================== */

        .appointments-card-top {
          padding: 20px 22px;

          display: flex;
          align-items: center;
          justify-content: space-between;

          border-bottom:
            1px solid #edf0f4;
        }


        /* =====================================================
           TABS
        ===================================================== */

        .appointment-tabs {
          display: flex;

          gap: 25px;
        }

        .tab-button {
          position: relative;

          padding: 7px 0;

          border: none;

          background: transparent;

          color: #8994a5;

          font-size: 12px;
          font-weight: 600;

          cursor: pointer;
        }

        .tab-button.active {
          color: #087c75;
        }

        .tab-button.active::after {
          content: "";

          position: absolute;

          left: 0;
          right: 0;

          bottom: -21px;

          height: 2px;

          background: #087c75;
        }


        /* =====================================================
           SEARCH
        ===================================================== */

        .search-box {
          width: 230px;
          height: 38px;

          display: flex;
          align-items: center;

          gap: 8px;

          padding: 0 12px;

          border:
            1px solid #dfe5ec;

          border-radius: 7px;

          background: white;
        }

        .search-box span {
          color: #8994a5;

          font-size: 14px;
        }

        .search-box input {
          width: 100%;

          border: none;
          outline: none;

          color: #334155;

          font-size: 11px;
        }

        .search-box input::placeholder {
          color: #a1a9b5;
        }


        /* =====================================================
           APPOINTMENT LIST
        ===================================================== */

        .appointment-list {
          padding: 4px 22px 12px;
        }

        .appointment-item {
          padding: 22px 0;

          display: flex;
          align-items: center;

          gap: 16px;

          border-bottom:
            1px solid #edf0f4;
        }

        .appointment-item:last-child {
          border-bottom: none;
        }


        /* =====================================================
           DOCTOR AVATAR
        ===================================================== */

        .doctor-avatar {
          width: 58px;
          height: 58px;

          flex-shrink: 0;

          display: flex;
          align-items: center;
          justify-content: center;

          border-radius: 12px;

          background: #e6f7f5;

          font-size: 28px;
        }


        /* =====================================================
           APPOINTMENT DETAILS
        ===================================================== */

        .appointment-details {
          flex: 1;
        }

        .doctor-name {
          margin: 0;

          color: #1e293b;

          font-size: 14px;
          font-weight: 700;
        }

        .doctor-specialization {
          margin: 5px 0 0;

          color: #68758a;

          font-size: 11px;
        }

        .appointment-meta {
          margin-top: 8px;

          display: flex;
          align-items: center;

          gap: 9px;

          flex-wrap: wrap;
        }

        .appointment-type {
          color: #536077;

          font-size: 10px;
        }

        .appointment-id {
          color: #9aa3b1;

          font-size: 9px;
        }


        /* =====================================================
           STATUS
        ===================================================== */

        .status-badge {
          display: inline-block;

          padding: 4px 9px;

          border-radius: 12px;

          font-size: 8px;
          font-weight: 700;
        }

        .status-confirmed {
          background: #e9f9f1;

          color: #059669;
        }

        .status-pending {
          background: #fff7e8;

          color: #d97706;
        }

        .status-completed {
          background: #edf2f7;

          color: #64748b;
        }

        .status-cancelled {
          background: #fff0f0;

          color: #dc2626;
        }


        /* =====================================================
           DATE / TIME
        ===================================================== */

        .appointment-date {
          min-width: 125px;

          text-align: center;
        }

        .appointment-date strong {
          display: block;

          color: #263147;

          font-size: 12px;
        }

        .appointment-date span {
          display: block;

          margin-top: 5px;

          color: #087c75;

          font-size: 11px;
          font-weight: 600;
        }


        /* =====================================================
           ACTIONS
        ===================================================== */

        .appointment-actions {
          min-width: 120px;

          display: flex;
          flex-direction: column;

          gap: 7px;
        }

        .action-button {
          height: 32px;

          border-radius: 6px;

          font-size: 9px;
          font-weight: 600;

          cursor: pointer;
        }

        .view-button {
          border:
            1px solid #0f8078;

          background: white;

          color: #0f8078;
        }
        .view-button:hover {
          background: #eefaf8;
        }
        .cancel-button {
          border: 1px solid #f0c8c8;
          background: white;
          color: #dc2626;
        }
        .cancel-button:hover {
          background: #fff4f4;
        }
        /* =====================================================
           EMPTY STATE
        ===================================================== */
        .empty-state {
          padding: 70px 20px;
          text-align: center;
        }
        .empty-icon {
          font-size: 42px;
        }
        .empty-state h3 {
          margin: 15px 0 5px;
          color: #334155;
          font-size: 16px;
        }
        .empty-state p {
          margin: 0;
          color: #9aa3b1;
          font-size: 11px;
        }
        /* =====================================================
           RESPONSIVE
        ===================================================== */
        @media (max-width: 1100px) {
          .patient-sidebar {
            width: 240px;
          }
          .appointments-main {
            width: calc(100% - 240px);
            margin-left: 240px;
          }
          .appointments-content {
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
          .appointment-actions {
            min-width: 95px;
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
          .appointments-main {
            width: calc(100% - 75px);
            margin-left: 75px;
          }
          .profile-info,
          .profile-arrow {
            display: none;
          }
          .summary-grid {
            grid-template-columns:
              repeat(2, 1fr);
          }
          .appointment-item {
            align-items: flex-start;
            flex-wrap: wrap;
          }
          .appointment-date {
            text-align: left;
          }
          .appointment-actions {
            flex-direction: row;
            width: 100%;
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
          .appointments-content {
            padding:
              22px 15px 35px;
          }
          .page-header {
            align-items: flex-start;
            gap: 15px;
            flex-direction: column;
          }
          .summary-grid {
            grid-template-columns: 1fr;
          }
          .appointments-card-top {
            align-items: flex-start;
            gap: 15px;
            flex-direction: column;
          }
          .appointment-tabs {
            width: 100%;
            justify-content: space-between;
          }
          .tab-button.active::after {
            bottom: -10px;
          }
          .search-box {
            width: 100%;
          }
        }
        @media (max-width: 450px) {
          .patient-sidebar {
            width: 62px;
          }
          .appointments-main {
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
          .appointment-item {
            gap: 12px;
          }
          .doctor-avatar {
            width: 48px;
            height: 48px;
            font-size: 22px;
          }
          .appointment-date {
            width: 100%;
          }
          .appointment-actions {
            width: 100%;
          }
          .action-button {
            flex: 1;
          }
        }
      `}</style>
      {/* =====================================================
          PAGE
      ===================================================== */}
      <div className="appointments-page">
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

        <main className="appointments-main">


          {/* =====================================================
              TOPBAR
          ===================================================== */}

          <header className="topbar">


            <div className="topbar-left">

              <h1>
                Appointments
              </h1>

              <p>
                Manage and track your healthcare appointments.
              </p>

            </div>


            <div className="topbar-right">


              {/* Notification */}

              <button
                className="notification-button"
                title="Notifications"
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

          <section className="appointments-content">


            {/* =====================================================
                PAGE HEADER
            ===================================================== */}

            <div className="page-header">

              <div className="page-header-text">

                <h2>
                  My Appointments
                </h2>

                <p>
                  View your upcoming and previous appointments.
                </p>

              </div>


              <button
                className="book-button"
                onClick={handleBookAppointment}
              >

                <span>
                  +
                </span>

                Book New Appointment

              </button>

            </div>


            {/* =====================================================
                SUMMARY
            ===================================================== */}

            <div className="summary-grid">


              <div className="summary-card">

                <div className="summary-icon">
                  📅
                </div>

                <div>

                  <div className="summary-number">
                    2
                  </div>

                  <div className="summary-title">
                    Upcoming
                  </div>

                  <div className="summary-description">
                    Appointments scheduled
                  </div>

                </div>

              </div>


              <div className="summary-card">

                <div className="summary-icon">
                  ✅
                </div>

                <div>

                  <div className="summary-number">
                    1
                  </div>

                  <div className="summary-title">
                    Confirmed
                  </div>

                  <div className="summary-description">
                    Confirmed appointments
                  </div>

                </div>

              </div>


              <div className="summary-card">

                <div className="summary-icon">
                  📋
                </div>

                <div>

                  <div className="summary-number">
                    3
                  </div>

                  <div className="summary-title">
                    Completed
                  </div>

                  <div className="summary-description">
                    Previous appointments
                  </div>

                </div>

              </div>


            </div>


            {/* =====================================================
                APPOINTMENTS CARD
            ===================================================== */}

            <div className="appointments-card">


              {/* CARD TOP */}

              <div className="appointments-card-top">


                {/* TABS */}

                <div className="appointment-tabs">

                  <button
                    className={
                      `tab-button ${
                        activeTab === "Upcoming"
                          ? "active"
                          : ""
                      }`
                    }
                    onClick={() =>
                      setActiveTab("Upcoming")
                    }
                  >
                    Upcoming
                  </button>


                  <button
                    className={
                      `tab-button ${
                        activeTab === "Past"
                          ? "active"
                          : ""
                      }`
                    }
                    onClick={() =>
                      setActiveTab("Past")
                    }
                  >
                    Past Appointments
                  </button>

                </div>


                {/* SEARCH */}

                <div className="search-box">

                  <span>
                    🔍
                  </span>

                  <input
                    type="text"
                    placeholder="Search appointments..."
                    value={searchTerm}
                    onChange={(e) =>
                      setSearchTerm(e.target.value)
                    }
                  />

                </div>

              </div>


              {/* =====================================================
                  APPOINTMENT LIST
              ===================================================== */}

              {filteredAppointments.length > 0 ? (

                <div className="appointment-list">

                  {filteredAppointments.map(
                    (appointment) => (

                      <div
                        className="appointment-item"
                        key={appointment.id}
                      >


                        {/* DOCTOR ICON */}

                        <div className="doctor-avatar">
                          {appointment.icon}
                        </div>


                        {/* DETAILS */}

                        <div className="appointment-details">

                          <h3 className="doctor-name">
                            {appointment.doctor}
                          </h3>

                          <p className="doctor-specialization">
                            {appointment.specialization}
                            {" • "}
                            {appointment.type}
                          </p>


                          <div className="appointment-meta">

                            <span className="appointment-type">
                              📍 {appointment.location}
                            </span>

                            <span className="appointment-id">
                              {appointment.id}
                            </span>


                            <span
                              className={
                                `status-badge ${
                                  appointment.status ===
                                  "Confirmed"
                                    ? "status-confirmed"
                                    : appointment.status ===
                                      "Pending"
                                    ? "status-pending"
                                    : appointment.status ===
                                      "Completed"
                                    ? "status-completed"
                                    : "status-cancelled"
                                }`
                              }
                            >
                              {appointment.status}
                            </span>

                          </div>

                        </div>


                        {/* DATE */}

                        <div className="appointment-date">

                          <strong>
                            {appointment.date}
                          </strong>

                          <span>
                            {appointment.time}
                          </span>

                        </div>


                        {/* ACTIONS */}

                        <div className="appointment-actions">

                          <button
                            className="action-button view-button"
                            onClick={() =>
                              alert(
                                `Appointment: ${appointment.id}\nDoctor: ${appointment.doctor}\nReason: ${appointment.reason}`
                              )
                            }
                          >
                            View Details
                          </button>


                          {activeTab === "Upcoming" &&
                            appointment.status !==
                              "Cancelled" && (

                              <button
                                className="action-button cancel-button"
                                onClick={() =>
                                  handleCancelAppointment(
                                    appointment
                                  )
                                }
                              >
                                Cancel
                              </button>

                            )}

                        </div>


                      </div>

                    )
                  )}

                </div>

              ) : (

                <div className="empty-state">

                  <div className="empty-icon">
                    📅
                  </div>

                  <h3>
                    No Appointments Found
                  </h3>

                  <p>
                    There are no appointments matching your search.
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

export default PatientAppointments;