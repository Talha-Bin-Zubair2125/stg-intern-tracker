import Login_Component from "./components/Login_Component";
import Update_Component from "./components/Update_Component";
import Add_Internee_Component from "./components/Add_Internee_Component";
import Internee_Login_Component from "./components/Internee_Login_Component";
import Internee_Dashboard from "./pages/internee_dashboard";
import Internee_Update_Component from "./components/internee_Update_Component";
import Supervisor_Dashboard from "./pages/supervisor_dashboard";
import Internee_View_Profile from "./components/Internee_View_Profile";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login_Component />} />
          <Route path="/internee-login" element={<Internee_Login_Component />} />
          <Route path="/updateprofile" element={<Update_Component />} />
          <Route path="/internee-updateprofile" element={<Internee_Update_Component />} />
          <Route path="/internee-dashboard" element={<Internee_Dashboard />} />
          <Route path="/intern-profile/:id" element={<Internee_View_Profile />} />
          <Route path="/add-internee" element={<Add_Internee_Component />} />
          <Route path="/dashboard" element={<Supervisor_Dashboard />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
