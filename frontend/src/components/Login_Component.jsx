import { useState } from "react";
import { useAuth } from "../../context/authContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../style/Login_Component.css";

export default function Login_Component() {
  const { setUser, setIsAuthenticated } = useAuth();

  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("supervisor");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");
    const data = {
      email,
      password,
    };
    try {
      let url;
      if (role === "supervisor") {
        url = "http://localhost:3000/api/auth/login";
      } else {
        url = "http://localhost:3000/api/internee/login";
      }
      const response = await axios.post(url, data, {
        withCredentials: true,
      });
      setUser(response.data.user || response.data.internee || response.data);
      setIsAuthenticated(true);
      setSuccess(response.data.message || "Login Successful");
      if (role === "supervisor") {
        navigate("/dashboard");
      } else {
        navigate("/internee-dashboard");
      }
    } catch (error) {
      setError(error.response?.data?.message || "Invalid email or password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      {/* LEFT SECTION */}
      <div className="login-left">
        <div className="overlay"></div>
        <div className="left-content">
          <h1>STG Intern Tracker</h1>
          <p>
            Manage interns, supervisors, tasks, attendance and performance
            reports through one centralized platform.
          </p>
          <div className="features">
            <div>✔ Intern Management</div>
            <div>✔ Task Monitoring</div>
            <div>✔ Performance Reports</div>
          </div>
        </div>
      </div>
      {/* RIGHT SECTION */}
      <div className="login-right">
        <form className="login-form" onSubmit={handleSubmit}>
          <h2>
            {role === "supervisor" ? "Supervisor Login" : "Internee Login"}
          </h2>
          {/* ROLE BUTTONS */}
          <div className="role-buttons">
            <button
              type="button"
              className={role === "supervisor" ? "active-role" : ""}
              onClick={() => setRole("supervisor")}
            >
              Supervisor
            </button>
            <button
              type="button"
              className={role === "internee" ? "active-role" : ""}
              onClick={() => setRole("internee")}
            >
              Internee
            </button>
          </div>
          <div className="input-group">
            <label>Email Address</label>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="input-group">
            <label>Password</label>
            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          {success && <p className="success">{success}</p>}
          {error && <p className="error">{error}</p>}
          <button className="login-btn" type="submit" disabled={loading}>
            {loading
              ? "Logging in..."
              : `Login as ${role === "supervisor" ? "Supervisor" : "Internee"}`}
          </button>
        </form>
      </div>
    </div>
  );
}
