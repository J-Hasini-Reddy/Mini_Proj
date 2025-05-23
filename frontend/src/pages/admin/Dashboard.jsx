import { useState } from 'react';

const Dashboard = () => {
  const stats = [
    {
      title: 'Total Users',
      value: '2,853',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path>
          <circle cx="9" cy="7" r="4"></circle>
          <path d="M22 21v-2a4 4 0 0 0-3-3.87"></path>
          <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
        </svg>
      ),
      description: '1,593 Students, 1,260 Property Owners',
    },
    {
      title: 'Active Listings',
      value: '742',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
          <polyline points="9 22 9 12 15 12 15 22"></polyline>
        </svg>
      ),
      description: '32 new this week',
    },
    {
      title: 'Pending Reviews',
      value: '28',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
          <polyline points="14 2 14 8 20 8"></polyline>
          <line x1="16" y1="13" x2="8" y2="13"></line>
          <line x1="16" y1="17" x2="8" y2="17"></line>
          <line x1="10" y1="9" x2="8" y2="9"></line>
        </svg>
      ),
      description: 'Feedback items requiring attention',
    },
    {
      title: 'User Growth',
      value: '+15%',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <line x1="18" y1="20" x2="18" y2="10"></line>
          <line x1="12" y1="20" x2="12" y2="4"></line>
          <line x1="6" y1="20" x2="6" y2="14"></line>
        </svg>
      ),
      description: 'Compared to last month',
    },
  ];

  const recentActivity = [
    { user: 'John Smith', action: 'Added new property', time: '12 minutes ago' },
    { user: 'Alice Johnson', action: 'Created new account', time: '1 hour ago' },
    { user: 'Property owner #1259', action: 'Updated listing details', time: '3 hours ago' },
    { user: 'Admin', action: 'Approved 5 new listings', time: '5 hours ago' },
    { user: 'Student #3421', action: 'Submitted feedback', time: '1 day ago' },
  ];

  const systemNotifications = [
    { title: 'System Update Scheduled', description: 'Maintenance planned for June 20th at 02:00 AM', severity: 'info' },
    { title: 'High User Traffic', description: 'Platform experiencing higher than usual traffic', severity: 'success' },
    { title: 'Multiple Failed Login Attempts', description: 'Suspicious activity detected from IP 192.168.1.1', severity: 'warning' },
    { title: 'Database Backup Completed', description: 'Automatic backup completed successfully', severity: 'info' },
  ];

  return (
    <div>
      <div className="page-header">
        <h1>Admin Dashboard</h1>
        <p>Welcome back, Admin! Here's what's happening with your platform today.</p>
      </div>

      <div className="stats-grid">
        {stats.map((stat, index) => (
          <div key={index} className="stat-card">
            <div className="stat-card-header">
              <h4 className="stat-card-title">{stat.title}</h4>
              <div className="stat-card-icon">{stat.icon}</div>
            </div>
            <div className="stat-card-value">{stat.value}</div>
            <p className="stat-card-description">{stat.description}</p>
          </div>
        ))}
      </div>

      <div className="cards-grid">
        <div className="card">
          <div className="card-header">
            <h3 className="card-title">Recent Activity</h3>
            <p className="card-description">Latest platform actions and events</p>
          </div>
          <div className="card-content">
            <div className="activity-list">
              {recentActivity.map((activity, index) => (
                <div key={index} className="activity-item">
                  <div className="activity-details">
                    <h4>{activity.action}</h4>
                    <p>By {activity.user}</p>
                  </div>
                  <span className="activity-time">{activity.time}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="card">
          <div className="card-header">
            <h3 className="card-title">System Notifications</h3>
            <p className="card-description">Important alerts and messages</p>
          </div>
          <div className="card-content">
            <div className="notification-list">
              {systemNotifications.map((notification, index) => (
                <div
                  key={index}
                  className={`notification ${notification.severity}`}
                >
                  <h4>{notification.title}</h4>
                  <p>{notification.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;