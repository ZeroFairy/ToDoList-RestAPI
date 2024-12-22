import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import { LoginPage } from "./pages/LoginPage";
// import { SignupPage } from "./pages/SignupPage";

function App() {
  return (
    <Router>
      <Routes>
        {/* Redirect root path to login */}
        <Route path="/" element={<Navigate to="/login" replace />} />
        
        {/* Auth routes */}
        <Route path="/login" element={<LoginPage />} />
        {/* <Route path="/signup" element={<SignupPage />} /> */}
        
        {/* Add a catch-all route for 404s */}
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </Router>
  );
}

export default App;