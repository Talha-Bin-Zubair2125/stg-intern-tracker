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
        setSuccess("Profile loaded successfully!");
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
        setSuccess("Interns loaded successfully!");
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
      setError(error.response?.data?.message || "Logout failed");
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
            <button
              className="secondary-btn"
              onClick={() => navigate("/add-internee")}
            >
              Add Interns
            </button>
          </div>
        </div>

        {/* Intern Cards */}
        <div className="intern-section">
          <h2>Intern List</h2>

          {users && users.length > 0 ? (
            <div className="table-container">
              <table className="intern-table">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Degree</th>
                    <th>Status</th>
                    <th>Designation</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((intern, index) => (
                    <tr key={intern._id}>
                      <td>{index + 1}</td>
                      <td>{intern.name}</td>
                      <td>{intern.email}</td>
                      <td>{intern.degreeName}</td>
                      <td>{intern.EducationalStatus}</td>
                      <td>{intern.designation}</td>
                      <td>
                        <button
                          className="view-btn"
                          onClick={() =>
                            navigate(`/intern-profile/${intern._id}`)
                          }
                        >
                          View Profile
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p>No interns available.</p>
          )}
        </div>
      </div>
    </div>
  );
}
