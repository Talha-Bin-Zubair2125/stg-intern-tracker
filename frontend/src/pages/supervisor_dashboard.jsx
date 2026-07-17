import { useEffect, useState } from "react";
import { useAuth } from "../../context/authContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../style/Supervisor_Dashboard.css";

export default function Supervisor_Dashboard() {
  const { user, setUser, users, setUsers, setIsAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [reports, setReports] = useState([]);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    const loadData = async () => {
      try {
        const profile = await axios.get(
          "http://localhost:3000/api/auth/profile",
          {
            withCredentials: true,
          },
        );
        setUser(profile.data);
        const interns = await axios.get(
          "http://localhost:3000/api/auth/interns",
          {
            withCredentials: true,
          },
        );
        setUsers(interns.data.interns);
        const reports = await axios.get(
          "http://localhost:3000/api/report/all",
          {
            withCredentials: true,
          },
        );
        setReports(reports.data.reports);
      } catch (err) {
        setError(err.response?.data?.message || "Failed to load dashboard");
      }
    };
    loadData();
  }, [setUser, setUsers]);

  const downloadReport = async (id, fileName) => {
    try {
      const response = await axios.get(
        `http://localhost:3000/api/report/download/${id}`,

        {
          withCredentials: true,
          responseType: "blob",
        },
      );
      const url = URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.download = fileName;
      link.click();
      URL.revokeObjectURL(url);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to download report");
    }
  };

  const deleteReport = async (id, fileName) => {
    try {
      await axios.delete(`http://localhost:3000/api/report/${id}`, {
        withCredentials: true,
      });
      setReports((prevReports) =>
        prevReports.filter((report) => report._id !== id),
      );
      setSuccess(`Report ${fileName} deleted successfully`);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to delete report");
    }
  };

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
    } catch (err) {
      setError(err.response?.data?.message || "Logout failed");
    }
  };

  const getInitials = (name) => {
    if (!name) return "";
    return name
      .split(" ")
      .map((item) => item[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <div className="dashboard-page">
      <div className="dashboard-card">
        <header className="dashboard-header">
          <div>
            <h1>STG Intern Tracker</h1>
            <p>Supervisor Dashboard</p>
          </div>
          <button className="logout-btn" onClick={handleLogout}>
            Logout
          </button>
        </header>
        {error && <div className="alert error">{error}</div>}
        {success && <div className="alert success">{success}</div>}
        {user && (
          <div className="profile-card">
            <div className="avatar">{getInitials(user.name)}</div>
            <div>
              <h2>{user.name}</h2>
              <p>{user.email}</p>
              <span className="role">{user.role}</span>
            </div>
          </div>
        )}
        <div className="stats-grid">
          <div className="stat-card">
            <span className="stat-icon">👨‍🎓</span>
            <div>
              <h3>Total Interns</h3>
              <h1>{users?.length || 0}</h1>
            </div>
          </div>

          <div className="stat-card">
            <span className="stat-icon">📄</span>
            <div>
              <h3>Total Reports</h3>
              <h1>{reports?.length || 0}</h1>
            </div>
          </div>
        </div>
        <section className="actions-section">
          <h2>Quick Actions</h2>
          <div className="actions-grid">
            <button
              className="action-btn blue"
              onClick={() => navigate("/updateprofile")}
            >
              <span className="action-icon">👤</span>
              <span>Update Profile</span>
            </button>
            <button
              className="action-btn green"
              onClick={() => navigate("/add-internee")}
            >
              <span className="action-icon">➕</span>
              <span>Add Intern</span>
            </button>
            <button
              className="action-btn orange"
              onClick={() => navigate("/add-comments")}
            >
              <span className="action-icon">💬</span>
              <span>Add Comments</span>
            </button>
          </div>
        </section>
        <section className="table-section">
          <h2>Intern List</h2>
          <div className="table-wrapper">
            <table>
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
                {users?.map((intern, index) => (
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
                        View
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
        <section className="table-section">
          <h2>Uploaded Reports</h2>
          <div className="table-wrapper">
            <table>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Internee</th>
                  <th>Email</th>
                  <th>Report</th>
                  <th>Date</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {reports?.map((report, index) => (
                  <tr key={report._id}>
                    <td>{index + 1}</td>
                    <td>{report.interneeId?.name}</td>
                    <td>{report.interneeId?.email}</td>
                    <td>{report.originalFileName}</td>
                    <td>{new Date(report.createdAt).toLocaleDateString()}</td>
                    <td>
                      <div className="report-actions">
                        <button
                          className="download-btn"
                          onClick={() =>
                            downloadReport(report._id, report.originalFileName)
                          }
                        >
                          Download
                        </button>

                        <button
                          className="delete-btn"
                          onClick={() =>
                            deleteReport(report._id, report.originalFileName)
                          }
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </div>
  );
}
