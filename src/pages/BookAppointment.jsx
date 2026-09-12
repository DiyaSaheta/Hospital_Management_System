import { useState } from "react";
import { useNavigate } from "react-router-dom";

function BookAppointment() {
  const navigate = useNavigate();

  const [activeMenu, setActiveMenu] = useState("Appointments");
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  const [formData, setFormData] = useState({
    doctor: "",
    appointmentType: "",
    date: "",
    time: "",
    reason: "",
  });

  const [selectedDoctor, setSelectedDoctor] = useState(null);

  // =====================================================
  // PATIENT DATA
  // =====================================================

  const patient = {
    name: "Diya Saheta",
    firstName: "Diya",
  };

  // =====================================================
  // DOCTORS
  // Later this data will come from MongoDB
  // =====================================================

  const doctors = [
    {
      id: "DOC-001",
      name: "Dr. Rajesh Mehta",
      specialization: "Cardiologist",
      department: "Cardiology Department",
      experience: "12 Years Experience",
      availability: "Available Today",
      icon: "🩺",
    },
    {
      id: "DOC-002",
      name: "Dr. Priya Sharma",
      specialization: "General Physician",
      department: "General Medicine",
      experience: "9 Years Experience",
      availability: "Available Today",
      icon: "👩‍⚕️",
    },
    {
      id: "DOC-003",
      name: "Dr. Amit Patel",
      specialization: "Dermatologist",
      department: "Dermatology Department",
      experience: "10 Years Experience",
      availability: "Available Tomorrow",
      icon: "👨‍⚕️",
    },
    {
      id: "DOC-004",
      name: "Dr. Neha Shah",
      specialization: "Dentist",
      department: "Dental Department",
      experience: "8 Years Experience",
      availability: "Available Today",
      icon: "🦷",
    },
  ];

  // =====================================================
  // TIME SLOTS
  // =====================================================

  const timeSlots = [
    "09:00 AM",
    "09:30 AM",
    "10:00 AM",
    "10:30 AM",
    "11:00 AM",
    "11:30 AM",
    "12:00 PM",
    "02:00 PM",
    "02:30 PM",
    "03:00 PM",
    "03:30 PM",
    "04:00 PM",
    "04:30 PM",
    "05:00 PM",
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

    // Pages to be created later
    if (menuName === "Doctors") {
      // navigate("/patient-doctors");
    }

    if (menuName === "Medical Records") {
      // navigate("/patient-medical-records");
    }

    if (menuName === "Prescriptions") {
      // navigate("/patient-prescriptions");
    }

    if (menuName === "Profile") {
      // navigate("/patient-profile");
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
  // HANDLE INPUT
  // =====================================================

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // =====================================================
  // SELECT DOCTOR
  // =====================================================

  const handleDoctorSelect = (doctor) => {
    setSelectedDoctor(doctor);

    setFormData({
      ...formData,
      doctor: doctor.id,
    });
  };

  // =====================================================
  // BOOK APPOINTMENT
  // =====================================================

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.doctor) {
      alert("Please select a doctor.");
      return;
    }

    if (!formData.appointmentType) {
      alert("Please select appointment type.");
      return;
    }

    if (!formData.date) {
      alert("Please select an appointment date.");
      return;
    }

    if (!formData.time) {
      alert("Please select an appointment time.");
      return;
    }

    if (!formData.reason.trim()) {
      alert("Please enter the reason for your appointment.");
      return;
    }

    alert(
      `Appointment request submitted successfully!\n\nDoctor: ${
        selectedDoctor.name
      }\nDate: ${formData.date}\nTime: ${
        formData.time
      }`
    );

    navigate("/patient-appointments");
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

        .book-page {
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
           MENU
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

        .book-main {
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

        .book-content {
          padding: 32px 40px 50px;
        }


        /* =====================================================
           BACK BUTTON
        ===================================================== */

        .back-button {
          margin-bottom: 20px;

          padding: 0;

          display: flex;
          align-items: center;

          gap: 7px;

          border: none;

          background: transparent;

          color: #087c75;

          font-size: 12px;
          font-weight: 600;

          cursor: pointer;
        }

        .back-button:hover {
          color: #065f59;
        }


        /* =====================================================
           PAGE HEADER
        ===================================================== */

        .page-heading {
          margin-bottom: 26px;
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
           BOOKING LAYOUT
        ===================================================== */

        .booking-layout {
          display: grid;

          grid-template-columns:
            minmax(0, 1.65fr)
            minmax(300px, 0.8fr);

          gap: 22px;

          align-items: start;
        }


        /* =====================================================
           FORM CARD
        ===================================================== */

        .form-card {
          padding: 28px;

          background: white;

          border:
            1px solid #e3e9ef;

          border-radius: 12px;
        }

        .form-card-title {
          margin: 0 0 6px;

          color: #172236;

          font-size: 17px;
        }

        .form-card-subtitle {
          margin: 0 0 25px;

          color: #8994a5;

          font-size: 11px;
        }


        /* =====================================================
           FORM GROUP
        ===================================================== */

        .form-group {
          margin-bottom: 21px;
        }

        .form-label {
          display: block;

          margin-bottom: 8px;

          color: #263147;

          font-size: 11px;
          font-weight: 700;
        }

        .required {
          color: #ef4444;
        }

        .form-input,
        .form-select,
        .form-textarea {
          width: 100%;

          padding: 0 13px;

          border:
            1px solid #dce3eb;

          border-radius: 7px;

          outline: none;

          background: white;

          color: #334155;

          font-family: inherit;

          font-size: 11px;

          transition: 0.2s ease;
        }

        .form-input,
        .form-select {
          height: 45px;
        }

        .form-textarea {
          height: 100px;

          padding-top: 12px;

          resize: vertical;
        }

        .form-input:focus,
        .form-select:focus,
        .form-textarea:focus {
          border-color: #0f8078;

          box-shadow:
            0 0 0 3px
            rgba(15, 128, 120, 0.08);
        }

        .form-input::placeholder,
        .form-textarea::placeholder {
          color: #a4adba;
        }


        /* =====================================================
           DOCTOR GRID
        ===================================================== */

        .doctor-grid {
          display: grid;

          grid-template-columns:
            repeat(2, 1fr);

          gap: 12px;
        }

        .doctor-option {
          min-height: 105px;

          padding: 14px;

          display: flex;
          align-items: center;

          gap: 12px;

          border:
            1px solid #e0e6ed;

          border-radius: 9px;

          background: white;

          cursor: pointer;

          transition: all 0.2s ease;
        }

        .doctor-option:hover {
          border-color: #8bc9c4;

          background: #f8fdfc;
        }

        .doctor-option.selected {
          border:
            1.5px solid #0f8078;

          background: #f0fbf9;

          box-shadow:
            0 0 0 2px
            rgba(15, 128, 120, 0.05);
        }

        .doctor-icon {
          width: 48px;
          height: 48px;

          flex-shrink: 0;

          display: flex;
          align-items: center;
          justify-content: center;

          border-radius: 10px;

          background: #e5f7f5;

          font-size: 23px;
        }

        .doctor-info {
          min-width: 0;
        }

        .doctor-info h4 {
          margin: 0;

          color: #1e293b;

          font-size: 12px;
        }

        .doctor-info p {
          margin: 5px 0 0;

          color: #6b778b;

          font-size: 9px;
        }

        .doctor-experience {
          margin-top: 6px;

          color: #9aa3b1;

          font-size: 8px;
        }


        /* =====================================================
           APPOINTMENT TYPE
        ===================================================== */

        .type-grid {
          display: grid;

          grid-template-columns:
            repeat(3, 1fr);

          gap: 10px;
        }

        .type-option {
          padding: 12px;

          border:
            1px solid #dfe5ec;

          border-radius: 7px;

          background: white;

          color: #596579;

          font-size: 10px;
          font-weight: 600;

          text-align: center;

          cursor: pointer;
        }

        .type-option:hover {
          border-color: #8bc9c4;
        }

        .type-option.selected {
          border-color: #0f8078;

          background: #eaf8f6;

          color: #087c75;
        }


        /* =====================================================
           DATE TIME GRID
        ===================================================== */

        .date-time-grid {
          display: grid;

          grid-template-columns:
            1fr 1fr;

          gap: 15px;
        }


        /* =====================================================
           BOOKING SUMMARY
        ===================================================== */

        .summary-card {
          position: sticky;

          top: 25px;

          padding: 24px;

          background: white;

          border:
            1px solid #e3e9ef;

          border-radius: 12px;
        }

        .summary-title {
          margin: 0;

          color: #172236;

          font-size: 16px;
        }

        .summary-subtitle {
          margin: 6px 0 22px;

          color: #8994a5;

          font-size: 10px;
        }

        .summary-doctor {
          padding: 16px;

          display: flex;
          align-items: center;

          gap: 12px;

          border-radius: 9px;

          background: #f1faf9;
        }

        .summary-doctor-icon {
          width: 45px;
          height: 45px;

          display: flex;
          align-items: center;
          justify-content: center;

          border-radius: 9px;

          background: #dff4f1;

          font-size: 21px;
        }

        .summary-doctor h4 {
          margin: 0;

          color: #1e293b;

          font-size: 12px;
        }

        .summary-doctor p {
          margin: 4px 0 0;

          color: #718096;

          font-size: 9px;
        }


        /* =====================================================
           SUMMARY DETAILS
        ===================================================== */

        .summary-details {
          margin-top: 20px;
        }

        .summary-row {
          min-height: 42px;

          display: flex;
          align-items: center;
          justify-content: space-between;

          border-bottom:
            1px solid #edf0f4;
        }

        .summary-row:last-child {
          border-bottom: none;
        }

        .summary-row span:first-child {
          color: #8994a5;

          font-size: 10px;
        }

        .summary-row span:last-child {
          max-width: 150px;

          color: #263147;

          font-size: 10px;
          font-weight: 600;

          text-align: right;
        }


        /* =====================================================
           SUBMIT BUTTON
        ===================================================== */

        .submit-button {
          width: 100%;
          height: 47px;

          margin-top: 22px;

          border: none;
          border-radius: 8px;

          background: #0f8078;

          color: white;

          font-size: 12px;
          font-weight: 700;

          cursor: pointer;

          transition: 0.2s ease;
        }

        .submit-button:hover {
          background: #0b6f68;

          transform: translateY(-1px);
        }

        .submit-button:disabled {
          background: #a9c7c4;

          cursor: not-allowed;

          transform: none;
        }


        /* =====================================================
           INFO BOX
        ===================================================== */

        .info-box {
          margin-top: 18px;

          padding: 14px;

          border-radius: 8px;

          background: #f5f9fc;

          color: #728096;

          font-size: 9px;

          line-height: 1.6;
        }

        .info-box strong {
          color: #526077;
        }


        /* =====================================================
           RESPONSIVE
        ===================================================== */

        @media (max-width: 1100px) {

          .patient-sidebar {
            width: 240px;
          }

          .book-main {
            width: calc(100% - 240px);

            margin-left: 240px;
          }

          .book-content {
            padding:
              30px 25px 40px;
          }

          .topbar {
            padding: 0 25px;
          }

        }


        @media (max-width: 950px) {

          .booking-layout {
            grid-template-columns: 1fr;
          }

          .summary-card {
            position: static;
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

          .book-main {
            width: calc(100% - 75px);

            margin-left: 75px;
          }

          .profile-info,
          .profile-arrow {
            display: none;
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

          .book-content {
            padding:
              22px 15px 35px;
          }

          .doctor-grid {
            grid-template-columns: 1fr;
          }

          .type-grid {
            grid-template-columns: 1fr;
          }

          .date-time-grid {
            grid-template-columns: 1fr;
          }

          .form-card {
            padding: 20px;
          }

        }


        @media (max-width: 450px) {

          .patient-sidebar {
            width: 62px;
          }

          .book-main {
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

      <div className="book-page">


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

        <main className="book-main">


          {/* =====================================================
              TOPBAR
          ===================================================== */}

          <header className="topbar">

            <div className="topbar-left">

              <h1>
                Book Appointment
              </h1>

              <p>
                Schedule an appointment with your preferred doctor.
              </p>

            </div>


            <div className="topbar-right">


              {/* Notification */}

              <button
                className="notification-button"
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

          <section className="book-content">


            {/* BACK */}

            <button
              className="back-button"
              onClick={() =>
                navigate("/patient-appointments")
              }
            >
              ← Back to Appointments
            </button>


            {/* HEADING */}

            <div className="page-heading">

              <h2>
                Book a New Appointment
              </h2>

              <p>
                Choose a doctor, select your preferred date and time,
                and provide the reason for your visit.
              </p>

            </div>


            {/* =====================================================
                BOOKING LAYOUT
            ===================================================== */}

            <div className="booking-layout">


              {/* =================================================
                  FORM
              ================================================= */}

              <form
                className="form-card"
                onSubmit={handleSubmit}
              >

                <h3 className="form-card-title">
                  Appointment Details
                </h3>

                <p className="form-card-subtitle">
                  Please fill in the details below to book your appointment.
                </p>


                {/* =================================================
                    SELECT DOCTOR
                ================================================= */}

                <div className="form-group">

                  <label className="form-label">
                    Select Doctor
                    <span className="required">
                      {" "}*
                    </span>
                  </label>


                  <div className="doctor-grid">

                    {doctors.map((doctor) => (

                      <div
                        key={doctor.id}
                        className={
                          `doctor-option ${
                            selectedDoctor?.id === doctor.id
                              ? "selected"
                              : ""
                          }`
                        }
                        onClick={() =>
                          handleDoctorSelect(doctor)
                        }
                      >

                        <div className="doctor-icon">
                          {doctor.icon}
                        </div>


                        <div className="doctor-info">

                          <h4>
                            {doctor.name}
                          </h4>

                          <p>
                            {doctor.specialization}
                          </p>

                          <div className="doctor-experience">
                            {doctor.experience}
                          </div>

                        </div>

                      </div>

                    ))}

                  </div>

                </div>


                {/* =================================================
                    APPOINTMENT TYPE
                ================================================= */}

                <div className="form-group">

                  <label className="form-label">
                    Appointment Type
                    <span className="required">
                      {" "}*
                    </span>
                  </label>


                  <div className="type-grid">


                    <div
                      className={
                        `type-option ${
                          formData.appointmentType ===
                          "Consultation"
                            ? "selected"
                            : ""
                        }`
                      }
                      onClick={() =>
                        setFormData({
                          ...formData,
                          appointmentType:
                            "Consultation",
                        })
                      }
                    >
                      Consultation
                    </div>


                    <div
                      className={
                        `type-option ${
                          formData.appointmentType ===
                          "Follow-up"
                            ? "selected"
                            : ""
                        }`
                      }
                      onClick={() =>
                        setFormData({
                          ...formData,
                          appointmentType:
                            "Follow-up",
                        })
                      }
                    >
                      Follow-up
                    </div>


                    <div
                      className={
                        `type-option ${
                          formData.appointmentType ===
                          "Check-up"
                            ? "selected"
                            : ""
                        }`
                      }
                      onClick={() =>
                        setFormData({
                          ...formData,
                          appointmentType:
                            "Check-up",
                        })
                      }
                    >
                      General Check-up
                    </div>

                  </div>

                </div>


                {/* =================================================
                    DATE AND TIME
                ================================================= */}

                <div className="date-time-grid">


                  {/* DATE */}

                  <div className="form-group">

                    <label className="form-label">
                      Preferred Date
                      <span className="required">
                        {" "}*
                      </span>
                    </label>

                    <input
                      type="date"
                      name="date"
                      className="form-input"
                      value={formData.date}
                      min={
                        new Date()
                          .toISOString()
                          .split("T")[0]
                      }
                      onChange={handleChange}
                    />

                  </div>


                  {/* TIME */}

                  <div className="form-group">

                    <label className="form-label">
                      Preferred Time
                      <span className="required">
                        {" "}*
                      </span>
                    </label>

                    <select
                      name="time"
                      className="form-select"
                      value={formData.time}
                      onChange={handleChange}
                    >

                      <option value="">
                        Select time
                      </option>

                      {timeSlots.map((time) => (

                        <option
                          key={time}
                          value={time}
                        >
                          {time}
                        </option>

                      ))}

                    </select>

                  </div>

                </div>


                {/* =================================================
                    REASON
                ================================================= */}

                <div className="form-group">

                  <label className="form-label">
                    Reason for Visit
                    <span className="required">
                      {" "}*
                    </span>
                  </label>

                  <textarea
                    name="reason"
                    className="form-textarea"
                    placeholder="Briefly describe the reason for your appointment..."
                    value={formData.reason}
                    onChange={handleChange}
                  ></textarea>

                </div>


                {/* SUBMIT */}

                <button
                  type="submit"
                  className="submit-button"
                >
                  Confirm Appointment
                </button>

              </form>


              {/* =================================================
                  SUMMARY
              ================================================= */}

              <div className="summary-card">

                <h3 className="summary-title">
                  Appointment Summary
                </h3>

                <p className="summary-subtitle">
                  Review your appointment details before confirming.
                </p>


                {/* SELECTED DOCTOR */}

                {selectedDoctor ? (

                  <div className="summary-doctor">

                    <div className="summary-doctor-icon">
                      {selectedDoctor.icon}
                    </div>

                    <div>

                      <h4>
                        {selectedDoctor.name}
                      </h4>

                      <p>
                        {selectedDoctor.specialization}
                      </p>

                    </div>

                  </div>

                ) : (

                  <div className="summary-doctor">

                    <div className="summary-doctor-icon">
                      🩺
                    </div>

                    <div>

                      <h4>
                        No Doctor Selected
                      </h4>

                      <p>
                        Select a doctor to continue
                      </p>

                    </div>

                  </div>

                )}


                {/* DETAILS */}

                <div className="summary-details">


                  <div className="summary-row">

                    <span>
                      Appointment Type
                    </span>

                    <span>
                      {formData.appointmentType ||
                        "Not selected"}
                    </span>

                  </div>


                  <div className="summary-row">

                    <span>
                      Date
                    </span>

                    <span>
                      {formData.date ||
                        "Not selected"}
                    </span>

                  </div>


                  <div className="summary-row">

                    <span>
                      Time
                    </span>

                    <span>
                      {formData.time ||
                        "Not selected"}
                    </span>

                  </div>


                  <div className="summary-row">

                    <span>
                      Patient
                    </span>

                    <span>
                      {patient.name}
                    </span>

                  </div>

                </div>


                {/* INFO */}

                <div className="info-box">

                  <strong>
                    Note:
                  </strong>

                  <br />

                  Your appointment request will be sent
                  to the selected doctor. You will receive
                  a notification once the appointment is
                  confirmed.

                </div>


                {/* CONFIRM */}

                <button
                  className="submit-button"
                  onClick={handleSubmit}
                >
                  📅 &nbsp; Book Appointment
                </button>

              </div>

            </div>

          </section>

        </main>

      </div>
    </>
  );
}

export default BookAppointment;