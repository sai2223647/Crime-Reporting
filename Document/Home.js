import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../services/api';

function Home() {
  const [recentReports, setRecentReports] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRecentReports = async () => {
      try {
        const response = await api.get('/api/reports/recent');
        setRecentReports(response.data);
      } catch (error) {
        console.error('Error fetching recent reports:', error);
        setError(error.response?.data?.error || 'Failed to load recent reports. Please try again.');
      }
    };
    fetchRecentReports();
  }, []);

  return (
    <div className="component-container">
      <h1>Welcome to Crime Track</h1>
      <p>Report crimes, access resources, and stay safe in your community.</p>
      <Link to="/report" className="report-link">Report a Crime Now</Link>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <h2>Recent Crime Reports</h2>
      {recentReports.length === 0 ? (
        <p>No recent reports available.</p>
      ) : (
        <div className="recent-reports">
          {recentReports.map((report) => (
            <div key={report._id} className="report-card">
              <p><strong>Type:</strong> {report.crimeType}</p>
              <p><strong>Location:</strong> {report.location}</p>
              <p><strong>Time:</strong> {new Date(report.time).toLocaleString()}</p>
              {report.name && <p><strong>Reporter Name:</strong> {report.name}</p>}
              {report.age && <p><strong>Reporter Age:</strong> {report.age}</p>}
              {report.phoneNumber && <p><strong>Reporter Phone:</strong> {report.phoneNumber}</p>}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Home;