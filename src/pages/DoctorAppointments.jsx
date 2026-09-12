import { useState } from "react";
import { useNavigate } from "react-router-dom";

function DoctorAppointments() {
  const navigate = useNavigate();

  // =====================================================
  // ACTIVE MENU
  // =====================================================

  const [activeMenu, setActiveMenu] =
    useState("Appointments");

  // =====================================================
  // DOCTOR DATA
  // =====================================================

  const doctor = {
    name: "Dr. Ruchit",
    firstName: "Ruchit",
    doctorId: "DOC-2026-001",
    specialization: "Cardiologist",
    email: "ruchit1109@gmail.com",
  };

  // =====================================================
  // APPOINTMENTS DATA
  // =====================================================

  const [appointments, setAppointments] = useState([
    {
      id: 1,
      patientName: "Aarav Patel",
      patientAge: 28,
      patientGender: "Male",
      date: "10 September 2026",
      time: "10:00 AM",
      reason: "Regular Checkup",
      status: "Confirmed",
      phone: "9876543210",
    },
    {
      id: 2,
      patientName: "Diya Shah",
      patientAge: 24,
      patientGender: "Female",
      date: "10 September 2026",
      time: "11:30 AM",
      reason: "Fever and Cold",
      status: "Pending",
      phone: "9876543211",
    },
    {
      id: 3,
      patientName: "Rohan Mehta",
      patientAge: 35,
      patientGender: "Male",
      date: "11 September 2026",
      time: "09:30 AM",
      reason: "Blood Pressure Check",
      status: "Pending",
      phone: "9876543212",
    },
    {
      id: 4,
      patientName: "Kavya Patel",
      patientAge: 31,
      patientGender: "Female",
      date: "11 September 2026",
      time: "12:00 PM",
      reason: "Headache",
      status: "Confirmed",
      phone: "9876543213",
    },
    {
      id: 5,
      patientName: "Manav Joshi",
      patientAge: 42,
      patientGender: "Male",
      date: "12 September 2026",
      time: "10:30 AM",
      reason: "Diabetes Consultation",
      status: "Completed",
      phone: "9876543214",
    },
    {
      id: 6,
      patientName: "Krisha Desai",
      patientAge: 26,
      patientGender: "Female",
      date: "12 September 2026",
      time: "01:00 PM",
      reason: "General Consultation",
      status: "Cancelled",
      phone: "9876543215",
    },
  ]);

  // =====================================================
  // STATES
  // =====================================================

  const [searchTerm, setSearchTerm] =
    useState("");

  const [statusFilter, setStatusFilter] =
    useState("All");

  const [dateFilter, setDateFilter] =
    useState("All");

  const [selectedAppointment, setSelectedAppointment] =
    useState(null);

  // =====================================================
  // SIDEBAR MENU
  // Same menu as DoctorDashboard
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
  // HANDLE MENU CLICK
  // =====================================================

  const handleMenuClick = (menuName) => {
    setActiveMenu(menuName);

    if (menuName === "Dashboard") {
      navigate("/doctor-dashboard");
    }

    if (menuName === "Appointments") {
      navigate("/doctor-appointments");
    }

    // These routes can be added when those pages are created.
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
  // Same as DoctorDashboard
  // =====================================================

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    navigate("/login");
  };

  // =====================================================
  // ACCEPT APPOINTMENT
  // =====================================================

  const acceptAppointment = (id) => {
    setAppointments(
      (previousAppointments) =>
        previousAppointments.map(
          (appointment) =>
            appointment.id === id
              ? {
                  ...appointment,
                  status: "Confirmed",
                }
              : appointment
        )
    );
  };

  // =====================================================
  // REJECT APPOINTMENT
  // =====================================================

  const rejectAppointment = (id) => {
    setAppointments(
      (previousAppointments) =>
        previousAppointments.map(
          (appointment) =>
            appointment.id === id
              ? {
                  ...appointment,
                  status: "Cancelled",
                }
              : appointment
        )
    );
  };

  // =====================================================
  // FILTER APPOINTMENTS
  // =====================================================

  const filteredAppointments =
    appointments.filter(
      (appointment) => {
        const matchesSearch =
          appointment.patientName
            .toLowerCase()
            .includes(
              searchTerm.toLowerCase()
            ) ||
          appointment.reason
            .toLowerCase()
            .includes(
              searchTerm.toLowerCase()
            );

        const matchesStatus =
          statusFilter === "All" ||
          appointment.status ===
            statusFilter;

        const matchesDate =
          dateFilter === "All" ||
          appointment.date === dateFilter;

        return (
          matchesSearch &&
          matchesStatus &&
          matchesDate
        );
      }
    );

  // =====================================================
  // STATISTICS
  // =====================================================

  const totalAppointments =
    appointments.length;

  const pendingAppointments =
    appointments.filter(
      (appointment) =>
        appointment.status === "Pending"
    ).length;

  const confirmedAppointments =
    appointments.filter(
      (appointment) =>
        appointment.status === "Confirmed"
    ).length;

  const completedAppointments =
    appointments.filter(
      (appointment) =>
        appointment.status === "Completed"
    ).length;

  // =====================================================
  // UNIQUE DATES
  // =====================================================

  const appointmentDates = [
    ...new Set(
      appointments.map(
        (appointment) =>
          appointment.date
      )
    ),
  ];

  // =====================================================
  // STATUS CLASS
  // =====================================================

  const getStatusClass = (status) => {
    switch (status) {
      case "Confirmed":
        return "status-confirmed";

      case "Pending":
        return "status-pending";

      case "Completed":
        return "status-completed";

      case "Cancelled":
        return "status-cancelled";

      default:
        return "";
    }
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
           EXACT SAME STYLE AS DOCTOR DASHBOARD
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
            0 10px 25px
            rgba(15, 23, 42, 0.12);

          z-index: 200;
        }

        .profile-dropdown button {
          width: 100%;
          height: 38px;

          border: none;

          background: transparent;

          border-radius: 7px;

          text-align: left;

          padding: 0 10px;

          color: #697386;

          font-size: 12px;

          cursor: pointer;
        }

        .profile-dropdown button:hover {
          background: #f0fdfa;

          color: #0f766e;
        }


        /* =====================================================
           APPOINTMENTS CONTENT
        ===================================================== */

        .appointments-content {
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

        .header-date {
          background: white;

          padding: 12px 18px;

          border-radius: 10px;

          border: 1px solid #e5e7eb;

          text-align: right;
        }

        .header-date span {
          display: block;

          color: #6b7280;

          font-size: 12px;

          margin-bottom: 4px;
        }

        .header-date strong {
          font-size: 14px;

          color: #172033;
        }


        /* =====================================================
           STATISTICS
        ===================================================== */

        .stats-container {
          display: grid;

          grid-template-columns:
            repeat(4, 1fr);

          gap: 20px;

          margin-bottom: 25px;
        }

        .stat-card {
          background: white;

          border: 1px solid #e5e7eb;

          border-radius: 12px;

          padding: 20px;

          display: flex;
          align-items: center;

          gap: 15px;

          box-shadow:
            0 2px 8px
            rgba(0,0,0,0.03);
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
          background: #e9efff;
        }

        .pending-icon {
          background: #fff7ed;
        }

        .confirmed-icon {
          background: #e7f8ef;
        }

        .completed-icon {
          background: #eeeafe;
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
           APPOINTMENTS CARD
        ===================================================== */

        .appointments-card {
          background: white;

          border: 1px solid #e5e7eb;

          border-radius: 12px;

          overflow: hidden;

          box-shadow:
            0 2px 8px
            rgba(0,0,0,0.03);
        }

        .appointments-card-header {
          padding: 22px 24px;

          border-bottom: 1px solid #eef1f5;
        }

        .appointments-card-header h3 {
          margin: 0 0 5px;

          color: #172033;

          font-size: 18px;
        }

        .appointments-card-header p {
          margin: 0;

          color: #7b8492;

          font-size: 12px;
        }


        /* =====================================================
           FILTERS
        ===================================================== */

        .filters-container {
          display: flex;

          gap: 12px;

          padding: 20px 24px;
        }

        .search-box {
          flex: 1;

          position: relative;
        }

        .search-icon {
          position: absolute;

          left: 13px;
          top: 50%;

          transform: translateY(-50%);

          font-size: 13px;
        }

        .search-box input {
          width: 100%;
          height: 40px;

          padding: 0 12px 0 38px;

          border: 1px solid #dfe3e8;

          border-radius: 7px;

          outline: none;

          font-size: 12px;
        }

        .search-box input:focus {
          border-color: #0f766e;
        }

        .filters-container select {
          width: 160px;
          height: 40px;

          padding: 0 10px;

          border: 1px solid #dfe3e8;

          border-radius: 7px;

          background: white;

          color: #4c5563;

          font-size: 12px;

          outline: none;

          cursor: pointer;
        }


        /* =====================================================
           TABLE
        ===================================================== */

        .table-wrapper {
          width: 100%;

          overflow-x: auto;
        }

        .appointments-table {
          width: 100%;

          border-collapse: collapse;
        }

        .appointments-table th {
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

        .appointments-table td {
          padding: 15px 18px;

          border-bottom: 1px solid #eef1f5;

          color: #4c5563;

          font-size: 12px;

          white-space: nowrap;
        }

        .appointments-table tbody tr:hover {
          background: #fafdfd;
        }


        /* =====================================================
           PATIENT INFORMATION
        ===================================================== */

        .patient-info {
          display: flex;

          align-items: center;

          gap: 10px;
        }

        .patient-avatar {
          width: 38px;
          height: 38px;

          border-radius: 50%;

          background: #d9f5f1;

          color: #0f766e;

          display: flex;
          align-items: center;
          justify-content: center;

          font-size: 13px;

          font-weight: 700;
        }

        .patient-details strong {
          display: block;

          color: #273247;

          font-size: 12px;

          margin-bottom: 3px;
        }

        .patient-details span {
          display: block;

          color: #929aa8;

          font-size: 9px;
        }


        /* =====================================================
           STATUS
        ===================================================== */

        .status-badge {
          display: inline-block;

          padding: 5px 9px;

          border-radius: 5px;

          font-size: 9px;

          font-weight: 600;
        }

        .status-confirmed {
          background: #ecfdf5;

          color: #059669;
        }

        .status-pending {
          background: #fff7ed;

          color: #ea580c;
        }

        .status-completed {
          background: #eef2ff;

          color: #4f46e5;
        }

        .status-cancelled {
          background: #fef2f2;

          color: #dc2626;
        }


        /* =====================================================
           ACTION BUTTONS
        ===================================================== */

        .action-buttons {
          display: flex;

          gap: 6px;
        }

        .action-buttons button {
          border: none;

          border-radius: 6px;

          padding: 7px 9px;

          font-size: 9px;

          font-weight: 600;

          cursor: pointer;
        }

        .view-btn {
          background: #e8f8f6;

          color: #0f766e;
        }

        .accept-btn {
          background: #ecfdf5;

          color: #059669;
        }

        .reject-btn {
          background: #fef2f2;

          color: #dc2626;
        }

        .action-buttons button:hover {
          opacity: 0.75;
        }

        .no-data {
          padding: 40px;

          text-align: center;

          color: #8a93a3;

          font-size: 13px;
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

        .appointment-modal {
          width: 100%;

          max-width: 550px;

          padding: 25px;

          background: white;

          border-radius: 12px;

          box-shadow:
            0 20px 50px
            rgba(0,0,0,0.18);
        }

        .modal-header {
          display: flex;

          justify-content: space-between;
          align-items: flex-start;

          margin-bottom: 20px;
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
           MODAL PATIENT
        ===================================================== */

        .modal-patient {
          display: flex;

          align-items: center;

          gap: 13px;

          padding: 14px;

          margin-bottom: 18px;

          background: #f0fdfa;

          border-radius: 9px;
        }

        .large-avatar {
          width: 50px;
          height: 50px;

          border-radius: 50%;

          display: flex;
          align-items: center;
          justify-content: center;

          background: #d9f5f1;

          color: #0f766e;

          font-size: 18px;

          font-weight: 700;
        }

        .modal-patient h3 {
          margin: 0 0 4px;

          color: #273247;

          font-size: 15px;
        }

        .modal-patient p {
          margin: 0;

          color: #7b8492;

          font-size: 10px;
        }


        /* =====================================================
           DETAILS
        ===================================================== */

        .details-grid {
          display: grid;

          grid-template-columns:
            1fr 1fr;

          gap: 15px;

          margin-bottom: 20px;
        }

        .detail-item {
          border: 1px solid #e7e9ed;

          border-radius: 8px;

          padding: 12px;
        }

        .detail-item span:first-child {
          display: block;

          color: #7b828c;

          font-size: 11px;

          margin-bottom: 5px;
        }

        .detail-item strong {
          font-size: 13px;

          color: #273247;
        }


        /* =====================================================
           REASON
        ===================================================== */

        .reason-box {
          background: #f8fafc;

          border-radius: 8px;

          padding: 15px;

          margin-bottom: 20px;
        }

        .reason-box span {
          color: #7b828c;

          font-size: 11px;

          display: block;

          margin-bottom: 6px;
        }

        .reason-box p {
          margin: 0;

          font-size: 14px;

          color: #273247;
        }


        /* =====================================================
           MODAL ACTIONS
        ===================================================== */

        .modal-actions {
          display: flex;

          gap: 10px;
        }

        .modal-actions button {
          flex: 1;

          border: none;

          padding: 12px;

          border-radius: 8px;

          font-size: 12px;

          font-weight: 600;

          cursor: pointer;
        }

        .modal-accept {
          background: #e7f8ef;

          color: #17824b;
        }

        .modal-reject {
          background: #ffe9e9;

          color: #c43b3b;
        }


        /* =====================================================
           RESPONSIVE
        ===================================================== */

        @media (max-width: 1200px) {

          .stats-container {
            grid-template-columns:
              repeat(2, 1fr);
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

          .appointments-content {
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

          .appointments-content {
            padding: 20px 15px 35px;
          }

          .page-header {
            flex-direction: column;

            align-items: flex-start;

            gap: 15px;
          }

          .header-date {
            text-align: left;
          }

          .filters-container {
            flex-direction: column;
          }

          .filters-container select {
            width: 100%;
          }

          .stats-container {
            grid-template-columns: 1fr 1fr;

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

          .modal-actions {
            flex-direction: column;
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
          MAIN DOCTOR LAYOUT
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
                Doctor Appointments
              </h1>

              <p>
                Manage and track your patient appointments.
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
              APPOINTMENTS CONTENT
          ===================================================== */}

          <section className="appointments-content">


            {/* =====================================================
                HEADER
            ===================================================== */}

            <div className="page-header">

              <div>

                <h2>
                  Appointments
                </h2>

                <p>
                  Manage and track your patient appointments.
                </p>

              </div>

              <div className="header-date">

                <span>
                  Today
                </span>

                <strong>
                  10 September 2026
                </strong>

              </div>

            </div>


            {/* =====================================================
                STATISTICS
            ===================================================== */}

            <div className="stats-container">


              <div className="stat-card">

                <div className="stat-icon total-icon">
                  📅
                </div>

                <div>

                  <h3>
                    {totalAppointments}
                  </h3>

                  <p>
                    Total Appointments
                  </p>

                </div>

              </div>


              <div className="stat-card">

                <div className="stat-icon pending-icon">
                  ⏳
                </div>

                <div>

                  <h3>
                    {pendingAppointments}
                  </h3>

                  <p>
                    Pending
                  </p>

                </div>

              </div>


              <div className="stat-card">

                <div className="stat-icon confirmed-icon">
                  ✓
                </div>

                <div>

                  <h3>
                    {confirmedAppointments}
                  </h3>

                  <p>
                    Confirmed
                  </p>

                </div>

              </div>


              <div className="stat-card">

                <div className="stat-icon completed-icon">
                  ✓
                </div>

                <div>

                  <h3>
                    {completedAppointments}
                  </h3>

                  <p>
                    Completed
                  </p>

                </div>

              </div>


            </div>


            {/* =====================================================
                APPOINTMENTS
            ===================================================== */}

            <div className="appointments-card">


              <div className="appointments-card-header">

                <h3>
                  Patient Appointments
                </h3>

                <p>
                  View and manage appointments requested by patients.
                </p>

              </div>


              {/* =================================================
                  FILTERS
              ================================================= */}

              <div className="filters-container">


                <div className="search-box">

                  <span className="search-icon">
                    🔍
                  </span>

                  <input
                    type="text"
                    placeholder="Search patient or reason..."
                    value={searchTerm}
                    onChange={(e) =>
                      setSearchTerm(
                        e.target.value
                      )
                    }
                  />

                </div>


                <select
                  value={statusFilter}
                  onChange={(e) =>
                    setStatusFilter(
                      e.target.value
                    )
                  }
                >

                  <option value="All">
                    All Status
                  </option>

                  <option value="Pending">
                    Pending
                  </option>

                  <option value="Confirmed">
                    Confirmed
                  </option>

                  <option value="Completed">
                    Completed
                  </option>

                  <option value="Cancelled">
                    Cancelled
                  </option>

                </select>


                <select
                  value={dateFilter}
                  onChange={(e) =>
                    setDateFilter(
                      e.target.value
                    )
                  }
                >

                  <option value="All">
                    All Dates
                  </option>

                  {appointmentDates.map(
                    (date) => (

                      <option
                        key={date}
                        value={date}
                      >
                        {date}
                      </option>

                    )
                  )}

                </select>

              </div>


              {/* =================================================
                  TABLE
              ================================================= */}

              <div className="table-wrapper">

                <table className="appointments-table">

                  <thead>

                    <tr>

                      <th>
                        Patient
                      </th>

                      <th>
                        Date
                      </th>

                      <th>
                        Time
                      </th>

                      <th>
                        Reason
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

                    {filteredAppointments.length > 0 ? (

                      filteredAppointments.map(
                        (appointment) => (

                          <tr
                            key={appointment.id}
                          >

                            {/* PATIENT */}

                            <td>

                              <div className="patient-info">

                                <div className="patient-avatar">

                                  {appointment.patientName
                                    .charAt(0)
                                    .toUpperCase()}

                                </div>

                                <div className="patient-details">

                                  <strong>
                                    {
                                      appointment.patientName
                                    }
                                  </strong>

                                  <span>
                                    {
                                      appointment.patientAge
                                    }{" "}
                                    years
                                    {" • "}
                                    {
                                      appointment.patientGender
                                    }
                                  </span>

                                </div>

                              </div>

                            </td>


                            {/* DATE */}

                            <td>
                              {
                                appointment.date
                              }
                            </td>
                            {/* TIME */}
                            <td>
                              {
                                appointment.time
                              }
                            </td>
                            {/* REASON */}
                            <td>
                              {
                                appointment.reason
                              }
                            </td>
                            {/* STATUS */}
                            <td>
                              <span
                                className={
                                  `status-badge ${getStatusClass(
                                    appointment.status
                                  )}`
                                }
                              >
                                {
                                  appointment.status
                                }
                              </span>
                            </td>
                            {/* ACTION */}
                            <td>
                              <div className="action-buttons">
                                <button
                                  className="view-btn"
                                  onClick={() =>
                                    setSelectedAppointment(
                                      appointment
                                    )
                                  }
                                >
                                  View
                                </button>
                                {appointment.status ===
                                  "Pending" && (
                                  <>
                                    <button
                                      className="accept-btn"
                                      onClick={() =>
                                        acceptAppointment(
                                          appointment.id
                                        )
                                      }
                                    >
                                      Accept
                                    </button>
                                    <button
                                      className="reject-btn"
                                      onClick={() =>
                                        rejectAppointment(
                                          appointment.id
                                        )
                                      }
                                    >
                                      Reject
                                    </button>
                                  </>
                                )}
                              </div>
                            </td>
                          </tr>
                        )
                      )
                    ) : (
                      <tr>
                        <td
                          colSpan="6"
                          className="no-data"
                        >
                          No appointments found.
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
          APPOINTMENT DETAILS MODAL
      ===================================================== */}
      {selectedAppointment && (
        <div
          className="modal-overlay"
          onClick={() =>
            setSelectedAppointment(null)
          }
        >
          <div
            className="appointment-modal"
            onClick={(e) =>
              e.stopPropagation()
            }
          >
            <div className="modal-header">
              <div>
                <h2>
                  Appointment Details
                </h2>
                <p>
                  Patient appointment information
                </p>
              </div>
              <button
                className="close-button"
                onClick={() =>
                  setSelectedAppointment(null)
                }
              >
                ×
              </button>
            </div>
            {/* PATIENT */}
            <div className="modal-patient">
              <div className="large-avatar">
                {selectedAppointment.patientName
                  .charAt(0)
                  .toUpperCase()}
              </div>
              <div>
                <h3>
                  {
                    selectedAppointment.patientName
                  }
                </h3>
                <p>
                  {
                    selectedAppointment.patientAge
                  }{" "}
                  years
                  {" • "}
                  {
                    selectedAppointment.patientGender
                  }
                </p>
              </div>
            </div>
            {/* DETAILS */}
            <div className="details-grid">
              <div className="detail-item">
                <span>
                  Date
                </span>
                <strong>
                  {
                    selectedAppointment.date
                  }
                </strong>
              </div>
              <div className="detail-item">
                <span>
                  Time
                </span>
                <strong>
                  {
                    selectedAppointment.time
                  }
                </strong>
              </div>
              <div className="detail-item">
                <span>
                  Phone
                </span>
                <strong>
                  {
                    selectedAppointment.phone
                  }
                </strong>
              </div>
              <div className="detail-item">
                <span>
                  Status
                </span>
                <strong>
                  <span
                    className={
                      `status-badge ${getStatusClass(
                        selectedAppointment.status
                      )}`
                    }
                  >
                    {
                      selectedAppointment.status
                    }
                  </span>
                </strong>
              </div>
            </div>
            {/* REASON */}
            <div className="reason-box">
              <span>
                Appointment Reason
              </span>
              <p>
                {
                  selectedAppointment.reason
                }
              </p>
            </div>
            {/* MODAL ACTIONS */}
            {selectedAppointment.status ===
              "Pending" && (
              <div className="modal-actions">
                <button
                  className="modal-accept"
                  onClick={() => {
                    acceptAppointment(
                      selectedAppointment.id
                    );
                    setSelectedAppointment(
                      null
                    );
                  }}
                >
                  Accept Appointment
                </button>
                <button
                  className="modal-reject"
                  onClick={() => {
                    rejectAppointment(
                      selectedAppointment.id
                    );
                    setSelectedAppointment(
                      null
                    );
                  }}
                >
                  Reject Appointment
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
export default DoctorAppointments;