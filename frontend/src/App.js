import React, { useState } from 'react';
import FeedbackForm from './components/FeedbackForm';
import FeedbackList from './components/FeedbackList';
import Dashboard from './components/Dashboard';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

function App() {
  const [currentView, setCurrentView] = useState('form');

  return (
    <div className="App">
      {/* Bootstrap Navbar */}
      <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
        <div className="container">
          <span className="navbar-brand">Student Feedback System</span>
          <div className="navbar-nav">
            <button 
              className={`nav-link btn btn-link ${currentView === 'form' ? 'active' : ''}`}
              onClick={() => setCurrentView('form')}
            >
              Submit Feedback
            </button>
            <button 
              className={`nav-link btn btn-link ${currentView === 'list' ? 'active' : ''}`}
              onClick={() => setCurrentView('list')}
            >
              View Feedback
            </button>
            <button 
              className={`nav-link btn btn-link ${currentView === 'dashboard' ? 'active' : ''}`}
              onClick={() => setCurrentView('dashboard')}
            >
              Dashboard
            </button>
          </div>
        </div>
      </nav>

      <div className="container mt-4">
        {currentView === 'form' && <FeedbackForm />}
        {currentView === 'list' && <FeedbackList />}
        {currentView === 'dashboard' && <Dashboard />}
      </div>
    </div>
  );
}

export default App;