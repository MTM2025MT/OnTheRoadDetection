import { useState } from 'react';
import { Eye, EyeOff, Check, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { registerFunction } from './LoginFunction'; // Adjust path as needed
import './Login.css';

// Password Strength Indicator Component
function PasswordStrengthMeter({ password }) {
  const getStrength = () => {
    if (!password) return { score: 0, label: '', color: '' };
    
    let score = 0;
    if (password.length >= 8) score++;
    if (/[A-Z]/.test(password)) score++;
    if (/[0-9]/.test(password)) score++;
    if (/[^A-Za-z0-9]/.test(password)) score++;
    
    const strengths = [
      { score: 0, label: '', color: '' },
      { score: 1, label: 'Weak', color: '#ef4444' },
      { score: 2, label: 'Fair', color: '#f97316' },
      { score: 3, label: 'Good', color: '#eab308' },
      { score: 4, label: 'Strong', color: '#22c55e' }
    ];
    
    return strengths[score];
  };

  const strength = getStrength();

  if (!password) return null;

  return (
    <div className="password-strength-meter">
      <div className="strength-bar-container">
        <div
          className="strength-bar-fill"
          style={{
            width: `${(strength.score / 4) * 100}%`,
            backgroundColor: strength.color
          }}
        />
      </div>
      {strength.label && (
        <span className="strength-label" style={{ color: strength.color }}>
          {strength.label}
        </span>
      )}
    </div>
  );
}

// Validation Helper Component
function ValidationMessage({ isValid, message, showValidation }) {
  if (!showValidation) return null;
  
  return (
    <div className={`validation-message ${isValid ? 'valid' : 'invalid'}`}>
      {isValid ? <Check size={16} /> : <X size={16} />}
      <span>{message}</span>
    </div>
  );
}

// Register Form Component
export default function RegisterForm() {
  const navigate = useNavigate();

  // --- STATE ---
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    userName: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [agreeToTerms, setAgreeToTerms] = useState(false);
  const [showValidation, setShowValidation] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [generalError, setGeneralError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  // --- VALIDATION LOGIC ---
  const validateForm = () => {
    const newErrors = {};

    if (!formData.firstName.trim()) {
      newErrors.firstName = 'First name is required';
    }

    if (!formData.lastName.trim()) {
      newErrors.lastName = 'Last name is required';
    }

    if (!formData.userName.trim()) {
      newErrors.userName = 'Username is required';
    } else if (formData.userName.length < 3) {
      newErrors.userName = 'Username must be at least 3 characters';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    } else if (!/[A-Z]/.test(formData.password)) {
      newErrors.password = 'Password must contain an uppercase letter';
    } else if (!/[0-9]/.test(formData.password)) {
      newErrors.password = 'Password must contain a number';
    } else if (!/[^A-Za-z0-9]/.test(formData.password)) {
      newErrors.password = 'Password must contain a special character';
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    if (!agreeToTerms) {
      newErrors.terms = 'You must agree to the terms and conditions';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // --- INPUT CHANGE HANDLER ---
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
    
    // Clear general error when user starts typing
    if (generalError) {
      setGeneralError('');
    }
  };

  // --- REGISTRATION HANDLER ---
  const handleRegister = async (e) => {
    e.preventDefault();
    setShowValidation(true);
    setGeneralError('');
    setSuccessMessage('');

    if (!validateForm()) {
      return;
    }

    setIsLoading(true);

    try {
      // Call the registerFunction service with the proper parameters
      const response = await registerFunction(
        formData.userName,
        formData.email,
        formData.password
        ,        formData.firstName,
        formData.lastName
      );

      console.log('Registration successful:', response);
      
      setSuccessMessage('Registration successful! Redirecting to login...');
      
      // Redirect to login after a short delay
      setTimeout(() => {
        navigate('/login', { replace: true });
      }, 1500);

    } catch (err) {
      setIsLoading(false);
      
      if (!err?.response) {
        setGeneralError('No Server Response');
      } else if (err.response?.status === 400) {
        const message = err.response?.data?.message || 'Invalid input. Please check your details.';
        setGeneralError(`Registration failed: ${message}`);
        console.error(err.response);
      } else if (err.response?.status === 409) {
        setGeneralError('User already exists. Please use a different email or username.');
        console.error(err.response);
      } else {
        setGeneralError(
          err.response?.data?.message || 'Registration failed. Please try again.'
        );
        console.error(err.response);
      }
      console.error('Registration failed:', err);
    }
  };

  return (
    <div className="form-section">
      <div className="form-wrapper">
        {/* Header */}
        <div className="form-header">
          <h1 className="form-title">Create Account</h1>
          <p className="form-subtitle">
            Join our community and help improve road safety<br />
            through data-driven insights.
          </p>
        </div>

        {/* Success Message */}
        {successMessage && (
          <div className="success-alert">
            <p>{successMessage}</p>
          </div>
        )}

        {/* Error Alert */}
        {generalError && (
          <div className="error-alert">
            <p>{generalError}</p>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleRegister}>
          {/* Name Row */}
          <div className="form-row">
            <div className="form-group">
              <label className="form-label">First Name</label>
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                className={`form-input ${errors.firstName ? 'error' : ''}`}
                placeholder="John"
                disabled={isLoading}
              />
              {errors.firstName && (
                <ValidationMessage isValid={false} message={errors.firstName} showValidation={showValidation} />
              )}
            </div>

            <div className="form-group">
              <label className="form-label">Last Name</label>
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                className={`form-input ${errors.lastName ? 'error' : ''}`}
                placeholder="Doe"
                disabled={isLoading}
              />
              {errors.lastName && (
                <ValidationMessage isValid={false} message={errors.lastName} showValidation={showValidation} />
              )}
            </div>
          </div>

          {/* Username Input */}
          <div className="form-group">
            <label className="form-label">Username</label>
            <input
              type="text"
              name="userName"
              value={formData.userName}
              onChange={handleChange}
              className={`form-input ${errors.userName ? 'error' : ''}`}
              placeholder="johndoe"
              disabled={isLoading}
            />
            {errors.userName && (
              <ValidationMessage isValid={false} message={errors.userName} showValidation={showValidation} />
            )}
          </div>

          {/* Email Input */}
          <div className="form-group">
            <label className="form-label">Email Address</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className={`form-input ${errors.email ? 'error' : ''}`}
              placeholder="you@example.com"
              disabled={isLoading}
            />
            {errors.email && (
              <ValidationMessage isValid={false} message={errors.email} showValidation={showValidation} />
            )}
          </div>

          {/* Password Input */}
          <div className="form-group">
            <label className="form-label">Password</label>
            <div className="password-container">
              <input
                type={showPassword ? 'text' : 'password'}
                name="password"
                value={formData.password}
                onChange={handleChange}
                className={`password-input ${errors.password ? 'error' : ''}`}
                placeholder="••••••••••"
                disabled={isLoading}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="toggle-password-btn"
                disabled={isLoading}
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
            {formData.password && <PasswordStrengthMeter password={formData.password} />}
            {errors.password && (
              <ValidationMessage isValid={false} message={errors.password} showValidation={showValidation} />
            )}
          </div>

          {/* Confirm Password Input */}
          <div className="form-group">
            <label className="form-label">Confirm Password</label>
            <div className="password-container">
              <input
                type={showConfirmPassword ? 'text' : 'password'}
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                className={`password-input ${errors.confirmPassword ? 'error' : ''}`}
                placeholder="••••••••••"
                disabled={isLoading}
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="toggle-password-btn"
                disabled={isLoading}
              >
                {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
            {formData.confirmPassword && (
              <div className={`password-match ${formData.password === formData.confirmPassword ? 'match' : 'mismatch'}`}>
                {formData.password === formData.confirmPassword ? (
                  <>
                    <Check size={16} /> Passwords match
                  </>
                ) : (
                  <>
                    <X size={16} /> Passwords don't match
                  </>
                )}
              </div>
            )}
            {errors.confirmPassword && (
              <ValidationMessage isValid={false} message={errors.confirmPassword} showValidation={showValidation} />
            )}
          </div>

          {/* Terms and Conditions */}
          <div className="toggle-row">
            <div className="checkbox-wrapper">
              <input
                type="checkbox"
                id="terms"
                checked={agreeToTerms}
                onChange={(e) => {
                  setAgreeToTerms(e.target.checked);
                  if (errors.terms) {
                    setErrors(prev => ({ ...prev, terms: '' }));
                  }
                }}
                className="checkbox-input"
                disabled={isLoading}
              />
              <label htmlFor="terms" className="checkbox-label">
                I agree to the Terms and Conditions
              </label>
            </div>
          </div>
          {errors.terms && (
            <ValidationMessage isValid={false} message={errors.terms} showValidation={showValidation} />
          )}

          {/* Register Button */}
          <button
            type="submit"
            className="register-btn"
            disabled={isLoading}
          >
            {isLoading ? 'Creating Account...' : 'Create Account'}
          </button>
        </form>

        {/* Login Link */}
        <p className="login-text">
          Already have an account?{' '}
          <button 
            type="button"
            onClick={() => navigate('/login')}
            className="login-btn-link"
            disabled={isLoading}
          >
            Sign in
          </button>
        </p>
      </div>
    </div>
  );
}