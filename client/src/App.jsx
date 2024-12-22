import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import { LoginPage } from "./pages/LoginPage";
import { SignupPage } from "./pages/SignupPage";
import { ToDoPage } from "./pages/ToDoPage";

function App() {
  return (
    <Router>
      <Routes>
        {/* Redirect root path to login */}
        <Route path="/" element={<Navigate to="/login" replace />} />
        
        {/* Auth routes */}
        <Route path="/login" element={<LoginPage />} />
        {/* <Route path="/signup" element={<SignupPage />} /> */}
        
        {/* Sign Up Routes */}
        <Route path="/signup" element={<SignupPage />} />

        {/* To Do Routes */}
        <Route path="/todo/:id" element={<ToDoPage />} />
        {/* <Route path="/todo/*" element={<ToDoPage />} /> */}
      </Routes>
    </Router>
  );
}

export default App;