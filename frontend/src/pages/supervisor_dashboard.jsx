import { useEffect, useState } from "react";
import { useAuth } from "../../context/authContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../style/Supervisor_Dashboard.css";

export default function Supervisor_Dashboard() {
  const { user, setUser, setIsAuthenticated } = useAuth();
  const navigate = useNavigate();

  // States
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const FetchUserProfileData = async () => {
      setLoading(true);
      setError("");
      setSuccess("");

      try {
        const response = await axios.get(
          "http://localhost:3000/api/auth/profile",
          {
            withCredentials: true,
          },
        );

        setUser(response.data);
        setSuccess("Profile loaded successfully!");
      } catch (error) {
        setError(error.response?.data?.message || "Error fetching profile!");
      } finally {
        setLoading(false);
      }
    };

    FetchUserProfileData();
  }, [setUser]);

  const handleLogout = async () => {
    setLoading(true);
    setSuccess("");
    setError("");

    try {
      const response = await axios.post(
        "http://localhost:3000/api/auth/logout",
        {},
        {
          withCredentials: true,
        },
      );

      setUser(null);
      setIsAuthenticated(false);

      setSuccess(response.data.message || "Logged out successfully!");
      navigate("/");
    } catch (error) {
      setError(error.response?.data?.message || "Logout failed!");
    } finally {
      setLoading(false);
    }
  };

  // Helper to get initials for the avatar instead of rendering full name
  const getInitials = (name) => {
    if (!name) return "";
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <div className="dashboard-container">
      <div className="dashboard">
        <header className="dashboard-header">
          <div className="header-brand">
            <h1>STG Intern Tracker</h1>
            <p>Supervisor Dashboard</p>
          </div>

          <button className="logout-btn" onClick={handleLogout}>
            Logout
          </button>
        </header>

        {/* Status Messages Wrapper */}
        <div className="message-container">
          {loading && <p className="loading">Loading...</p>}
          {success && <p className="success">{success}</p>}
          {error && <p className="error">{error}</p>}
        </div>

        <div className="dashboard-content">
          {user && (
            <div className="profile-card">
              <div className="avatar">{getInitials(user.name)}</div>

              <div className="profile-info">
                <h2>{user.name}</h2>
                <p>{user.email}</p>
                <span className="role-badge">{user.role}</span>
              </div>
            </div>
          )}

          <div className="stats-and-actions">
            <div className="card">
              <h3>Total Interns</h3>
              <h2>0</h2>
            </div>

            <div className="action-buttons">
              <button
                className="primary-btn"
                onClick={() => navigate("/updateprofile")}
              >
                Update Profile
              </button>

              <button className="secondary-btn">Add Interns</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
