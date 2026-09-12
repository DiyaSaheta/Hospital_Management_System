import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";

import PatientDashboard from "./pages/PatientDashboard";
import PatientAppointments from "./pages/PatientAppointments";
import BookAppointment from "./pages/BookAppointment";
import PatientDoctors from "./pages/PatientDoctors";
import PatientMedicalRecords from "./pages/PatientMedicalRecords";
import PatientPrescriptions from "./pages/PatientPrescriptions";
import PatientProfile from "./pages/PatientProfile";
import PatientNotifications from "./pages/PatientNotifications";

import DoctorDashboard from "./pages/DoctorDashboard";
import DoctorAppointments from "./pages/DoctorAppointments";
import DoctorPatients from "./pages/DoctorPatients";
import DoctorMedicalRecords from "./pages/DoctorMedicalRecords";
import DoctorPrescriptions from "./pages/DoctorPrescriptions";
import DoctorProfile from "./pages/DoctorProfile";
import DoctorNotifications from "./pages/DoctorNotifications";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route path="/patient-dashboard" element={<PatientDashboard />} />
        <Route path="/patient-appointments" element={<PatientAppointments />} />
        <Route path="/book-appointment" element={<BookAppointment />} />
        <Route path="/patient-doctors" element={<PatientDoctors />} />
        <Route path="/patient-medical-records" element={<PatientMedicalRecords />} />
        <Route path="/patient-prescriptions" element={<PatientPrescriptions />} />
        <Route path="/patient-profile" element={<PatientProfile />} />
        <Route path="/patient-notifications" element={<PatientNotifications />} />

        <Route path="/doctor-dashboard" element={<DoctorDashboard />} />
        <Route path="/doctor-appointments" element={<DoctorAppointments />} />
        <Route path="/doctor-patients" element={<DoctorPatients />} />
        <Route path="/doctor-medical-records" element={<DoctorMedicalRecords />} />
        <Route path="/doctor-prescriptions" element={<DoctorPrescriptions />} />
        <Route path="/doctor-profile" element={<DoctorProfile />} />
        <Route path="/doctor-notifications" element={<DoctorNotifications />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;