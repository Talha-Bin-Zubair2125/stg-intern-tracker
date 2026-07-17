import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../style/View_Comments_Component.css";

export default function View_Comments_Component() {
  const navigate = useNavigate();

  const [comments, setComments] = useState([]);
  const [analytics, setAnalytics] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [commentsRes, analyticsRes] = await Promise.all([
          axios.get("http://localhost:3000/api/comment/my-comments", {
            withCredentials: true,
          }),
          axios.get("http://localhost:3000/api/comment/analytics", {
            withCredentials: true,
          }),
        ]);
        setComments(commentsRes.data.comments || []);
        setAnalytics(analyticsRes.data.analytics);
      } catch (err) {
        setError(err.response?.data?.message || "Something went wrong");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="view-comments-page">
      <div className="view-comments-card">
        <h2>Performance Dashboard</h2>
        {loading && <p>Loading...</p>}
        {error && <p className="error">{error}</p>}
        {analytics && (
          <>
            <div className="analytics-grid">
              <div className="card">
                <h3>Performance</h3>
                <h1>{analytics.performanceScore}%</h1>
              </div>
              <div className="card positive">
                <h3>Positive</h3>
                <h1>{analytics.positive}</h1>
              </div>
              <div className="card neutral">
                <h3>Neutral</h3>
                <h1>{analytics.neutral}</h1>
              </div>
              <div className="card negative">
                <h3>Negative</h3>
                <h1>{analytics.negative}</h1>
              </div>
            </div>
            <div className="summary-box">
              <h3>AI Summary</h3>
              <p>{analytics.summary}</p>
            </div>
            <div className="summary-box">
              <h3>Suggested Improvements</h3>
              <ul>
                {analytics.improvements.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            </div>
          </>
        )}
        <h2 className="comment-title">Comments</h2>
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
        <button
          className="back-btn"
          onClick={() => navigate("/internee-dashboard")}
        >
          Back
        </button>
      </div>
    </div>
  );
}
