import { useEffect, useState } from "react";
import { useAuth } from "../../context/authContext";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "../style/Internee_View_Profile.css";

export default function Internee_View_Profile() {
  const { user, setUser, setIsAuthenticated } = useAuth();
  const { id } = useParams();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProfile = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          `http://localhost:3000/api/get/internee-profile/${id}`,
          {
            withCredentials: true,
          },
        );
        setUser(response.data.internee);
        setIsAuthenticated(true);
        setSuccess("Profile loaded successfully");
      } catch (err) {
        setError(err.response?.data?.message || "Failed to load profile");
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, [id, setUser, setIsAuthenticated]);

  const handleDelete = async () => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this profile?",
    );
    if (!confirmDelete) return;
    try {
      await axios.delete(
        `http://localhost:3000/api/delete/delete-profile/${id}`,
        {
          withCredentials: true,
        },
      );
      setSuccess("Profile deleted successfully");
      navigate("/dashboard");
    } catch (err) {
      setError(err.response?.data?.message || "Failed to delete profile");
    }
  };

  const getInitials = (name) => {
    if (!name) return "";
    return name
      .split(" ")
      .map((word) => word[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <div className="profile-page">
      {loading && <p className="message loading">Loading Profile...</p>}
      {success && <p className="message success">{success}</p>}
      {error && <p className="message error">{error}</p>}
      {user && (
        <div className="profile-container">
          {/* Profile Header */}
          <div className="profile-header">
            <div className="profile-avatar">{getInitials(user.name)}</div>
            <h1>{user.name}</h1>
            <p>{user.email}</p>
            <span>{user.role || "Internee"}</span>
          </div>
          {/* Details */}
          <div className="profile-details">
            <h2>Personal Information</h2>
            <div className="details-grid">
              <div className="detail-card">
                <h4>Email</h4>
                <p>{user.email}</p>
              </div>
              <div className="detail-card">
                <h4>Degree</h4>
                <p>{user.degreeName || "Not Provided"}</p>
              </div>
              <div className="detail-card">
                <h4>Education Status</h4>
                <p>{user.EducationalStatus || "Not Provided"}</p>
              </div>
              <div className="detail-card">
                <h4>Designation</h4>
                <p>{user.designation || "Not Assigned"}</p>
              </div>
            </div>
          </div>
          {/* Buttons */}
          <div className="profile-buttons">
            <button className="delete" onClick={handleDelete}>
              Delete Profile
            </button>
            <button className="back" onClick={() => navigate("/dashboard")}>
              Back
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
