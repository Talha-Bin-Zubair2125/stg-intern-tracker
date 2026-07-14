import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../style/View_All_Submitted_Reports_Component.css";

export default function View_All_Submitted_Reports_Component() {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchReports = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          "http://localhost:3000/api/report/my-reports",
          {
            withCredentials: true,
          },
        );
        setReports(response.data.reports || []);
      } catch (error) {
        setError(error.response?.data?.message || "Failed to fetch reports");
      } finally {
        setLoading(false);
      }
    };
    fetchReports();
  }, []);

  const handleDownload = async (id, fileName) => {
    console.log(`Downloading report with ID: ${id} and file name: ${fileName}`);
    try {
      const response = await axios.get(
        `http://localhost:3000/api/report/interndownload/${id}`,
        {
          withCredentials: true,
          responseType: "blob",
        },
      );
      const fileURL = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = fileURL;
      link.download = fileName;
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(fileURL);
    } catch (error) {
      setError(error.response?.data?.message || "Download failed");
    }
  };

  const deleteReport = async (id, fileName) => {
    if (
      !window.confirm(
        `Are you sure you want to delete the report: ${fileName}?`,
      )
    ) {
      return;
    }
    try {
      await axios.delete(`http://localhost:3000/api/report/delete/${id}`, {
        withCredentials: true,
      });
      setReports(reports.filter((report) => report._id !== id));
    } catch (error) {
      setError(error.response?.data?.message || "Delete failed");
    }
  };

  return (
    <div className="submitted-report-page">
      <div className="submitted-report-card">
        <div className="report-header">
          <h2>My Submitted Reports</h2>
          <p>View and download your uploaded internship reports</p>
        </div>

        {loading && <div className="status loading">Loading reports...</div>}
        {error && <div className="status error">{error}</div>}
        {!loading && reports.length > 0 ? (
          <div className="table-container">
            <table className="report-table">
              <thead>
                <tr>
                  <th>#</th>
                  <th>File Name</th>
                  <th>Type</th>
                  <th>Date Uploaded</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {reports.map((report, index) => (
                  <tr key={report._id}>
                    <td>{index + 1}</td>
                    <td className="file-name">{report.originalFileName}</td>
                    <td>
                      {report.originalFileName.split(".").pop().toUpperCase()}
                    </td>
                    <td>{new Date(report.createdAt).toLocaleDateString()}</td>
                    <td>
                      <div className="report-actions">
                        <button
                          className="download-btn"
                          onClick={() =>
                            handleDownload(report._id, report.originalFileName)
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
        ) : (
          !loading && (
            <div className="empty-state">No reports submitted yet.</div>
          )
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
