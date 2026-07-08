import Login_Component from "./components/Login_Component";
import Update_Component from "./components/Update_Component";
import Supervisor_Dashboard from "./pages/supervisor_dashboard";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login_Component />} />
          <Route path="/updateprofile" element={<Update_Component />} />
          <Route path="/dashboard" element={<Supervisor_Dashboard />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
