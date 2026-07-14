import { useEffect, useState } from "react";
import { useAuth } from "../../context/authContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../style/Update_Component.css";

function Update_Component() {
  const { setUser } = useAuth();
  const navigate = useNavigate();

  // States
  const [updatedName, setUpdatedName] = useState("");
  const [updatedEmail, setUpdatedEmail] = useState("");
  const [updatedPassword, setUpdatedPassword] = useState("");
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
        setUpdatedName(response.data.name);
        setUpdatedEmail(response.data.email);
        setSuccess("Profile fetched successfully!");
      } catch (error) {
        setError(error.response?.data?.message || "Error fetching profile!");
      } finally {
        setLoading(false);
      }
    };
    FetchUserProfileData();
  }, [setUser]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");
    const data = {
      updatedName,
      updatedEmail,
      updatedPassword,
    };
    try {
      const response = await axios.put(
        "http://localhost:3000/api/auth/update-profile",
        data,
        {
          withCredentials: true,
        },
      );
      setUser(response.data);
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
        <div className="left-panel">
          <h1>Update Profile</h1>
          <p>
            Keep your supervisor profile updated so interns and administrators
            always have your latest information.
          </p>
          <div className="tips">
            <div>👤 Update your name</div>
            <div>📧 Keep your email current</div>
            <div>🔒 Change your password anytime</div>
          </div>
        </div>
        <div className="right-panel">
          <form onSubmit={handleSubmit}>
            <h2>Profile Information</h2>
            <div className="input-group">
              <label>Name</label>
              <input
                type="text"
                value={updatedName}
                onChange={(e) => setUpdatedName(e.target.value)}
                placeholder="Enter updated name"
              />
            </div>
            <div className="input-group">
              <label>Email</label>
              <input
                type="email"
                value={updatedEmail}
                autoComplete="new-email"
                onChange={(e) => setUpdatedEmail(e.target.value)}
                placeholder="Enter updated email"
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
            {success && <p className="success">{success}</p>}
            {error && <p className="error">{error}</p>}
            <div className="button-group">
              <button
                className="profile-update-button"
                onClick={() => navigate("/updateprofile")}
              >
                Update Profile
              </button>
              <button
                className="profile-back-button"
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

export default Update_Component;
