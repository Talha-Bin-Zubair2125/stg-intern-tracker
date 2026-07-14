import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/authContext";
import axios from "axios";
import "../style/Add_Comments_Component.css";

export default function Add_Comments_Component() {
  const { users, setUsers, setIsAuthenticated } = useAuth();

  const [comment, setComment] = useState("");
  const [selectedUserId, setSelectedUserId] = useState("");
  const [selectDate, setSelectDate] = useState("");
  const [comments, setComments] = useState([]);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    const fetchUsersData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/api/auth/interns",
          {
            withCredentials: true,
          },
        );
        setUsers(response.data.interns || []);
        setIsAuthenticated(true);
      } catch (error) {
        setError(error.response?.data?.message || "Failed to fetch users");
      }
    };
    fetchUsersData();
  }, [setUsers, setIsAuthenticated]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!comment.trim()) {
      setError("Comment cannot be empty");
      return;
    }
    try {
      await axios.post(
        "http://localhost:3000/api/comment/add",
        {
           interneeId: selectedUserId,
           comment
        },
        {
          withCredentials: true,
        },
      );
      setSuccess("Comment added successfully");
      setError("");
      setComment("");
      setSelectedUserId("");
    } catch (error) {
      setSuccess("");
      setError(error.response?.data?.message || "Failed to add comment");
    }
  };

  const applyFilter = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get(
        `http://localhost:3000/api/comment/by-date/${selectDate}`,
        {
          withCredentials: true,
        },
      );
      setComments(response.data.comments || []);
    } catch (error) {
      setError(error.response?.data?.message || "Failed to apply filter");
    }
  };

  const fetchAllComments = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3000/api/comment/all",
        {
          withCredentials: true,
        },
      );
      setComments(response.data.comments || []);
    } catch (error) {
      setError(error.response?.data?.message || "Failed to fetch comments");
    }
  };

  return (
    <div className="comment-page">
      <div className="comment-card">
        <h1>Add Comments</h1>
        {error && <div className="alert error">{error}</div>}
        {success && <div className="alert success">{success}</div>}
        <form className="comment-form" onSubmit={handleSubmit}>
          <textarea
            placeholder="Write your comment..."
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
          <select
            value={selectedUserId}
            onChange={(e) => setSelectedUserId(e.target.value)}
          >
            <option value="">Select Internee</option>
            {users.map((user) => (
              <option key={user._id} value={user._id}>
                {user.name}
              </option>
            ))}
          </select>
          <button type="submit" className="primary-btn">
            Submit Comment
          </button>
        </form>
        <div className="filter-section">
          <form onSubmit={applyFilter}>
            <input
              type="date"
              value={selectDate}
              onChange={(e) => setSelectDate(e.target.value)}
            />
            <button type="submit" className="filter-btn">
              Filter
            </button>
          </form>
          <button className="all-btn" onClick={fetchAllComments}>
            Show All Comments
          </button>
        </div>
        <div className="table-wrapper">
          <table>
            <thead>
              <tr>
                <th>#</th>
                <th>Internee</th>
                <th>Email</th>
                <th>Comment</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {comments.length > 0 ? (
                comments.map((item, index) => (
                  <tr key={item._id}>
                    <td>{index + 1}</td>
                    <td>{item.interneeId?.name}</td>
                    <td>{item.interneeId?.email}</td>
                    <td>{item.comment}</td>
                    <td>{new Date(item.createdAt).toLocaleDateString()}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5">No comments found.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        <button className="back-btn" onClick={() => navigate("/dashboard")}>
          Back
        </button>
      </div>
    </div>
  );
}
