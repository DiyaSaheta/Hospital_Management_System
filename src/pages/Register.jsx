import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Register() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    role: "patient",

    // Patient details
    dateOfBirth: "",
    gender: "",

    // Doctor details
    specialization: "",
    qualification: "",
    experience: "",

    // Doctor verification documents
    medicalDegree: null,
    registrationCertificate: null,
    governmentId: null,

    terms: false,
  });

  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] =
    useState(false);

  // ==========================================
  // HANDLE INPUT CHANGE
  // ==========================================

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;

    setFormData((previousData) => ({
      ...previousData,
      [name]:
        type === "checkbox"
          ? checked
          : type === "file"
          ? files[0]
          : value,
    }));

    // Remove error when user starts correcting field
    if (errors[name]) {
      setErrors((previousErrors) => ({
        ...previousErrors,
        [name]: "",
      }));
    }
  };

  // ==========================================
  // FORM VALIDATION
  // ==========================================

  const validateForm = () => {
    const newErrors = {};

    // ==========================================
    // PERSONAL INFORMATION
    // ==========================================

    // Full Name
    if (!formData.fullName.trim()) {
      newErrors.fullName = "Full name is required.";
    } else if (formData.fullName.trim().length < 3) {
      newErrors.fullName =
        "Full name must contain at least 3 characters.";
    }

    // Email
    if (!formData.email.trim()) {
      newErrors.email = "Email address is required.";
    } else if (
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)
    ) {
      newErrors.email =
        "Please enter a valid email address.";
    }

    // Phone
    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required.";
    } else if (!/^[0-9]{10}$/.test(formData.phone)) {
      newErrors.phone =
        "Phone number must contain exactly 10 digits.";
    }

    // Password
    if (!formData.password) {
      newErrors.password = "Password is required.";
    } else if (formData.password.length < 8) {
      newErrors.password =
        "Password must contain at least 8 characters.";
    }

    // Confirm Password
    if (!formData.confirmPassword) {
      newErrors.confirmPassword =
        "Please confirm your password.";
    } else if (
      formData.password !== formData.confirmPassword
    ) {
      newErrors.confirmPassword =
        "Passwords do not match.";
    }

    // ==========================================
    // PATIENT VALIDATION
    // ==========================================

    if (formData.role === "patient") {
      if (!formData.dateOfBirth) {
        newErrors.dateOfBirth =
          "Date of birth is required.";
      }

      if (!formData.gender) {
        newErrors.gender =
          "Please select your gender.";
      }
    }

    // ==========================================
    // DOCTOR VALIDATION
    // ==========================================

    if (formData.role === "doctor") {
      if (!formData.specialization.trim()) {
        newErrors.specialization =
          "Specialization is required.";
      }

      if (!formData.qualification.trim()) {
        newErrors.qualification =
          "Qualification is required.";
      }

      if (formData.experience === "") {
        newErrors.experience =
          "Years of experience is required.";
      } else if (
        Number(formData.experience) < 0 ||
        Number(formData.experience) > 60
      ) {
        newErrors.experience =
          "Please enter a valid experience.";
      }

      // ==========================================
      // DOCTOR DOCUMENT VALIDATION
      // ==========================================

      if (!formData.medicalDegree) {
        newErrors.medicalDegree =
          "Medical degree certificate is required.";
      }

      if (!formData.registrationCertificate) {
        newErrors.registrationCertificate =
          "Medical registration certificate is required.";
      }

      if (!formData.governmentId) {
        newErrors.governmentId =
          "Government ID proof is required.";
      }

      // File type validation
      const allowedTypes = [
        "application/pdf",
        "image/jpeg",
        "image/png",
      ];

      if (
        formData.medicalDegree &&
        !allowedTypes.includes(
          formData.medicalDegree.type
        )
      ) {
        newErrors.medicalDegree =
          "Only PDF, JPG or PNG files are allowed.";
      }

      if (
        formData.registrationCertificate &&
        !allowedTypes.includes(
          formData.registrationCertificate.type
        )
      ) {
        newErrors.registrationCertificate =
          "Only PDF, JPG or PNG files are allowed.";
      }

      if (
        formData.governmentId &&
        !allowedTypes.includes(
          formData.governmentId.type
        )
      ) {
        newErrors.governmentId =
          "Only PDF, JPG or PNG files are allowed.";
      }

      // File size validation - 5 MB
      const maxFileSize = 5 * 1024 * 1024;

      if (
        formData.medicalDegree &&
        formData.medicalDegree.size > maxFileSize
      ) {
        newErrors.medicalDegree =
          "File size must not exceed 5 MB.";
      }

      if (
        formData.registrationCertificate &&
        formData.registrationCertificate.size >
          maxFileSize
      ) {
        newErrors.registrationCertificate =
          "File size must not exceed 5 MB.";
      }

      if (
        formData.governmentId &&
        formData.governmentId.size > maxFileSize
      ) {
        newErrors.governmentId =
          "File size must not exceed 5 MB.";
      }
    }

    // ==========================================
    // TERMS & CONDITIONS
    // ==========================================

    if (!formData.terms) {
      newErrors.terms =
        "You must accept the Terms & Conditions.";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  // ==========================================
  // FORM SUBMIT
  // ==========================================

  const handleSubmit = async (e) => {
    e.preventDefault();

    const isValid = validateForm();

    if (!isValid) {
      return;
    }

    try {
      // ==========================================
      // FORM DATA FOR FILE UPLOAD
      // ==========================================

      const registrationData = new FormData();

      registrationData.append(
        "fullName",
        formData.fullName
      );

      registrationData.append(
        "email",
        formData.email
      );

      registrationData.append(
        "phone",
        formData.phone
      );

      registrationData.append(
        "password",
        formData.password
      );

      registrationData.append(
        "role",
        formData.role
      );

      // ==========================================
      // PATIENT DETAILS
      // ==========================================

      if (formData.role === "patient") {
        registrationData.append(
          "dateOfBirth",
          formData.dateOfBirth
        );

        registrationData.append(
          "gender",
          formData.gender
        );
      }

      // ==========================================
      // DOCTOR DETAILS
      // ==========================================

      if (formData.role === "doctor") {
        registrationData.append(
          "specialization",
          formData.specialization
        );

        registrationData.append(
          "qualification",
          formData.qualification
        );

        registrationData.append(
          "experience",
          formData.experience
        );

        // ==========================================
        // DOCTOR VERIFICATION DOCUMENTS
        // ==========================================

        registrationData.append(
          "medicalDegree",
          formData.medicalDegree
        );

        registrationData.append(
          "registrationCertificate",
          formData.registrationCertificate
        );

        registrationData.append(
          "governmentId",
          formData.governmentId
        );
      }

      // ==========================================
      // SEND DATA TO BACKEND
      // ==========================================

      const response = await fetch(
        "http://localhost:5000/api/auth/register",
        {
          method: "POST",

          body: registrationData,
        }
      );

      const data = await response.json();

      // ==========================================
      // REGISTRATION FAILED
      // ==========================================

      if (!response.ok) {
        alert(
          data.message || "Registration failed."
        );

        return;
      }

      // ==========================================
      // REGISTRATION SUCCESSFUL
      // ==========================================

      if (formData.role === "doctor") {
        alert(
          "Registration submitted successfully! Your documents will be verified by the hospital administrator."
        );
      } else {
        alert(
          "Registration successful! Please login."
        );
      }

      navigate("/login");
    } catch (error) {
      console.error(
        "Registration Error:",
        error
      );

      alert(
        "Unable to connect to server. Please make sure the backend is running."
      );
    }
  };

  return (
    <>
      {/* ======================================
          CSS
      ====================================== */}

      <style>{`

        /* =====================================
           GENERAL
        ===================================== */

        * {
          box-sizing: border-box;
        }

        .register-page {
          min-height: 100vh;
          width: 100%;
          display: flex;
          background: #f5f8fc;
          font-family: Arial, Helvetica, sans-serif;
        }

        /* =====================================
           LEFT SECTION
        ===================================== */

        .register-left {
          width: 40%;
          min-height: 100vh;
          padding: 55px 60px;
          display: flex;
          flex-direction: column;
          justify-content: center;
          background: linear-gradient(
            145deg,
            #0f766e,
            #0d9488
          );
          color: white;
          position: relative;
          overflow: hidden;
        }

        .register-left::before {
          content: "";
          position: absolute;
          width: 350px;
          height: 350px;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.08);
          top: -120px;
          right: -100px;
        }

        .register-left::after {
          content: "";
          position: absolute;
          width: 280px;
          height: 280px;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.06);
          bottom: -100px;
          left: -80px;
        }

        /* =====================================
           BRAND
        ===================================== */

        .hospital-brand {
          display: flex;
          align-items: center;
          gap: 15px;
          position: relative;
          z-index: 1;
        }

        .brand-icon {
          width: 52px;
          height: 52px;
          border-radius: 14px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: white;
          color: #0f766e;
          font-size: 35px;
          font-weight: bold;
          box-shadow: 0 8px 20px rgba(0, 0, 0, 0.12);
        }

        .hospital-brand h1 {
          margin: 0;
          font-size: 28px;
          font-weight: 700;
        }

        .hospital-brand p {
          margin: 3px 0 0;
          font-size: 13px;
          opacity: 0.85;
        }

        /* =====================================
           INTRODUCTION
        ===================================== */

        .register-intro {
          margin-top: 80px;
          position: relative;
          z-index: 1;
        }

        .register-intro h2 {
          margin: 0;
          font-size: 48px;
          line-height: 1.15;
          font-weight: 700;
        }

        .register-intro p {
          max-width: 480px;
          margin-top: 25px;
          font-size: 16px;
          line-height: 1.8;
          opacity: 0.9;
        }

        /* =====================================
           FEATURES
        ===================================== */

        .health-features {
          margin-top: 55px;
          position: relative;
          z-index: 1;
        }

        .health-feature {
          display: flex;
          align-items: flex-start;
          gap: 15px;
          margin-bottom: 25px;
        }

        .health-feature > span {
          width: 28px;
          height: 28px;
          flex-shrink: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.18);
          font-size: 14px;
        }

        .health-feature h4 {
          margin: 0 0 5px;
          font-size: 15px;
        }

        .health-feature p {
          margin: 0;
          font-size: 13px;
          line-height: 1.5;
          opacity: 0.75;
        }

        /* =====================================
           RIGHT SECTION
        ===================================== */

        .register-right {
          width: 60%;
          min-height: 100vh;
          padding: 45px 70px;
          display: flex;
          justify-content: center;
          align-items: flex-start;
          overflow-y: auto;
        }

        .register-container {
          width: 100%;
          max-width: 780px;
        }

        /* =====================================
           HEADER
        ===================================== */

        .register-header {
          margin-bottom: 30px;
        }

        .register-header h2 {
          margin: 0;
          color: #172033;
          font-size: 30px;
          font-weight: 700;
        }

        .register-header p {
          margin-top: 8px;
          color: #6b7280;
          font-size: 14px;
        }

        .register-header a {
          color: #0f766e;
          text-decoration: none;
          font-weight: 600;
        }

        .register-header a:hover {
          text-decoration: underline;
        }

        /* =====================================
           FORM
        ===================================== */

        .register-form {
          background: white;
          border-radius: 18px;
          padding: 35px;
          box-shadow:
            0 10px 35px rgba(15, 23, 42, 0.08);
        }

        .form-section {
          margin-bottom: 30px;
        }

        .form-section h3 {
          margin: 0 0 20px;
          color: #172033;
          font-size: 17px;
          font-weight: 700;
          padding-bottom: 12px;
          border-bottom: 1px solid #edf0f4;
        }

        /* =====================================
           FORM ROW
        ===================================== */

        .form-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 18px;
        }

        /* =====================================
           FORM GROUP
        ===================================== */

        .form-group {
          margin-bottom: 18px;
        }

        .form-group label {
          display: block;
          margin-bottom: 8px;
          color: #374151;
          font-size: 13px;
          font-weight: 600;
        }

        .form-group input,
        .form-group select {
          width: 100%;
          height: 46px;
          padding: 0 14px;
          border: 1px solid #d9dee7;
          border-radius: 9px;
          outline: none;
          background: white;
          color: #172033;
          font-size: 14px;
          transition: all 0.2s ease;
        }

        .form-group input::placeholder {
          color: #9ca3af;
        }

        .form-group input:focus,
        .form-group select:focus {
          border-color: #0f766e;
          box-shadow:
            0 0 0 3px rgba(15, 118, 110, 0.1);
        }

        /* =====================================
           FILE INPUT
        ===================================== */

        .document-group {
          margin-bottom: 20px;
        }

        .document-label {
          display: block;
          margin-bottom: 8px;
          color: #374151;
          font-size: 13px;
          font-weight: 600;
        }

        .required-star {
          color: #dc2626;
          margin-left: 3px;
        }

        .document-box {
          width: 100%;
          min-height: 78px;
          padding: 13px 15px;
          display: flex;
          align-items: center;
          gap: 13px;
          border: 1px dashed #bfcbd7;
          border-radius: 9px;
          background: #fafcfd;
          transition: all 0.2s ease;
        }

        .document-box:hover {
          border-color: #0f766e;
          background: #f7fffe;
        }

        .document-icon {
          width: 40px;
          height: 40px;
          flex-shrink: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 9px;
          background: #e8f8f6;
          font-size: 19px;
        }

        .document-content {
          flex: 1;
          min-width: 0;
        }

        .document-content strong {
          display: block;
          color: #344054;
          font-size: 12px;
        }

        .document-content span {
          display: block;
          margin-top: 4px;
          color: #929aa8;
          font-size: 10px;
          line-height: 1.4;
        }

        .file-input {
          width: 100% !important;
          height: auto !important;
          padding: 7px !important;
          border: 1px solid #d9dee7 !important;
          background: white !important;
          font-size: 11px !important;
        }

        .file-input::file-selector-button {
          margin-right: 8px;
          padding: 7px 10px;
          border: none;
          border-radius: 6px;
          background: #e8f8f6;
          color: #0f766e;
          font-size: 10px;
          font-weight: 600;
          cursor: pointer;
        }

        .file-name {
          margin-top: 6px;
          color: #0f766e;
          font-size: 10px;
          font-weight: 600;
          word-break: break-word;
        }

        .verification-note {
          margin-top: 8px;
          padding: 10px 12px;
          border-radius: 7px;
          background: #f0fdfa;
          color: #52706d;
          font-size: 10px;
          line-height: 1.5;
        }

        /* =====================================
           ROLE SELECTION
        ===================================== */

        .role-selection {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 15px;
        }

        .role-card {
          display: block;
          padding: 16px;
          border: 1px solid #d9dee7;
          border-radius: 12px;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .role-card:hover {
          border-color: #0f766e;
          background: #f7fffe;
        }

        .role-card.selected {
          border-color: #0f766e;
          background: #f0fdfa;
          box-shadow:
            0 0 0 2px rgba(15, 118, 110, 0.08);
        }

        .role-card input {
          display: none;
        }

        .role-content {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .role-icon {
          width: 42px;
          height: 42px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: #e6fffb;
          border-radius: 10px;
          font-size: 21px;
        }

        .role-content strong {
          display: block;
          color: #172033;
          font-size: 14px;
        }

        .role-content small {
          display: block;
          margin-top: 4px;
          color: #6b7280;
          font-size: 11px;
        }

        /* =====================================
           PASSWORD
        ===================================== */

        .password-wrapper {
          position: relative;
        }

        .password-wrapper input {
          padding-right: 65px;
        }

        .password-toggle {
          position: absolute;
          right: 10px;
          top: 50%;
          transform: translateY(-50%);
          border: none;
          background: transparent;
          color: #0f766e;
          font-size: 12px;
          font-weight: 600;
          cursor: pointer;
        }

        /* =====================================
           ERROR
        ===================================== */

        .error-message {
          display: block;
          margin-top: 6px;
          color: #dc2626;
          font-size: 11px;
        }

        /* =====================================
           TERMS
        ===================================== */

        .terms-section {
          margin-bottom: 20px;
        }

        .terms-label {
          display: flex;
          align-items: flex-start;
          gap: 9px;
          color: #5f6878;
          font-size: 12px;
          line-height: 1.5;
          cursor: pointer;
        }

        .terms-label input {
          width: 15px;
          height: 15px;
          margin-top: 2px;
          accent-color: #0f766e;
          cursor: pointer;
        }

        .terms-label a {
          color: #0f766e;
          text-decoration: none;
          font-weight: 600;
        }

        .terms-label a:hover {
          text-decoration: underline;
        }

        /* =====================================
           REGISTER BUTTON
        ===================================== */

        .register-button {
          width: 100%;
          height: 48px;
          border: none;
          border-radius: 9px;
          background: #0f766e;
          color: white;
          font-size: 14px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .register-button:hover {
          background: #115e59;
          transform: translateY(-1px);
          box-shadow:
            0 7px 18px rgba(15, 118, 110, 0.2);
        }

        .register-button:active {
          transform: translateY(0);
        }

        /* =====================================
           RESPONSIVE
        ===================================== */

        @media (max-width: 1100px) {

          .register-left {
            width: 38%;
            padding: 40px;
          }

          .register-right {
            width: 62%;
            padding: 35px;
          }

          .register-intro h2 {
            font-size: 38px;
          }
        }

        @media (max-width: 850px) {

          .register-page {
            display: block;
          }

          .register-left {
            width: 100%;
            min-height: auto;
            padding: 35px;
          }

          .register-intro {
            margin-top: 40px;
          }

          .register-intro h2 {
            font-size: 36px;
          }

          .health-features {
            margin-top: 35px;
          }

          .register-right {
            width: 100%;
            min-height: auto;
            padding: 30px 20px;
          }
        }

        @media (max-width: 600px) {

          .register-left {
            padding: 30px 22px;
          }

          .hospital-brand h1 {
            font-size: 23px;
          }

          .register-intro h2 {
            font-size: 32px;
          }

          .register-intro p {
            font-size: 14px;
          }

          .register-form {
            padding: 22px;
            border-radius: 14px;
          }

          .form-row {
            grid-template-columns: 1fr;
            gap: 0;
          }

          .role-selection {
            grid-template-columns: 1fr;
          }

          .register-header h2 {
            font-size: 25px;
          }

        }

      `}</style>

      {/* ======================================
          REGISTRATION PAGE
      ====================================== */}

      <div className="register-page">

        {/* ====================================
            LEFT SIDE
        ==================================== */}

        <div className="register-left">

          <div className="hospital-brand">

            <div className="brand-icon">
              +
            </div>

            <div>
              <h1>CureAI</h1>

              <p>
                Hospital Management System
              </p>
            </div>

          </div>

          <div className="register-intro">

            <h2>
              Your Health,
              <br />
              Our Priority.
            </h2>

            <p>
              Join our healthcare platform and manage
              your appointments, medical records and
              healthcare journey with ease.
            </p>

          </div>

          <div className="health-features">

            <div className="health-feature">

              <span>
                ✓
              </span>

              <div>

                <h4>
                  Easy Appointment Booking
                </h4>

                <p>
                  Book appointments with doctors easily.
                </p>

              </div>

            </div>

            <div className="health-feature">

              <span>
                ✓
              </span>

              <div>

                <h4>
                  Secure Medical Records
                </h4>

                <p>
                  Access your medical information securely.
                </p>

              </div>

            </div>

            <div className="health-feature">

              <span>
                ✓
              </span>

              <div>

                <h4>
                  Better Healthcare Management
                </h4>

                <p>
                  Manage your healthcare journey in one place.
                </p>

              </div>

            </div>

          </div>

        </div>

        {/* ====================================
            RIGHT SIDE
        ==================================== */}

        <div className="register-right">

          <div className="register-container">

            {/* HEADER */}

            <div className="register-header">

              <h2>
                Create Your Account
              </h2>

              <p>
                Already have an account?{" "}

                <Link to="/login">
                  Login
                </Link>
              </p>

            </div>

            {/* FORM */}

            <form
              className="register-form"
              onSubmit={handleSubmit}
            >

              {/* =================================
                  PERSONAL INFORMATION
              ================================= */}

              <div className="form-section">

                <h3>
                  Personal Information
                </h3>

                <div className="form-row">

                  {/* Full Name */}

                  <div className="form-group">

                    <label htmlFor="fullName">
                      Full Name
                    </label>

                    <input
                      id="fullName"
                      type="text"
                      name="fullName"
                      placeholder="Enter your full name"
                      value={formData.fullName}
                      onChange={handleChange}
                    />

                    {errors.fullName && (
                      <span className="error-message">
                        {errors.fullName}
                      </span>
                    )}

                  </div>

                  {/* Phone */}

                  <div className="form-group">

                    <label htmlFor="phone">
                      Phone Number
                    </label>

                    <input
                      id="phone"
                      type="tel"
                      name="phone"
                      placeholder="Enter 10-digit phone number"
                      value={formData.phone}
                      onChange={handleChange}
                      maxLength="10"
                    />

                    {errors.phone && (
                      <span className="error-message">
                        {errors.phone}
                      </span>
                    )}

                  </div>

                </div>

                {/* Email */}

                <div className="form-group">

                  <label htmlFor="email">
                    Email Address
                  </label>

                  <input
                    id="email"
                    type="email"
                    name="email"
                    placeholder="Enter your email address"
                    value={formData.email}
                    onChange={handleChange}
                  />

                  {errors.email && (
                    <span className="error-message">
                      {errors.email}
                    </span>
                  )}

                </div>

                {/* Role */}

                <div className="form-group">

                  <label>
                    Register As
                  </label>

                  <div className="role-selection">

                    {/* PATIENT */}

                    <label
                      className={`role-card ${
                        formData.role === "patient"
                          ? "selected"
                          : ""
                      }`}
                    >

                      <input
                        type="radio"
                        name="role"
                        value="patient"
                        checked={
                          formData.role === "patient"
                        }
                        onChange={handleChange}
                      />

                      <div className="role-content">

                        <span className="role-icon">
                          👤
                        </span>

                        <div>

                          <strong>
                            Patient
                          </strong>

                          <small>
                            Manage your healthcare
                          </small>

                        </div>

                      </div>

                    </label>

                    {/* DOCTOR */}

                    <label
                      className={`role-card ${
                        formData.role === "doctor"
                          ? "selected"
                          : ""
                      }`}
                    >

                      <input
                        type="radio"
                        name="role"
                        value="doctor"
                        checked={
                          formData.role === "doctor"
                        }
                        onChange={handleChange}
                      />

                      <div className="role-content">

                        <span className="role-icon">
                          🩺
                        </span>

                        <div>

                          <strong>
                            Doctor
                          </strong>

                          <small>
                            Manage your patients
                          </small>

                        </div>

                      </div>

                    </label>

                  </div>

                </div>

              </div>

              {/* =================================
                  PATIENT INFORMATION
              ================================= */}

              {formData.role === "patient" && (

                <div className="form-section">

                  <h3>
                    Patient Information
                  </h3>

                  <div className="form-row">

                    {/* Date of Birth */}

                    <div className="form-group">

                      <label htmlFor="dateOfBirth">
                        Date of Birth
                      </label>

                      <input
                        id="dateOfBirth"
                        type="date"
                        name="dateOfBirth"
                        value={formData.dateOfBirth}
                        onChange={handleChange}
                      />

                      {errors.dateOfBirth && (
                        <span className="error-message">
                          {errors.dateOfBirth}
                        </span>
                      )}

                    </div>

                    {/* Gender */}

                    <div className="form-group">

                      <label htmlFor="gender">
                        Gender
                      </label>

                      <select
                        id="gender"
                        name="gender"
                        value={formData.gender}
                        onChange={handleChange}
                      >

                        <option value="">
                          Select Gender
                        </option>

                        <option value="male">
                          Male
                        </option>

                        <option value="female">
                          Female
                        </option>

                        <option value="other">
                          Other
                        </option>

                      </select>

                      {errors.gender && (
                        <span className="error-message">
                          {errors.gender}
                        </span>
                      )}

                    </div>

                  </div>

                </div>

              )}

              {/* =================================
                  DOCTOR INFORMATION
              ================================= */}

              {formData.role === "doctor" && (

                <>

                  {/* PROFESSIONAL INFORMATION */}

                  <div className="form-section">

                    <h3>
                      Professional Information
                    </h3>

                    <div className="form-row">

                      {/* Specialization */}

                      <div className="form-group">

                        <label htmlFor="specialization">
                          Specialization
                        </label>

                        <input
                          id="specialization"
                          type="text"
                          name="specialization"
                          placeholder="e.g. Cardiologist"
                          value={
                            formData.specialization
                          }
                          onChange={handleChange}
                        />

                        {errors.specialization && (
                          <span className="error-message">
                            {errors.specialization}
                          </span>
                        )}

                      </div>

                      {/* Qualification */}

                      <div className="form-group">

                        <label htmlFor="qualification">
                          Qualification
                        </label>

                        <input
                          id="qualification"
                          type="text"
                          name="qualification"
                          placeholder="e.g. MBBS, MD"
                          value={
                            formData.qualification
                          }
                          onChange={handleChange}
                        />

                        {errors.qualification && (
                          <span className="error-message">
                            {errors.qualification}
                          </span>
                        )}

                      </div>

                    </div>

                    {/* Experience */}

                    <div className="form-group">

                      <label htmlFor="experience">
                        Years of Experience
                      </label>

                      <input
                        id="experience"
                        type="number"
                        name="experience"
                        placeholder="Enter years of experience"
                        min="0"
                        max="60"
                        value={formData.experience}
                        onChange={handleChange}
                      />

                      {errors.experience && (
                        <span className="error-message">
                          {errors.experience}
                        </span>
                      )}

                    </div>

                  </div>

                  {/* =================================
                      DOCTOR VERIFICATION DOCUMENTS
                  ================================= */}

                  <div className="form-section">

                    <h3>
                      Doctor Verification Documents
                    </h3>

                    <div className="verification-note">
                      Please upload valid documents for verification.
                      Your documents will be reviewed by the hospital
                      administrator before your doctor account is approved.
                    </div>

                    {/* Medical Degree */}

                    <div className="document-group">

                      <label
                        className="document-label"
                        htmlFor="medicalDegree"
                      >
                        Medical Degree / Qualification Certificate
                        <span className="required-star">
                          *
                        </span>
                      </label>

                      <div className="document-box">

                        <div className="document-icon">
                          🎓
                        </div>

                        <div className="document-content">

                          <strong>
                            Upload Degree Certificate
                          </strong>

                          <span>
                            MBBS, MD, BDS or relevant medical
                            qualification certificate
                          </span>

                          <input
                            id="medicalDegree"
                            className="file-input"
                            type="file"
                            name="medicalDegree"
                            accept=".pdf,.jpg,.jpeg,.png"
                            onChange={handleChange}
                          />

                          {formData.medicalDegree && (
                            <div className="file-name">
                              Selected:{" "}
                              {formData.medicalDegree.name}
                            </div>
                          )}

                        </div>

                      </div>

                      {errors.medicalDegree && (
                        <span className="error-message">
                          {errors.medicalDegree}
                        </span>
                      )}

                    </div>

                    {/* Medical Registration Certificate */}

                    <div className="document-group">

                      <label
                        className="document-label"
                        htmlFor="registrationCertificate"
                      >
                        Medical Registration Certificate / License
                        <span className="required-star">
                          *
                        </span>
                      </label>

                      <div className="document-box">

                        <div className="document-icon">
                          📜
                        </div>

                        <div className="document-content">

                          <strong>
                            Upload Registration Certificate
                          </strong>

                          <span>
                            Valid medical council registration
                            certificate or license
                          </span>

                          <input
                            id="registrationCertificate"
                            className="file-input"
                            type="file"
                            name="registrationCertificate"
                            accept=".pdf,.jpg,.jpeg,.png"
                            onChange={handleChange}
                          />

                          {formData.registrationCertificate && (
                            <div className="file-name">
                              Selected:{" "}
                              {
                                formData
                                  .registrationCertificate
                                  .name
                              }
                            </div>
                          )}

                        </div>

                      </div>

                      {errors.registrationCertificate && (
                        <span className="error-message">
                          {errors.registrationCertificate}
                        </span>
                      )}

                    </div>

                    {/* Government ID */}

                    <div className="document-group">

                      <label
                        className="document-label"
                        htmlFor="governmentId"
                      >
                        Government ID Proof
                        <span className="required-star">
                          *
                        </span>
                      </label>

                      <div className="document-box">

                        <div className="document-icon">
                          🪪
                        </div>

                        <div className="document-content">

                          <strong>
                            Upload Government ID
                          </strong>

                          <span>
                            Upload a valid government-issued
                            identity document
                          </span>

                          <input
                            id="governmentId"
                            className="file-input"
                            type="file"
                            name="governmentId"
                            accept=".pdf,.jpg,.jpeg,.png"
                            onChange={handleChange}
                          />

                          {formData.governmentId && (
                            <div className="file-name">
                              Selected:{" "}
                              {formData.governmentId.name}
                            </div>
                          )}

                        </div>

                      </div>

                      {errors.governmentId && (
                        <span className="error-message">
                          {errors.governmentId}
                        </span>
                      )}

                    </div>

                  </div>

                </>

              )}

              {/* =================================
                  ACCOUNT SECURITY
              ================================= */}

              <div className="form-section">

                <h3>
                  Account Security
                </h3>

                <div className="form-row">

                  {/* Password */}

                  <div className="form-group">

                    <label htmlFor="password">
                      Password
                    </label>

                    <div className="password-wrapper">

                      <input
                        id="password"
                        type={
                          showPassword
                            ? "text"
                            : "password"
                        }
                        name="password"
                        placeholder="Create a password"
                        value={formData.password}
                        onChange={handleChange}
                      />

                      <button
                        type="button"
                        className="password-toggle"
                        onClick={() =>
                          setShowPassword(
                            !showPassword
                          )
                        }
                      >
                        {showPassword
                          ? "Hide"
                          : "Show"}
                      </button>

                    </div>

                    {errors.password && (
                      <span className="error-message">
                        {errors.password}
                      </span>
                    )}

                  </div>

                  {/* Confirm Password */}

                  <div className="form-group">

                    <label htmlFor="confirmPassword">
                      Confirm Password
                    </label>

                    <div className="password-wrapper">

                      <input
                        id="confirmPassword"
                        type={
                          showConfirmPassword
                            ? "text"
                            : "password"
                        }
                        name="confirmPassword"
                        placeholder="Confirm your password"
                        value={
                          formData.confirmPassword
                        }
                        onChange={handleChange}
                      />

                      <button
                        type="button"
                        className="password-toggle"
                        onClick={() =>
                          setShowConfirmPassword(
                            !showConfirmPassword
                          )
                        }
                      >
                        {showConfirmPassword
                          ? "Hide"
                          : "Show"}
                      </button>

                    </div>

                    {errors.confirmPassword && (
                      <span className="error-message">
                        {errors.confirmPassword}
                      </span>
                    )}

                  </div>

                </div>

              </div>

              {/* =================================
                  TERMS AND CONDITIONS
              ================================= */}

              <div className="terms-section">

                <label className="terms-label">

                  <input
                    type="checkbox"
                    name="terms"
                    checked={formData.terms}
                    onChange={handleChange}
                  />

                  <span>
                    I agree to the{" "}

                    <a href="#terms">
                      Terms & Conditions
                    </a>

                    {" "}and{" "}

                    <a href="#privacy">
                      Privacy Policy
                    </a>

                  </span>

                </label>

                {errors.terms && (
                  <span className="error-message">
                    {errors.terms}
                  </span>
                )}

              </div>

              {/* =================================
                  SUBMIT BUTTON
              ================================= */}

              <button
                type="submit"
                className="register-button"
              >
                Create Account
              </button>

            </form>

          </div>

        </div>

      </div>
    </>
  );
}

export default Register;