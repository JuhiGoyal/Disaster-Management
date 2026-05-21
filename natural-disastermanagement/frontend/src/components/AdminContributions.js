import React, { useEffect, useState } from 'react';
import api from '../utils/api';

const AdminContributions = () => {
  const [loading, setLoading] = useState(true);
  const [contributions, setContributions] = useState([]);
  const [error, setError] = useState('');
  const [updatingId, setUpdatingId] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const { data } = await api.get('/contribution?limit=1000');
        setContributions(Array.isArray(data?.data) ? data.data : []);
      } catch (e) {
        console.error('Failed to fetch contributions', e);
        setError(e.response?.data?.message || 'Failed to load contributions');
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleStatusChange = async (id, newStatus) => {
    try {
      setUpdatingId(id);
      await api.patch(`/contribution/${id}/status`, { status: newStatus });
      setContributions((prev) =>
        prev.map((c) => (c._id === id ? { ...c, status: newStatus } : c))
      );
    } catch (e) {
      console.error('Failed to update status', e);
      alert(e.response?.data?.message || 'Failed to update contribution status');
    } finally {
      setUpdatingId(null);
    }
  };

  const getStatusBadgeStyle = (status) => {
    switch (status) {
      case 'approved':
        return { backgroundColor: '#e2fbe8', color: '#1e7e34', border: '1px solid #28a745' };
      case 'rejected':
        return { backgroundColor: '#fde8eb', color: '#bd2130', border: '1px solid #dc3545' };
      case 'completed':
        return { backgroundColor: '#e8f0fe', color: '#1a73e8', border: '1px solid #1a73e8' };
      default: // pending
        return { backgroundColor: '#fff3cd', color: '#856404', border: '1px solid #ffc107' };
    }
  };

  if (loading) {
    return <div className="card"><p>Loading contributions...</p></div>;
  }

  if (error) {
    return <div className="card"><p style={{ color: '#dc3545' }}>{error}</p></div>;
  }

  return (
    <div className="disaster-list-container">
      <div className="header">
        <h1>🛡️ Admin: Contributions</h1>
        <p>Review and approve user contributions</p>
      </div>

      <div className="card">
        {contributions.length === 0 ? (
          <p>No contributions found.</p>
        ) : (
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr>
                  <th style={{ textAlign: 'left', padding: '10px', borderBottom: '1px solid #eee' }}>Title</th>
                  <th style={{ textAlign: 'left', padding: '10px', borderBottom: '1px solid #eee' }}>Type</th>
                  <th style={{ textAlign: 'left', padding: '10px', borderBottom: '1px solid #eee' }}>Amount</th>
                  <th style={{ textAlign: 'left', padding: '10px', borderBottom: '1px solid #eee' }}>User</th>
                  <th style={{ textAlign: 'left', padding: '10px', borderBottom: '1px solid #eee' }}>Disaster</th>
                  <th style={{ textAlign: 'left', padding: '10px', borderBottom: '1px solid #eee' }}>Date</th>
                  <th style={{ textAlign: 'left', padding: '10px', borderBottom: '1px solid #eee' }}>Status Action</th>
                </tr>
              </thead>
              <tbody>
                {contributions.map((c) => (
                  <tr key={c._id}>
                    <td style={{ padding: '10px', borderBottom: '1px solid #f5f5f5' }}>{c.title}</td>
                    <td style={{ padding: '10px', borderBottom: '1px solid #f5f5f5' }}>{c.contributionType}</td>
                    <td style={{ padding: '10px', borderBottom: '1px solid #f5f5f5' }}>{c.amount || 0}</td>
                    <td style={{ padding: '10px', borderBottom: '1px solid #f5f5f5' }}>{c.userId?.name || '-'}</td>
                    <td style={{ padding: '10px', borderBottom: '1px solid #f5f5f5' }}>{c.disasterId?.title || '-'}</td>
                    <td style={{ padding: '10px', borderBottom: '1px solid #f5f5f5' }}>{new Date(c.createdAt).toLocaleDateString()}</td>
                    <td style={{ padding: '10px', borderBottom: '1px solid #f5f5f5' }}>
                      <select
                        value={c.status}
                        disabled={updatingId === c._id}
                        onChange={(e) => handleStatusChange(c._id, e.target.value)}
                        style={{
                          padding: '6px 12px',
                          borderRadius: '20px',
                          fontWeight: '600',
                          fontSize: '0.85rem',
                          cursor: 'pointer',
                          outline: 'none',
                          transition: 'all 0.2s',
                          ...getStatusBadgeStyle(c.status)
                        }}
                      >
                        <option value="pending">⏳ Pending</option>
                        <option value="approved">✅ Approved</option>
                        <option value="rejected">❌ Rejected</option>
                        <option value="completed">💙 Completed</option>
                      </select>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminContributions;


