import { useState, useEffect } from "react";
import { useAuth } from "../../context/authContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../style/Update_Component.css";

export default function Internee_Update_Component() {
  const { setUser } = useAuth();
  const navigate = useNavigate();

  // States
  const [updatedName, setUpdatedName] = useState("");
  const [updatedEmail, setUpdatedEmail] = useState("");
  const [updatedPassword, setUpdatedPassword] = useState("");
  const [updatedDegreeName, setUpdatedDegreeName] = useState("");
  const [updatedEducationalStatus, setUpdatedEducationalStatus] = useState("");
  const [updatedDesignation, setUpdatedDesignation] = useState("");

  // Messages
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  // Fetch Internee Profile
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
        const internee = response.data.internee;
        setUser(internee);
        // Populate Form Fields
        setUpdatedName(internee.name || "");
        setUpdatedEmail(internee.email || "");
        setUpdatedDegreeName(internee.degreeName || "");
        setUpdatedEducationalStatus(internee.EducationalStatus || "");
        setUpdatedDesignation(internee.designation || "");
        setSuccess("Profile loaded successfully!");
      } catch (error) {
        setError(error.response?.data?.message || "Error fetching profile!");
      } finally {
        setLoading(false);
      }
    };
    FetchUserData();
  }, [setUser]);

  // Update Profile
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");
    const data = {
      name: updatedName,
      email: updatedEmail,
      password: updatedPassword,
      degreeName: updatedDegreeName,
      EducationalStatus: updatedEducationalStatus,
      designation: updatedDesignation,
    };
    try {
      const response = await axios.put(
        "http://localhost:3000/api/internee/update-profile",
        data,
        {
          withCredentials: true,
        },
      );
      setUser(response.data.internee);
      setUpdatedPassword("");
      setSuccess(response.data.message || "Profile updated successfully!");
    } catch (error) {
      setError(error.response?.data?.message || "Failed to update profile!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="update-page">
      <div className="update-card">
        {/* Left Side */}
        <div className="left-panel">
          <h1>Update Profile</h1>
          <p>
            Keep your internee profile updated with your latest academic and
            professional details.
          </p>
          <div className="tips">
            <div>👤 Update your name</div>
            <div>📧 Keep your email current</div>
            <div>🎓 Update degree information</div>
            <div>💼 Maintain your designation</div>
            <div>🔒 Change password anytime</div>
          </div>
        </div>
        {/* Right Side */}
        <div className="right-panel">
          <form onSubmit={handleSubmit}>
            <h2>Profile Information</h2>
            <div className="input-group">
              <label>Name</label>
              <input
                type="text"
                value={updatedName}
                onChange={(e) => setUpdatedName(e.target.value)}
                placeholder="Enter name"
              />
            </div>
            <div className="input-group">
              <label>Email</label>
              <input
                type="email"
                value={updatedEmail}
                autoComplete="new-email"
                onChange={(e) => setUpdatedEmail(e.target.value)}
                placeholder="Enter email"
              />
            </div>
            <div className="input-group">
              <label>Password</label>
              <input
                type="password"
                value={updatedPassword}
                autoComplete="new-password"
                onChange={(e) => setUpdatedPassword(e.target.value)}
                placeholder="Enter new password"
              />
            </div>
            <div className="input-group">
              <label>Degree Name</label>
              <input
                type="text"
                value={updatedDegreeName}
                onChange={(e) => setUpdatedDegreeName(e.target.value)}
                placeholder="Enter degree name"
                disabled
              />
            </div>
            <div className="input-group">
              <label>Educational Status</label>
              <input
                type="text"
                value={updatedEducationalStatus}
                onChange={(e) => setUpdatedEducationalStatus(e.target.value)}
                placeholder="Example: BSCS Semester 7"
                disabled
              />
            </div>
            <div className="input-group">
              <label>Designation</label>
              <input
                type="text"
                value={updatedDesignation}
                onChange={(e) => setUpdatedDesignation(e.target.value)}
                placeholder="Enter designation"
                disabled
              />
            </div>
            {success && <p className="success">{success}</p>}
            {error && <p className="error">{error}</p>}
            <div className="button-group">
              <button
                className="profile-update-button"
                type="submit"
                disabled={loading}
              >
                {loading ? "Updating..." : "Update Profile"}
              </button>
              <button
                className="profile-back-button"
                type="button"
                onClick={() => navigate("/internee-dashboard")}
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
