import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate, useSearchParams, Link } from 'react-router-dom';
import { registerUser } from '../api';
import image from "../images/finallogo.png";
import { Button } from '../components/ui/button';

/**
 * SignUp page
 * - Role chooser modal (Student | Lecturer)
 * - Student uses existing registerUser(username, email, password, registrationNumber, department)
 * - Lecturer registers by calling the same helper (mapped fields). If your backend expects a different payload
 *   for lecturers adjust your registerUser helper to accept role or a payload object.
 */

export default function SignUp() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const next = searchParams.get('next') || '/dashboard';

  // Role selection modal
  const [roleChoiceOpen, setRoleChoiceOpen] = useState(true);
  const [role, setRole] = useState('student'); // 'student' | 'lecturer'

  // Student fields
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [registrationNumber, setRegistrationNumber] = useState('');
  const [department, setDepartment] = useState('');

  // Lecturer fields (simpler)
  const [lecturerName, setLecturerName] = useState('');
  const [lecturerDept, setLecturerDept] = useState('');
  const [lecturerPhone, setLecturerPhone] = useState('');
  const [lecturerEmail, setLecturerEmail] = useState('');
  const [lecturerPassword, setLecturerPassword] = useState('');

  const [errors, setErrors] = useState({
    username: '', email: '', password: '', registrationNumber: '', department: '',
    lecturerName: '', lecturerDept: '', lecturerPhone: '', lecturerEmail: '', lecturerPassword: '',
    form: ''
  });
  const [emailVerifyMsg, setEmailVerifyMsg] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    // clear tokens if present
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
  }, []);

  // Password strength helpers (shared)
  const currentPassword = role === 'lecturer' ? lecturerPassword : password;
  const passwordCriteria = useMemo(() => ({
    length: currentPassword.length >= 8,
    lower: /[a-z]/.test(currentPassword),
    upper: /[A-Z]/.test(currentPassword),
    number: /[0-9]/.test(currentPassword),
    special: /[^A-Za-z0-9]/.test(currentPassword)
  }), [currentPassword]);

  const passwordScore = useMemo(() => Object.values(passwordCriteria).reduce((s, v) => s + (v ? 1 : 0), 0), [passwordCriteria]);

  const strengthLabel = useMemo(() => {
    if (!currentPassword) return { label: 'Empty', color: 'bg-gray-200', pct: 0 };
    if (passwordScore <= 1) return { label: 'Very weak', color: 'bg-red-300', pct: 20 };
    if (passwordScore === 2) return { label: 'Weak', color: 'bg-red-400', pct: 40 };
    if (passwordScore === 3) return { label: 'Fair', color: 'bg-yellow-300', pct: 60 };
    if (passwordScore === 4) return { label: 'Good', color: 'bg-green-300', pct: 80 };
    return { label: 'Strong', color: 'bg-green-600', pct: 100 };
  }, [passwordScore, currentPassword]);

  const meetsPasswordPolicy = useMemo(() => {
    const lengthOk = passwordCriteria.length;
    const otherCount = (passwordCriteria.lower ? 1 : 0) + (passwordCriteria.upper ? 1 : 0) + (passwordCriteria.number ? 1 : 0) + (passwordCriteria.special ? 1 : 0);
    return lengthOk && otherCount >= 2;
  }, [passwordCriteria]);

  const emailFormatValid = (value) => {
    if (!value || !value.trim()) return false;
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());
  };

  const handleEmailBlur = (val, field = 'student') => {
    setEmailVerifyMsg('');
    if (!val) return;
    if (emailFormatValid(val)) {
      setEmailVerifyMsg('Email format looks good');
      setErrors(prev => ({ ...prev, email: '' }));
      if (field === 'lecturer') setErrors(prev => ({ ...prev, lecturerEmail: '' }));
    } else {
      if (field === 'lecturer') setErrors(prev => ({ ...prev, lecturerEmail: 'Please enter a valid email address' }));
      else setErrors(prev => ({ ...prev, email: 'Please enter a valid email address' }));
    }
  };

  const parseServerErrors = (data) => {
    if (!data) return 'Registration failed. Please try again.';
    const parts = [];
    if (data.detail) parts.push(String(data.detail));
    ['username','email','password','name','phone','department','registration_number','error'].forEach(k => {
      if (data[k]) parts.push(Array.isArray(data[k]) ? data[k].join(' ') : String(data[k]));
    });
    if (parts.length === 0 && typeof data === 'string') parts.push(data);
    return parts.join(' ').trim();
  };

  // validation functions
  const validateStudent = () => {
    const newErrors = { username: '', email: '', password: '', registrationNumber: '', department: '', form: '' };
    let ok = true;
    if (!username || !username.trim()) { newErrors.username = 'Username is required'; ok = false; }
    else if (username.trim().length < 2) { newErrors.username = 'Username must be at least 2 characters'; ok = false; }
    if (!email || !email.trim()) { newErrors.email = 'Email is required'; ok = false; }
    else if (!emailFormatValid(email.trim())) { newErrors.email = 'Enter a valid email'; ok = false; }
    if (!password) { newErrors.password = 'Password is required'; ok = false; }
    else if (!meetsPasswordPolicy) { newErrors.password = 'Password too weak (min 8 chars and mix)'; ok = false; }
    if (registrationNumber && !registrationNumber.trim()) { newErrors.registrationNumber = 'Invalid registration number'; ok = false; }
    setErrors(prev => ({ ...prev, ...newErrors }));
    return ok;
  };

  const validateLecturer = () => {
    const newErrors = { lecturerName: '', lecturerDept: '', lecturerPhone: '', lecturerEmail: '', lecturerPassword: '', form: '' };
    let ok = true;
    if (!lecturerName || !lecturerName.trim()) { newErrors.lecturerName = 'Name is required'; ok = false; }
    if (!lecturerDept || !lecturerDept.trim()) { newErrors.lecturerDept = 'Department is required'; ok = false; }
    if (!lecturerPhone || !lecturerPhone.trim()) { newErrors.lecturerPhone = 'Phone is required'; ok = false; }
    if (!lecturerEmail || !lecturerEmail.trim()) { newErrors.lecturerEmail = 'Email is required'; ok = false; }
    else if (!emailFormatValid(lecturerEmail.trim())) { newErrors.lecturerEmail = 'Enter a valid email'; ok = false; }
    if (!lecturerPassword) { newErrors.lecturerPassword = 'Password is required'; ok = false; }
    else if (!meetsPasswordPolicy) { newErrors.lecturerPassword = 'Password too weak (min 8 chars and mix)'; ok = false; }
    setErrors(prev => ({ ...prev, ...newErrors }));
    return ok;
  };

  // submit (uses your registerUser helper)
  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({
      username: '', email: '', password: '', registrationNumber: '', department: '',
      lecturerName: '', lecturerDept: '', lecturerPhone: '', lecturerEmail: '', lecturerPassword: '',
      form: ''
    });
    setEmailVerifyMsg('');

    if (role === 'student' && !validateStudent()) return;
    if (role === 'lecturer' && !validateLecturer()) return;

    setIsLoading(true);
    try {
      if (role === 'student') {
        // existing registerUser signature (username, email, password, registrationNumber, department)
        await registerUser(
          username.trim(),
          email.trim(),
          password,
          registrationNumber.trim(),
          department.trim()
        );
        // redirect to sign-in so they can login
        navigate(`/login?next=${encodeURIComponent(next)}&registered=1&username=${encodeURIComponent(username.trim())}`, { replace: true });
      } else {
        // Lecturer: map fields to the same helper (if backend expects another payload you must update registerUser)
        // We pass lecturerName as username, lecturerEmail as email, lecturerPassword as password
        // registrationNumber is left blank and department set to lecturerDept
        await registerUser(
          lecturerName.trim(),
          lecturerEmail.trim(),
          lecturerPassword,
          '',
          lecturerDept.trim()
        );
        // after creating lecturer account, send them to sign-in and prefill lecturerEmail
        navigate(`/login?next=${encodeURIComponent('/lecturer-dashboard')}&registered=1&username=${encodeURIComponent(lecturerEmail.trim())}`, { replace: true });
      }
    } catch (err) {
      console.error('Registration Error:', err);
      const serverData = err?.response?.data;
      if (serverData) {
        setErrors(prev => ({ ...prev, form: parseServerErrors(serverData) }));
      } else {
        setErrors(prev => ({ ...prev, form: err?.message || 'Unexpected error. Please try again.' }));
      }
    } finally {
      setIsLoading(false);
    }
  };

  const chooseRole = (r) => {
    setRole(r);
    setRoleChoiceOpen(false);
    // clear errors and fields relevant to other role
    setErrors({
      username: '', email: '', password: '', registrationNumber: '', department: '',
      lecturerName: '', lecturerDept: '', lecturerPhone: '', lecturerEmail: '', lecturerPassword: '',
      form: ''
    });
    setEmailVerifyMsg('');
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-50 px-4">
      {/* Role modal */}
      {roleChoiceOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="absolute inset-0 bg-black/60" />
          <div className="relative w-full max-w-2xl mx-4 rounded-xl bg-white p-6 shadow-xl">
            <h3 className="text-xl font-semibold mb-3">Create account as</h3>
            <p className="text-sm text-gray-600 mb-6">Choose whether you're registering as a Student or a Lecturer.</p>
            <div className="flex gap-4">
              <button onClick={() => chooseRole('student')} className="flex-1 rounded-lg border border-gray-200 p-6 hover:shadow-md">
                <h4 className="font-semibold text-lg">Student</h4>
                <p className="text-sm text-gray-500 mt-2">Take tests, view results and review answers.</p>
              </button>
              <button onClick={() => chooseRole('lecturer')} className="flex-1 rounded-lg border border-gray-200 p-6 hover:shadow-md">
                <h4 className="font-semibold text-lg">Lecturer</h4>
                <p className="text-sm text-gray-500 mt-2">Create special courses, add questions, export results.</p>
              </button>
            </div>
            <div className="mt-4">
              <button onClick={() => { setRoleChoiceOpen(false); setRole('student'); }} className="text-sm text-gray-500 underline">Prefer later — continue as Student</button>
            </div>
          </div>
        </div>
      )}

      <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-xl border border-gray-100 transition-all duration-300 hover:shadow-2xl">
        <div className="mb-8 flex justify-center">
          <div className="bg-gradient-to-r from-blue-500 to-indigo-600 p-1 rounded-full shadow-lg">
            <img src={image} alt="Petrox logo" className="h-20 w-20 rounded-full object-contain bg-white p-1" />
          </div>
        </div>

        <h2 className="mb-2 text-center text-3xl font-bold">Create Your Account</h2>
        <p className="text-center text-sm text-gray-500 mb-4">{role === 'lecturer' ? 'Lecturer registration' : 'Student registration'}</p>

        {errors.form && (
          <div className="mb-4 rounded-lg bg-red-50 p-3 text-red-700 border border-red-200">
            {errors.form}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4" noValidate>
          {role === 'student' && (
            <>
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">Username</label>
                <input value={username} onChange={(e) => { setUsername(e.target.value); if (errors.username) setErrors(prev => ({ ...prev, username: '' })); }} placeholder="Choose a username" className="mt-1 block w-full rounded-lg border px-4 py-2 text-sm" />
                {errors.username && <p className="mt-1 text-xs text-red-600">{errors.username}</p>}
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">Email</label>
                <input value={email} onChange={(e) => { setEmail(e.target.value); if (errors.email) setErrors(prev => ({ ...prev, email: '' })); setEmailVerifyMsg(''); }} onBlur={() => handleEmailBlur(email, 'student')} placeholder="your.email@example.com" className="mt-1 block w-full rounded-lg border px-4 py-2 text-sm" />
                <div className="mt-1 text-xs text-gray-500">{errors.email ? <span className="text-red-600">{errors.email}</span> : emailVerifyMsg || 'We only validate format here.'}</div>
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">Password</label>
                <div className="relative">
                  <input type={showPassword ? 'text' : 'password'} value={password} onChange={(e) => { setPassword(e.target.value); if (errors.password) setErrors(prev => ({ ...prev, password: '' })); }} placeholder="At least 8 characters" className="mt-1 block w-full rounded-lg border px-4 py-2 text-sm" />
                  <button type="button" onClick={() => setShowPassword(s => !s)} className="absolute right-3 top-3 text-sm text-gray-600">{showPassword ? 'Hide' : 'Show'}</button>
                </div>

                <div className="mt-2">
                  <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
                    <div className={`h-2 ${strengthLabel.color}`} style={{ width: `${strengthLabel.pct}%` }} />
                  </div>
                  <div className="flex justify-between items-center mt-2">
                    <p className="text-xs font-medium text-gray-700">{strengthLabel.label}</p>
                    <p className="text-xs text-gray-500">{passwordScore}/5</p>
                  </div>

                  <ul className="mt-2 grid grid-cols-1 gap-1 text-xs">
                    <li className={`${passwordCriteria.length ? 'text-green-700' : 'text-gray-500'}`}> {passwordCriteria.length ? '✓' : '○'} At least 8 characters</li>
                    <li className={`${passwordCriteria.upper ? 'text-green-700' : 'text-gray-500'}`}> {passwordCriteria.upper ? '✓' : '○'} At least one uppercase letter</li>
                    <li className={`${passwordCriteria.lower ? 'text-green-700' : 'text-gray-500'}`}> {passwordCriteria.lower ? '✓' : '○'} At least one lowercase letter</li>
                    <li className={`${passwordCriteria.number ? 'text-green-700' : 'text-gray-500'}`}> {passwordCriteria.number ? '✓' : '○'} At least one number</li>
                    <li className={`${passwordCriteria.special ? 'text-green-700' : 'text-gray-500'}`}> {passwordCriteria.special ? '✓' : '○'} At least one symbol</li>
                  </ul>
                  {errors.password && <p className="mt-2 text-xs text-red-600">{errors.password}</p>}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Registration Number (optional)</label>
                  <input value={registrationNumber} onChange={(e) => { setRegistrationNumber(e.target.value); if (errors.registrationNumber) setErrors(prev => ({ ...prev, registrationNumber: '' })); }} placeholder="e.g., 001/2024/001" className="mt-1 block w-full rounded-lg border px-4 py-2 text-sm" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Department (optional)</label>
                  <input value={department} onChange={(e) => { setDepartment(e.target.value); if (errors.department) setErrors(prev => ({ ...prev, department: '' })); }} placeholder="e.g., Computer Science" className="mt-1 block w-full rounded-lg border px-4 py-2 text-sm" />
                </div>
              </div>
            </>
          )}

          {role === 'lecturer' && (
            <>
              <div>
                <label className="block text-sm font-medium text-gray-700">Full name</label>
                <input value={lecturerName} onChange={(e) => { setLecturerName(e.target.value); if (errors.lecturerName) setErrors(prev => ({ ...prev, lecturerName: '' })); }} className="mt-1 block w-full rounded-lg border px-4 py-2 text-sm" />
                {errors.lecturerName && <p className="mt-1 text-xs text-red-600">{errors.lecturerName}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Department</label>
                <input value={lecturerDept} onChange={(e) => { setLecturerDept(e.target.value); if (errors.lecturerDept) setErrors(prev => ({ ...prev, lecturerDept: '' })); }} className="mt-1 block w-full rounded-lg border px-4 py-2 text-sm" />
                {errors.lecturerDept && <p className="mt-1 text-xs text-red-600">{errors.lecturerDept}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Phone number</label>
                <input value={lecturerPhone} onChange={(e) => { setLecturerPhone(e.target.value); if (errors.lecturerPhone) setErrors(prev => ({ ...prev, lecturerPhone: '' })); }} className="mt-1 block w-full rounded-lg border px-4 py-2 text-sm" />
                {errors.lecturerPhone && <p className="mt-1 text-xs text-red-600">{errors.lecturerPhone}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Email</label>
                <input value={lecturerEmail} onChange={(e) => { setLecturerEmail(e.target.value); if (errors.lecturerEmail) setErrors(prev => ({ ...prev, lecturerEmail: '' })); setEmailVerifyMsg(''); }} onBlur={() => handleEmailBlur(lecturerEmail, 'lecturer')} className="mt-1 block w-full rounded-lg border px-4 py-2 text-sm" />
                <div className="mt-1 text-xs text-gray-500">{errors.lecturerEmail ? <span className="text-red-600">{errors.lecturerEmail}</span> : emailVerifyMsg || 'We only validate format here.'}</div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Password</label>
                <div className="relative">
                  <input type={showPassword ? 'text' : 'password'} value={lecturerPassword} onChange={(e) => { setLecturerPassword(e.target.value); if (errors.lecturerPassword) setErrors(prev => ({ ...prev, lecturerPassword: '' })); }} className="mt-1 block w-full rounded-lg border px-4 py-2 text-sm" />
                  <button type="button" onClick={() => setShowPassword(s => !s)} className="absolute right-3 top-3 text-sm text-gray-600">{showPassword ? 'Hide' : 'Show'}</button>
                </div>

                <div className="mt-2">
                  <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
                    <div className={`h-2 ${strengthLabel.color}`} style={{ width: `${strengthLabel.pct}%` }} />
                  </div>
                  <div className="flex justify-between items-center mt-2">
                    <p className="text-xs font-medium text-gray-700">{strengthLabel.label}</p>
                    <p className="text-xs text-gray-500">{passwordScore}/5</p>
                  </div>
                  <ul className="mt-2 grid grid-cols-1 gap-1 text-xs">
                    <li className={`${passwordCriteria.length ? 'text-green-700' : 'text-gray-500'}`}> {passwordCriteria.length ? '✓' : '○'} At least 8 characters</li>
                    <li className={`${passwordCriteria.upper ? 'text-green-700' : 'text-gray-500'}`}> {passwordCriteria.upper ? '✓' : '○'} At least one uppercase</li>
                    <li className={`${passwordCriteria.lower ? 'text-green-700' : 'text-gray-500'}`}> {passwordCriteria.lower ? '✓' : '○'} At least one lowercase</li>
                    <li className={`${passwordCriteria.number ? 'text-green-700' : 'text-gray-500'}`}> {passwordCriteria.number ? '✓' : '○'} At least one number</li>
                    <li className={`${passwordCriteria.special ? 'text-green-700' : 'text-gray-500'}`}> {passwordCriteria.special ? '✓' : '○'} At least one symbol</li>
                  </ul>
                  {errors.lecturerPassword && <p className="mt-2 text-xs text-red-600">{errors.lecturerPassword}</p>}
                </div>
              </div>
            </>
          )}

          <div>
            <Button type="submit" disabled={isLoading} className="w-full">
              {isLoading ? 'Creating account...' : `Sign up as ${role === 'lecturer' ? 'Lecturer' : 'Student'}`}
            </Button>
          </div>
        </form>

        <p className="mt-6 text-center text-sm text-gray-600">
          Already have an account?{' '}
          <Link to={`/login?next=${encodeURIComponent(next)}`} className="font-medium text-blue-600 hover:text-indigo-700">Sign In</Link>
        </p>
      </div>
    </div>
  );
}
