import { useState } from "react";
import { useNavigate } from "react-router-dom";

function PatientDoctors() {
  const navigate = useNavigate();

  const [activeMenu, setActiveMenu] = useState("Doctors");
  const [searchTerm, setSearchTerm] = useState("");
  const [specialization, setSpecialization] = useState("All");
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  // =====================================================
  // PATIENT DATA
  // =====================================================

  const patient = {
    name: "Diya Saheta",
    firstName: "Diya",
  };

  // =====================================================
  // DOCTORS DATA
  // Later this will come from MongoDB
  // =====================================================

  const doctors = [
    {
      id: "DOC-001",
      name: "Dr. Rajesh Mehta",
      specialization: "Cardiologist",
      department: "Cardiology",
      experience: "12 Years",
      qualification: "MBBS, MD Cardiology",
      availability: "Available Today",
      nextAvailable: "Today, 10:30 AM",
      patients: "1,250+",
      rating: "4.9",
      icon: "🩺",
    },

    {
      id: "DOC-002",
      name: "Dr. Priya Sharma",
      specialization: "General Physician",
      department: "General Medicine",
      experience: "9 Years",
      qualification: "MBBS, MD Medicine",
      availability: "Available Today",
      nextAvailable: "Today, 04:00 PM",
      patients: "980+",
      rating: "4.8",
      icon: "👩‍⚕️",
    },

    {
      id: "DOC-003",
      name: "Dr. Amit Patel",
      specialization: "Dermatologist",
      department: "Dermatology",
      experience: "10 Years",
      qualification: "MBBS, MD Dermatology",
      availability: "Available Tomorrow",
      nextAvailable: "Tomorrow, 11:00 AM",
      patients: "1,100+",
      rating: "4.8",
      icon: "👨‍⚕️",
    },

    {
      id: "DOC-004",
      name: "Dr. Neha Shah",
      specialization: "Dentist",
      department: "Dental",
      experience: "8 Years",
      qualification: "BDS, MDS",
      availability: "Available Today",
      nextAvailable: "Today, 02:30 PM",
      patients: "850+",
      rating: "4.7",
      icon: "🦷",
    },

    {
      id: "DOC-005",
      name: "Dr. Karan Joshi",
      specialization: "Orthopedic",
      department: "Orthopedics",
      experience: "14 Years",
      qualification: "MBBS, MS Orthopedics",
      availability: "Available Tomorrow",
      nextAvailable: "Tomorrow, 09:30 AM",
      patients: "1,400+",
      rating: "4.9",
      icon: "🦴",
    },

    {
      id: "DOC-006",
      name: "Dr. Anjali Desai",
      specialization: "Pediatrician",
      department: "Pediatrics",
      experience: "11 Years",
      qualification: "MBBS, MD Pediatrics",
      availability: "Available Today",
      nextAvailable: "Today, 05:00 PM",
      patients: "1,050+",
      rating: "4.9",
      icon: "👩‍⚕️",
    },
  ];

  // =====================================================
  // SPECIALIZATIONS
  // =====================================================

  const specializations = [
    "All",
    "Cardiologist",
    "General Physician",
    "Dermatologist",
    "Dentist",
    "Orthopedic",
    "Pediatrician",
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
  // BOOK APPOINTMENT
  // =====================================================

  const handleBookAppointment = () => {
    navigate("/book-appointment");
  };

  // =====================================================
  // FILTER DOCTORS
  // =====================================================

  const filteredDoctors = doctors.filter((doctor) => {
    const matchesSearch =
      doctor.name
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      doctor.specialization
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      doctor.department
        .toLowerCase()
        .includes(searchTerm.toLowerCase());

    const matchesSpecialization =
      specialization === "All" ||
      doctor.specialization === specialization;

    return matchesSearch && matchesSpecialization;
  });

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

        .doctors-page {
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

        .doctors-main {
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

        .doctors-content {
          padding: 32px 40px 50px;
        }


        /* =====================================================
           PAGE HEADER
        ===================================================== */

        .page-header {
          display: flex;
          align-items: flex-end;
          justify-content: space-between;

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
           BOOK BUTTON
        ===================================================== */

        .book-button {
          height: 45px;

          padding: 0 20px;

          border: none;
          border-radius: 8px;

          background: #0f8078;

          color: white;

          font-size: 12px;
          font-weight: 700;

          cursor: pointer;

          transition: 0.2s ease;
        }

        .book-button:hover {
          background: #0b6f68;

          transform: translateY(-1px);
        }


        /* =====================================================
           SEARCH / FILTER
        ===================================================== */

        .search-filter-card {
          padding: 20px;

          margin-bottom: 22px;

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

          font-size: 16px;
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
           RESULTS
        ===================================================== */

        .results-header {
          margin-bottom: 14px;

          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .results-header h3 {
          margin: 0;

          color: #172236;

          font-size: 16px;
        }

        .results-count {
          color: #8994a5;

          font-size: 10px;
        }


        /* =====================================================
           DOCTOR GRID
        ===================================================== */

        .doctor-grid {
          display: grid;

          grid-template-columns:
            repeat(3, 1fr);

          gap: 18px;
        }


        /* =====================================================
           DOCTOR CARD
        ===================================================== */

        .doctor-card {
          padding: 20px;

          background: white;

          border:
            1px solid #e3e9ef;

          border-radius: 11px;

          transition:
            transform 0.2s ease,
            box-shadow 0.2s ease,
            border-color 0.2s ease;
        }

        .doctor-card:hover {
          transform: translateY(-2px);

          border-color: #c9e4e1;

          box-shadow:
            0 8px 24px
            rgba(15, 23, 42, 0.07);
        }


        /* =====================================================
           DOCTOR CARD TOP
        ===================================================== */

        .doctor-card-top {
          display: flex;
          align-items: flex-start;

          gap: 13px;
        }

        .doctor-avatar {
          width: 58px;
          height: 58px;

          flex-shrink: 0;

          display: flex;
          align-items: center;
          justify-content: center;

          border-radius: 12px;

          background: #e5f7f5;

          font-size: 28px;
        }

        .doctor-card-info {
          flex: 1;
        }

        .doctor-card-info h3 {
          margin: 3px 0 0;

          color: #1c2739;

          font-size: 14px;
        }

        .doctor-specialization {
          margin: 5px 0 0;

          color: #6f7c90;

          font-size: 10px;
        }


        /* =====================================================
           RATING
        ===================================================== */

        .rating {
          margin-top: 7px;

          display: flex;
          align-items: center;

          gap: 4px;

          color: #66748a;

          font-size: 9px;
        }

        .rating-star {
          color: #f5a623;

          font-size: 12px;
        }


        /* =====================================================
           AVAILABILITY
        ===================================================== */

        .availability {
          margin-top: 17px;

          padding: 8px 10px;

          display: flex;
          align-items: center;
          justify-content: space-between;

          border-radius: 7px;

          background: #f2faf8;
        }

        .availability-label {
          color: #758297;

          font-size: 9px;
        }

        .availability-value {
          color: #087c75;

          font-size: 9px;
          font-weight: 700;
        }


        /* =====================================================
           DOCTOR DETAILS
        ===================================================== */

        .doctor-details {
          margin-top: 15px;

          padding-top: 13px;

          border-top:
            1px solid #edf0f4;
        }

        .detail-row {
          min-height: 27px;

          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .detail-label {
          color: #909aaa;

          font-size: 9px;
        }

        .detail-value {
          color: #445066;

          font-size: 9px;
          font-weight: 600;

          text-align: right;
        }


        /* =====================================================
           CARD BUTTONS
        ===================================================== */

        .card-actions {
          margin-top: 17px;

          display: flex;

          gap: 9px;
        }

        .view-button,
        .card-book-button {
          height: 38px;

          border-radius: 7px;

          font-size: 9px;
          font-weight: 700;

          cursor: pointer;

          transition: 0.2s ease;
        }

        .view-button {
          flex: 1;

          border:
            1px solid #d7e0e8;

          background: white;

          color: #66748a;
        }

        .view-button:hover {
          border-color: #0f8078;

          color: #087c75;
        }

        .card-book-button {
          flex: 1.2;

          border: none;

          background: #0f8078;

          color: white;
        }

        .card-book-button:hover {
          background: #0b6f68;
        }


        /* =====================================================
           NO RESULTS
        ===================================================== */

        .no-results {
          padding: 60px 20px;

          background: white;

          border:
            1px solid #e3e9ef;

          border-radius: 11px;

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

        @media (max-width: 1250px) {

          .doctor-grid {
            grid-template-columns:
              repeat(2, 1fr);
          }

        }


        @media (max-width: 1100px) {

          .patient-sidebar {
            width: 240px;
          }

          .doctors-main {
            width: calc(100% - 240px);

            margin-left: 240px;
          }

          .doctors-content {
            padding:
              30px 25px 40px;
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
            padding:
              25px 10px;
          }

          .menu-item,
          .logout-button {
            justify-content: center;

            padding: 0;
          }

          .doctors-main {
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

          .doctor-grid {
            grid-template-columns: 1fr;
          }

          .page-header {
            flex-direction: column;

            align-items: flex-start;

            gap: 15px;
          }

          .book-button {
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

          .doctors-content {
            padding:
              22px 15px 35px;
          }

        }


        @media (max-width: 450px) {

          .patient-sidebar {
            width: 62px;
          }

          .doctors-main {
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

          .doctor-card {
            padding: 16px;
          }

        }

      `}</style>


      {/* =====================================================
          PAGE
      ===================================================== */}

      <div className="doctors-page">


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

        <main className="doctors-main">


          {/* =====================================================
              TOPBAR
          ===================================================== */}

          <header className="topbar">

            <div className="topbar-left">

              <h1>
                Doctors
              </h1>

              <p>
                Find and connect with the right doctor for your healthcare needs.
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

          <section className="doctors-content">


            {/* PAGE HEADING */}

            <div className="page-header">

              <div className="page-heading">

                <h2>
                  Find a Doctor
                </h2>

                <p>
                  Browse our doctors and choose the one that best suits your needs.
                </p>

              </div>


              <button
                className="book-button"
                onClick={handleBookAppointment}
              >
                + &nbsp; Book Appointment
              </button>

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
                  placeholder="Search by doctor name, specialization or department..."
                  value={searchTerm}
                  onChange={(e) =>
                    setSearchTerm(e.target.value)
                  }
                />

              </div>


              {/* FILTER */}

              <select
                className="filter-select"
                value={specialization}
                onChange={(e) =>
                  setSpecialization(e.target.value)
                }
              >

                {specializations.map((item) => (

                  <option
                    key={item}
                    value={item}
                  >
                    {item === "All"
                      ? "All Specializations"
                      : item}
                  </option>

                ))}

              </select>

            </div>


            {/* =================================================
                RESULTS HEADER
            ================================================= */}

            <div className="results-header">

              <h3>
                Available Doctors
              </h3>

              <span className="results-count">
                {filteredDoctors.length} doctors found
              </span>

            </div>


            {/* =================================================
                DOCTOR CARDS
            ================================================= */}

            {filteredDoctors.length > 0 ? (

              <div className="doctor-grid">

                {filteredDoctors.map((doctor) => (

                  <div
                    className="doctor-card"
                    key={doctor.id}
                  >


                    {/* CARD TOP */}

                    <div className="doctor-card-top">

                      <div className="doctor-avatar">
                        {doctor.icon}
                      </div>

                      <div className="doctor-card-info">

                        <h3>
                          {doctor.name}
                        </h3>

                        <p className="doctor-specialization">
                          {doctor.specialization}
                        </p>


                        {/* RATING */}

                        <div className="rating">

                          <span className="rating-star">
                            ★
                          </span>

                          <strong>
                            {doctor.rating}
                          </strong>

                          <span>
                            ·
                          </span>

                          <span>
                            {doctor.patients} patients
                          </span>

                        </div>

                      </div>

                    </div>


                    {/* AVAILABILITY */}

                    <div className="availability">

                      <span className="availability-label">
                        Availability
                      </span>

                      <span className="availability-value">
                        {doctor.availability}
                      </span>

                    </div>


                    {/* DETAILS */}

                    <div className="doctor-details">


                      <div className="detail-row">

                        <span className="detail-label">
                          Department
                        </span>

                        <span className="detail-value">
                          {doctor.department}
                        </span>

                      </div>


                      <div className="detail-row">

                        <span className="detail-label">
                          Experience
                        </span>

                        <span className="detail-value">
                          {doctor.experience}
                        </span>

                      </div>


                      <div className="detail-row">

                        <span className="detail-label">
                          Qualification
                        </span>

                        <span className="detail-value">
                          {doctor.qualification}
                        </span>

                      </div>


                      <div className="detail-row">

                        <span className="detail-label">
                          Next Available
                        </span>

                        <span className="detail-value">
                          {doctor.nextAvailable}
                        </span>

                      </div>

                    </div>


                    {/* ACTIONS */}

                    <div className="card-actions">

                      <button
                        className="view-button"
                        onClick={() =>
                          alert(
                            `${doctor.name}\n\n${doctor.specialization}\n${doctor.qualification}\n${doctor.experience}`
                          )
                        }
                      >
                        View Details
                      </button>


                      <button
                        className="card-book-button"
                        onClick={handleBookAppointment}
                      >
                        Book Appointment
                      </button>

                    </div>

                  </div>

                ))}

              </div>

            ) : (

              /* =================================================
                 NO RESULTS
              ================================================= */

              <div className="no-results">

                <div className="no-results-icon">
                  🔍
                </div>

                <h3>
                  No doctors found
                </h3>

                <p>
                  Try changing your search or specialization filter.
                </p>

              </div>

            )}

          </section>

        </main>

      </div>
    </>
  );
}

export default PatientDoctors;