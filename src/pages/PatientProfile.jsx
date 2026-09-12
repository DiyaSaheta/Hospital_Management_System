import { useState } from "react";
import { useNavigate } from "react-router-dom";

function PatientProfile() {
  const navigate = useNavigate();

  const [activeMenu, setActiveMenu] = useState("Profile");
  const [isEditing, setIsEditing] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  // Patient profile data
  const [profile, setProfile] = useState({
    fullName: "Diya Saheta",
    email: "diya@example.com",
    phone: "+91 93163 99490",
    dateOfBirth: "2003-05-08",
    gender: "Female",
    bloodGroup: "O+",
    address: "Gujarat, India",
    emergencyName: "Family Member",
    emergencyRelation: "Family",
    emergencyPhone: "+91 90000 00000",
  });

  // Temporary data while editing
  const [editProfile, setEditProfile] = useState(profile);

  // Sidebar menu
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

  // Handle sidebar navigation
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

  // Handle logout
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    navigate("/login");
  };

  // Start editing
  const handleEdit = () => {
    setEditProfile(profile);
    setIsEditing(true);
  };

  // Cancel editing
  const handleCancel = () => {
    setEditProfile(profile);
    setIsEditing(false);
  };

  // Save profile
  const handleSave = () => {
    setProfile(editProfile);
    setIsEditing(false);

    alert("Profile updated successfully!");
  };

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;

    setEditProfile({
      ...editProfile,
      [name]: value,
    });
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

        .profile-page {
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

        .profile-main {
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

        .profile-content {
          padding: 32px 40px 50px;
        }

        .page-header {
          margin-bottom: 25px;
          display: flex;
          align-items: center;
          justify-content: space-between;
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

        .edit-profile-button {
          height: 45px;
          padding: 0 22px;
          border: none;
          border-radius: 8px;
          background: #0f8078;
          color: white;
          font-size: 12px;
          font-weight: 700;
          cursor: pointer;
        }

        .edit-profile-button:hover {
          background: #0b7069;
        }

        /* ================= PROFILE HEADER CARD ================= */

        .profile-card {
          margin-bottom: 22px;
          overflow: hidden;
          background: white;
          border: 1px solid #e3e9ef;
          border-radius: 12px;
        }

        .profile-banner {
          height: 130px;
          position: relative;
          background: linear-gradient(
            135deg,
            #176f6a,
            #29958c
          );
          overflow: hidden;
        }

        .profile-banner::before {
          content: "";
          position: absolute;
          width: 250px;
          height: 250px;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.07);
          top: -130px;
          right: 50px;
        }

        .profile-banner::after {
          content: "";
          position: absolute;
          width: 160px;
          height: 160px;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.08);
          bottom: -100px;
          right: 250px;
        }

        .profile-main-info {
          min-height: 145px;
          padding: 0 35px 25px;
          display: flex;
          align-items: flex-end;
          gap: 20px;
        }

        .large-avatar {
          width: 110px;
          height: 110px;
          margin-top: -55px;
          flex-shrink: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          border: 5px solid white;
          border-radius: 50%;
          background: #d9f5f2;
          color: #087c75;
          font-size: 35px;
          font-weight: 700;
          box-shadow: 0 4px 15px rgba(15, 23, 42, 0.12);
        }

        .patient-basic-info {
          flex: 1;
          padding-bottom: 3px;
        }

        .patient-basic-info h2 {
          margin: 0;
          color: #172236;
          font-size: 22px;
        }

        .patient-basic-info p {
          margin: 7px 0 0;
          color: #8994a5;
          font-size: 12px;
        }

        .patient-id {
          margin-top: 10px;
          display: inline-block;
          padding: 6px 11px;
          border-radius: 6px;
          background: #edf8f6;
          color: #087c75;
          font-size: 9px;
          font-weight: 700;
        }

        /* ================= DETAILS GRID ================= */

        .details-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 22px;
        }

        .details-card {
          padding: 25px;
          background: white;
          border: 1px solid #e3e9ef;
          border-radius: 12px;
        }

        .details-card.full-width {
          grid-column: 1 / -1;
        }

        .card-title {
          margin: 0 0 22px;
          padding-bottom: 14px;
          display: flex;
          align-items: center;
          gap: 9px;
          color: #172236;
          border-bottom: 1px solid #edf0f4;
          font-size: 16px;
        }

        .card-title-icon {
          width: 34px;
          height: 34px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 8px;
          background: #e5f7f5;
          font-size: 16px;
        }

        .info-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 20px 25px;
        }

        .info-group {
          min-width: 0;
        }

        .info-group.full {
          grid-column: 1 / -1;
        }

        .info-label {
          margin-bottom: 7px;
          display: block;
          color: #9aa4b3;
          font-size: 10px;
          font-weight: 700;
          text-transform: uppercase;
        }

        .info-value {
          color: #334155;
          font-size: 13px;
          font-weight: 500;
          word-break: break-word;
        }

        .profile-input,
        .profile-select {
          width: 100%;
          height: 42px;
          padding: 0 12px;
          border: 1px solid #dce3eb;
          border-radius: 7px;
          outline: none;
          color: #334155;
          background: white;
          font-family: inherit;
          font-size: 12px;
        }

        .profile-input:focus,
        .profile-select:focus {
          border-color: #0f8078;
          box-shadow: 0 0 0 3px rgba(15, 128, 120, 0.08);
        }

        .profile-input[type="date"] {
          color: #596579;
        }

        /* ================= EMERGENCY CARD ================= */

        .emergency-card {
          grid-column: 1 / -1;
          padding: 25px;
          background: white;
          border: 1px solid #e3e9ef;
          border-radius: 12px;
        }

        .emergency-note {
          margin: -8px 0 20px;
          color: #8994a5;
          font-size: 11px;
        }

        .emergency-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 20px;
        }

        /* ================= ACTION BUTTONS ================= */

        .edit-actions {
          margin-top: 25px;
          display: flex;
          justify-content: flex-end;
          gap: 12px;
        }

        .cancel-button,
        .save-button {
          height: 44px;
          padding: 0 24px;
          border-radius: 8px;
          font-size: 12px;
          font-weight: 700;
          cursor: pointer;
        }

        .cancel-button {
          border: 1px solid #dce3eb;
          background: white;
          color: #66748a;
        }

        .cancel-button:hover {
          background: #f7f9fb;
        }

        .save-button {
          border: none;
          background: #0f8078;
          color: white;
        }

        .save-button:hover {
          background: #0b7069;
        }

        /* ================= RESPONSIVE ================= */

        @media (max-width: 1100px) {
          .patient-sidebar {
            width: 240px;
          }

          .profile-main {
            width: calc(100% - 240px);
            margin-left: 240px;
          }

          .profile-content {
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

          .profile-main {
            width: calc(100% - 75px);
            margin-left: 75px;
          }

          .profile-info,
          .profile-arrow {
            display: none;
          }

          .details-grid {
            grid-template-columns: 1fr;
          }

          .emergency-grid {
            grid-template-columns: 1fr;
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

          .profile-content {
            padding: 22px 15px 35px;
          }

          .page-header {
            align-items: flex-start;
            flex-direction: column;
            gap: 15px;
          }

          .profile-main-info {
            padding: 0 20px 25px;
            flex-direction: column;
            align-items: flex-start;
          }

          .large-avatar {
            margin-top: -55px;
          }

          .details-card,
          .emergency-card {
            padding: 20px;
          }

          .info-grid {
            grid-template-columns: 1fr;
          }

          .info-group.full {
            grid-column: auto;
          }
        }

        @media (max-width: 450px) {
          .patient-sidebar {
            width: 62px;
          }

          .profile-main {
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

          .edit-profile-button {
            width: 100%;
          }

          .edit-actions {
            flex-direction: column;
          }

          .cancel-button,
          .save-button {
            width: 100%;
          }
        }
      `}</style>

      <div className="profile-page">

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

        {/* ================= MAIN CONTENT ================= */}

        <main className="profile-main">

          {/* ================= TOPBAR ================= */}

          <header className="topbar">

            <div className="topbar-left">
              <h1>My Profile</h1>

              <p>
                Manage your personal and healthcare information.
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
                    {profile.fullName.charAt(0)}
                  </div>

                  <div className="profile-info">
                    <strong>{profile.fullName}</strong>
                    <span>Patient</span>
                  </div>

                  <span className="profile-arrow">
                    ▾
                  </span>
                </button>

                {showProfileMenu && (
                  <div className="profile-dropdown">

                    <button
                      onClick={() => {
                        setShowProfileMenu(false);
                      }}
                    >
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

          {/* ================= PAGE CONTENT ================= */}

          <section className="profile-content">

            {/* ================= PAGE HEADER ================= */}

            <div className="page-header">

              <div className="page-heading">
                <h2>Patient Profile</h2>

                <p>
                  View and update your personal information.
                </p>
              </div>

              {!isEditing && (
                <button
                  className="edit-profile-button"
                  onClick={handleEdit}
                >
                  ✏ Edit Profile
                </button>
              )}

            </div>

            {/* ================= PROFILE CARD ================= */}

            <div className="profile-card">

              <div className="profile-banner"></div>

              <div className="profile-main-info">

                <div className="large-avatar">
                  {profile.fullName.charAt(0)}
                </div>

                <div className="patient-basic-info">

                  <h2>
                    {profile.fullName}
                  </h2>

                  <p>
                    {profile.email}
                  </p>

                  <span className="patient-id">
                    Patient ID: PAT-2026-001
                  </span>

                </div>

              </div>

            </div>

            {/* ================= DETAILS ================= */}

            <div className="details-grid">

              {/* PERSONAL INFORMATION */}

              <div className="details-card">

                <h3 className="card-title">
                  <span className="card-title-icon">
                    👤
                  </span>

                  Personal Information
                </h3>

                <div className="info-grid">

                  {/* FULL NAME */}

                  <div className="info-group">
                    <span className="info-label">
                      Full Name
                    </span>

                    {isEditing ? (
                      <input
                        type="text"
                        name="fullName"
                        value={editProfile.fullName}
                        onChange={handleChange}
                        className="profile-input"
                      />
                    ) : (
                      <div className="info-value">
                        {profile.fullName}
                      </div>
                    )}
                  </div>

                  {/* DATE OF BIRTH */}

                  <div className="info-group">
                    <span className="info-label">
                      Date of Birth
                    </span>

                    {isEditing ? (
                      <input
                        type="date"
                        name="dateOfBirth"
                        value={editProfile.dateOfBirth}
                        onChange={handleChange}
                        className="profile-input"
                      />
                    ) : (
                      <div className="info-value">
                        {profile.dateOfBirth}
                      </div>
                    )}
                  </div>

                  {/* GENDER */}

                  <div className="info-group">
                    <span className="info-label">
                      Gender
                    </span>

                    {isEditing ? (
                      <select
                        name="gender"
                        value={editProfile.gender}
                        onChange={handleChange}
                        className="profile-select"
                      >
                        <option value="Female">
                          Female
                        </option>

                        <option value="Male">
                          Male
                        </option>

                        <option value="Other">
                          Other
                        </option>
                      </select>
                    ) : (
                      <div className="info-value">
                        {profile.gender}
                      </div>
                    )}
                  </div>

                  {/* BLOOD GROUP */}

                  <div className="info-group">
                    <span className="info-label">
                      Blood Group
                    </span>

                    {isEditing ? (
                      <select
                        name="bloodGroup"
                        value={editProfile.bloodGroup}
                        onChange={handleChange}
                        className="profile-select"
                      >
                        <option value="A+">A+</option>
                        <option value="A-">A-</option>
                        <option value="B+">B+</option>
                        <option value="B-">B-</option>
                        <option value="AB+">AB+</option>
                        <option value="AB-">AB-</option>
                        <option value="O+">O+</option>
                        <option value="O-">O-</option>
                      </select>
                    ) : (
                      <div className="info-value">
                        {profile.bloodGroup}
                      </div>
                    )}
                  </div>

                </div>

              </div>

              {/* CONTACT INFORMATION */}

              <div className="details-card">

                <h3 className="card-title">
                  <span className="card-title-icon">
                    📞
                  </span>

                  Contact Information
                </h3>

                <div className="info-grid">

                  {/* EMAIL */}

                  <div className="info-group">
                    <span className="info-label">
                      Email Address
                    </span>

                    {isEditing ? (
                      <input
                        type="email"
                        name="email"
                        value={editProfile.email}
                        onChange={handleChange}
                        className="profile-input"
                      />
                    ) : (
                      <div className="info-value">
                        {profile.email}
                      </div>
                    )}
                  </div>

                  {/* PHONE */}

                  <div className="info-group">
                    <span className="info-label">
                      Phone Number
                    </span>

                    {isEditing ? (
                      <input
                        type="text"
                        name="phone"
                        value={editProfile.phone}
                        onChange={handleChange}
                        className="profile-input"
                      />
                    ) : (
                      <div className="info-value">
                        {profile.phone}
                      </div>
                    )}
                  </div>

                  {/* ADDRESS */}

                  <div className="info-group full">
                    <span className="info-label">
                      Address
                    </span>

                    {isEditing ? (
                      <input
                        type="text"
                        name="address"
                        value={editProfile.address}
                        onChange={handleChange}
                        className="profile-input"
                      />
                    ) : (
                      <div className="info-value">
                        {profile.address}
                      </div>
                    )}
                  </div>

                </div>

              </div>

              {/* EMERGENCY CONTACT */}

              <div className="emergency-card">

                <h3 className="card-title">
                  <span className="card-title-icon">
                    🚨
                  </span>

                  Emergency Contact
                </h3>

                <p className="emergency-note">
                  This person can be contacted in case of a medical emergency.
                </p>

                <div className="emergency-grid">

                  {/* CONTACT NAME */}

                  <div className="info-group">
                    <span className="info-label">
                      Contact Name
                    </span>

                    {isEditing ? (
                      <input
                        type="text"
                        name="emergencyName"
                        value={editProfile.emergencyName}
                        onChange={handleChange}
                        className="profile-input"
                      />
                    ) : (
                      <div className="info-value">
                        {profile.emergencyName}
                      </div>
                    )}
                  </div>

                  {/* RELATION */}

                  <div className="info-group">
                    <span className="info-label">
                      Relationship
                    </span>

                    {isEditing ? (
                      <input
                        type="text"
                        name="emergencyRelation"
                        value={editProfile.emergencyRelation}
                        onChange={handleChange}
                        className="profile-input"
                      />
                    ) : (
                      <div className="info-value">
                        {profile.emergencyRelation}
                      </div>
                    )}
                  </div>

                  {/* PHONE */}

                  <div className="info-group">
                    <span className="info-label">
                      Phone Number
                    </span>

                    {isEditing ? (
                      <input
                        type="text"
                        name="emergencyPhone"
                        value={editProfile.emergencyPhone}
                        onChange={handleChange}
                        className="profile-input"
                      />
                    ) : (
                      <div className="info-value">
                        {profile.emergencyPhone}
                      </div>
                    )}
                  </div>

                </div>

              </div>

            </div>

            {/* ================= EDIT ACTIONS ================= */}

            {isEditing && (

              <div className="edit-actions">

                <button
                  className="cancel-button"
                  onClick={handleCancel}
                >
                  Cancel
                </button>

                <button
                  className="save-button"
                  onClick={handleSave}
                >
                  ✓ Save Changes
                </button>

              </div>

            )}

          </section>

        </main>

      </div>
    </>
  );
}

export default PatientProfile;