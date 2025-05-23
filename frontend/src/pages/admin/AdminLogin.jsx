import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AdminLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

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

  // For demo purposes, we're using a simple hardcoded check
  // In a real application, you'd want to use a proper authentication system
  const handleLogin = (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    // Simulate API call delay
    setTimeout(() => {
      if (email === 'admin@example.com' && password === 'admin123') {
        showToast('Login successful', 'Welcome to the admin dashboard', 'success');
        // Store admin status in session storage
        sessionStorage.setItem('isAdminLoggedIn', 'true');
        navigate('/admin/dashboard');
      } else {
        setError('Invalid email or password');
        showToast('Login failed', 'Invalid email or password', 'danger');
      }
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div className="admin-login">
      <div className="form-container">
        <div className="text-center" style={{ textAlign: 'center', marginBottom: '24px' }}>
          <h2 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '8px' }}>Admin Login</h2>
          <p style={{ color: '#6b7280' }}>Enter your credentials to access the admin dashboard</p>
        </div>
       
        <form onSubmit={handleLogin}>
          {error && (
            <div className="form-error" style={{ color: 'var(--admin-danger)', marginBottom: '16px', textAlign: 'center' }}>
              {error}
            </div>
          )}
         
          <div className="form-group">
            <label htmlFor="email" className="form-label">Email</label>
            <input
              id="email"
              type="email"
              className="form-input"
              placeholder="admin@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
         
          <div className="form-group">
            <label htmlFor="password" className="form-label">Password</label>
            <input
              id="password"
              type="password"
              className="form-input"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
         
          <button
            type="submit"
            className="form-button"
            disabled={isLoading}
          >
            {isLoading ? 'Logging in...' : 'Login'}
          </button>
        </form>
       
        <div className="form-footer">
          Secure admin area. Unauthorized access is prohibited.
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;