import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import ReportCrime from './pages/ReportCrime';
import Resources from './pages/Resources';
import ForumPage from './pages/ForumPage';
import ContactForm from './components/ContactForm'; // New
import Header from './components/Header';

function App() {
  return (
    <BrowserRouter>
      <div className="app-container">
        <Header />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/report" element={<ReportCrime />} />
            <Route path="/resources" element={<Resources />} />
            <Route path="/forum" element={<ForumPage />} />
            <Route path="/contact" element={<ContactForm />} /> {/* New route */}
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;