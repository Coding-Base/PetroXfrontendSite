import React, { useState, useEffect } from 'react';
import { useNavigate, Link, useSearchParams } from 'react-router-dom';
import { loginUser } from '../api/index';
import image from '../images/finallogo.png';
import { Button } from '../components/ui/button';

export default function SignIn() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const nextUrl = searchParams.get('next') || '/dashboard';
  const registered = searchParams.get('registered'); // optional flag from signup

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [globalMessage, setGlobalMessage] = useState(''); // success or error messages
  const [globalError, setGlobalError] = useState('');
  const [fieldErrors, setFieldErrors] = useState({ username: '', password: '' });
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    if (registered === '1') {
      setGlobalMessage('Account created successfully — please sign in.');
      // If signup passed a username, optionally pre-fill:
      const preUser = searchParams.get('username');
      if (preUser) setUsername(preUser);
    }
  }, [registered, searchParams]);

  // Map server validation payloads to a clean string
  const parseServerErrors = (data) => {
    if (!data) return 'Login failed. Please try again.';
    // common DRF style: { "non_field_errors": [...], "username": [...], "password": [...] }
    const parts = [];
    if (data.detail) parts.push(String(data.detail));
    if (data.non_field_errors) parts.push((data.non_field_errors && data.non_field_errors.join(' ')) || '');
    // Extract field errors
    ['username', 'password', 'email'].forEach((f) => {
      if (data[f]) {
        if (Array.isArray(data[f])) parts.push(data[f].join(' '));
        else parts.push(String(data[f]));
      }
    });
    // fallback to string message
    if (parts.length === 0 && typeof data === 'string') parts.push(data);
    return parts.join(' ').trim() || 'Invalid credentials. Please try again.';
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setGlobalError('');
    setGlobalMessage('');
    setFieldErrors({ username: '', password: '' });

    // Minimal client-side checks to avoid frustrating users:
    if (!username.trim()) {
      setFieldErrors((p) => ({ ...p, username: 'Please enter your username.' }));
      return;
    }
    if (!password) {
      setFieldErrors((p) => ({ ...p, password: 'Please enter your password.' }));
      return;
    }

    setIsLoading(true);
    try {
      // Important: preserve the exact return shape from loginUser (it might return axios response or raw data)
      const res = await loginUser(username.trim(), password);
      const payload = res?.data ?? res; // support both shapes

      // extract tokens from common shapes
      const access = payload?.access ?? payload?.tokens?.access ?? payload?.token ?? payload?.access_token;
      const refresh = payload?.refresh ?? payload?.tokens?.refresh ?? payload?.refresh_token;

      if (access) localStorage.setItem('access_token', access);
      if (refresh) localStorage.setItem('refresh_token', refresh);

      // determine user object (many backends return user inside payload.data.user)
      const user = payload?.user ?? payload?.user_info ?? payload?.profile ?? payload;

      // store sensible user values if present
      const actualUsername = user?.username ?? user?.email ?? username.trim();
      if (actualUsername) localStorage.setItem('username', actualUsername);
      if (user?.id) localStorage.setItem('user_id', user.id);

      // Try to detect if the logged in user is a lecturer/staff so we can redirect to the right dashboard.
      const isLecturer = (() => {
        const u = user ?? payload;
        if (!u) return false;
        // common flags
        if (u.is_staff || u.is_superuser) return true;
        if (u.is_lecturer || u.role === 'lecturer') return true;
        // nested profile checks
        if (u.profile && (u.profile.is_lecturer || u.profile.role === 'lecturer')) return true;
        // group shapes: array of strings or array of objects
        if (Array.isArray(u.groups) && u.groups.length > 0) {
          // groups might be ['Lecturer'] or [{id:1, name:'Lecturer'}]
          if (u.groups.includes('Lecturer')) return true;
          if (u.groups.some(g => (typeof g === 'string' ? g === 'Lecturer' : (g.name === 'Lecturer' || g === 'Lecturer')))) return true;
        }
        return false;
      })();

      localStorage.setItem('role', isLecturer ? 'lecturer' : 'student');

      // Redirect based on role
      if (isLecturer) {
        navigate('/lecturer-dashboard', { replace: true });
      } else {
        navigate(nextUrl, { replace: true });
      }
    } catch (err) {
      // show helpful server-provided messages when available
      const server = err?.response?.data;
      if (server) {
        const parsed = parseServerErrors(server);
        // If field-specific info exists, show inline where possible
        const newFieldErr = { username: '', password: '' };
        if (server.username) newFieldErr.username = Array.isArray(server.username) ? server.username.join(' ') : String(server.username);
        if (server.password) newFieldErr.password = Array.isArray(server.password) ? server.password.join(' ') : String(server.password);
        setFieldErrors(newFieldErr);
        setGlobalError(parsed);
      } else {
        setGlobalError(err?.message || 'Unable to sign in. Please check your connection and try again.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const togglePasswordVisibility = () => setShowPassword((s) => !s);

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
          Sign In to Your Account
        </h2>

        {globalMessage && (
          <div className="mb-4 rounded-lg bg-green-50 p-3 text-green-800 border border-green-200">
            {globalMessage}
          </div>
        )}

        {globalError && (
          <div className="mb-4 rounded-lg bg-red-50 p-3 text-red-700 border border-red-200">
            {globalError}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6" noValidate>
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
                autoComplete="username"
                value={username}
                onChange={(e) => {
                  setUsername(e.target.value);
                  if (fieldErrors.username) setFieldErrors((p) => ({ ...p, username: '' }));
                  if (globalError) setGlobalError('');
                }}
                placeholder="Your username"
                required
                aria-invalid={!!fieldErrors.username}
                className={`pl-10 mt-1 block w-full rounded-lg border px-4 py-3 transition duration-200 ${
                  fieldErrors.username ? 'border-red-300 focus:border-red-500 focus:ring-red-200' : 'border-gray-300 focus:border-blue-500 focus:ring-blue-200'
                }`}
              />
            </div>
            {fieldErrors.username && <p className="mt-1 text-sm text-red-600">{fieldErrors.username}</p>}
          </div>

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
                autoComplete="current-password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  if (fieldErrors.password) setFieldErrors((p) => ({ ...p, password: '' }));
                  if (globalError) setGlobalError('');
                }}
                placeholder="Enter your password"
                required
                aria-invalid={!!fieldErrors.password}
                className={`pl-10 mt-1 block w-full rounded-lg border px-4 py-3 transition duration-200 ${
                  fieldErrors.password ? 'border-red-300 focus:border-red-500 focus:ring-red-200' : 'border-gray-300 focus:border-blue-500 focus:ring-blue-200'
                }`}
              />
              <button
                type="button"
                className="absolute inset-y-0 right-0 pr-3 flex items-center"
                onClick={togglePasswordVisibility}
                aria-label={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                    <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
                  </svg>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M3.707 2.293a1 1 0 00-1.414 1.414l14 14a1 1 0 001.414-1.414l-1.473-1.473A10.014 10.014 0 0019.542 10C18.268 5.943 14.478 3 10 3a9.958 9.958 0 00-4.512 1.074l-1.78-1.781zm4.261 4.26l1.514 1.515a2.003 2.003 0 012.45 2.45l1.514 1.514a4 4 0 00-5.478-5.478z" clipRule="evenodd" />
                    <path d="M12.454 16.697L9.75 13.992a4 4 0 01-3.742-3.741L2.335 6.578A9.98 9.98 0 00.458 10c1.274 4.057 5.065 7 9.542 7 .847 0 1.669-.105 2.454-.303z" />
                  </svg>
                )}
              </button>
            </div>
            {fieldErrors.password && <p className="mt-1 text-sm text-red-600">{fieldErrors.password}</p>}
          </div>

          <Button
            type="submit"
            disabled={isLoading}
            className={`w-full rounded-lg bg-gradient-to-r from-blue-600 to-indigo-700 px-4 py-3 font-semibold text-white shadow-md 
              hover:from-blue-700 hover:to-indigo-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 
              transition-all duration-300 transform ${isLoading ? 'opacity-90 cursor-not-allowed' : 'hover:-translate-y-0.5'}`}
          >
            {isLoading ? (
              <div className="flex items-center justify-center">
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Signing in...
              </div>
            ) : 'Sign In'}
          </Button>
        </form>

        <p className="mt-6 text-center text-sm text-gray-600">
          Don&apos;t have an account?{' '}
          <Link
            to={`/signup?next=${encodeURIComponent(nextUrl)}`}
            className="font-medium text-blue-600 hover:text-indigo-700 transition-colors duration-200 hover:underline"
          >
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
}
