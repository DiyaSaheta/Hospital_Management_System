import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    role: "patient",
    rememberMe: false,
  });
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  // ==========================================
  // HANDLE INPUT CHANGE
  // ==========================================
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((previousData) => ({
      ...previousData,
      [name]: type === "checkbox" ? checked : value,
    }));
    // Remove error when user starts correcting
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
    // Email validation
    if (!formData.email.trim()) {
      newErrors.email = "Email address is required.";
    } else if (
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)
    ) {
      newErrors.email =
        "Please enter a valid email address.";
    }
    // Password validation
    if (!formData.password) {
      newErrors.password = "Password is required.";
    } else if (formData.password.length < 8) {
      newErrors.password =
        "Password must contain at least 8 characters.";
    }
    // Role validation
    if (!formData.role) {
      newErrors.role = "Please select your role.";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  // ==========================================
  // LOGIN SUBMIT
  // ==========================================
  const handleSubmit = (e) => {
    e.preventDefault();
    const isValid = validateForm();
    if (!isValid) {
      return;
    }
    /*
      BACKEND CONNECTION WILL BE ADDED LATER.
      Later we will send the login details
      to your Node.js backend using Axios.
      Example:
      axios.post(
        "http://localhost:5000/api/auth/login",
        formData
      );
    */
    alert("Login successful!");
    if (formData.role === "doctor") {
      navigate("/doctor-dashboard");
    } else {
      navigate("/patient-dashboard");
    }
  };

  return (
    <>
      {/* =================================================
          CSS
      ================================================= */}
      <style>{`
        /* ================================================
           GENERAL
        ================================================ */
        * {
          box-sizing: border-box;
        }
        .login-page {
          min-height: 100vh;
          width: 100%;
          display: flex;
          background: #f5f8fc;
          font-family: Arial, Helvetica, sans-serif;
        }
        /* ================================================
           LEFT SECTION
        ================================================ */
        .login-left {
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
        /* Decorative circle */
        .login-left::before {
          content: "";
          position: absolute;
          width: 350px;
          height: 350px;
          border-radius: 50%;
          background: rgba(
            255,
            255,
            255,
            0.08
          );
          top: -120px;
          right: -100px;
        }
        /* Decorative circle */
        .login-left::after {
          content: "";
          position: absolute;
          width: 280px;
          height: 280px;
          border-radius: 50%;
          background: rgba(
            255,
            255,
            255,
            0.06
          );
          bottom: -100px;
          left: -80px;
        }
        /* ================================================
           BRAND
        ================================================ */
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
          box-shadow:
            0 8px 20px rgba(
              0,
              0,
              0,
              0.12
            );
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
        /* ================================================
           INTRODUCTION
        ================================================ */
        .login-intro {
          margin-top: 80px;
          position: relative;
          z-index: 1;
        }
        .login-intro h2 {
          margin: 0;
          font-size: 48px;
          line-height: 1.15;
          font-weight: 700;
        }
        .login-intro p {
          max-width: 480px;
          margin-top: 25px;
          font-size: 16px;
          line-height: 1.8;
          opacity: 0.9;
        }
        /* ================================================
           FEATURES
        ================================================ */
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
          background: rgba(
            255,
            255,
            255,
            0.18
          );
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
        /* ================================================
           RIGHT SECTION
        ================================================ */
        .login-right {
          width: 58%;
          min-height: 100vh;
          padding: 45px 70px;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .login-container {
          width: 100%;
          max-width: 500px;
        }
        /* ================================================
           LOGIN HEADER
        ================================================ */
        .login-header {
          text-align: center;
          margin-bottom: 30px;
        }
        .login-header h2 {
          margin: 0;
          color: #172033;
          font-size: 30px;
          font-weight: 700;
        }
        .login-header p {
          margin-top: 9px;
          color: #6b7280;
          font-size: 14px;
        }
        .login-header a {
          color: #0f766e;
          text-decoration: none;
          font-weight: 600;
        }
        .login-header a:hover {
          text-decoration: underline;
        }
        /* ================================================
           LOGIN CARD
        ================================================ */
        .login-card {
          background: white;
          border-radius: 18px;
          padding: 38px;
          box-shadow:
            0 10px 35px rgba(
              15,
              23,
              42,
              0.08
            );
        }
        /* ================================================
           ROLE SELECTION
        ================================================ */
        .login-role-title {
          margin-bottom: 10px;
          color: #374151;
          font-size: 13px;
          font-weight: 600;
        }
        .login-role-selection {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 12px;
          margin-bottom: 25px;
        }
        .login-role-card {
          display: block;
          padding: 14px;
          border: 1px solid #d9dee7;
          border-radius: 10px;
          cursor: pointer;
          transition: all 0.2s ease;
        }
        .login-role-card:hover {
          border-color: #0f766e;
          background: #f7fffe;
        }
        .login-role-card.selected {
          border-color: #0f766e;
          background: #f0fdfa;
          box-shadow:
            0 0 0 2px rgba(
              15,
              118,
              110,
              0.08
            );
        }
        .login-role-card input {
          display: none;
        }
        .login-role-content {
          display: flex;
          align-items: center;
          gap: 10px;
        }
        .login-role-icon {
          width: 38px;
          height: 38px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 9px;
          background: #e6fffb;
          font-size: 19px;
        }
        .login-role-content strong {
          display: block;
          color: #172033;
          font-size: 13px;
        }
        .login-role-content small {
          display: block;
          margin-top: 3px;
          color: #6b7280;
          font-size: 10px;
        }
        /* ================================================
           FORM GROUP
        ================================================ */
        .login-form-group {
          margin-bottom: 20px;
        }
        .login-form-group label {
          display: block;
          margin-bottom: 8px;
          color: #374151;
          font-size: 13px;
          font-weight: 600;
        }
        .login-form-group input {
          width: 100%;
          height: 48px;
          padding: 0 14px;
          border: 1px solid #d9dee7;
          border-radius: 9px;
          outline: none;
          background: white;
          color: #172033;
          font-size: 14px;
          transition: all 0.2s ease;
        }
        .login-form-group input::placeholder {
          color: #9ca3af;
        }
        .login-form-group input:focus {
          border-color: #0f766e;
          box-shadow:
            0 0 0 3px rgba(
              15,
              118,
              110,
              0.1
            );
        }
        /* ================================================
           PASSWORD
        ================================================ */
        .login-password-wrapper {
          position: relative;
        }
        .login-password-wrapper input {
          padding-right: 65px;
        }
        .login-password-toggle {
          position: absolute;
          right: 12px;
          top: 50%;
          transform: translateY(-50%);
          border: none;
          background: transparent;
          color: #0f766e;
          font-size: 12px;
          font-weight: 600;
          cursor: pointer;
        }
        /* ================================================
           FORGOT PASSWORD
        ================================================ */
        .login-options {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-top: -4px;
          margin-bottom: 25px;
        }
        .remember-me {
          display: flex;
          align-items: center;
          gap: 8px;
          color: #6b7280;
          font-size: 12px;
          cursor: pointer;
        }
        .remember-me input {
          width: 15px;
          height: 15px;
          accent-color: #0f766e;
          cursor: pointer;
        }
        .forgot-password {
          color: #0f766e;
          text-decoration: none;
          font-size: 12px;
          font-weight: 600;
        }
        .forgot-password:hover {
          text-decoration: underline;
        }
        /* ================================================
           ERROR MESSAGE
        ================================================ */
        .login-error {
          display: block;
          margin-top: 6px;
          color: #dc2626;
          font-size: 11px;
        }
        /* ================================================
           GENERAL LOGIN ERROR
        ================================================ */
        .login-general-error {
          padding: 12px;
          margin-bottom: 18px;
          border-radius: 8px;
          background: #fef2f2;
          border: 1px solid #fecaca;
          color: #dc2626;
          font-size: 12px;
          text-align: center;
        }
        /* ================================================
           LOGIN BUTTON
        ================================================ */
        .login-button {
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
        .login-button:hover {
          background: #115e59;
          transform: translateY(-1px);
          box-shadow:
            0 7px 18px rgba(
              15,
              118,
              110,
              0.2
            );
        }
        .login-button:active {
          transform: translateY(0);
        }
        /* ================================================
           REGISTER LINK
        ================================================ */
        .register-link {
          margin-top: 25px;
          text-align: center;
          color: #6b7280;
          font-size: 13px;
        }
        .register-link a {
          color: #0f766e;
          text-decoration: none;
          font-weight: 600;
        }
        .register-link a:hover {
          text-decoration: underline;
        }
        /* ================================================
           SECURITY MESSAGE
        ================================================ */
        .security-message {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 7px;
          margin-top: 25px;
          color: #9ca3af;
          font-size: 11px;
        }
        /* ================================================
           RESPONSIVE
        ================================================ */
        @media (max-width: 1100px) {
          .login-left {
            width: 38%;
            padding: 40px;
          }
          .login-right {
            width: 62%;
            padding: 35px;
          }
          .login-intro h2 {
            font-size: 38px;
          }
        }
        @media (max-width: 850px) {
          .login-page {
            display: block;
          }
          .login-left {
            width: 100%;
            min-height: auto;
            padding: 35px;
          }
          .login-intro {
            margin-top: 40px;
          }
          .login-intro h2 {
            font-size: 36px;
          }
          .health-features {
            margin-top: 35px;
          }
          .login-right {
            width: 100%;
            min-height: auto;
            padding: 35px 20px;
          }
        }
        @media (max-width: 600px) {
          .login-left {
            padding: 30px 22px;
          }
          .hospital-brand h1 {
            font-size: 23px;
          }
          .login-intro h2 {
            font-size: 32px;
          }
          .login-intro p {
            font-size: 14px;
          }
          .login-card {
            padding: 22px;
            border-radius: 14px;
          }
          .login-header h2 {
            font-size: 25px;
          }
          .login-role-selection {
            grid-template-columns: 1fr;
          }
          .login-options {
            flex-direction: column;
            align-items: flex-start;
            gap: 12px;
          }
        }
      `}</style>
      {/* =================================================
          LOGIN PAGE
      ================================================= */}
      <div className="login-page">
        {/* ================================================
            LEFT SIDE
        ================================================ */}
        <div className="login-left">
          {/* BRAND */}
          <div className="hospital-brand">
            <div className="brand-icon">
              +
            </div>
            <div>
              <h1>
                CureAI
              </h1>
              <p>
                Hospital Management System
              </p>
            </div>
          </div>
          {/* INTRODUCTION */}
          <div className="login-intro">
            <h2>
              Welcome
              <br />
              Back!
            </h2>
            <p>
              Login to access your healthcare dashboard, appointments, medical records and more.
            </p>
          </div>
          {/* FEATURES */}
          <div className="health-features">
            <div className="health-feature">
              <span>
                ✓
              </span>
              <div>
                <h4>
                  Manage Appointments
                </h4>
                <p>
                  View and manage your appointments easily.
                </p>
              </div>
            </div>
            <div className="health-feature">
              <span>
                ✓
              </span>
              <div>
                <h4>
                  Access Medical Records
                </h4>
                <p>
                  Keep track of your medical history securely.
                </p>
              </div>
            </div>
            <div className="health-feature">
              <span>
                ✓
              </span>
              <div>
                <h4>
                  Connect With Doctors
                </h4>
                <p>
                  Get better healthcare through easy communication.
                </p>
              </div>
            </div>
          </div>
        </div>
        {/* ================================================
            RIGHT SIDE
        ================================================ */}
        <div className="login-right">
          <div className="login-container">
            {/* HEADER */}
            <div className="login-header">
              <h2>
                Welcome Back
              </h2>
              <p>
                Don't have an account?{" "}
                <Link to="/register">
                  Create Account
                </Link>
              </p>
            </div>
            {/* LOGIN CARD */}
            <div className="login-card">
              {/* ==========================================
                  ROLE
              ========================================== */}
              <div className="login-role-title">
                Login As
              </div>
              <div className="login-role-selection">
                {/* PATIENT */}
                <label
                  className={`
                    login-role-card
                    ${
                      formData.role === "patient"
                        ? "selected"
                        : ""
                    }
                  `}
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
                  <div className="login-role-content">
                    <span className="login-role-icon">
                      👤
                    </span>
                    <div>
                      <strong>
                        Patient
                      </strong>
                      <small>
                        Access patient portal
                      </small>
                    </div>
                  </div>
                </label>
                {/* DOCTOR */}
                <label
                  className={`
                    login-role-card
                    ${
                      formData.role === "doctor"
                        ? "selected"
                        : ""
                    }
                  `}
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
                  <div className="login-role-content">
                    <span className="login-role-icon">
                      🩺
                    </span>
                    <div>
                      <strong>
                        Doctor
                      </strong>
                      <small>
                        Access doctor portal
                      </small>
                    </div>
                  </div>
                </label>
              </div>
              {/* LOGIN FORM */}
              <form onSubmit={handleSubmit}>
                {/* EMAIL */}
                <div className="login-form-group">
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
                    <span className="login-error">
                      {errors.email}
                    </span>
                  )}
                </div>
                {/* PASSWORD */}
                <div className="login-form-group">
                  <label htmlFor="password">
                    Password
                  </label>
                  <div className="login-password-wrapper">
                    <input
                      id="password"
                      type={
                        showPassword
                          ? "text"
                          : "password"
                      }
                      name="password"
                      placeholder="Enter your password"
                      value={formData.password}
                      onChange={handleChange}
                    />
                    <button
                      type="button"
                      className="login-password-toggle"
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
                    <span className="login-error">
                      {errors.password}
                    </span>
                  )}
                </div>
                {/* OPTIONS */}
                <div className="login-options">
                  <label className="remember-me">
                    <input type="checkbox" name="rememberMe" checked={ formData.rememberMe } onChange={handleChange}/>
                    <span>
                      Remember me
                    </span>
                  </label>
                  <Link to="/forgot-password" className="forgot-password">
                    Forgot Password?
                  </Link>
                </div>
                {/* LOGIN BUTTON */}
                <button type="submit" className="login-button">
                  Login
                </button>
              </form>
              {/* REGISTER */}
              <div className="register-link">
                Don't have an account?{" "}
                <Link to="/register">
                  Register Now
                </Link>
              </div>
              {/* SECURITY */}
              <div className="security-message">
                🔒
                <span>
                  Your information is secure and protected.
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default Login;