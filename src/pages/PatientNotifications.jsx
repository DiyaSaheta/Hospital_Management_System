import { useState } from "react";
import { useNavigate } from "react-router-dom";

function PatientNotifications() {
  const navigate = useNavigate();

  const [activeMenu, setActiveMenu] = useState("");
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  const [notifications, setNotifications] = useState([
    {
      id: 1,
      type: "appointment",
      icon: "🗓️",
      title: "Appointment Confirmed",
      message:
        "Your appointment with Dr. Rajesh Mehta has been confirmed for 18 Aug 2026 at 10:30 AM.",
      time: "10 minutes ago",
      read: false,
    },
    {
      id: 2,
      type: "reminder",
      icon: "🔔",
      title: "Appointment Reminder",
      message:
        "You have an upcoming appointment with Dr. Priya Sharma tomorrow at 04:00 PM.",
      time: "1 hour ago",
      read: false,
    },
    {
      id: 3,
      type: "record",
      icon: "📋",
      title: "Medical Record Updated",
      message:
        "A new medical record has been added to your healthcare profile.",
      time: "Yesterday",
      read: false,
    },
    {
      id: 4,
      type: "prescription",
      icon: "💊",
      title: "New Prescription Available",
      message:
        "Dr. Amit Patel has added a new prescription for your treatment.",
      time: "Yesterday",
      read: true,
    },
    {
      id: 5,
      type: "appointment",
      icon: "🗓️",
      title: "Appointment Completed",
      message:
        "Your appointment with Dr. Rajesh Mehta has been marked as completed.",
      time: "2 days ago",
      read: true,
    },
  ]);

  const unreadCount = notifications.filter(
    (notification) => !notification.read
  ).length;

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

  // Sidebar navigation
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

  // Mark one notification as read
  const markAsRead = (id) => {
    setNotifications(
      notifications.map((notification) =>
        notification.id === id
          ? { ...notification, read: true }
          : notification
      )
    );
  };

  // Mark all notifications as read
  const markAllAsRead = () => {
    setNotifications(
      notifications.map((notification) => ({
        ...notification,
        read: true,
      }))
    );
  };

  // Delete notification
  const deleteNotification = (id) => {
    setNotifications(
      notifications.filter(
        (notification) => notification.id !== id
      )
    );
  };

  // Clear all notifications
  const clearAllNotifications = () => {
    const confirmClear = window.confirm(
      "Are you sure you want to clear all notifications?"
    );

    if (confirmClear) {
      setNotifications([]);
    }
  };

  // Logout
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    navigate("/login");
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

        .notifications-page {
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
          top: 0;
          left: 0;
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
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 12px;
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

        .notifications-main {
          width: calc(100% - 288px);
          min-height: 100vh;
          margin-left: 288px;
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
          border: 1px solid #d9e2ea;
          border-radius: 11px;
          background: #eaf8f6;
          font-size: 21px;
          cursor: pointer;
        }

        .notification-dot {
          position: absolute;
          top: 9px;
          right: 9px;
          min-width: 16px;
          height: 16px;
          padding: 0 3px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 50%;
          background: #ef4444;
          color: white;
          border: 2px solid white;
          font-size: 8px;
          font-weight: bold;
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

        .notifications-content {
          padding: 32px 40px 50px;
        }

        .page-header {
          margin-bottom: 25px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 20px;
        }

        .page-heading {
          display: flex;
          align-items: center;
          gap: 14px;
        }

        .heading-icon {
          width: 50px;
          height: 50px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 12px;
          background: #e5f7f5;
          font-size: 23px;
        }

        .page-heading h2 {
          margin: 0;
          color: #172236;
          font-size: 22px;
        }

        .page-heading p {
          margin: 6px 0 0;
          color: #8994a5;
          font-size: 13px;
        }

        .header-actions {
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .mark-all-button {
          height: 43px;
          padding: 0 17px;
          border: 1px solid #0f8078;
          border-radius: 8px;
          background: white;
          color: #087c75;
          font-size: 11px;
          font-weight: 700;
          cursor: pointer;
        }

        .mark-all-button:hover {
          background: #eaf8f6;
        }

        .clear-all-button {
          height: 43px;
          padding: 0 17px;
          border: 1px solid #f2c9c9;
          border-radius: 8px;
          background: white;
          color: #dc2626;
          font-size: 11px;
          font-weight: 700;
          cursor: pointer;
        }

        .clear-all-button:hover {
          background: #fff5f5;
        }

        /* ================= SUMMARY ================= */

        .notification-summary {
          margin-bottom: 22px;
          padding: 20px 25px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          background: linear-gradient(135deg, #176f6a, #29958c);
          border-radius: 12px;
          color: white;
          overflow: hidden;
          position: relative;
        }

        .notification-summary::after {
          content: "";
          position: absolute;
          width: 180px;
          height: 180px;
          right: -50px;
          top: -100px;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.08);
        }

        .summary-left {
          position: relative;
          z-index: 1;
        }

        .summary-left h3 {
          margin: 0;
          font-size: 17px;
        }

        .summary-left p {
          margin: 7px 0 0;
          color: rgba(255, 255, 255, 0.78);
          font-size: 12px;
        }

        .summary-count {
          width: 70px;
          height: 70px;
          position: relative;
          z-index: 1;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.12);
          border: 1px solid rgba(255, 255, 255, 0.18);
        }

        .summary-count strong {
          font-size: 25px;
        }

        .summary-count span {
          margin-top: 2px;
          font-size: 9px;
          color: rgba(255, 255, 255, 0.8);
        }

        /* ================= NOTIFICATIONS CARD ================= */

        .notifications-card {
          overflow: hidden;
          background: white;
          border: 1px solid #e3e9ef;
          border-radius: 12px;
        }

        .notifications-card-header {
          padding: 20px 25px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          border-bottom: 1px solid #edf0f4;
        }

        .notifications-card-header h3 {
          margin: 0;
          color: #172236;
          font-size: 16px;
        }

        .notification-total {
          padding: 6px 11px;
          border-radius: 20px;
          background: #eaf8f6;
          color: #087c75;
          font-size: 10px;
          font-weight: 700;
        }

        /* ================= NOTIFICATION ITEM ================= */

        .notification-item {
          padding: 20px 25px;
          display: flex;
          align-items: flex-start;
          gap: 17px;
          border-bottom: 1px solid #edf0f4;
          transition: 0.2s ease;
        }

        .notification-item:last-child {
          border-bottom: none;
        }

        .notification-item:hover {
          background: #fafcfd;
        }

        .notification-item.unread {
          background: #f3fbfa;
        }

        .notification-item.unread:hover {
          background: #edf9f7;
        }

        .notification-icon {
          width: 48px;
          height: 48px;
          flex-shrink: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 12px;
          background: #e7f5f4;
          font-size: 22px;
        }

        .notification-body {
          flex: 1;
          min-width: 0;
        }

        .notification-top {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 15px;
        }

        .notification-title-wrapper {
          display: flex;
          align-items: center;
          gap: 9px;
        }

        .notification-title {
          margin: 0;
          color: #263147;
          font-size: 14px;
          font-weight: 700;
        }

        .unread-indicator {
          width: 8px;
          height: 8px;
          flex-shrink: 0;
          border-radius: 50%;
          background: #0f8078;
        }

        .notification-time {
          flex-shrink: 0;
          color: #9aa4b3;
          font-size: 10px;
        }

        .notification-message {
          margin: 8px 0 0;
          max-width: 800px;
          color: #6c788a;
          font-size: 12px;
          line-height: 1.6;
        }

        .notification-actions {
          margin-top: 13px;
          display: flex;
          gap: 10px;
        }

        .read-button {
          height: 30px;
          padding: 0 12px;
          border: 1px solid #bcdedb;
          border-radius: 6px;
          background: white;
          color: #087c75;
          font-size: 10px;
          font-weight: 600;
          cursor: pointer;
        }

        .read-button:hover {
          background: #eaf8f6;
        }

        .delete-button {
          height: 30px;
          padding: 0 12px;
          border: 1px solid #f3d0d0;
          border-radius: 6px;
          background: white;
          color: #dc2626;
          font-size: 10px;
          font-weight: 600;
          cursor: pointer;
        }

        .delete-button:hover {
          background: #fff5f5;
        }

        /* ================= EMPTY STATE ================= */

        .empty-notifications {
          padding: 75px 20px;
          text-align: center;
        }

        .empty-icon {
          width: 75px;
          height: 75px;
          margin: 0 auto 17px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 50%;
          background: #eaf8f6;
          font-size: 32px;
        }

        .empty-notifications h3 {
          margin: 0;
          color: #263147;
          font-size: 17px;
        }

        .empty-notifications p {
          margin: 8px 0 0;
          color: #8994a5;
          font-size: 12px;
        }

        /* ================= RESPONSIVE ================= */

        @media (max-width: 1100px) {
          .patient-sidebar {
            width: 240px;
          }

          .notifications-main {
            width: calc(100% - 240px);
            margin-left: 240px;
          }

          .topbar {
            padding: 0 25px;
          }

          .notifications-content {
            padding: 30px 25px 40px;
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

          .notifications-main {
            width: calc(100% - 75px);
            margin-left: 75px;
          }

          .profile-info,
          .profile-arrow {
            display: none;
          }
        }

        @media (max-width: 700px) {
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
            gap: 10px;
          }

          .notification-button {
            width: 40px;
            height: 40px;
          }

          .profile-avatar {
            width: 40px;
            height: 40px;
          }

          .notifications-content {
            padding: 22px 15px 35px;
          }

          .page-header {
            align-items: flex-start;
            flex-direction: column;
          }

          .header-actions {
            width: 100%;
          }

          .mark-all-button,
          .clear-all-button {
            flex: 1;
          }

          .notification-summary {
            padding: 20px;
          }

          .notification-item {
            padding: 18px;
          }

          .notification-top {
            align-items: flex-start;
            flex-direction: column;
            gap: 6px;
          }

          .notification-time {
            margin-left: 0;
          }
        }

        @media (max-width: 500px) {
          .patient-sidebar {
            width: 62px;
          }

          .notifications-main {
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

          .page-heading {
            align-items: flex-start;
          }

          .heading-icon {
            width: 45px;
            height: 45px;
            flex-shrink: 0;
          }

          .page-heading h2 {
            font-size: 19px;
          }

          .notification-summary {
            align-items: flex-start;
          }

          .summary-count {
            width: 60px;
            height: 60px;
          }

          .notification-icon {
            width: 42px;
            height: 42px;
            font-size: 18px;
          }
        }
      `}</style>

      <div className="notifications-page">

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
              <span className="menu-icon">↪</span>

              <span>Logout</span>
            </button>

          </div>

        </aside>

        {/* ================= MAIN ================= */}

        <main className="notifications-main">

          {/* ================= TOPBAR ================= */}

          <header className="topbar">

            <div className="topbar-left">
              <h1>Notifications</h1>

              <p>
                Stay updated with your healthcare activities.
              </p>
            </div>

            <div className="topbar-right">

              <button
                className="notification-button"
                onClick={() => navigate("/patient-notifications")}
              >
                🔔

                {unreadCount > 0 && (
                  <span className="notification-dot">
                    {unreadCount}
                  </span>
                )}
              </button>

              <div className="profile-wrapper">

                <button
                  className="profile-button"
                  onClick={() =>
                    setShowProfileMenu(!showProfileMenu)
                  }
                >
                  <div className="profile-avatar">
                    D
                  </div>

                  <div className="profile-info">
                    <strong>Diya Saheta</strong>
                    <span>Patient</span>
                  </div>

                  <span className="profile-arrow">
                    ▾
                  </span>
                </button>

                {showProfileMenu && (
                  <div className="profile-dropdown">

                    <button
                      onClick={() =>
                        navigate("/patient-profile")
                      }
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

          {/* ================= CONTENT ================= */}

          <section className="notifications-content">

            {/* PAGE HEADER */}

            <div className="page-header">

              <div className="page-heading">

                <div className="heading-icon">
                  🔔
                </div>

                <div>
                  <h2>My Notifications</h2>

                  <p>
                    View all your appointment and healthcare updates.
                  </p>
                </div>

              </div>

              {notifications.length > 0 && (
                <div className="header-actions">

                  <button
                    className="mark-all-button"
                    onClick={markAllAsRead}
                  >
                    ✓ Mark All as Read
                  </button>

                  <button
                    className="clear-all-button"
                    onClick={clearAllNotifications}
                  >
                    🗑 Clear All
                  </button>

                </div>
              )}

            </div>

            {/* SUMMARY */}

            {notifications.length > 0 && (
              <div className="notification-summary">

                <div className="summary-left">
                  <h3>
                    You have {unreadCount} unread notification
                    {unreadCount !== 1 ? "s" : ""}
                  </h3>

                  <p>
                    Stay informed about your appointments, medical
                    records and prescriptions.
                  </p>
                </div>

                <div className="summary-count">
                  <strong>{unreadCount}</strong>
                  <span>UNREAD</span>
                </div>

              </div>
            )}

            {/* NOTIFICATIONS LIST */}

            <div className="notifications-card">

              <div className="notifications-card-header">

                <h3>
                  Recent Notifications
                </h3>

                <span className="notification-total">
                  {notifications.length} Total
                </span>

              </div>

              {notifications.length > 0 ? (

                notifications.map((notification) => (

                  <div
                    key={notification.id}
                    className={`notification-item ${
                      !notification.read ? "unread" : ""
                    }`}
                  >

                    <div className="notification-icon">
                      {notification.icon}
                    </div>

                    <div className="notification-body">

                      <div className="notification-top">

                        <div className="notification-title-wrapper">

                          <h4 className="notification-title">
                            {notification.title}
                          </h4>

                          {!notification.read && (
                            <span className="unread-indicator"></span>
                          )}

                        </div>

                        <span className="notification-time">
                          {notification.time}
                        </span>

                      </div>

                      <p className="notification-message">
                        {notification.message}
                      </p>

                      <div className="notification-actions">

                        {!notification.read && (
                          <button
                            className="read-button"
                            onClick={() =>
                              markAsRead(notification.id)
                            }
                          >
                            ✓ Mark as Read
                          </button>
                        )}

                        <button
                          className="delete-button"
                          onClick={() =>
                            deleteNotification(notification.id)
                          }
                        >
                          🗑 Delete
                        </button>

                      </div>

                    </div>

                  </div>

                ))

              ) : (

                <div className="empty-notifications">

                  <div className="empty-icon">
                    🔔
                  </div>

                  <h3>
                    No Notifications
                  </h3>

                  <p>
                    You are all caught up! New notifications will
                    appear here.
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
export default PatientNotifications;