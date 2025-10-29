import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Dashboard = () => {
  const [stats, setStats] = useState({
    total: 0,
    averageRating: 0,
    ratingDistribution: {1: 0, 2: 0, 3: 0, 4: 0, 5: 0}
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/feedback');
        const feedbacks = response.data;
        
        const total = feedbacks.length;
        const averageRating = total > 0 
          ? (feedbacks.reduce((sum, item) => sum + item.rating, 0) / total).toFixed(2)
          : 0;

        const ratingDistribution = {1: 0, 2: 0, 3: 0, 4: 0, 5: 0};
        feedbacks.forEach(feedback => {
          ratingDistribution[feedback.rating]++;
        });

        setStats({ total, averageRating, ratingDistribution });
      } catch (error) {
        console.error('Error fetching stats:', error);
      }
    };

    fetchStats();
  }, []);

  return (
    <div>
      <h2 className="mb-4">Feedback Dashboard</h2>
      
      <div className="row">
        <div className="col-md-6 mb-4">
          <div className="card text-center">
            <div className="card-body">
              <h3 className="card-title">{stats.total}</h3>
              <p className="card-text">Total Feedback Submissions</p>
            </div>
          </div>
        </div>
        
        <div className="col-md-6 mb-4">
          <div className="card text-center">
            <div className="card-body">
              <h3 className="card-title">{stats.averageRating}</h3>
              <p className="card-text">Average Rating</p>
            </div>
          </div>
        </div>
      </div>

      <div className="card">
        <div className="card-header">
          <h5 className="mb-0">Rating Distribution</h5>
        </div>
        <div className="card-body">
          {[1, 2, 3, 4, 5].map(rating => (
            <div key={rating} className="mb-2">
              <div className="d-flex justify-content-between">
                <span>Rating {rating}:</span>
                <span>{stats.ratingDistribution[rating]} submissions</span>
              </div>
              <div className="progress">
                <div 
                  className="progress-bar" 
                  style={{ 
                    width: `${stats.total > 0 ? (stats.ratingDistribution[rating] / stats.total) * 100 : 0}%` 
                  }}
                >
                  {stats.total > 0 ? Math.round((stats.ratingDistribution[rating] / stats.total) * 100) : 0}%
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;