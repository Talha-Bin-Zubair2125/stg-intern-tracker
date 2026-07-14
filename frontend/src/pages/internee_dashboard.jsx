import { useEffect, useState } from "react";
import { useAuth } from "../../context/authContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../style/Internee_Dashboard.css";

export default function Internee_Dashboard() {
  const { user, setUser, setIsAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const FetchUserData = async () => {
      setLoading(true);
      setError("");
      setSuccess("");
      try {
        const response = await axios.get(
          "http://localhost:3000/api/internee/profile",
          {
            withCredentials: true,
          },
        );
        setUser(response.data.internee);
        setIsAuthenticated(true);
        setSuccess("Profile loaded successfully!");
      } catch (error) {
        setError(error.response?.data?.message || "Error fetching profile!");
      } finally {
        setLoading(false);
      }
    };
    FetchUserData();
  }, [setUser, setIsAuthenticated]);

  const getInitials = (name) => {
    if (!name) return "";
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  const handleLogout = async () => {
    setLoading(true);
    try {
      await axios.post(
        "http://localhost:3000/api/auth/logout",
        {},
        {
          withCredentials: true,
        },
      );
      setUser(null);
      setIsAuthenticated(false);
      navigate("/");
    } catch (error) {
      setError(error.response?.data?.message || "Logout failed!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="dashboard-container">
      <div className="dashboard">
        {/* Header */}
        <header className="dashboard-header">
          <div className="header-brand">
            <h1>STG Intern Tracker</h1>
            <p>Internee Dashboard</p>
          </div>
          <button className="logout-btn" onClick={handleLogout}>
            Logout
          </button>
        </header>
        {/* Messages */}
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
          {/* Details */}
          <div className="details-card">
            <h3>Internee Details</h3>
            <div className="details-grid">
              <div>
                <span>Degree</span>
                <p>{user?.degreeName}</p>
              </div>
              <div>
                <span>Educational Status</span>
                <p>{user?.EducationalStatus}</p>
              </div>
              <div>
                <span>Designation</span>
                <p>{user?.designation}</p>
              </div>
              <div>
                <span>Role</span>
                <p>{user?.role}</p>
              </div>
            </div>
          </div>
          <div className="profile-actions">
            <button
              className="update-btn"
              onClick={() => navigate("/internee-updateprofile")}
            >
              Update Profile
            </button>

            <button
              className="report-btn"
              onClick={() => navigate("/internee-add-report")}
            >
              Add Report
            </button>

            <button
              className="submitted-btn"
              onClick={() => navigate("/internee-submitted-reports")}
            >
              View Submitted Reports
            </button>

            <button
              className="comments-btn"
              onClick={() => navigate("/internee-comments")}
            >
              View Comments
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
