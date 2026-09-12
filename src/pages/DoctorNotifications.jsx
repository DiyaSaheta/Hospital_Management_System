import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function DoctorNotifications() {
  const navigate = useNavigate();

  // =====================================================
  // NOTIFICATIONS DATA
  // =====================================================

  const [notifications, setNotifications] = useState([
    {
      id: 1,
      type: "appointment",
      icon: "📅",
      title: "New Appointment Request",
      message:
        "A new appointment request has been received from a patient.",
      time: "10 minutes ago",
      unread: true,
    },
    {
      id: 2,
      type: "appointment",
      icon: "📅",
      title: "Upcoming Appointment",
      message:
        "You have an appointment with Rahul Sharma today at 11:30 AM.",
      time: "1 hour ago",
      unread: true,
    },
    {
      id: 3,
      type: "patient",
      icon: "👤",
      title: "New Patient Added",
      message:
        "A new patient has been assigned to you for consultation.",
      time: "3 hours ago",
      unread: true,
    },
    {
      id: 4,
      type: "record",
      icon: "📋",
      title: "Medical Record Updated",
      message:
        "The medical record of Priya Shah has been updated.",
      time: "Yesterday",
      unread: false,
    },
    {
      id: 5,
      type: "prescription",
      icon: "💊",
      title: "Prescription Reminder",
      message:
        "Please review the prescription details for your recent consultation.",
      time: "Yesterday",
      unread: false,
    },
    {
      id: 6,
      type: "system",
      icon: "🔔",
      title: "System Notification",
      message:
        "Your doctor profile information has been successfully verified.",
      time: "2 days ago",
      unread: false,
    },
  ]);

  // =====================================================
  // ACTIVE SIDEBAR MENU
  // =====================================================

  const [activeMenu, setActiveMenu] =
    useState("Notifications");

  // =====================================================
  // SIDEBAR MENU ITEMS
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
  // MARK SINGLE NOTIFICATION AS READ
  // =====================================================

  const markAsRead = (id) => {
    setNotifications((previous) =>
      previous.map((notification) =>
        notification.id === id
          ? {
              ...notification,
              unread: false,
            }
          : notification
      )
    );
  };

  // =====================================================
  // MARK ALL AS READ
  // =====================================================

  const markAllAsRead = () => {
    setNotifications((previous) =>
      previous.map((notification) => ({
        ...notification,
        unread: false,
      }))
    );
  };

  // =====================================================
  // DELETE NOTIFICATION
  // =====================================================

  const deleteNotification = (id) => {
    setNotifications((previous) =>
      previous.filter(
        (notification) => notification.id !== id
      )
    );
  };

  // =====================================================
  // CLEAR ALL NOTIFICATIONS
  // =====================================================

  const clearAllNotifications = () => {
    setNotifications([]);
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
  // UNREAD COUNT
  // =====================================================

  const unreadCount = notifications.filter(
    (notification) => notification.unread
  ).length;

  // =====================================================
  // DOCTOR INFO
  // =====================================================

  const doctorName = "Dr. Ruchit";
  const doctorSpecialization = "Cardiologist";

  const doctorInitial = doctorName
    .replace("Dr. ", "")
    .charAt(0)
    .toUpperCase();

  // =====================================================
  // JSX
  // =====================================================

  return (
    <>
      {/* =================================================
          CSS
      ================================================= */}

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

        /* =================================================
           MAIN LAYOUT
        ================================================= */

        .doctor-layout {
          width: 100%;
          min-height: 100vh;

          display: flex;

          background: #f5f8fc;
        }

        /* =================================================
           SIDEBAR
        ================================================= */

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

        /* =================================================
           BRAND
        ================================================= */

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

          color: #ffffff;

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

        /* =================================================
           SIDEBAR MENU
        ================================================= */

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

        /* =================================================
           SIDEBAR BOTTOM
        ================================================= */

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

        /* =================================================
           MAIN
        ================================================= */

        .doctor-main {
          width: calc(100% - 250px);

          min-height: 100vh;

          margin-left: 250px;
        }

        /* =================================================
           TOPBAR
        ================================================= */

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

        /* =================================================
           TOPBAR RIGHT
        ================================================= */

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

          background: #ffffff;

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

          border: 1px solid #ffffff;
        }

        /* =================================================
           PROFILE BUTTON
        ================================================= */

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

        /* =================================================
           CONTENT
        ================================================= */

        .notification-content {
          padding: 30px 35px 40px;
        }

        /* =================================================
           PAGE HEADER
        ================================================= */

        .page-header {
          margin-bottom: 25px;

          display: flex;
          align-items: flex-end;
          justify-content: space-between;

          gap: 20px;
        }

        .page-header-left h2 {
          margin: 0 0 8px;

          color: #172033;

          font-size: 28px;
        }

        .page-header-left p {
          margin: 0;

          color: #6b7280;

          font-size: 14px;
        }

        .page-header-actions {
          display: flex;

          align-items: center;

          gap: 10px;
        }

        .unread-badge {
          padding: 7px 12px;

          border-radius: 20px;

          background: #e8f8f6;

          color: #0f766e;

          font-size: 11px;

          font-weight: 600;
        }

        .mark-all-button {
          padding: 9px 15px;

          border: 1px solid #dfe3e8;

          border-radius: 7px;

          background: #ffffff;

          color: #0f766e;

          font-size: 11px;

          font-weight: 600;

          cursor: pointer;

          transition: 0.2s ease;
        }

        .mark-all-button:hover {
          background: #f0fdfa;

          border-color: #0f766e;
        }

        /* =================================================
           NOTIFICATION CARD
        ================================================= */

        .notification-card {
          width: 100%;

          display: flex;
          align-items: flex-start;

          gap: 16px;

          padding: 20px;

          margin-bottom: 12px;

          background: #ffffff;

          border: 1px solid #e5e7eb;

          border-radius: 10px;

          transition: all 0.2s ease;
        }

        .notification-card:hover {
          border-color: #cfd7df;

          box-shadow:
            0 3px 10px rgba(0, 0, 0, 0.04);
        }

        .notification-card.unread {
          background: #f8fdfc;

          border-left: 3px solid #0f766e;
        }

        /* =================================================
           NOTIFICATION ICON
        ================================================= */

        .notification-icon {
          width: 45px;
          height: 45px;

          flex-shrink: 0;

          border-radius: 10px;

          display: flex;
          align-items: center;
          justify-content: center;

          background: #e8f8f6;

          font-size: 19px;
        }

        /* =================================================
           NOTIFICATION DETAILS
        ================================================= */

        .notification-details {
          flex: 1;

          min-width: 0;
        }

        .notification-title-row {
          display: flex;

          align-items: center;

          gap: 8px;

          margin-bottom: 6px;
        }

        .notification-title {
          margin: 0;

          color: #273247;

          font-size: 14px;

          font-weight: 700;
        }

        .unread-dot {
          width: 7px;
          height: 7px;

          flex-shrink: 0;

          border-radius: 50%;

          background: #0f766e;
        }

        .notification-message {
          margin: 0 0 8px;

          color: #697386;

          font-size: 12px;

          line-height: 1.6;
        }

        .notification-time {
          color: #9aa2af;

          font-size: 10px;
        }

        /* =================================================
           NOTIFICATION ACTIONS
        ================================================= */

        .notification-actions {
          display: flex;

          align-items: center;

          gap: 7px;
        }

        .read-button,
        .delete-button {
          width: 32px;
          height: 32px;

          border: 1px solid #e4e8ed;

          border-radius: 7px;

          background: #ffffff;

          display: flex;
          align-items: center;
          justify-content: center;

          cursor: pointer;

          font-size: 13px;

          transition: 0.2s ease;
        }

        .read-button {
          color: #0f766e;
        }

        .read-button:hover {
          background: #e8f8f6;

          border-color: #0f766e;
        }

        .delete-button {
          color: #dc2626;
        }

        .delete-button:hover {
          background: #fef2f2;

          border-color: #fecaca;
        }

        /* =================================================
           EMPTY STATE
        ================================================= */

        .empty-state {
          min-height: 300px;

          display: flex;
          flex-direction: column;

          align-items: center;
          justify-content: center;

          padding: 40px;

          background: #ffffff;

          border: 1px solid #e5e7eb;

          border-radius: 12px;

          text-align: center;
        }

        .empty-icon {
          width: 65px;
          height: 65px;

          margin-bottom: 15px;

          border-radius: 50%;

          display: flex;
          align-items: center;
          justify-content: center;

          background: #f0fdfa;

          font-size: 27px;
        }

        .empty-state h3 {
          margin: 0 0 7px;

          color: #273247;

          font-size: 17px;
        }

        .empty-state p {
          margin: 0;

          color: #8a93a3;

          font-size: 12px;
        }

        /* =================================================
           RESPONSIVE
        ================================================= */

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

          .notification-content {
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

          .page-header {
            align-items: flex-start;

            flex-direction: column;
          }

          .page-header-actions {
            width: 100%;

            justify-content: space-between;
          }

        }

        @media (max-width: 600px) {

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

          .notification-card {
            padding: 15px;

            gap: 11px;
          }

          .notification-icon {
            width: 40px;
            height: 40px;

            font-size: 16px;
          }

          .notification-title {
            font-size: 12px;
          }

          .notification-message {
            font-size: 11px;
          }

          .notification-actions {
            flex-direction: column;
          }

        }

        @media (max-width: 450px) {

          .notification-content {
            padding: 20px 12px 30px;
          }

          .page-header-left h2 {
            font-size: 23px;
          }

          .notification-card {
            align-items: flex-start;
          }

          .notification-actions {
            gap: 5px;
          }

          .read-button,
          .delete-button {
            width: 28px;
            height: 28px;

            font-size: 11px;
          }

        }

      `}</style>


      {/* =================================================
          MAIN LAYOUT
      ================================================= */}

      <div className="doctor-layout">

        {/* =================================================
            SIDEBAR
        ================================================= */}

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


        {/* =================================================
            MAIN CONTENT
        ================================================= */}

        <main className="doctor-main">

          {/* =================================================
              TOPBAR
          ================================================= */}

          <header className="doctor-topbar">

            <div className="topbar-title">

              <h1>
                Notifications
              </h1>

              <p>
                Stay updated with your appointments and patients.
              </p>

            </div>


            <div className="topbar-right">

              {/* Notification Button */}

              <button
                className="notification-button"
                title="Notifications"
              >

                🔔

                {unreadCount > 0 && (
                  <span className="notification-dot"></span>
                )}

              </button>


              {/* Doctor Profile */}

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
                    {doctorName}
                  </strong>

                  <span>
                    {doctorSpecialization}
                  </span>

                </div>

                <span>
                  ▾
                </span>

              </button>

            </div>

          </header>


          {/* =================================================
              NOTIFICATION CONTENT
          ================================================= */}

          <section className="notification-content">

            {/* PAGE HEADER */}

            <div className="page-header">

              <div className="page-header-left">

                <h2>
                  Notifications
                </h2>

                <p>
                  View your latest notifications and updates.
                </p>

              </div>


              <div className="page-header-actions">

                {unreadCount > 0 && (

                  <span className="unread-badge">
                    {unreadCount} Unread
                  </span>

                )}

                {unreadCount > 0 && (

                  <button
                    className="mark-all-button"
                    onClick={markAllAsRead}
                  >
                    Mark All as Read
                  </button>

                )}

                {notifications.length > 0 && (

                  <button
                    className="mark-all-button"
                    onClick={clearAllNotifications}
                  >
                    Clear All
                  </button>

                )}

              </div>

            </div>


            {/* =================================================
                NOTIFICATIONS LIST
            ================================================= */}

            {notifications.length > 0 ? (

              <div className="notifications-list">

                {notifications.map(
                  (notification) => (

                    <div
                      key={notification.id}
                      className={
                        `notification-card ${
                          notification.unread
                            ? "unread"
                            : ""
                        }`
                      }
                    >

                      {/* ICON */}

                      <div className="notification-icon">

                        {notification.icon}

                      </div>


                      {/* DETAILS */}

                      <div className="notification-details">

                        <div className="notification-title-row">

                          <h3 className="notification-title">

                            {notification.title}

                          </h3>

                          {notification.unread && (

                            <span
                              className="unread-dot"
                              title="Unread"
                            ></span>

                          )}

                        </div>


                        <p className="notification-message">

                          {notification.message}

                        </p>


                        <span className="notification-time">

                          {notification.time}

                        </span>

                      </div>


                      {/* ACTIONS */}

                      <div className="notification-actions">

                        {notification.unread && (

                          <button
                            className="read-button"
                            title="Mark as read"
                            onClick={() =>
                              markAsRead(
                                notification.id
                              )
                            }
                          >
                            ✓
                          </button>

                        )}

                        <button
                          className="delete-button"
                          title="Delete notification"
                          onClick={() =>
                            deleteNotification(
                              notification.id
                            )
                          }
                        >
                          ×
                        </button>

                      </div>

                    </div>

                  )
                )}

              </div>

            ) : (

              /* =================================================
                 EMPTY STATE
              ================================================= */

              <div className="empty-state">

                <div className="empty-icon">
                  🔔
                </div>

                <h3>
                  No Notifications
                </h3>

                <p>
                  You're all caught up! There are no new notifications.
                </p>

              </div>

            )}

          </section>

        </main>

      </div>
    </>
  );
}

export default DoctorNotifications;