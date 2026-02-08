import { useState, useEffect } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useLoginFunction } from './LoginFunction.jsx'; // Adjust path as needed
import useAuth from '../hooks/useAuth.jsx';
import './Login.css';

export default function LoginForm() {
  // --- INTEGRATED HOOKS ---
  const { auth, setAuth } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";
  const { Login } = useLoginFunction();
  useEffect(() => {
    console.log('Auth state updated:', auth);
  }, [auth]);

  // --- STATE ---
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [user, setUser] = useState(''); 
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const togglePassword = () => setShowPassword(!showPassword);

  // --- LOGIC INTEGRATION ---
  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      // Call the loginFunction service
      console.log('!!!!Attempting login with:', { usernameOrEmail: user, password });
      const response = await Login(user, password, setAuth);
      
      console.log('Login successful:', response);
      
      // Get roles from response
      const roles = response?.roles || [];
      console.log('User roles:', roles);
      // Navigate to role-based page on first login
      const roleBasedPath = roles && roles.length > 0 ? `/${roles[0].toLowerCase()}` : from;
      console.log("Navigating to:", roleBasedPath);
      
      navigate(roleBasedPath, { replace: true });

    } catch (err) {
      
      if (!err?.response) {
        setError('No Server Response');
      } else if (err.response?.status === 400) {
        console.error(err.response);
        setError('Missing Username or Password');
      } else if (err.response?.status === 401) {
        console.error(err.response);
        setError('Unauthorized: Check your credentials');
      } else if (err.response?.status === 404) {
        setError('User not found');
      } else {
        setError(err.response?.data?.message || 'Login Failed');
      }
      console.error('Login failed:', err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="form-section">
      <div className="form-wrapper">
        {/* Header */}
        <div className="form-header">
          <h1 className="form-title">Welcome to Prime-Detection</h1>
          <p className="form-subtitle">
            find All information about the Road<br />
            powerful component library.
          </p>
        </div>

        {/* Error Alert */}
        {error && (
          <div className="error-alert">
            <p>{error}</p>
          </div>
        )}

        {/* Form */}
        <form>
          {/* Email/Username Input */}
          <div className="form-group">
            <label className="form-label">Email or Username</label>
            <input
              type="text"
              value={user}
              onChange={(e) => {
                setUser(e.target.value);
                setError('');
              }}
              className="form-input"
              placeholder="you@example.com or username"
              disabled={isLoading}
            />
          </div>

          {/* Password Input */}
          <div className="form-group">
            <label className="form-label">Password</label>
            <div className="password-container">
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setError('');
                }}
                className="password-input"
                placeholder="••••••••••"
                disabled={isLoading}
              />
              <button
                type="button"
                onClick={togglePassword}
                className="toggle-password-btn"
                disabled={isLoading}
              >
                {showPassword ? <Eye size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>

          {/* Forgot Password Link */}
          <div className="forgot-password">
            <button 
              type="button"
              className="forgot-password-btn"
              disabled={isLoading}
            >
              Forgot password?
            </button>
          </div>

          {/* Remember Me Toggle */}
          <div className="toggle-row">
            <span className="toggle-label">Remember sign in details</span>
            <button
              type="button"
              onClick={() => setRememberMe(!rememberMe)}
              className={`toggle-switch ${rememberMe ? 'active' : 'inactive'}`}
              disabled={isLoading}
            >
              <div className="toggle-thumb"></div>
            </button>
          </div>

          {/* Log In Button */}
          <button
            onClick={handleLogin}
            className="login-btn"
            disabled={isLoading || !user || !password}
          >
            {isLoading ? 'Logging in...' : 'Log in'}
          </button>
        </form>

        {/* Sign Up Link */}
        <p className="signup-text">
          Don't have an account?{' '}
          <button 
            type="button"
            onClick={() => navigate('/login/register')}
            className="signup-btn"
            disabled={isLoading}
          >
            Sign up
          </button>
        </p>
      </div>
    </div>
  );
}