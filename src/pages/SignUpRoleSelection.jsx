import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import image from "../images/finallogo.png";
import { Button } from '../components/ui/button';

// --- Professional Icons (Inline SVGs) ---
const Icons = {
  Student: () => (
    <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path d="M12 14l9-5-9-5-9 5 9 5z" />
      <path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222" />
    </svg>
  ),
  Lecturer: () => (
    <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 13v-1m4 1v-3m4 3V8M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z" />
    </svg>
  ),
  Check: () => (
    <svg className="w-5 h-5 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
    </svg>
  )
};

export default function SignUpRoleSelection() {
  const navigate = useNavigate();
  const [hoveredRole, setHoveredRole] = useState(null);

  const handleRoleSelect = (role) => {
    if (role === 'student') {
      navigate('/signup-student');
    } else if (role === 'lecturer') {
      navigate('/signup-lecturer');
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50 px-4 py-12 relative overflow-hidden">
      
      {/* Abstract Background Decoration */}
      <div className="absolute top-0 left-0 w-full h-64 bg-gradient-to-b from-blue-100/50 to-transparent pointer-events-none" />
      <div className="absolute -top-20 -right-20 w-96 h-96 bg-indigo-100 rounded-full blur-3xl opacity-50 pointer-events-none" />
      <div className="absolute top-40 -left-20 w-72 h-72 bg-blue-100 rounded-full blur-3xl opacity-50 pointer-events-none" />

      {/* Header Content */}
      <div className="relative z-10 flex flex-col items-center mb-12">
        <div className="bg-white p-3 rounded-2xl shadow-sm mb-6">
            <img src={image} alt="PetroX Logo" className="h-12 w-auto" />
        </div>
        <h1 className="text-3xl md:text-4xl font-bold text-slate-900 text-center mb-3">
          Welcome to PetroX
        </h1>
        <p className="text-slate-600 text-center max-w-md text-lg">
          Choose how you want to use the platform to get started with your personalized experience.
        </p>
      </div>

      {/* Role Selection Grid */}
      <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-4xl">
        
        {/* STUDENT CARD */}
        <div
          onMouseEnter={() => setHoveredRole('student')}
          onMouseLeave={() => setHoveredRole(null)}
          onClick={() => handleRoleSelect('student')}
          className={`group relative bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden cursor-pointer transition-all duration-300 hover:shadow-xl hover:-translate-y-1 hover:border-blue-300`}
        >
          <div className="h-2 bg-blue-500 w-full" /> {/* Top Accent Bar */}
          <div className="p-8">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center shadow-lg shadow-blue-500/30 group-hover:scale-110 transition-transform duration-300">
                <Icons.Student />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-slate-800">Student</h2>
                <p className="text-blue-600 text-sm font-medium">For Learners</p>
              </div>
            </div>
            
            <p className="text-slate-600 mb-6 leading-relaxed">
              Join exams, access course materials, track your grades, and improve your academic performance.
            </p>

            <div className="space-y-3 mb-8">
                {['Access course materials', 'Take special course tests', 'View grades & results', 'Track learning progress'].map((item, i) => (
                    <div key={i} className="flex items-center text-sm text-slate-500">
                        <span className="text-blue-500"><Icons.Check /></span>
                        {item}
                    </div>
                ))}
            </div>

            <Button className="w-full bg-slate-900 hover:bg-blue-600 text-white font-medium py-3 rounded-xl transition-all duration-300 group-hover:shadow-lg group-hover:shadow-blue-500/25">
              Join as Student &rarr;
            </Button>
          </div>
        </div>

        {/* LECTURER CARD */}
        <div
          onMouseEnter={() => setHoveredRole('lecturer')}
          onMouseLeave={() => setHoveredRole(null)}
          onClick={() => handleRoleSelect('lecturer')}
          className={`group relative bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden cursor-pointer transition-all duration-300 hover:shadow-xl hover:-translate-y-1 hover:border-purple-300`}
        >
          <div className="h-2 bg-purple-600 w-full" /> {/* Top Accent Bar */}
          <div className="p-8">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-purple-600 to-indigo-600 flex items-center justify-center shadow-lg shadow-purple-500/30 group-hover:scale-110 transition-transform duration-300">
                <Icons.Lecturer />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-slate-800">Lecturer</h2>
                <p className="text-purple-600 text-sm font-medium">For Instructors</p>
              </div>
            </div>
            
            <p className="text-slate-600 mb-6 leading-relaxed">
              Create and manage courses, set up examinations, and monitor student analytics efficiently.
            </p>

            <div className="space-y-3 mb-8">
                {['Create special courses', 'Design questions with images', 'View student analytics', 'Export results to Excel'].map((item, i) => (
                    <div key={i} className="flex items-center text-sm text-slate-500">
                        <span className="text-purple-500"><Icons.Check /></span>
                        {item}
                    </div>
                ))}
            </div>

            <Button className="w-full bg-slate-900 hover:bg-purple-600 text-white font-medium py-3 rounded-xl transition-all duration-300 group-hover:shadow-lg group-hover:shadow-purple-500/25">
              Join as Lecturer &rarr;
            </Button>
          </div>
        </div>

      </div>

      {/* Footer */}
      <div className="mt-12 relative z-10 text-center">
        <p className="text-slate-500">
          Already have an account?{' '}
          <a href="/login" className="text-slate-800 hover:text-blue-600 font-semibold transition-colors">
            Sign in here
          </a>
        </p>
      </div>
    </div>
  );
}
