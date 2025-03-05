import React from 'react';
import ReportForm from '../components/ReportForm';

function ReportCrime() {
  return (
    <div className="component-container">
      <h1>Report a Crime</h1>
      <p>Submit details about a crime incident to help enhance public safety. No login required!</p>
      <ReportForm />
    </div>
  );
}

export default ReportCrime;