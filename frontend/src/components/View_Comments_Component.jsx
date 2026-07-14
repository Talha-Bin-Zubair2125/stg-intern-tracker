import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../style/View_Comments_Component.css";

export default function View_Comments_Component() {
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchComments = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          "http://localhost:3000/api/comment/my-comments",
          {
            withCredentials: true,
          },
        );
        setComments(response.data.comments || []);
      } catch (error) {
        setError(error.response?.data?.message || "Failed to fetch comments");
      } finally {
        setLoading(false);
      }
    };
    fetchComments();
  }, []);

  return (
    <div className="view-comments-page">
      <div className="view-comments-card">
        <div className="comments-header">
          <h2>My Comments</h2>
          <p>View all comments added by your supervisor.</p>
        </div>
        {loading && <div className="status loading">Loading comments...</div>}
        {error && <div className="status error">{error}</div>}
        {!loading && comments.length > 0 ? (
          <div className="table-wrapper">
            <table className="comments-table">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Comment</th>
                  <th>Date</th>
                </tr>
              </thead>
              <tbody>
                {comments.map((item, index) => (
                  <tr key={item._id}>
                    <td>{index + 1}</td>
                    <td>{item.comment}</td>
                    <td>{new Date(item.createdAt).toLocaleDateString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          !loading && <div className="empty-state">No comments available.</div>
        )}
        <button
          className="back-btn"
          onClick={() => navigate("/internee-dashboard")}
        >
          ← Back
        </button>
      </div>
    </div>
  );
}
