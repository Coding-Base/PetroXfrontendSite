import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate, useSearchParams, Link } from 'react-router-dom';
import image from "../images/finallogo.png";
import { Button } from '../components/ui/button';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'https://petroxtestbackend.onrender.com/api';

export default function LecturerSignUp() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const next = searchParams.get('next') || '/lecturer-dashboard';

  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    name: '',
    department: '',
    faculty: '',
    phone: ''
  });

  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [emailVerifyMsg, setEmailVerifyMsg] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Clear tokens on mount
  useEffect(() => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
  }, []);

  // Password strength utils
  const passwordCriteria = useMemo(() => ({
    length: formData.password.length >= 8,
    lower: /[a-z]/.test(formData.password),
    upper: /[A-Z]/.test(formData.password),
    number: /[0-9]/.test(formData.password),
    special: /[^A-Za-z0-9]/.test(formData.password)
  }), [formData.password]);

  const passwordScore = useMemo(() => {
    return Object.values(passwordCriteria).reduce((s, v) => s + (v ? 1 : 0), 0);
  }, [passwordCriteria]);

  const strengthLabel = useMemo(() => {
    if (!formData.password) return { label: 'Empty', color: 'bg-gray-200', pct: 0 };
    if (passwordScore <= 1) return { label: 'Very weak', color: 'bg-red-300', pct: 20 };
    if (passwordScore === 2) return { label: 'Weak', color: 'bg-red-400', pct: 40 };
    if (passwordScore === 3) return { label: 'Fair', color: 'bg-yellow-300', pct: 60 };
    if (passwordScore === 4) return { label: 'Good', color: 'bg-green-300', pct: 80 };
    return { label: 'Strong', color: 'bg-green-600', pct: 100 };
  }, [passwordScore, formData.password]);

  const meetsPasswordPolicy = useMemo(() => {
    const lengthOk = passwordCriteria.length;
    const otherCount = (passwordCriteria.lower ? 1 : 0) + (passwordCriteria.upper ? 1 : 0) + (passwordCriteria.number ? 1 : 0) + (passwordCriteria.special ? 1 : 0);
    return lengthOk && otherCount >= 2;
  }, [passwordCriteria]);

  const emailFormatValid = (value) => {
    if (!value || !value.trim()) return false;
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());
  };

  const handleEmailBlur = () => {
    setEmailVerifyMsg('');
    if (!formData.email) {
      return;
    }
    if (emailFormatValid(formData.email)) {
      setEmailVerifyMsg('Email format looks good');
      setErrors(prev => ({ ...prev, email: '' }));
    } else {
      setErrors(prev => ({ ...prev, email: 'Please enter a valid email address' }));
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    let isValid = true;

    if (!formData.username || !formData.username.trim()) {
      newErrors.username = 'Username is required';
      isValid = false;
    } else if (formData.username.trim().length < 2) {
      newErrors.username = 'Username must be at least 2 characters';
      isValid = false;
    }

    if (!formData.email || !formData.email.trim()) {
      newErrors.email = 'Email is required';
      isValid = false;
    } else if (!emailFormatValid(formData.email.trim())) {
      newErrors.email = 'Please enter a valid email address';
      isValid = false;
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
      isValid = false;
    } else if (!meetsPasswordPolicy) {
      newErrors.password = 'Password does not meet minimum strength requirements';
      isValid = false;
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
      isValid = false;
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
      isValid = false;
    }

    if (!formData.name || !formData.name.trim()) {
      newErrors.name = 'Full name is required';
      isValid = false;
    }

    if (!formData.department || !formData.department.trim()) {
      newErrors.department = 'Department is required';
      isValid = false;
    }

    if (!formData.faculty || !formData.faculty.trim()) {
      newErrors.faculty = 'Faculty is required';
      isValid = false;
    }

    if (!formData.phone || !formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});
    setEmailVerifyMsg('');

    if (!validateForm()) return;

    setIsLoading(true);
    try {
      const response = await fetch(`${API_BASE_URL}/lecturer/register/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: formData.username.trim(),
          email: formData.email.trim(),
          password: formData.password,
          name: formData.name.trim(),
          department: formData.department.trim(),
          faculty: formData.faculty.trim(),
          phone: formData.phone.trim()
        })
      });

      const data = await response.json();

      if (!response.ok) {
        const newErrors = {};
        if (data.username) newErrors.username = Array.isArray(data.username) ? data.username.join(' ') : String(data.username);
        if (data.email) newErrors.email = Array.isArray(data.email) ? data.email.join(' ') : String(data.email);
        if (data.password) newErrors.password = Array.isArray(data.password) ? data.password.join(' ') : String(data.password);
        if (data.name) newErrors.name = Array.isArray(data.name) ? data.name.join(' ') : String(data.name);
        if (data.department) newErrors.department = Array.isArray(data.department) ? data.department.join(' ') : String(data.department);
        if (data.faculty) newErrors.faculty = Array.isArray(data.faculty) ? data.faculty.join(' ') : String(data.faculty);
        if (data.phone) newErrors.phone = Array.isArray(data.phone) ? data.phone.join(' ') : String(data.phone);
        if (Object.keys(newErrors).length === 0) {
          newErrors.form = data.message || 'Registration failed. Please try again.';
        }
        setErrors(newErrors);
      } else {
        // Success
        navigate(`/login?next=${encodeURIComponent(next)}&registered=1&username=${encodeURIComponent(formData.username.trim())}`);
      }
    } catch (err) {
      console.error("Registration Error:", err);
      setErrors({
        form: err?.message || 'Network error. Please try again.'
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-purple-50 to-indigo-100 px-4 py-8">
      <div className="w-full max-w-2xl rounded-2xl bg-white p-8 shadow-xl border border-gray-100 transition-all duration-300 hover:shadow-2xl">
        <div className="mb-8 flex justify-center">
          <div className="bg-gradient-to-r from-purple-500 to-indigo-600 p-1 rounded-full shadow-lg">
            <img
              src={image}
              alt="Petrox logo"
              className="h-20 w-20 rounded-full object-contain bg-white p-1"
            />
          </div>
        </div>

        <h2 className="mb-2 text-center text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-indigo-700">
          Lecturer Registration
        </h2>
        <p className="text-center text-sm text-gray-600 mb-6">Create your lecturer account and access the dashboard</p>

        {errors.form && (
          <div className="mb-4 rounded-lg bg-red-50 p-3 text-red-700 border border-red-200">
            {errors.form}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6" noValidate>
          {/* Row 1: Username and Email */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Username */}
            <div className="space-y-2">
              <label htmlFor="username" className="block text-sm font-medium text-gray-700">
                Username
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                  </svg>
                </div>
                <input
                  id="username"
                  name="username"
                  type="text"
                  value={formData.username}
                  onChange={handleInputChange}
                  required
                  placeholder="Username"
                  className={`pl-10 mt-1 block w-full rounded-lg border px-4 py-2 transition duration-200 text-sm ${
                    errors.username ? 'border-red-300 focus:border-red-500 focus:ring-red-200' : 'border-gray-300 focus:border-purple-500 focus:ring-purple-200'
                  }`}
                />
              </div>
              {errors.username && <p className="mt-1 text-xs text-red-600">{errors.username}</p>}
            </div>

            {/* Email */}
            <div className="space-y-2">
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                    <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                  </svg>
                </div>
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  onBlur={handleEmailBlur}
                  required
                  placeholder="your.email@example.com"
                  className={`pl-10 mt-1 block w-full rounded-lg border px-4 py-2 transition duration-200 text-sm ${
                    errors.email ? 'border-red-300 focus:border-red-500 focus:ring-red-200' : 'border-gray-300 focus:border-purple-500 focus:ring-purple-200'
                  }`}
                />
              </div>
              {errors.email && <p className="mt-1 text-xs text-red-600">{errors.email}</p>}
              {!errors.email && emailVerifyMsg && <p className="mt-1 text-xs text-green-600">{emailVerifyMsg}</p>}
            </div>
          </div>

          {/* Row 2: Full Name and Department */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Full Name */}
            <div className="space-y-2">
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                Full Name
              </label>
              <input
                id="name"
                name="name"
                type="text"
                value={formData.name}
                onChange={handleInputChange}
                required
                placeholder="Dr. John Doe"
                className={`mt-1 block w-full rounded-lg border px-4 py-2 transition duration-200 text-sm ${
                  errors.name ? 'border-red-300 focus:border-red-500 focus:ring-red-200' : 'border-gray-300 focus:border-purple-500 focus:ring-purple-200'
                }`}
              />
              {errors.name && <p className="mt-1 text-xs text-red-600">{errors.name}</p>}
            </div>

            {/* Department */}
            <div className="space-y-2">
              <label htmlFor="department" className="block text-sm font-medium text-gray-700">
                Department
              </label>
              <input
                id="department"
                name="department"
                type="text"
                value={formData.department}
                onChange={handleInputChange}
                required
                placeholder="Computer Science"
                className={`mt-1 block w-full rounded-lg border px-4 py-2 transition duration-200 text-sm ${
                  errors.department ? 'border-red-300 focus:border-red-500 focus:ring-red-200' : 'border-gray-300 focus:border-purple-500 focus:ring-purple-200'
                }`}
              />
              {errors.department && <p className="mt-1 text-xs text-red-600">{errors.department}</p>}
            </div>
          </div>

          {/* Row 3: Faculty and Phone */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Faculty */}
            <div className="space-y-2">
              <label htmlFor="faculty" className="block text-sm font-medium text-gray-700">
                Faculty
              </label>
              <input
                id="faculty"
                name="faculty"
                type="text"
                value={formData.faculty}
                onChange={handleInputChange}
                required
                placeholder="Faculty of Engineering"
                className={`mt-1 block w-full rounded-lg border px-4 py-2 transition duration-200 text-sm ${
                  errors.faculty ? 'border-red-300 focus:border-red-500 focus:ring-red-200' : 'border-gray-300 focus:border-purple-500 focus:ring-purple-200'
                }`}
              />
              {errors.faculty && <p className="mt-1 text-xs text-red-600">{errors.faculty}</p>}
            </div>

            {/* Phone */}
            <div className="space-y-2">
              <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                Phone Number
              </label>
              <input
                id="phone"
                name="phone"
                type="tel"
                value={formData.phone}
                onChange={handleInputChange}
                required
                placeholder="+1 (555) 000-0000"
                className={`mt-1 block w-full rounded-lg border px-4 py-2 transition duration-200 text-sm ${
                  errors.phone ? 'border-red-300 focus:border-red-500 focus:ring-red-200' : 'border-gray-300 focus:border-purple-500 focus:ring-purple-200'
                }`}
              />
              {errors.phone && <p className="mt-1 text-xs text-red-600">{errors.phone}</p>}
            </div>
          </div>

          {/* Row 4: Password */}
          <div className="space-y-2">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                </svg>
              </div>
              <input
                id="password"
                name="password"
                type={showPassword ? 'text' : 'password'}
                value={formData.password}
                onChange={handleInputChange}
                required
                placeholder="At least 8 characters"
                className={`pl-10 mt-1 block w-full rounded-lg border px-4 py-2 transition duration-200 text-sm ${
                  errors.password ? 'border-red-300 focus:border-red-500 focus:ring-red-200' : 'border-gray-300 focus:border-purple-500 focus:ring-purple-200'
                }`}
              />
              <button
                type="button"
                onClick={() => setShowPassword(s => !s)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-gray-600 hover:text-gray-800"
              >
                {showPassword ? 'Hide' : 'Show'}
              </button>
            </div>

            <div className="mt-2">
              <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
                <div className={`h-2 ${strengthLabel.color}`} style={{ width: `${strengthLabel.pct}%` }} />
              </div>
              <div className="flex justify-between items-center mt-2">
                <p className="text-xs font-medium text-gray-700">{strengthLabel.label}</p>
                <p className="text-xs text-gray-500">{passwordScore}/5</p>
              </div>
            </div>

            {errors.password && <p className="mt-1 text-xs text-red-600">{errors.password}</p>}
          </div>

          {/* Row 5: Confirm Password */}
          <div className="space-y-2">
            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
              Confirm Password
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                </svg>
              </div>
              <input
                id="confirmPassword"
                name="confirmPassword"
                type={showConfirmPassword ? 'text' : 'password'}
                value={formData.confirmPassword}
                onChange={handleInputChange}
                required
                placeholder="Confirm your password"
                className={`pl-10 mt-1 block w-full rounded-lg border px-4 py-2 transition duration-200 text-sm ${
                  errors.confirmPassword ? 'border-red-300 focus:border-red-500 focus:ring-red-200' : 'border-gray-300 focus:border-purple-500 focus:ring-purple-200'
                }`}
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(s => !s)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-gray-600 hover:text-gray-800"
              >
                {showConfirmPassword ? 'Hide' : 'Show'}
              </button>
            </div>
            {errors.confirmPassword && <p className="mt-1 text-xs text-red-600">{errors.confirmPassword}</p>}
          </div>

          <Button
            type="submit"
            disabled={isLoading}
            className={`w-full rounded-lg bg-gradient-to-r from-purple-600 to-indigo-700 px-4 py-3 font-semibold text-white shadow-md hover:from-purple-700 hover:to-indigo-800 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 transition-all duration-300 transform ${isLoading ? 'opacity-90 cursor-not-allowed' : 'hover:-translate-y-0.5'}`}
          >
            {isLoading ? (
              <div className="flex items-center justify-center">
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Creating Account...
              </div>
            ) : 'Create Lecturer Account'}
          </Button>
        </form>

        <p className="mt-6 text-center text-sm text-gray-600">
          Already have an account?{' '}
          <Link to="/login" className="font-medium text-purple-600 hover:text-purple-700 transition-colors duration-200 hover:underline">
            Sign In
          </Link>
        </p>

        <div className="mt-4 text-center">
          <p className="text-sm text-gray-600">
            Want to sign up as a student?{' '}
            <Link to="/signup-student" className="font-medium text-blue-600 hover:text-blue-700 transition-colors duration-200 hover:underline">
              Go back to role selection
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

