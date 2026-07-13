import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/authContext";
import axios from "axios";
import "../style/Add_Internee_Component.css";

export default function Add_Internee_Component() {
  const { setUser, setIsAuthenticated } = useAuth();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [degreeName, setDegreeName] = useState("");
  const [EducationalStatus, setEducationalStatus] = useState("");
  const [designation, setDesignation] = useState("");

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    setSuccess("");
    setError("");

    try {
      const response = await axios.post(
        "http://localhost:3000/api/add-internee/add",
        {
          name,
          email,
          password,
          degreeName,
          EducationalStatus,
          designation,
        },
        {
          withCredentials: true,
        },
      );

      setUser(response.data.internee);
      setIsAuthenticated(true);

      setSuccess(response.data.message || "Internee added successfully!");

      setName("");
      setEmail("");
      setPassword("");
      setDegreeName("");
      setEducationalStatus("");
      setDesignation("");
    } catch (err) {
      setError(err.response?.data?.message || "Failed to add internee!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="internee-page">
      <div className="internee-card">
        <div className="card-header">
          <h1>Add New Internee</h1>
          <p>
            Fill in the details below to register a new internee in the system.
          </p>
        </div>

        <div className="card-body">
          <form onSubmit={handleSubmit}>
            <div className="form-grid">
              <div className="input-group">
                <label>Full Name</label>
                <input
                  type="text"
                  placeholder="Enter full name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>

              <div className="input-group">
                <label>Email Address</label>
                <input
                  type="email"
                  placeholder="Enter email"
                  autoComplete="new-email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              <div className="input-group">
                <label>Password</label>
                <input
                  type="password"
                  placeholder="Enter password"
                  autoComplete="new-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>

              <div className="input-group">
                <label>Degree</label>
                <input
                  type="text"
                  placeholder="BS Computer Science"
                  value={degreeName}
                  onChange={(e) => setDegreeName(e.target.value)}
                  required
                />
              </div>

              <div className="input-group">
                <label>Educational Status</label>
                <input
                  type="text"
                  placeholder="Graduate / Undergraduate"
                  value={EducationalStatus}
                  onChange={(e) => setEducationalStatus(e.target.value)}
                  required
                />
              </div>

              <div className="input-group">
                <label>Designation</label>
                <input
                  type="text"
                  placeholder="Frontend Developer"
                  value={designation}
                  onChange={(e) => setDesignation(e.target.value)}
                  required
                />
              </div>
            </div>
            {error && <div className="message error">{error}</div>}
            {success && <div className="message success">{success}</div>}
            <div className="internee-btn-container">
              <button
                type="submit"
                className="internee-add-btn"
                disabled={loading}
              >
                {loading ? "Adding..." : "Add Internee"}
              </button>

              <button
                type="button"
                className="internee-back-btn"
                onClick={() => navigate("/dashboard")}
              >
                Back
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
