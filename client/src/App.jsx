import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { LoginPage } from "./pages/LoginPage";
// import { SignupPage } from "./pages/SignupPage";

function App() {


  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        {/* <Route path="/signup" element={<SignupPage />} /> */}
        {/* Add more routes as needed */}
      </Routes>
    </Router>
  );
}

export default App;
