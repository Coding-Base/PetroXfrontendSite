import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate, useSearchParams, Link } from 'react-router-dom';
import { registerUser } from '../api';
import image from "../images/finallogo.png";
import { Button } from '../components/ui/button';

export default function SignUp() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const next = searchParams.get('next') || '/dashboard';

  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [registrationNumber, setRegistrationNumber] = useState('');
  const [department, setDepartment] = useState('');
  const [errors, setErrors] = useState({
    username: '',
    email: '',
    password: '',
    registrationNumber: '',
    department: '',
    form: ''
  });
  const [isLoading, setIsLoading] = useState(false);

  // small email hint message (format-only)
  const [emailVerifyMsg, setEmailVerifyMsg] = useState('');

  // password visibility
  const [showPassword, setShowPassword] = useState(false);

  // Clear tokens on mount
  useEffect(() => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
  }, []);

  // -------------------------
  // Password strength utils
  // -------------------------
  const passwordCriteria = useMemo(() => ({
    length: password.length >= 8,
    lower: /[a-z]/.test(password),
    upper: /[A-Z]/.test(password),
    number: /[0-9]/.test(password),
    special: /[^A-Za-z0-9]/.test(password)
  }), [password]);

  const passwordScore = useMemo(() => {
    return Object.values(passwordCriteria).reduce((s, v) => s + (v ? 1 : 0), 0);
  }, [passwordCriteria]);

  const strengthLabel = useMemo(() => {
    if (!password) return { label: 'Empty', color: 'bg-gray-200', pct: 0 };
    if (passwordScore <= 1) return { label: 'Very weak', color: 'bg-red-300', pct: 20 };
    if (passwordScore === 2) return { label: 'Weak', color: 'bg-red-400', pct: 40 };
    if (passwordScore === 3) return { label: 'Fair', color: 'bg-yellow-300', pct: 60 };
    if (passwordScore === 4) return { label: 'Good', color: 'bg-green-300', pct: 80 };
    return { label: 'Strong', color: 'bg-green-600', pct: 100 };
  }, [passwordScore, password]);

  // Minimum policy: length >= 8 && at least 3 criteria total (length + 2 others)
  const meetsPasswordPolicy = useMemo(() => {
    const lengthOk = passwordCriteria.length;
    const otherCount = (passwordCriteria.lower ? 1 : 0) + (passwordCriteria.upper ? 1 : 0) + (passwordCriteria.number ? 1 : 0) + (passwordCriteria.special ? 1 : 0);
    return lengthOk && otherCount >= 2; // length + at least two others = 3/5
  }, [passwordCriteria]);

  // -------------------------
  // Email format check only
  // -------------------------
  const emailFormatValid = (value) => {
    if (!value || !value.trim()) return false;
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());
  };

  const handleEmailBlur = () => {
    setEmailVerifyMsg('');
    if (!email) {
      setEmailVerifyMsg('');
      return;
    }
    if (emailFormatValid(email)) {
      setEmailVerifyMsg('Email format looks good');
      setErrors(prev => ({ ...prev, email: '' }));
    } else {
      setEmailVerifyMsg('');
      setErrors(prev => ({ ...prev, email: 'Please enter a valid email address' }));
    }
  };

  // Convenience parse server errors
  const parseServerErrors = (data) => {
    if (!data) return 'Registration failed. Please try again.';
    const parts = [];
    if (data.detail) parts.push(String(data.detail));
    if (data.username) parts.push(Array.isArray(data.username) ? data.username.join(' ') : String(data.username));
    if (data.email) parts.push(Array.isArray(data.email) ? data.email.join(' ') : String(data.email));
    if (data.password) parts.push(Array.isArray(data.password) ? data.password.join(' ') : String(data.password));
    if (data.error) parts.push(String(data.error));
    if (parts.length === 0 && typeof data === 'string') parts.push(data);
    return parts.join(' ').trim() || 'Registration failed. Please try again.';
  };

  // Client-side validation (format & password policy)
  const validateForm = () => {
    const newErrors = { username: '', email: '', password: '', registrationNumber: '', department: '', form: '' };
    let isValid = true;

    if (!username || !username.trim()) {
      newErrors.username = 'Username is required';
      isValid = false;
    } else if (username.trim().length < 2) {
      newErrors.username = 'Username must be at least 2 characters';
      isValid = false;
    }

    if (!email || !email.trim()) {
      newErrors.email = 'Email is required';
      isValid = false;
    } else if (!emailFormatValid(email.trim())) {
      newErrors.email = 'Please enter a valid email address';
      isValid = false;
    }

    if (!password) {
      newErrors.password = 'Password is required';
      isValid = false;
    } else if (!meetsPasswordPolicy) {
      newErrors.password = 'Password does not meet minimum strength requirements';
      isValid = false;
    }

    if (registrationNumber && !registrationNumber.trim()) {
      newErrors.registrationNumber = 'Registration number cannot be empty if provided';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({ username: '', email: '', password: '', registrationNumber: '', department: '', form: '' });
    setEmailVerifyMsg('');

    if (!validateForm()) return;

    setIsLoading(true);
    try {
      await registerUser(
        username.trim(),
        email.trim(),
        password,
        registrationNumber.trim(),
        department.trim()
      );

      navigate(`/login?next=${encodeURIComponent(next)}&registered=1&username=${encodeURIComponent(username.trim())}`);
    } catch (err) {
      console.error("Registration Error:", err);
      const serverData = err?.response?.data;
      if (serverData) {
        const newErrors = { username: '', email: '', password: '', registrationNumber: '', department: '', form: '' };
        if (serverData.username) newErrors.username = Array.isArray(serverData.username) ? serverData.username.join(' ') : String(serverData.username);
        if (serverData.email) newErrors.email = Array.isArray(serverData.email) ? serverData.email.join(' ') : String(serverData.email);
        if (serverData.password) newErrors.password = Array.isArray(serverData.password) ? serverData.password.join(' ') : String(serverData.password);
        if (serverData.registration_number) newErrors.registrationNumber = Array.isArray(serverData.registration_number) ? serverData.registration_number.join(' ') : String(serverData.registration_number);
        if (serverData.department) newErrors.department = Array.isArray(serverData.department) ? serverData.department.join(' ') : String(serverData.department);
        if (serverData.detail) newErrors.form = String(serverData.detail);
        else if (serverData.error) newErrors.form = String(serverData.error);
        else {
          const parsed = parseServerErrors(serverData);
          if (!newErrors.username && !newErrors.email && !newErrors.password) newErrors.form = parsed;
        }
        setErrors(newErrors);
      } else {
        setErrors(prev => ({ ...prev, form: err?.message || 'Unexpected error. Please try again.' }));
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-50 px-4">
      <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-xl border border-gray-100 transition-all duration-300 hover:shadow-2xl">
        <div className="mb-8 flex justify-center">
          <div className="bg-gradient-to-r from-blue-500 to-indigo-600 p-1 rounded-full shadow-lg">
            <img
              src={image}
              alt="Petrox logo"
              className="h-20 w-20 rounded-full object-contain bg-white p-1"
            />
          </div>
        </div>

        <h2 className="mb-4 text-center text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-700">
          Create Your Account
        </h2>

        {errors.form && (
          <div className="mb-4 rounded-lg bg-red-50 p-3 text-red-700 border border-red-200">
            {errors.form}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4" noValidate>
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
                value={username}
                onChange={(e) => {
                  setUsername(e.target.value);
                  if (errors.username) setErrors(prev => ({ ...prev, username: '' }));
                }}
                required
                placeholder="Choose a username"
                className={`pl-10 mt-1 block w-full rounded-lg border px-4 py-2 transition duration-200 text-sm ${
                  errors.username ? 'border-red-300 focus:border-red-500 focus:ring-red-200' : 'border-gray-300 focus:border-blue-500 focus:ring-blue-200'
                }`}
                aria-invalid={!!errors.username}
                aria-describedby={errors.username ? 'username-error' : undefined}
              />
            </div>
            {errors.username && <p id="username-error" className="mt-1 text-xs text-red-600">{errors.username}</p>}
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
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (errors.email) setErrors(prev => ({ ...prev, email: '' }));
                  setEmailVerifyMsg('');
                }}
                onBlur={handleEmailBlur}
                required
                placeholder="your.email@example.com"
                className={`pl-10 mt-1 block w-full rounded-lg border px-4 py-2 transition duration-200 text-sm ${
                  errors.email ? 'border-red-300 focus:border-red-500 focus:ring-red-200' : 'border-gray-300 focus:border-blue-500 focus:ring-blue-200'
                }`}
                aria-invalid={!!errors.email}
                aria-describedby={errors.email ? 'email-error' : 'email-hint'}
              />
            </div>
            <div className="flex items-center justify-between">
              {errors.email ? <p id="email-error" className="mt-1 text-xs text-red-600">{errors.email}</p>
               : <p id="email-hint" className="mt-1 text-xs text-gray-500">{emailVerifyMsg || 'We only validate email format on this form.'}</p>}
            </div>
          </div>

          {/* Password */}
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
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  if (errors.password) setErrors(prev => ({ ...prev, password: '' }));
                }}
                required
                placeholder="At least 8 characters"
                className={`pl-10 mt-1 block w-full rounded-lg border px-4 py-2 transition duration-200 text-sm ${
                  errors.password ? 'border-red-300 focus:border-red-500 focus:ring-red-200' : 'border-gray-300 focus:border-blue-500 focus:ring-blue-200'
                }`}
                aria-invalid={!!errors.password}
                aria-describedby={errors.password ? 'password-error' : 'password-hint'}
              />

              <button
                type="button"
                onClick={() => setShowPassword(s => !s)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-gray-600 hover:text-gray-800"
                aria-label={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? 'Hide' : 'Show'}
              </button>
            </div>

            <div className="mt-2">
              <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
                <div
                  className={`h-2 ${strengthLabel.color}`}
                  style={{ width: `${strengthLabel.pct}%` }}
                />
              </div>
              <div className="flex justify-between items-center mt-2">
                <p className="text-xs font-medium text-gray-700">{strengthLabel.label}</p>
                <p className="text-xs text-gray-500">{passwordScore}/5</p>
              </div>

              <ul className="mt-2 grid grid-cols-1 gap-1 text-xs">
                <li className={`flex items-center ${passwordCriteria.length ? 'text-green-700' : 'text-gray-500'}`}>
                  <span className="mr-2">{passwordCriteria.length ? '✓' : '○'}</span>
                  At least 8 characters
                </li>
                <li className={`flex items-center ${passwordCriteria.upper ? 'text-green-700' : 'text-gray-500'}`}>
                  <span className="mr-2">{passwordCriteria.upper ? '✓' : '○'}</span>
                  At least one uppercase letter
                </li>
                <li className={`flex items-center ${passwordCriteria.lower ? 'text-green-700' : 'text-gray-500'}`}>
                  <span className="mr-2">{passwordCriteria.lower ? '✓' : '○'}</span>
                  At least one lowercase letter
                </li>
                <li className={`flex items-center ${passwordCriteria.number ? 'text-green-700' : 'text-gray-500'}`}>
                  <span className="mr-2">{passwordCriteria.number ? '✓' : '○'}</span>
                  At least one number
                </li>
                <li className={`flex items-center ${passwordCriteria.special ? 'text-green-700' : 'text-gray-500'}`}>
                  <span className="mr-2">{passwordCriteria.special ? '✓' : '○'}</span>
                  At least one symbol (e.g. !@#$%)
                </li>
              </ul>

              {errors.password && <p id="password-error" className="mt-2 text-xs text-red-600">{errors.password}</p>}
            </div>
          </div>

          {/* Registration Number */}
          <div className="space-y-2">
            <label htmlFor="registrationNumber" className="block text-sm font-medium text-gray-700">
              Registration Number (Optional)
            </label>
            <input
              id="registrationNumber"
              name="registrationNumber"
              type="text"
              value={registrationNumber}
              onChange={(e) => {
                setRegistrationNumber(e.target.value);
                if (errors.registrationNumber) setErrors(prev => ({ ...prev, registrationNumber: '' }));
              }}
              placeholder="e.g., 001/2024/001"
              className={`mt-1 block w-full rounded-lg border px-4 py-2 transition duration-200 text-sm ${
                errors.registrationNumber ? 'border-red-300 focus:border-red-500 focus:ring-red-200' : 'border-gray-300 focus:border-blue-500 focus:ring-blue-200'
              }`}
            />
            {errors.registrationNumber && <p className="mt-1 text-xs text-red-600">{errors.registrationNumber}</p>}
          </div>

          {/* Department */}
          <div className="space-y-2">
            <label htmlFor="department" className="block text-sm font-medium text-gray-700">
              Department (Optional)
            </label>
            <input
              id="department"
              name="department"
              type="text"
              value={department}
              onChange={(e) => {
                setDepartment(e.target.value);
                if (errors.department) setErrors(prev => ({ ...prev, department: '' }));
              }}
              placeholder="e.g., Computer Science"
              className={`mt-1 block w-full rounded-lg border px-4 py-2 transition duration-200 text-sm ${
                errors.department ? 'border-red-300 focus:border-red-500 focus:ring-red-200' : 'border-gray-300 focus:border-blue-500 focus:ring-blue-200'
              }`}
            />
            {errors.department && <p className="mt-1 text-xs text-red-600">{errors.department}</p>}
          </div>

          <Button
            type="submit"
            disabled={isLoading}
            className={`w-full rounded-lg bg-gradient-to-r from-blue-600 to-indigo-700 px-4 py-3 font-semibold text-white shadow-md hover:from-blue-700 hover:to-indigo-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-300 transform ${isLoading ? 'opacity-90 cursor-not-allowed' : 'hover:-translate-y-0.5'}`}
          >
            {isLoading ? (
              <div className="flex items-center justify-center">
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Creating Account...
              </div>
            ) : 'Sign Up'}
          </Button>
        </form>

        <p className="mt-6 text-center text-sm text-gray-600">
          Already have an account?{' '}
          <Link
            to={`/login?next=${encodeURIComponent(next)}`}
            className="font-medium text-blue-600 hover:text-indigo-700 transition-colors duration-200 hover:underline"
          >
            Sign In
          </Link>
        </p>

        <p className="mt-3 text-center text-xs text-gray-400">
          We validate email format client-side only. If you want stronger verification (MX check, disposable blocking), we can add a server endpoint later.
        </p>
      </div>
    </div>
  );
}
