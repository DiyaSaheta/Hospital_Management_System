import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function PatientDashboard() {
  const navigate = useNavigate();

  const [activeMenu, setActiveMenu] =
    useState("Dashboard");

  const [showProfileMenu, setShowProfileMenu] =
    useState(false);

  // ==================================================
  // PATIENT DATA
  // ==================================================

  const [patient, setPatient] = useState({
    name: "Diya",
    firstName: "Diya",
    patientId: "PAT-2026-001",
    email: "",
  });

  // ==================================================
  // DASHBOARD STATISTICS
  // ==================================================

  const [dashboardStats, setDashboardStats] =
    useState([
      {
        icon: "📅",
        title: "Upcoming Appointments",
        value: 0,
        description: "Appointments scheduled",
      },
      {
        icon: "📋",
        title: "Medical Records",
        value: 0,
        description: "Records available",
      },
      {
        icon: "💊",
        title: "Prescriptions",
        value: 0,
        description: "Active prescriptions",
      },
      {
        icon: "🩺",
        title: "Doctors Visited",
        value: 0,
        description: "Doctors consulted",
      },
    ]);

  // ==================================================
  // DATA
  // ==================================================

  const [appointments, setAppointments] =
    useState([]);

  const [medicalRecords, setMedicalRecords] =
    useState([]);

  const [prescriptions, setPrescriptions] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  // ==================================================
  // FETCH PATIENT DASHBOARD DATA
  // ==================================================

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);

        // ------------------------------------------
        // GET LOGGED-IN USER
        // ------------------------------------------

        let user = null;

        const storedUser =
          localStorage.getItem("user");

        if (storedUser) {
          try {
            user = JSON.parse(storedUser);
          } catch (error) {
            console.error(
              "Error parsing logged-in user:",
              error
            );
          }
        }

        console.log(
          "Logged-in User:",
          user
        );

        // ------------------------------------------
        // GET USER ID
        // ------------------------------------------

        const userId =
          localStorage.getItem("userId") ||
          user?._id ||
          user?.id;

        console.log(
          "Logged-in User ID:",
          userId
        );

        // ------------------------------------------
        // SHOW NAME IMMEDIATELY FROM LOGIN DATA
        // ------------------------------------------

        if (user) {
          const loggedInName =
            user.name ||
            user.fullName ||
            user.username ||
            (
              `${user.firstName || ""} ${
                user.lastName || ""
              }`
            ).trim() ||
            "Patient";

          setPatient((previous) => ({
            ...previous,

            name: loggedInName,

            firstName:
              loggedInName.split(" ")[0],

            email:
              user.email ||
              previous.email ||
              "",
          }));
        }

        // ------------------------------------------
        // USER ID NOT AVAILABLE
        // ------------------------------------------

        if (!userId) {
          console.warn(
            "User ID not found in localStorage."
          );

          setLoading(false);
          return;
        }

        // ------------------------------------------
        // GET DATA FROM BACKEND
        // ------------------------------------------

        const response = await fetch(
          `http://localhost:5000/api/patient/dashboard/${userId}`
        );

        const data = await response.json();

        console.log(
          "Patient Dashboard API Response:",
          data
        );

        if (!response.ok) {
          console.error(
            data.message ||
              "Failed to fetch dashboard data."
          );

          setLoading(false);
          return;
        }

        // ==================================================
        // PATIENT INFORMATION FROM DATABASE
        // ==================================================

        if (data.patient) {
          const databasePatient =
            data.patient;

          const patientName =
            databasePatient.name ||
            databasePatient.fullName ||
            (
              `${databasePatient.firstName || ""} ${
                databasePatient.lastName || ""
              }`
            ).trim() ||
            user?.name ||
            user?.fullName ||
            user?.username ||
            "Patient";

          setPatient({
            name: patientName,

            firstName:
              patientName.split(" ")[0],

            patientId:
              databasePatient.patientId ||
              databasePatient._id ||
              "Not Available",

            email:
              databasePatient.email ||
              user?.email ||
              "",
          });
        }

        // ==================================================
        // DASHBOARD STATISTICS
        // ==================================================

        if (data.stats) {
          setDashboardStats([
            {
              icon: "📅",
              title:
                "Upcoming Appointments",
              value:
                data.stats
                  .upcomingAppointments ||
                0,
              description:
                "Appointments scheduled",
            },

            {
              icon: "📋",
              title:
                "Medical Records",
              value:
                data.stats
                  .medicalRecords ||
                0,
              description:
                "Records available",
            },

            {
              icon: "💊",
              title:
                "Prescriptions",
              value:
                data.stats
                  .prescriptions ||
                0,
              description:
                "Active prescriptions",
            },

            {
              icon: "🩺",
              title:
                "Doctors Visited",
              value:
                data.stats
                  .doctorsVisited ||
                0,
              description:
                "Doctors consulted",
            },
          ]);
        }

        // ==================================================
        // APPOINTMENTS
        // ==================================================

        if (
          Array.isArray(
            data.appointments
          )
        ) {
          setAppointments(
            data.appointments
          );
        }

        // ==================================================
        // MEDICAL RECORDS
        // ==================================================

        if (
          Array.isArray(
            data.medicalRecords
          )
        ) {
          setMedicalRecords(
            data.medicalRecords
          );
        }

        // ==================================================
        // PRESCRIPTIONS
        // ==================================================

        if (
          Array.isArray(
            data.prescriptions
          )
        ) {
          setPrescriptions(
            data.prescriptions
          );
        }
      } catch (error) {
        console.error(
          "Patient Dashboard Error:",
          error
        );
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  // ==================================================
  // FORMAT DATE
  // ==================================================

  const formatDate = (date) => {
    if (!date) {
      return "-";
    }

    try {
      const parsedDate =
        new Date(date);

      if (
        isNaN(
          parsedDate.getTime()
        )
      ) {
        return date;
      }

      return parsedDate.toLocaleDateString(
        "en-GB",
        {
          day: "2-digit",
          month: "short",
          year: "numeric",
        }
      );
    } catch (error) {
      return date;
    }
  };

  // ==================================================
  // MENU ITEMS
  // ==================================================

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

  // ==================================================
  // HANDLE MENU CLICK
  // ==================================================

  const handleMenuClick = (
    menuName
  ) => {
    setActiveMenu(menuName);

    if (
      menuName === "Dashboard"
    ) {
      navigate(
        "/patient-dashboard"
      );
    }

    if (
      menuName === "Appointments"
    ) {
      navigate(
        "/patient-appointments"
      );
    }

    if (
      menuName === "Doctors"
    ) {
      navigate(
        "/patient-doctors"
      );
    }

    if (
      menuName === "Medical Records"
    ) {
      navigate(
        "/patient-medical-records"
      );
    }

    if (
      menuName === "Prescriptions"
    ) {
      navigate(
        "/patient-prescriptions"
      );
    }

    if (
      menuName === "Profile"
    ) {
      navigate(
        "/patient-profile"
      );
    }
  };

  // ==================================================
  // QUICK ACTIONS
  // ==================================================

  const handleQuickAction = (
    action
  ) => {
    if (
      action === "appointment"
    ) {
      navigate(
        "/book-appointment"
      );
    }

    if (
      action === "doctor"
    ) {
      navigate(
        "/patient-doctors"
      );
    }

    if (
      action === "records"
    ) {
      navigate(
        "/patient-medical-records"
      );
    }

    if (
      action === "prescription"
    ) {
      navigate(
        "/patient-prescriptions"
      );
    }
  };

  // ==================================================
  // LOGOUT
  // ==================================================

  const handleLogout = () => {
    localStorage.removeItem(
      "token"
    );

    localStorage.removeItem(
      "user"
    );

    localStorage.removeItem(
      "userId"
    );

    localStorage.removeItem(
      "userRole"
    );

    localStorage.removeItem(
      "loggedInUser"
    );

    sessionStorage.removeItem(
      "user"
    );

    navigate("/login");
  };

  // ==================================================
  // CSS
  // ==================================================

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

        .patient-dashboard {
          width: 100%;
          min-height: 100vh;
          display: flex;
          background: #f5f8fc;
        }

        /* ==================================================
           SIDEBAR
        ================================================== */

        .patient-sidebar {
          width: 250px;
          min-height: 100vh;
          background: #ffffff;
          border-right: 1px solid #e5eaf0;
          position: fixed;
          left: 0;
          top: 0;
          bottom: 0;
          z-index: 100;
          display: flex;
          flex-direction: column;
        }

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

        .sidebar-bottom {
          padding: 15px;
          border-top: 1px solid #eef1f5;
        }

        .logout-button {
          width: 100%;
          height: 43px;
          display: flex;
          align-items: center;
          gap: 13px;
          padding: 0 13px;
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

        /* ==================================================
           MAIN
        ================================================== */

        .patient-main {
          width: calc(100% - 250px);
          margin-left: 250px;
          min-height: 100vh;
        }

        .patient-topbar {
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
          border-radius: 50%;
          background: #ef4444;
          top: 8px;
          right: 8px;
          border: 1px solid white;
        }

        /* ==================================================
           PROFILE
        ================================================== */

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

        .profile-dropdown {
          position: absolute;
          right: 0;
          top: 52px;
          width: 170px;
          padding: 8px;
          background: white;
          border: 1px solid #e5eaf0;
          border-radius: 10px;
          box-shadow: 0 10px 25px rgba(15, 23, 42, 0.12);
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

        /* ==================================================
           CONTENT
        ================================================== */

        .dashboard-content {
          padding: 30px 35px 45px;
        }

        .welcome-banner {
          width: 100%;
          padding: 28px 30px;
          border-radius: 14px;
          background: linear-gradient(110deg, #0f766e, #11998e);
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
          width: 220px;
          height: 220px;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.08);
          right: 40px;
          top: -110px;
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

        .patient-id {
          margin-top: 14px;
          display: inline-block;
          padding: 6px 11px;
          border-radius: 6px;
          background: rgba(255, 255, 255, 0.14);
          font-size: 10px;
        }

        .welcome-icon {
          width: 90px;
          height: 90px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          background: rgba(255, 255, 255, 0.12);
          font-size: 45px;
          position: relative;
          z-index: 2;
        }

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

        /* ==================================================
           STAT CARDS
        ================================================== */

        .stats-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 17px;
        }

        .stat-card {
          padding: 20px;
          border: 1px solid #e8ecf1;
          border-radius: 12px;
          background: white;
          transition: 0.2s ease;
        }

        .stat-card:hover {
          transform: translateY(-2px);
          box-shadow: 0 7px 20px rgba(15, 23, 42, 0.06);
        }

        .stat-top {
          display: flex;
          align-items: center;
          justify-content: space-between;
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

        /* ==================================================
           GRID
        ================================================== */

        .dashboard-grid {
          display: grid;
          grid-template-columns: 1.5fr 1fr;
          gap: 20px;
        }

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

        /* ==================================================
           APPOINTMENTS
        ================================================== */

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

        .doctor-avatar {
          width: 45px;
          height: 45px;
          border-radius: 10px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: #e8f8f6;
          font-size: 22px;
          flex-shrink: 0;
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

        .appointment-date {
          text-align: right;
        }

        .appointment-date strong {
          display: block;
          color: #344054;
          font-size: 11px;
        }

        .appointment-date span {
          display: block;
          margin-top: 4px;
          color: #0f766e;
          font-size: 10px;
          font-weight: 600;
        }

        .confirmed-badge {
          margin-top: 5px;
          display: inline-block;
          padding: 3px 7px;
          border-radius: 10px;
          background: #ecfdf5;
          color: #059669;
          font-size: 8px;
          font-weight: 600;
        }

        /* ==================================================
           QUICK ACTIONS
        ================================================== */

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
          display: flex;
          align-items: center;
          justify-content: center;
          background: #e8f8f6;
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

        /* ==================================================
           RECORDS
        ================================================== */

        .records-card {
          margin-top: 20px;
        }

        .records-table-wrapper {
          overflow-x: auto;
        }

        .records-table {
          width: 100%;
          border-collapse: collapse;
        }

        .records-table th {
          padding: 13px 20px;
          background: #fafbfc;
          color: #8992a2;
          font-size: 9px;
          font-weight: 600;
          text-align: left;
          text-transform: uppercase;
        }

        .records-table td {
          padding: 14px 20px;
          border-top: 1px solid #f0f2f5;
          color: #475166;
          font-size: 11px;
        }

        .records-table td:first-child {
          color: #263146;
          font-weight: 600;
        }

        .record-type {
          display: inline-block;
          padding: 4px 8px;
          border-radius: 5px;
          background: #f0fdfa;
          color: #0f766e;
          font-size: 9px;
        }

        .record-view {
          border: none;
          background: transparent;
          color: #0f766e;
          font-size: 10px;
          font-weight: 600;
          cursor: pointer;
        }

        /* ==================================================
           PRESCRIPTIONS
        ================================================== */

        .prescription-card {
          margin-top: 20px;
        }

        .prescription-list {
          padding: 5px 20px;
        }

        .prescription-item {
          display: flex;
          align-items: center;
          gap: 14px;
          padding: 14px 0;
          border-bottom: 1px solid #f0f2f5;
        }

        .prescription-item:last-child {
          border-bottom: none;
        }

        .medicine-icon {
          width: 40px;
          height: 40px;
          border-radius: 9px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: #fff7ed;
          font-size: 18px;
        }

        .medicine-info {
          flex: 1;
        }

        .medicine-info strong {
          display: block;
          color: #344054;
          font-size: 11px;
        }

        .medicine-info span {
          display: block;
          margin-top: 4px;
          color: #929aa8;
          font-size: 9px;
        }

        .medicine-duration {
          color: #0f766e;
          font-size: 10px;
          font-weight: 600;
        }

        /* ==================================================
           RESPONSIVE
        ================================================== */

        @media (max-width: 1200px) {

          .stats-grid {
            grid-template-columns: repeat(2, 1fr);
          }

          .dashboard-grid {
            grid-template-columns: 1fr;
          }

        }

        @media (max-width: 900px) {

          .patient-sidebar {
            width: 210px;
          }

          .patient-main {
            width: calc(100% - 210px);
            margin-left: 210px;
          }

          .dashboard-content {
            padding: 25px 20px 40px;
          }

          .patient-topbar {
            padding: 0 20px;
          }

          .profile-info {
            display: none;
          }

        }

        @media (max-width: 700px) {

          .patient-sidebar {
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

          .patient-main {
            width: calc(100% - 70px);
            margin-left: 70px;
          }

          .patient-topbar {
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

          .appointment-date {
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


      {/* ==================================================
          MAIN DASHBOARD
      ================================================== */}

      <div className="patient-dashboard">


        {/* ==================================================
            SIDEBAR
        ================================================== */}

        <aside className="patient-sidebar">

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


          <div className="sidebar-menu">

            <div className="menu-title">
              Main Menu
            </div>

            {menuItems.map(
              (item) => (

                <button
                  key={item.name}
                  className={`menu-item ${
                    activeMenu === item.name
                      ? "active"
                      : ""
                  }`}
                  onClick={() =>
                    handleMenuClick(
                      item.name
                    )
                  }
                >

                  <span className="menu-icon">
                    {item.icon}
                  </span>

                  <span>
                    {item.name}
                  </span>

                </button>

              )
            )}

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


        {/* ==================================================
            MAIN
        ================================================== */}

        <main className="patient-main">


          {/* ==================================================
              HEADER
          ================================================== */}

          <header className="patient-topbar">

            <div className="topbar-title">

              <h1>
                Patient Dashboard
              </h1>

              <p>
                Manage your healthcare from one place.
              </p>

            </div>


            <div className="topbar-right">


              {/* NOTIFICATION */}

              <button
                className="notification-button"
                title="Notifications"
                onClick={() =>
                  navigate(
                    "/patient-notifications"
                  )
                }
              >

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

                    {patient.firstName
                      ? patient.firstName
                          .charAt(0)
                          .toUpperCase()
                      : "P"}

                  </div>

                  <div className="profile-info">

                    <strong>
                      {patient.name}
                    </strong>

                    <span>
                      Patient
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
                        handleMenuClick(
                          "Profile"
                        )
                      }
                    >
                      👤 &nbsp; My Profile
                    </button>

                    <button
                      onClick={
                        handleLogout
                      }
                    >
                      ↪ &nbsp; Logout
                    </button>

                  </div>

                )}

              </div>

            </div>

          </header>


          {/* ==================================================
              CONTENT
          ================================================== */}

          <section className="dashboard-content">


            {/* ==================================================
                WELCOME
            ================================================== */}

            <div className="welcome-banner">

              <div className="welcome-content">

                <h2>
                  Welcome,{" "}
                  {patient.firstName}! 👋
                </h2>

                <p>
                  Here's an overview of your healthcare
                  activities and upcoming appointments.
                </p>

                <span className="patient-id">
                  Patient ID:{" "}
                  {patient.patientId}
                </span>

              </div>

              <div className="welcome-icon">
                🏥
              </div>

            </div>


            {/* ==================================================
                OVERVIEW
            ================================================== */}

            <div className="section-header">

              <h3>
                Overview
              </h3>

            </div>


            <div className="stats-grid">

              {dashboardStats.map(
                (stat) => (

                  <div
                    className="stat-card"
                    key={stat.title}
                  >

                    <div className="stat-top">

                      <div className="stat-icon">
                        {stat.icon}
                      </div>

                    </div>

                    <div className="stat-number">

                      {loading
                        ? "..."
                        : stat.value}

                    </div>

                    <div className="stat-title">
                      {stat.title}
                    </div>

                    <div className="stat-description">
                      {stat.description}
                    </div>

                  </div>

                )
              )}

            </div>


            {/* ==================================================
                APPOINTMENTS + QUICK ACTIONS
            ================================================== */}

            <div className="dashboard-grid">


              {/* APPOINTMENTS */}

              <div>

                <div className="section-header">

                  <h3>
                    Upcoming Appointments
                  </h3>

                  <button
                    className="view-all"
                    onClick={() =>
                      navigate(
                        "/patient-appointments"
                      )
                    }
                  >
                    View All
                  </button>

                </div>


                <div className="dashboard-card">

                  <div className="appointment-list">

                    {loading ? (

                      <div
                        style={{
                          padding: "25px 0",
                          textAlign: "center",
                          color: "#929aa8",
                          fontSize: "11px",
                        }}
                      >
                        Loading appointments...
                      </div>

                    ) : appointments.length === 0 ? (

                      <div
                        style={{
                          padding: "25px 0",
                          textAlign: "center",
                          color: "#929aa8",
                          fontSize: "11px",
                        }}
                      >
                        No upcoming appointments.
                      </div>

                    ) : (

                      appointments.map(
                        (appointment) => (

                          <div
                            className="appointment-item"
                            key={
                              appointment._id ||
                              appointment.id
                            }
                          >

                            <div className="doctor-avatar">
                              {appointment.icon ||
                                "🩺"}
                            </div>


                            <div className="appointment-details">

                              <h4>
                                {
                                  appointment.doctor ||
                                  appointment.doctorName ||
                                  "Doctor"
                                }
                              </h4>

                              <p>
                                {
                                  appointment.specialization ||
                                  "General Physician"
                                }

                                {" • "}

                                {
                                  appointment.type ||
                                  "Consultation"
                                }
                              </p>

                              <span className="confirmed-badge">

                                {
                                  appointment.status ||
                                  "Pending"
                                }

                              </span>

                            </div>


                            <div className="appointment-date">

                              <strong>
                                {formatDate(
                                  appointment.date
                                )}
                              </strong>

                              <span>
                                {
                                  appointment.time ||
                                  "-"
                                }
                              </span>

                            </div>

                          </div>

                        )
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


                    <button
                      className="quick-action"
                      onClick={() =>
                        handleQuickAction(
                          "appointment"
                        )
                      }
                    >

                      <div className="quick-action-icon">
                        📅
                      </div>

                      <div className="quick-action-text">

                        <strong>
                          Book Appointment
                        </strong>

                        <span>
                          Find and book a doctor
                        </span>

                      </div>

                    </button>


                    <button
                      className="quick-action"
                      onClick={() =>
                        handleQuickAction(
                          "doctor"
                        )
                      }
                    >

                      <div className="quick-action-icon">
                        🩺
                      </div>

                      <div className="quick-action-text">

                        <strong>
                          Find a Doctor
                        </strong>

                        <span>
                          Browse available doctors
                        </span>

                      </div>

                    </button>


                    <button
                      className="quick-action"
                      onClick={() =>
                        handleQuickAction(
                          "records"
                        )
                      }
                    >

                      <div className="quick-action-icon">
                        📋
                      </div>

                      <div className="quick-action-text">

                        <strong>
                          Medical Records
                        </strong>

                        <span>
                          View your health records
                        </span>

                      </div>

                    </button>


                    <button
                      className="quick-action"
                      onClick={() =>
                        handleQuickAction(
                          "prescription"
                        )
                      }
                    >

                      <div className="quick-action-icon">
                        💊
                      </div>

                      <div className="quick-action-text">

                        <strong>
                          Prescriptions
                        </strong>

                        <span>
                          Check your medicines
                        </span>

                      </div>

                    </button>


                  </div>

                </div>

              </div>

            </div>


            {/* ==================================================
                MEDICAL RECORDS
            ================================================== */}

            <div className="dashboard-card records-card">

              <div className="dashboard-card-header">

                <h3>
                  Recent Medical Records
                </h3>

                <button
                  onClick={() =>
                    navigate(
                      "/patient-medical-records"
                    )
                  }
                >
                  View All
                </button>

              </div>


              <div className="records-table-wrapper">

                <table className="records-table">

                  <thead>

                    <tr>

                      <th>
                        Date
                      </th>

                      <th>
                        Doctor
                      </th>

                      <th>
                        Department
                      </th>

                      <th>
                        Type
                      </th>

                      <th>
                        Action
                      </th>

                    </tr>

                  </thead>


                  <tbody>

                    {loading ? (

                      <tr>

                        <td
                          colSpan="5"
                          style={{
                            textAlign: "center",
                            padding: "25px",
                            color: "#929aa8",
                          }}
                        >
                          Loading medical records...
                        </td>

                      </tr>

                    ) : medicalRecords.length === 0 ? (

                      <tr>

                        <td
                          colSpan="5"
                          style={{
                            textAlign: "center",
                            padding: "25px",
                            color: "#929aa8",
                          }}
                        >
                          No medical records available.
                        </td>

                      </tr>

                    ) : (

                      medicalRecords.map(
                        (record) => (

                          <tr
                            key={
                              record._id ||
                              record.id
                            }
                          >

                            <td>
                              {formatDate(
                                record.date
                              )}
                            </td>

                            <td>
                              {
                                record.doctor ||
                                record.doctorName ||
                                "Doctor"
                              }
                            </td>

                            <td>
                              {
                                record.department ||
                                "General Medicine"
                              }
                            </td>

                            <td>

                              <span className="record-type">

                                {
                                  record.type ||
                                  "Consultation"
                                }

                              </span>

                            </td>

                            <td>

                              <button
                                className="record-view"
                                onClick={() =>
                                  navigate(
                                    "/patient-medical-records"
                                  )
                                }
                              >
                                View
                              </button>

                            </td>

                          </tr>

                        )
                      )

                    )}

                  </tbody>

                </table>

              </div>

            </div>


            {/* ==================================================
                PRESCRIPTIONS
            ================================================== */}

            <div className="dashboard-card prescription-card">

              <div className="dashboard-card-header">

                <h3>
                  Active Prescriptions
                </h3>

                <button
                  onClick={() =>
                    navigate(
                      "/patient-prescriptions"
                    )
                  }
                >
                  View All
                </button>

              </div>


              <div className="prescription-list">

                {loading ? (

                  <div
                    style={{
                      padding: "25px 0",
                      textAlign: "center",
                      color: "#929aa8",
                      fontSize: "11px",
                    }}
                  >
                    Loading prescriptions...
                  </div>

                ) : prescriptions.length === 0 ? (

                  <div
                    style={{
                      padding: "25px 0",
                      textAlign: "center",
                      color: "#929aa8",
                      fontSize: "11px",
                    }}
                  >
                    No active prescriptions.
                  </div>

                ) : (

                  prescriptions.map(
                    (prescription) => (

                      <div
                        className="prescription-item"
                        key={
                          prescription._id ||
                          prescription.id ||
                          prescription.medicine ||
                          prescription.medicineName
                        }
                      >

                        <div className="medicine-icon">
                          💊
                        </div>


                        <div className="medicine-info">

                          <strong>
                            {
                              prescription.medicine ||
                              prescription.medicineName ||
                              "Medicine"
                            }
                          </strong>

                          <span>

                            {
                              prescription.dosage ||
                              "-"
                            }

                            {" • "}

                            {
                              prescription.frequency ||
                              "-"
                            }

                          </span>

                        </div>


                        <div className="medicine-duration">

                          {
                            prescription.duration ||
                            "-"
                          }

                        </div>

                      </div>

                    )
                  )

                )}

              </div>

            </div>


          </section>

        </main>

      </div>
    </>
  );
}

export default PatientDashboard;