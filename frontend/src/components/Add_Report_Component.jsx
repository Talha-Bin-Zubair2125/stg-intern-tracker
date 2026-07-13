import { useState, useEffect } from "react";
import { useAuth } from "../../context/authContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../style/Add_Report_Component.css";

export default function Add_Report_Component() {
  const { user, setUser, setIsAuthenticated } = useAuth();
  const [selectedFile, setSelectedFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/api/internee/profile",
          {
            withCredentials: true,
          },
        );
        setUser(response.data.internee);
        setIsAuthenticated(true);
      } catch (err) {
        setError(err.response?.data?.message || "Unable to fetch profile");
      }
    };
    fetchUserData();
  }, [setUser, setIsAuthenticated]);

  const handleFileChange = (e) => {
    setSuccess("");
    setError("");
    const file = e.target.files[0];
    if (!file) return;
    const allowedTypes = [
      "text/csv",
      "application/vnd.ms-excel",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    ];
    if (!allowedTypes.includes(file.type)) {
      setError("Only CSV and XLSX files are allowed");
      e.target.value = "";
      return;
    }
    setSelectedFile(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccess("");
    setError("");
    if (!selectedFile) {
      setError("Please select a report");
      return;
    }
    try {
      setLoading(true);
      const formData = new FormData();
      formData.append("report", selectedFile);
      const response = await axios.post(
        "http://localhost:3000/api/report/upload",
        formData,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "multipart/form-data",
          },
        },
      );
      setSuccess(response.data.message);
      setSelectedFile(null);
      document.getElementById("report").value = "";
    } catch (err) {
      setError(err.response?.data?.message || "Upload failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="report-page">
      <div className="report-upload-card">
        <div className="header-section">
          <h2>Upload Weekly Report</h2>
          <p>
            Welcome
            <strong> {user?.name}</strong>
          </p>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="upload-box">
            <label htmlFor="report">Choose Report File</label>
            <input
              id="report"
              type="file"
              accept=".csv,.xlsx"
              onChange={handleFileChange}
            />
            <p className="file-info">Supported formats: CSV, XLSX</p>
            {selectedFile && (
              <div className="selected-file">
                <span>Selected File</span>
                <p>{selectedFile.name}</p>
              </div>
            )}
          </div>
          <button className="upload-btn" disabled={loading}>
            {loading ? "Uploading..." : "Upload Report"}
          </button>
          <button
            type="button"
            className="back-btn"
            onClick={() => navigate("/internee-dashboard")}
          >
            ← Back
          </button>
        </form>
        {success && <div className="success-msg">{success}</div>}
        {error && <div className="error-msg">{error}</div>}
      </div>
    </div>
  );
}
