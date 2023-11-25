import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./Components/Navbar";
import Login from "./pages/Login";
import Cuenta from "./pages/Cuenta"

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navbar />} />
        <Route path="/login" element={<Login/>} />
        <Route path="/Cuenta" element={<Cuenta/>} />
      </Routes>
    </Router>
  );
};

export default App;
