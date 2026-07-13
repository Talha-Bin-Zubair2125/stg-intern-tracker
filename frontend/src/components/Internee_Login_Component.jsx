import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/authContext";
import axios from "axios";
import "../style/Login_Component.css";

export default function Internee_Login_Component() {
  const { setUser, setIsAuthenticated } = useAuth();
  const navigate = useNavigate();
  // States
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = { email, password };
    setError("");
    setSuccess("");
    setLoading(true);
    try {
      const response = await axios.post(
        "http://localhost:3000/api/internee/login",
        data,
        {
          withCredentials: true,
        },
      );
      setUser(response.data);
      setIsAuthenticated(true);
      setSuccess(response.data.message || "Login successful!");
      navigate("/internee-dashboard");
    } catch (error) {
      setError(error.response?.data?.message || "Invalid email or password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      {/* Left Side */}
      <div className="login-left">
        <div className="overlay"></div>
        <div className="left-content">
          <h1>STG Intern Tracker</h1>
          <p>
            Manage interns, supervisors, attendance, tasks, progress reports,
            and evaluations through one centralized platform.
          </p>
          <div className="features">
            <div>✔ Intern Management</div>
            <div>✔ Task Monitoring</div>
            <div>✔ Performance Reports</div>
          </div>
        </div>
      </div>
      {/* Right Side */}
      <div className="login-right">
        <form className="login-form" onSubmit={handleSubmit}>
          <h2>Internee Login</h2>
          <div className="input-group">
            <label>Email Address</label>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              autoComplete="new-email"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="input-group">
            <label>Password</label>
            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              autoComplete="new-password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          {success && <p className="success">{success}</p>}
          {error && <p className="error">{error}</p>}
          <button type="submit" disabled={loading}>
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
}
