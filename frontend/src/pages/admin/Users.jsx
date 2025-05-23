import { useState } from 'react';

const UsersPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [userType, setUserType] = useState('all');

  // Mock data for demonstration
  const initialUsers = [
    { id: 1, name: 'John Smith', email: 'john@example.com', type: 'student', status: 'active', dateJoined: '2023-10-15' },
    { id: 2, name: 'Alice Johnson', email: 'alice@example.com', type: 'student', status: 'active', dateJoined: '2023-11-20' },
    { id: 3, name: 'Michael Brown', email: 'michael@example.com', type: 'owner', status: 'active', dateJoined: '2023-09-05' },
    { id: 4, name: 'Sarah Williams', email: 'sarah@example.com', type: 'owner', status: 'inactive', dateJoined: '2023-10-30' },
    { id: 5, name: 'David Lee', email: 'david@example.com', type: 'student', status: 'active', dateJoined: '2023-12-01' },
    { id: 6, name: 'Emily Davis', email: 'emily@example.com', type: 'owner', status: 'active', dateJoined: '2023-08-15' },
    { id: 7, name: 'Robert Wilson', email: 'robert@example.com', type: 'student', status: 'inactive', dateJoined: '2023-11-10' },
    { id: 8, name: 'Jennifer Taylor', email: 'jennifer@example.com', type: 'owner', status: 'active', dateJoined: '2023-09-22' },
  ];

  const [users, setUsers] = useState(initialUsers);

  // Filter users based on search term and type
  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = userType === 'all' || user.type === userType;
    return matchesSearch && matchesType;
  });

  const handleToggleStatus = (id) => {
    setUsers(users.map(user =>
      user.id === id
        ? { ...user, status: user.status === 'active' ? 'inactive' : 'active' }
        : user
    ));

    const user = users.find(u => u.id === id);
    const newStatus = user?.status === 'active' ? 'inactive' : 'active';

    showToast("User status updated", `${user?.name} is now ${newStatus}`);
  };

  const handleDeleteUser = (id) => {
    const user = users.find(u => u.id === id);
    showToast("User deleted", `${user?.name} has been removed from the system`, "danger");
    setUsers(users.filter(user => user.id !== id));
  };

  // Simple toast notification function
  const showToast = (title, description, type = 'info') => {
    const toastContainer = document.getElementById('toast-container');
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    toast.innerHTML = `
      <div class="toast-content">
        <h4 class="toast-title">${title}</h4>
        <p class="toast-description">${description}</p>
      </div>
      <button class="toast-close">×</button>
    `;
   
    toastContainer.appendChild(toast);
   
    // Add event listener to close button
    const closeButton = toast.querySelector('.toast-close');
    closeButton.addEventListener('click', () => {
      toast.remove();
    });
   
    // Auto-remove after 5 seconds
    setTimeout(() => {
      if (toast.parentNode) {
        toast.remove();
      }
    }, 5000);
  };

  return (
    <div>
      <div className="page-header">
        <h1>User Management</h1>
        <p>Manage student and property owner accounts</p>
      </div>

      <div className="controls-row">
        <div className="search-container">
          <div className="search-icon">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="8"></circle>
              <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
            </svg>
          </div>
          <input
            type="text"
            className="search-input"
            placeholder="Search users..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="tabs">
          <button
            className={`tab ${userType === 'all' ? 'active' : ''}`}
            onClick={() => setUserType('all')}
          >
            All Users
          </button>
          <button
            className={`tab ${userType === 'student' ? 'active' : ''}`}
            onClick={() => setUserType('student')}
          >
            Students
          </button>
          <button
            className={`tab ${userType === 'owner' ? 'active' : ''}`}
            onClick={() => setUserType('owner')}
          >
            Property Owners
          </button>
        </div>
      </div>

      <div className="table-container">
        <table className="admin-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>User Type</th>
              <th>Status</th>
              <th>Date Joined</th>
              <th style={{ textAlign: 'right' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.length > 0 ? (
              filteredUsers.map((user) => (
                <tr key={user.id}>
                  <td style={{ fontWeight: 500 }}>{user.name}</td>
                  <td>{user.email}</td>
                  <td style={{ textTransform: 'capitalize' }}>{user.type}</td>
                  <td>
                    <div className="flex-center">
                      <label className="switch" style={{ marginRight: '10px' }}>
                        <input
                          type="checkbox"
                          checked={user.status === 'active'}
                          onChange={() => handleToggleStatus(user.id)}
                        />
                        <span className="slider"></span>
                        <span className="sr-only">Toggle Status</span>
                      </label>
                      <span className={user.status === 'active' ? 'text-success' : 'text-danger'}>
                        <span className="flex-center">
                          {user.status === 'active' ? (
                            <>
                              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: '4px' }}>
                                <polyline points="20 6 9 17 4 12"></polyline>
                              </svg>
                              Active
                            </>
                          ) : (
                            <>
                              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: '4px' }}>
                                <line x1="18" y1="6" x2="6" y2="18"></line>
                                <line x1="6" y1="6" x2="18" y2="18"></line>
                              </svg>
                              Inactive
                            </>
                          )}
                        </span>
                      </span>
                    </div>
                  </td>
                  <td>{user.dateJoined}</td>
                  <td style={{ textAlign: 'right' }}>
                    <div className="button-group" style={{ justifyContent: 'flex-end' }}>
                      <button className="button button-outline button-icon">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M12 20h9"></path>
                          <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"></path>
                        </svg>
                        <span className="sr-only">Edit</span>
                      </button>
                      <button
                        className="button button-danger button-icon"
                        onClick={() => handleDeleteUser(user.id)}
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M3 6h18"></path>
                          <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"></path>
                          <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"></path>
                          <line x1="10" y1="11" x2="10" y2="17"></line>
                          <line x1="14" y1="11" x2="14" y2="17"></line>
                        </svg>
                        <span className="sr-only">Delete</span>
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={6} className="admin-table-empty">
                  No users found matching your search criteria
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UsersPage;