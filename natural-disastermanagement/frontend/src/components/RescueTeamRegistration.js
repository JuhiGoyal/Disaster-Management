import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import './RescueTeamRegistration.css';

const RescueTeamRegistration = () => {
  const [formData, setFormData] = useState({
    name: '',
    ngoName: '',
    specialization: 'search_rescue',
    memberCount: '',
    contactPerson: '',
    contactPhone: '',
    contactEmail: '',
    location: {
        city: '',
        state: '',
        country: 'India'
    },
    experience: 'intermediate'
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name.includes('location.')) {
      const field = name.split('.')[1];
      setFormData(prev => ({
        ...prev,
        location: { ...prev.location, [field]: value }
      }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post('/api/rescue-team/register', formData);
      if (response.data.success) {
        toast.success('Registration successful! Our team will contact you soon.');
        navigate('/');
      }
    } catch (error) {
      console.error('Registration error:', error);
      toast.error(error.response?.data?.message || 'Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="registration-container">
      <div className="registration-card card">
        <div className="registration-header">
          <div className="logo-icon">🚑</div>
          <h1>Join the Response Network</h1>
          <p>Register your rescue team or NGO to coordinate emergency efforts</p>
        </div>

        <form onSubmit={handleSubmit} className="registration-form">
          <div className="form-section">
            <h3>Team Information</h3>
            <div className="form-grid">
              <div className="form-group">
                <label className="form-label">Team Name</label>
                <input
                  type="text"
                  name="name"
                  className="form-control"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  placeholder="e.g. Rapid Rescue Unit"
                />
              </div>
              <div className="form-group">
                <label className="form-label">NGO Name</label>
                <input
                  type="text"
                  name="ngoName"
                  className="form-control"
                  value={formData.ngoName}
                  onChange={handleInputChange}
                  required
                  placeholder="e.g. Global Relief NGO"
                />
              </div>
            </div>

            <div className="form-grid">
              <div className="form-group">
                <label className="form-label">Specialization</label>
                <select
                  name="specialization"
                  className="form-control"
                  value={formData.specialization}
                  onChange={handleInputChange}
                  required
                >
                  <option value="medical">Medical Response</option>
                  <option value="search_rescue">Search & Rescue</option>
                  <option value="logistics">Logistics</option>
                  <option value="water_rescue">Water Rescue</option>
                  <option value="heavy_machinery">Heavy Machinery</option>
                  <option value="communication">Communication</option>
                  <option value="other">Other</option>
                </select>
              </div>
              <div className="form-group">
                <label className="form-label">Member Count</label>
                <input
                  type="number"
                  name="memberCount"
                  className="form-control"
                  value={formData.memberCount}
                  onChange={handleInputChange}
                  required
                  min="1"
                  placeholder="Total active members"
                />
              </div>
            </div>
          </div>

          <div className="form-section">
            <h3>Contact Details</h3>
            <div className="form-group">
              <label className="form-label">Contact Person</label>
              <input
                type="text"
                name="contactPerson"
                className="form-control"
                value={formData.contactPerson}
                onChange={handleInputChange}
                required
                placeholder="Full name of representative"
              />
            </div>
            <div className="form-grid">
              <div className="form-group">
                <label className="form-label">Email Address</label>
                <input
                  type="email"
                  name="contactEmail"
                  className="form-control"
                  value={formData.contactEmail}
                  onChange={handleInputChange}
                  required
                  placeholder="offical@ngo.org"
                />
              </div>
              <div className="form-group">
                <label className="form-label">Phone Number</label>
                <input
                  type="tel"
                  name="contactPhone"
                  className="form-control"
                  value={formData.contactPhone}
                  onChange={handleInputChange}
                  required
                  placeholder="+91 XXXXX XXXXX"
                />
              </div>
            </div>
          </div>

          <div className="form-section">
            <h3>Location & Experience</h3>
            <div className="form-grid">
              <div className="form-group">
                <label className="form-label">City</label>
                <input
                  type="text"
                  name="location.city"
                  className="form-control"
                  value={formData.location.city}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="form-group">
                <label className="form-label">State</label>
                <input
                  type="text"
                  name="location.state"
                  className="form-control"
                  value={formData.location.state}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>
            <div className="form-group">
              <label className="form-label">Experience Level</label>
              <select
                name="experience"
                className="form-control"
                value={formData.experience}
                onChange={handleInputChange}
                required
              >
                <option value="beginner">New Team (Beginner)</option>
                <option value="intermediate">Established (Intermediate)</option>
                <option value="expert">Highly Specialized (Expert)</option>
              </select>
            </div>
          </div>

          <button type="submit" className="btn btn-primary btn-block" disabled={loading}>
            {loading ? <span className="loading"></span> : 'Submit Registration'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default RescueTeamRegistration;
