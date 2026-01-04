import NotFound from '../pages/NotFound';
import { Suspense, lazy, useEffect } from 'react';
import { Navigate, Outlet, useRoutes, useLocation } from 'react-router-dom';
import { logPageView } from '../utils/analytics'; 

const NewDashboardLayout = lazy(() => import('../Layouts/dashboardlayout'));
const SignIn = lazy(() => import('../pages/SignIn'));
const Settings = lazy(() => import('../pages/Settings'));
const SignUp = lazy(() => import('../pages/Signup'));
const SignUpRoleSelection = lazy(() => import('../pages/SignUpRoleSelection'));
const StudentSignUp = lazy(() => import('../pages/StudentSignup'));
const LecturerSignUp = lazy(() => import('../pages/LecturerSignup'));
const LecturerDashboard = lazy(() => import('../pages/LecturerDashboard'));
const DashboardPage = lazy(() => import('../Layouts/dashboard'));
const Chat = lazy(() => import('../pages/chat'));
const CreateGroupTest = lazy(() => import('../pages/CreateGroupTest'));
const GroupTestPage = lazy(() => import('../pages/GroupTestPage'));
const CampusNavigator = lazy(() => import('../pages/CampusCompass'));
const MyTest = lazy(() => import('../pages/MyTests'));
const Test = lazy(() => import('../pages/Test'));
const PastQuestions = lazy(() => import('../pages/PastQuestions'));
const LandingPage = lazy(() => import('../pages/LandingPage'));
const PetroMarkAI = lazy(() => import('../pages/Petromark'));
const MaterialsManagement = lazy(() => import('../pages/MaterialsManagement'));
const Tools = lazy(() => import('../Layouts/ToolPage'));
const NotFounds = lazy(() => import('../pages/NotFound'));
const AboutPage = lazy(() => import('../pages/AboutPage'));
const PoliciesPage = lazy(() => import('../pages/PoliciesPage'));
const LearningSystem = lazy(() => import('../components/lesson/LessonPath'))
const Updates = lazy(() => import('../pages/UpdatesTab'))

// Special Courses Imports
const EnrollCoursePage = lazy(() => import('../pages/EnrollCoursePage'));
const EnrolledCoursesPage = lazy(() => import('../pages/EnrolledCoursesPage'));
const CourseWaitingPage = lazy(() => import('../pages/CourseWaitingPage'));
const TestInstructionsPage = lazy(() => import('../pages/TestInstructionsPage'));
const TestInterfacePage = lazy(() => import('../pages/TestInterfacePage'));
const TestSubmissionSuccessPage = lazy(() => import('../pages/TestSubmissionSuccessPage'));
const TestCompletionPage = lazy(() => import('../pages/TestCompletionPage'));

// ----------------------------------------------------------------------

function TrackPageViews() {
  const location = useLocation();

  useEffect(() => {
    logPageView();
  }, [location]);

  return null; 
}

export default function AppRouter() {
  const dashboardRoutes = [
    {
      path: '/dashboard',
      element: (
        <NewDashboardLayout>
          <Suspense fallback={<div className="h-full flex items-center justify-center">Loading...</div>}>
            <TrackPageViews /> 
            <Outlet />
          </Suspense>
        </NewDashboardLayout>
      ),
      children: [
        {
          element: <DashboardPage />,
          index: true
        },
         {
          path: 'updates',
          element: (<> <Updates /><TrackPageViews /></>)
         },
        {
          path: 'group-test/:testId',
          element: (<><GroupTestPage />  <TrackPageViews /></>)
        },
         {
          path: 'learning-system',
          element: (<> <LearningSystem /><TrackPageViews /></>) 
         },
        {
          path: 'past-questions',
          element: (<> <PastQuestions /><TrackPageViews /></>)
        },
        {
          path: 'my-tests',
          element: (<> <MyTest /> <TrackPageViews /></>) 
        },
        {
          path: 'tests',
          element: <Test />
        },
        {
          path: 'materials-management',
          element: (<><MaterialsManagement /> <TrackPageViews /></>) 
        },
        {
          path: 'create-group-test',
          element:(<><CreateGroupTest /> <TrackPageViews /></>) 
        },
        {
          path: 'petromark-ai',
          element: <PetroMarkAI />
        },
        {
          path: 'tools',
          element: (<><Tools/> <TrackPageViews/> </>),
        },
        {
          path: 'chat',
          element: <Chat />
        },
        {
          path: "campus-navigator",
          element: (<><CampusNavigator /> <TrackPageViews /></>),
          
        },
        {
          path: 'settings',
          element: <Settings />
        },
        // --- SPECIAL COURSES ROUTES ---
        {
          path: 'enroll-course',
          element: (<><EnrollCoursePage /> <TrackPageViews /></>)
        },
        {
          path: 'enrolled-courses',
          element: (<><EnrolledCoursesPage /> <TrackPageViews /></>)
        },
        {
          path: 'course/:enrollmentId/waiting',
          element: (<><CourseWaitingPage /> <TrackPageViews /></>)
        },
        {
          path: 'course/:enrollmentId/instructions',
          element: (<><TestInstructionsPage /> <TrackPageViews /></>)
        },
        {
          // FIX: Changed 'take-test' to 'test' to match CourseWaitingPage navigation
          path: 'course/:enrollmentId/test', 
          element: (<><TestInterfacePage /> <TrackPageViews /></>)
        },
        {
          path: 'course/:enrollmentId/submitted',
          element: (<><TestSubmissionSuccessPage /> <TrackPageViews /></>)
        },
        {
          path: 'course/:enrollmentId/completed',
          element: (<><TestCompletionPage /> <TrackPageViews /></>)
        }
      ]
    }
  ];

  const publicRoutes = [
    {
      path: '/',
      element: (
        <>
          <TrackPageViews />
          <LandingPage />
        </>
      ),
      index: true
    },
     {
      path: '/about',
      element: (
        <>
          <TrackPageViews />
          <AboutPage />
        </>
      ),
      index: true
    },
     {
      path: '/policies',
      element: (
        <>
          <TrackPageViews />
          <PoliciesPage />
        </>
      ),
      index: true
    },
    {
      path: '/login',
      element: (
        <>
          <TrackPageViews />
          <SignIn />
        </>
      ),
      index: true
    },
    {
      path: '/signup',
      element: (
        <>
          <TrackPageViews />
          <SignUpRoleSelection />
        </>
      ),
      index: true
    },
    {
      path: '/signup-student',
      element: (
        <>
          <TrackPageViews />
          <StudentSignUp />
        </>
      ),
      index: true
    },
    {
      path: '/signup-lecturer',
      element: (
        <>
          <TrackPageViews />
          <LecturerSignUp />
        </>
      ),
      index: true
    },
    {
      path: '/lecturer-dashboard',
      element: (
        <>
          <TrackPageViews />
          <LecturerDashboard />
        </>
      ),
      index: true
    },
    {
      path: '/404',
      element: <NotFounds />
    },
    {
      path: '*',
      element: <Navigate to="/404" replace />
    },
    // Redundant group-test route (already in dashboard), but kept for backward compat if needed
    {
      path: '/group-test/:testId',
      element: (
        <>
          <TrackPageViews /> 
          <GroupTestPage />
        </>
      )
    }
  ];

  const routes = useRoutes([...dashboardRoutes, ...publicRoutes]);

  return routes;
}
