import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function DoctorProfile() {
  const navigate = useNavigate();

  // =====================================================
  // DOCTOR DATA
  // =====================================================
  const [doctor, setDoctor] = useState({
    fullName: "Dr. Ruchit",
    email: "ruchit1109@gmail.com",
    phone: "+91 95126 85134",
    gender: "Male",
    specialization: "Cardiologist",
    qualification: "MBBS, MD",
    experience: "8",
    licenseNumber: "MED110903",
    address: "Ahmedabad, Gujarat",
    about:
      "Experienced medical professional dedicated to providing quality healthcare and personalized treatment to patients.",
  });
  // =====================================================
  // EDIT PROFILE
  // =====================================================

  const [isEditing, setIsEditing] = useState(false);

  // =====================================================
  // ACTIVE MENU
  // =====================================================

  const [activeMenu, setActiveMenu] = useState("Profile");

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
  // MENU NAVIGATION
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
  // HANDLE INPUT
  // =====================================================

  const handleChange = (e) => {
    const { name, value } = e.target;

    setDoctor({
      ...doctor,
      [name]: value,
    });
  };

  // =====================================================
  // SAVE PROFILE
  // =====================================================

  const handleSave = () => {
    setIsEditing(false);

    alert("Profile updated successfully!");
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
  // PROFILE INITIAL
  // =====================================================

  const doctorInitial = doctor.fullName
    .replace("Dr. ", "")
    .charAt(0)
    .toUpperCase();

  // =====================================================
  // JSX
  // =====================================================

  return (
    <>
      {/* =====================================================
          CSS
      ===================================================== */}

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
           PROFILE BUTTON
        ===================================================== */

        .profile-button {
          display: flex;
          align-items: center;

          gap: 10px;

          border: none;

          background: transparent;

          cursor: pointer;
        }

        .profile-avatar-small {
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

        .profile-content {
          padding: 30px 35px 40px;
        }

        /* =====================================================
           PAGE HEADER
        ===================================================== */

        .page-header {
          margin-bottom: 25px;
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

        /* =====================================================
           PROFILE CARD
        ===================================================== */

        .profile-card {
          width: 100%;

          background: #ffffff;

          border: 1px solid #e5e7eb;

          border-radius: 12px;

          overflow: hidden;

          box-shadow:
            0 2px 8px rgba(0, 0, 0, 0.03);
        }

        /* =====================================================
           PROFILE TOP
        ===================================================== */

        .profile-top {
          padding: 30px;

          display: flex;
          align-items: center;

          gap: 22px;

          background: #f0fdfa;

          border-bottom: 1px solid #e2eeee;
        }

        .profile-avatar-large {
          width: 90px;
          height: 90px;

          flex-shrink: 0;

          border-radius: 50%;

          display: flex;
          align-items: center;
          justify-content: center;

          background: #d4f2ee;

          color: #0f766e;

          font-size: 32px;

          font-weight: 700;

          border: 4px solid #ffffff;

          box-shadow:
            0 2px 8px rgba(0, 0, 0, 0.08);
        }

        .profile-main-info h2 {
          margin: 0 0 7px;

          color: #172033;

          font-size: 22px;
        }

        .profile-main-info .specialization {
          margin: 0 0 8px;

          color: #0f766e;

          font-size: 13px;

          font-weight: 600;
        }

        .profile-main-info .license {
          margin: 0;

          color: #7b8492;

          font-size: 11px;
        }

        /* =====================================================
           PROFILE BODY
        ===================================================== */

        .profile-body {
          padding: 30px;
        }

        .section-title {
          margin: 0 0 18px;

          color: #172033;

          font-size: 17px;

          font-weight: 700;
        }

        /* =====================================================
           INFORMATION GRID
        ===================================================== */

        .information-grid {
          display: grid;

          grid-template-columns:
            1fr 1fr;

          gap: 18px;

          margin-bottom: 30px;
        }

        .information-item {
          padding: 16px;

          border: 1px solid #e7e9ed;

          border-radius: 9px;

          background: #ffffff;
        }

        .information-item label {
          display: block;

          margin-bottom: 7px;

          color: #8992a2;

          font-size: 10px;

          font-weight: 600;

          text-transform: uppercase;

          letter-spacing: 0.4px;
        }

        .information-item p {
          margin: 0;

          color: #273247;

          font-size: 13px;

          font-weight: 500;

          word-break: break-word;
        }

        /* =====================================================
           ABOUT
        ===================================================== */

        .about-section {
          margin-bottom: 30px;
        }

        .about-box {
          padding: 18px;

          border-radius: 9px;

          background: #f8fafc;

          border: 1px solid #e7e9ed;
        }

        .about-box p {
          margin: 0;

          color: #596273;

          font-size: 12px;

          line-height: 1.7;
        }

        /* =====================================================
           EDIT BUTTON
        ===================================================== */

        .profile-actions {
          display: flex;

          justify-content: flex-end;

          padding-top: 5px;
        }

        .edit-button {
          padding: 11px 22px;

          border: none;

          border-radius: 7px;

          background: #0f766e;

          color: #ffffff;

          font-size: 11px;

          font-weight: 600;

          cursor: pointer;

          transition: 0.2s ease;
        }

        .edit-button:hover {
          background: #0b625c;
        }

        /* =====================================================
           EDIT FORM
        ===================================================== */

        .edit-form {
          padding: 30px;
        }

        .form-title {
          margin: 0 0 22px;

          color: #172033;

          font-size: 18px;
        }

        .form-grid {
          display: grid;

          grid-template-columns:
            1fr 1fr;

          gap: 17px;
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

        .form-group input,
        .form-group select,
        .form-group textarea {
          width: 100%;

          padding: 10px 12px;

          border: 1px solid #dfe3e8;

          border-radius: 7px;

          outline: none;

          color: #273247;

          background: #ffffff;

          font-family: Arial, Helvetica, sans-serif;

          font-size: 11px;
        }

        .form-group input,
        .form-group select {
          height: 40px;
        }

        .form-group textarea {
          min-height: 90px;

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

          margin-top: 25px;
        }

        .cancel-button {
          padding: 10px 20px;

          border: 1px solid #dfe3e8;

          border-radius: 7px;

          background: #ffffff;

          color: #596273;

          font-size: 11px;

          cursor: pointer;
        }

        .save-button {
          padding: 10px 20px;

          border: none;

          border-radius: 7px;

          background: #0f766e;

          color: #ffffff;

          font-size: 11px;

          font-weight: 600;

          cursor: pointer;
        }

        .save-button:hover {
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

          .doctor-topbar {
            padding: 0 20px;
          }

          .profile-content {
            padding: 25px 20px 40px;
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

          .information-grid,
          .form-grid {
            grid-template-columns: 1fr;
          }

          .form-group.full-width {
            grid-column: auto;
          }

          .profile-top {
            padding: 25px;

            align-items: flex-start;
          }
        }

        @media (max-width: 500px) {

          .profile-content {
            padding: 20px 12px 30px;
          }

          .doctor-topbar {
            height: 75px;

            padding: 0 12px;
          }

          .topbar-title h1 {
            font-size: 18px;
          }

          .topbar-title p {
            display: none;
          }

          .topbar-right {
            gap: 8px;
          }

          .notification-button {
            width: 35px;
            height: 35px;
          }

          .profile-avatar-small {
            width: 35px;
            height: 35px;
          }

          .profile-top {
            flex-direction: column;

            align-items: center;

            text-align: center;
          }

          .profile-body,
          .edit-form {
            padding: 20px;
          }

          .page-header h2 {
            font-size: 23px;
          }
        }

      `}</style>


      {/* =====================================================
          LAYOUT
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

          {/* ===================================================
              TOPBAR
          =================================================== */}

          <header className="doctor-topbar">

            <div className="topbar-title">

              <h1>
                Doctor Profile
              </h1>

              <p>
                View and manage your professional profile.
              </p>

            </div>


            <div className="topbar-right">

              {/* NOTIFICATION */}

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


              {/* PROFILE */}

              <button
                className="profile-button"
                onClick={() =>
                  navigate("/doctor-profile")
                }
              >

                <div className="profile-avatar-small">

                  {doctorInitial}

                </div>

                <div className="profile-info">

                  <strong>
                    {doctor.fullName}
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


          {/* ===================================================
              CONTENT
          =================================================== */}

          <section className="profile-content">

            {/* PAGE HEADER */}

            <div className="page-header">

              <h2>
                My Profile
              </h2>

              <p>
                Manage your personal and professional information.
              </p>

            </div>


            {/* =================================================
                PROFILE CARD
            ================================================= */}

            <div className="profile-card">


              {/* PROFILE HEADER */}

              <div className="profile-top">

                <div className="profile-avatar-large">

                  {doctorInitial}

                </div>

                <div className="profile-main-info">

                  <h2>
                    {doctor.fullName}
                  </h2>

                  <p className="specialization">
                    {doctor.specialization}
                  </p>

                  <p className="license">
                    Medical License:{" "}
                    {doctor.licenseNumber}
                  </p>

                </div>

              </div>


              {!isEditing ? (

                <>
                  {/* =========================================
                      PROFILE INFORMATION
                  ========================================= */}

                  <div className="profile-body">

                    <h3 className="section-title">
                      Personal Information
                    </h3>


                    <div className="information-grid">

                      <div className="information-item">

                        <label>
                          Full Name
                        </label>

                        <p>
                          {doctor.fullName}
                        </p>

                      </div>


                      <div className="information-item">

                        <label>
                          Email Address
                        </label>

                        <p>
                          {doctor.email}
                        </p>

                      </div>


                      <div className="information-item">

                        <label>
                          Phone Number
                        </label>

                        <p>
                          {doctor.phone}
                        </p>

                      </div>


                      <div className="information-item">

                        <label>
                          Gender
                        </label>

                        <p>
                          {doctor.gender}
                        </p>

                      </div>


                      <div className="information-item">

                        <label>
                          Specialization
                        </label>

                        <p>
                          {doctor.specialization}
                        </p>

                      </div>


                      <div className="information-item">

                        <label>
                          Qualification
                        </label>

                        <p>
                          {doctor.qualification}
                        </p>

                      </div>


                      <div className="information-item">

                        <label>
                          Experience
                        </label>

                        <p>
                          {doctor.experience} years
                        </p>

                      </div>


                      <div className="information-item">

                        <label>
                          Medical License
                        </label>

                        <p>
                          {doctor.licenseNumber}
                        </p>

                      </div>


                      <div className="information-item">

                        <label>
                          Address
                        </label>

                        <p>
                          {doctor.address}
                        </p>

                      </div>

                    </div>


                    {/* ABOUT */}

                    <div className="about-section">

                      <h3 className="section-title">
                        About Me
                      </h3>

                      <div className="about-box">

                        <p>
                          {doctor.about}
                        </p>

                      </div>

                    </div>


                    {/* EDIT BUTTON */}

                    <div className="profile-actions">

                      <button
                        className="edit-button"
                        onClick={() =>
                          setIsEditing(true)
                        }
                      >
                        Edit Profile
                      </button>

                    </div>

                  </div>

                </>

              ) : (

                /* =================================================
                   EDIT PROFILE FORM
                ================================================= */

                <div className="edit-form">

                  <h3 className="form-title">
                    Edit Profile
                  </h3>


                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      handleSave();
                    }}
                  >

                    <div className="form-grid">


                      {/* FULL NAME */}

                      <div className="form-group">

                        <label>
                          Full Name
                        </label>

                        <input
                          type="text"
                          name="fullName"
                          value={
                            doctor.fullName
                          }
                          onChange={
                            handleChange
                          }
                        />

                      </div>


                      {/* EMAIL */}

                      <div className="form-group">

                        <label>
                          Email Address
                        </label>

                        <input
                          type="email"
                          name="email"
                          value={
                            doctor.email
                          }
                          onChange={
                            handleChange
                          }
                        />

                      </div>


                      {/* PHONE */}

                      <div className="form-group">

                        <label>
                          Phone Number
                        </label>

                        <input
                          type="text"
                          name="phone"
                          value={
                            doctor.phone
                          }
                          onChange={
                            handleChange
                          }
                        />

                      </div>


                      {/* GENDER */}

                      <div className="form-group">

                        <label>
                          Gender
                        </label>

                        <select
                          name="gender"
                          value={
                            doctor.gender
                          }
                          onChange={
                            handleChange
                          }
                        >

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


                      {/* SPECIALIZATION */}

                      <div className="form-group">

                        <label>
                          Specialization
                        </label>

                        <input
                          type="text"
                          name="specialization"
                          value={
                            doctor.specialization
                          }
                          onChange={
                            handleChange
                          }
                        />

                      </div>


                      {/* QUALIFICATION */}

                      <div className="form-group">

                        <label>
                          Qualification
                        </label>

                        <input
                          type="text"
                          name="qualification"
                          value={
                            doctor.qualification
                          }
                          onChange={
                            handleChange
                          }
                        />

                      </div>


                      {/* EXPERIENCE */}

                      <div className="form-group">

                        <label>
                          Experience (Years)
                        </label>

                        <input
                          type="number"
                          name="experience"
                          min="0"
                          value={
                            doctor.experience
                          }
                          onChange={
                            handleChange
                          }
                        />

                      </div>


                      {/* LICENSE */}

                      <div className="form-group">

                        <label>
                          Medical License
                        </label>

                        <input
                          type="text"
                          name="licenseNumber"
                          value={
                            doctor.licenseNumber
                          }
                          onChange={
                            handleChange
                          }
                        />

                      </div>


                      {/* ADDRESS */}

                      <div className="form-group full-width">

                        <label>
                          Address
                        </label>

                        <input
                          type="text"
                          name="address"
                          value={
                            doctor.address
                          }
                          onChange={
                            handleChange
                          }
                        />

                      </div>


                      {/* ABOUT */}

                      <div className="form-group full-width">

                        <label>
                          About Me
                        </label>

                        <textarea
                          name="about"
                          value={
                            doctor.about
                          }
                          onChange={
                            handleChange
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
                          setIsEditing(false)
                        }
                      >
                        Cancel
                      </button>

                      <button
                        type="submit"
                        className="save-button"
                      >
                        Save Changes
                      </button>

                    </div>

                  </form>

                </div>

              )}

            </div>

          </section>

        </main>

      </div>
    </>
  );
}
export default DoctorProfile;