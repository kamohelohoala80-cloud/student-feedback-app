import React, { useState, useEffect } from 'react';
import axios from 'axios';

const FeedbackList = () => {
  const [feedbacks, setFeedbacks] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchFeedbacks = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/feedback');
      setFeedbacks(response.data);
    } catch (error) {
      console.error('Error fetching feedbacks:', error);
    } finally {
      setLoading(false);
    }
  };

  const deleteFeedback = async (id) => {
    if (window.confirm('Are you sure you want to delete this feedback?')) {
      try {
        await axios.delete(`http://localhost:5000/api/feedback/${id}`);
        fetchFeedbacks(); // Refresh the list
      } catch (error) {
        console.error('Error deleting feedback:', error);
      }
    }
  };

  useEffect(() => {
    fetchFeedbacks();
  }, []);

  // Debug: Check what fields we're receiving
  useEffect(() => {
    if (feedbacks.length > 0) {
      console.log('First feedback object:', feedbacks[0]);
    }
  }, [feedbacks]);

  const formatDate = (feedback) => {
    // Try different possible date field names
    const dateField = feedback.createdAt || feedback.createdat || feedback.timestamp || feedback.date;
    
    if (dateField) {
      try {
        return new Date(dateField).toLocaleDateString();
      } catch (error) {
        console.error('Date parsing error:', error);
        return 'Recently';
      }
    }
    
    return 'Recently';
  };

  if (loading) {
    return (
      <div className="d-flex justify-content-center">
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <div>
      <h2 className="mb-4">All Feedback</h2>
      
      {feedbacks.length === 0 ? (
        <div className="alert alert-info">
          No feedback submitted yet. Be the first to share your thoughts!
        </div>
      ) : (
        <div className="row">
          {feedbacks.map(feedback => (
            <div key={feedback.id} className="col-md-6 mb-3">
              <div className="card h-100">
                <div className="card-body">
                  <div className="d-flex justify-content-between align-items-start">
                    <h5 className="card-title">{feedback.coursecode || feedback.courseCode}</h5>
                    <button 
                      className="btn btn-sm btn-outline-danger"
                      onClick={() => deleteFeedback(feedback.id)}
                    >
                      Delete
                    </button>
                  </div>
                  <h6 className="card-subtitle mb-2 text-muted">
                    By: {feedback.studentname || feedback.studentName}
                  </h6>
                  <p className="card-text">{feedback.comments}</p>
                  <div className="mt-auto">
                    <span className="badge bg-primary">Rating: {feedback.rating}/5</span>
                    <small className="text-muted d-block mt-2">
                      Submitted: {formatDate(feedback)}
                    </small>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default FeedbackList;