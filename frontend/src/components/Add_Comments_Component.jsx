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
  const [editId, setEditId] = useState(null);
  const [editComment, setEditComment] = useState("");
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
          comment,
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
      setError(error.response?.data?.message || "Failed to filter comments");
    }
  };

  const handleEdit = (item) => {
    setEditId(item._id);
    setEditComment(item.comment);
  };

  const updateComment = async (id) => {
    try {
      await axios.put(
        `http://localhost:3000/api/comment/edit/${id}`,
        {
          interneeId: selectedUserId,
          comment: editComment,
        },
        {
          withCredentials: true,
        },
      );
      setComments(
        comments.map((item) =>
          item._id === id
            ? {
                ...item,
                comment: editComment,
              }
            : item,
        ),
      );
      setEditId(null);
      setEditComment("");
      setSuccess("Comment updated successfully");
      setError("");
    } catch (error) {
      setError(error.response?.data?.message || "Failed to update comment");
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/api/comment/delete/${id}`, {
        withCredentials: true,
      });
      setComments(comments.filter((item) => item._id !== id));
      setSuccess("Comment deleted successfully");
      setError("");
    } catch (error) {
      setError(error.response?.data?.message || "Failed to delete comment");
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
          <button className="primary-btn" type="submit">
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
            <button className="filter-btn">Filter</button>
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
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {comments.length > 0 ? (
                comments.map((item, index) => (
                  <tr key={item._id}>
                    <td>{index + 1}</td>
                    <td>{item.interneeId?.name}</td>
                    <td>{item.interneeId?.email}</td>
                    <td>
                      {editId === item._id ? (
                        <textarea
                          className="edit-comment-box"
                          value={editComment}
                          onChange={(e) => setEditComment(e.target.value)}
                        />
                      ) : (
                        item.comment
                      )}
                    </td>
                    <td>{new Date(item.createdAt).toLocaleDateString()}</td>
                    <td>
                      <div className="comment-action-group">
                        {editId === item._id ? (
                          <button
                            className="comment-save-btn"
                            onClick={() => updateComment(item._id)}
                          >
                            Save
                          </button>
                        ) : (
                          <button
                            className="comment-edit-btn"
                            onClick={() => handleEdit(item)}
                          >
                            Edit
                          </button>
                        )}
                        <button
                          className="comment-delete-btn"
                          onClick={() => handleDelete(item._id)}
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6">No comments found.</td>
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
