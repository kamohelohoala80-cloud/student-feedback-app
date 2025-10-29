import React, { useState } from 'react';
import axios from 'axios';

const FeedbackForm = () => {
  const [formData, setFormData] = useState({
    studentName: '',
    courseCode: '',
    comments: '',
    rating: 1
  });
  const [message, setMessage] = useState('');
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.studentName.trim()) {
      newErrors.studentName = 'Student name is required';
    } else if (formData.studentName.length < 2) {
      newErrors.studentName = 'Name must be at least 2 characters';
    }
    
    if (!formData.courseCode.trim()) {
      newErrors.courseCode = 'Course code is required';
    } else if (formData.courseCode.length < 3) {
      newErrors.courseCode = 'Course code must be at least 3 characters';
    }
    
    if (formData.rating < 1 || formData.rating > 5) {
      newErrors.rating = 'Rating must be between 1 and 5';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      setMessage('Please fix the errors below');
      return;
    }
    
    try {
      // FIXED LINE 46: Removed unused 'response' variable
      await axios.post('https://student-feedback-app-otc1.onrender.com/api/feedback', formData);
      setMessage('Feedback submitted successfully!');
      setFormData({
        studentName: '',
        courseCode: '',
        comments: '',
        rating: 1
      });
      setErrors({});
    } catch (error) {
      setMessage('Error submitting feedback. Please try again.');
      console.error('Error:', error);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    // Clear error when user starts typing
    if (errors[e.target.name]) {
      setErrors({
        ...errors,
        [e.target.name]: ''
      });
    }
  };

  return (
    <div className="row justify-content-center">
      <div className="col-md-8">
        <div className="card">
          <div className="card-header">
            <h4 className="mb-0">Submit Course Feedback</h4>
          </div>
          <div className="card-body">
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label className="form-label">Student Name *</label>
                <input
                  type="text"
                  className={`form-control ${errors.studentName ? 'is-invalid' : ''}`}
                  name="studentName"
                  value={formData.studentName}
                  onChange={handleChange}
                  placeholder="Enter your full name"
                />
                {errors.studentName && (
                  <div className="invalid-feedback">{errors.studentName}</div>
                )}
              </div>

              <div className="mb-3">
                <label className="form-label">Course Code *</label>
                <input
                  type="text"
                  className={`form-control ${errors.courseCode ? 'is-invalid' : ''}`}
                  name="courseCode"
                  value={formData.courseCode}
                  onChange={handleChange}
                  placeholder="e.g., BIWA2110"
                />
                {errors.courseCode && (
                  <div className="invalid-feedback">{errors.courseCode}</div>
                )}
              </div>

              <div className="mb-3">
                <label className="form-label">Comments</label>
                <textarea
                  className="form-control"
                  name="comments"
                  value={formData.comments}
                  onChange={handleChange}
                  rows="4"
                  placeholder="Share your thoughts about the course..."
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Rating (1-5) *</label>
                <select
                  className={`form-select ${errors.rating ? 'is-invalid' : ''}`}
                  name="rating"
                  value={formData.rating}
                  onChange={handleChange}
                >
                  <option value={1}>1 - Poor</option>
                  <option value={2}>2 - Fair</option>
                  <option value={3}>3 - Good</option>
                  <option value={4}>4 - Very Good</option>
                  <option value={5}>5 - Excellent</option>
                </select>
                {errors.rating && (
                  <div className="invalid-feedback">{errors.rating}</div>
                )}
              </div>

              <button type="submit" className="btn btn-primary w-100">
                Submit Feedback
              </button>
            </form>
            
            {message && !Object.keys(errors).length && (
              <div className={`alert ${message.includes('successfully') ? 'alert-success' : 'alert-danger'} mt-3`}>
                {message}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeedbackForm;