import { useEffect, useState } from "react";
import { useAuth } from "../../context/authContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../style/Supervisor_Dashboard.css";

export default function Supervisor_Dashboard() {
  const { user, setUser, users, setUsers, setIsAuthenticated } = useAuth();

  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  // Fetch Supervisor Profile

  useEffect(() => {
    const FetchUserProfileData = async () => {
      setLoading(true);

      try {
        const response = await axios.get(
          "http://localhost:3000/api/auth/profile",

          {
            withCredentials: true,
          },
        );

        setUser(response.data);
      } catch (error) {
        setError(error.response?.data?.message || "Error fetching profile");
      } finally {
        setLoading(false);
      }
    };

    FetchUserProfileData();
  }, [setUser]);

  // Fetch Interns

  useEffect(() => {
    const fetchInterns = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/api/auth/interns",

          {
            withCredentials: true,
          },
        );

        setUsers(response.data.interns);
      } catch (error) {
        setError(error.response?.data?.message || "Error fetching interns");
      }
    };

    fetchInterns();
  }, [setUsers]);

  // Logout

  const handleLogout = async () => {
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
      setError("Logout failed");
    }
  };

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

        <div className="message-container">
          {loading && <p className="loading">Loading...</p>}

          {success && <p className="success">{success}</p>}

          {error && <p className="error">{error}</p>}
        </div>

        {/* Supervisor Profile */}

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

        {/* Stats */}

        <div className="stats-and-actions">
          <div className="card">
            <h3>Total Interns</h3>

            <h2>{users?.length || 0}</h2>
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

        {/* Intern Cards */}

        <div className="intern-section">
          <h2>Intern List</h2>

          <div className="intern-grid">
            {users && users.length > 0 ? (
              users.map((intern) => (
                <div className="intern-card" key={intern._id}>
                  <div className="intern-avatar">
                    {getInitials(intern.name)}
                  </div>

                  <h3>{intern.name}</h3>

                  <p>{intern.email}</p>

                  <span className="role-badge">{intern.role}</span>

                  <div className="intern-details">
                    <p>
                      <b>Degree:</b>

                      {intern.degreeName}
                    </p>

                    <p>
                      <b>Status:</b>

                      {intern.EducationalStatus}
                    </p>

                    <p>
                      <b>Designation:</b>

                      {intern.designation}
                    </p>
                  </div>

                  <button className="view-btn">View Profile</button>
                </div>
              ))
            ) : (
              <p>No interns available</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
