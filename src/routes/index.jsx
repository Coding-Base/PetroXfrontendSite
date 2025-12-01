// routes/index.jsx
import NotFound from '../pages/NotFound';
import { Suspense, lazy, useEffect } from 'react';
import { Navigate, Outlet, useRoutes, useLocation } from 'react-router-dom';
import { logPageView } from '../utils/analytics'; // Import logPageView

const NewDashboardLayout = lazy(() => import('../Layouts/dashboardlayout'));
const SignIn = lazy(() => import('../pages/SignIn'));
const Settings = lazy(() => import('../pages/Settings'));
const SignUp = lazy(() => import('../pages/Signup'));
const DashboardPage = lazy(() => import('../Layouts/dashboard'));
const Chat = lazy(() => import('../pages/chat'));
const CreateGroupTest = lazy(() => import('../pages/CreateGroupTest'));
const GroupTestPage = lazy(() => import('../pages/GroupTestPage'));
const CampusNavigator = lazy(() => import('../pages/CampusCompass'));
const MyTest = lazy(() => import('../pages/MyTests'));
const Test = lazy(() => import('../pages/Test'));
const GroupTest = lazy(() => import('../pages/GroupTestPage'));
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
// New lazy import for EnrollCourse page
const EnrollCoursePage = lazy(() => import('../features/courses/EnrollCoursePage'));

// ----------------------------------------------------------------------

// Create a component to track page views
function TrackPageViews() {
  const location = useLocation();

  useEffect(() => {
    logPageView();
  }, [location]);

  return null; // This component doesn't render anything
}

export default function AppRouter() {
  const dashboardRoutes = [
    {
      path: '/dashboard',
      element: (
        <NewDashboardLayout>
          <Suspense>
            <TrackPageViews /> {/* Add tracker here */}
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
        // ENROLL COURSE route (dashboard nested)
        {
          path: 'enroll-course',
          element: (<><EnrollCoursePage /> <TrackPageViews /></>)
        }
      ]
    }
  ];

  const publicRoutes = [
    {
      path: '/',
      element: (
        <>
          <TrackPageViews /> {/* Add tracker here too */}
          <LandingPage />
        </>
      ),
      index: true
    },
     {
      path: '/about',
      element: (
        <>
          <TrackPageViews /> {/* Add tracker here too */}
          <AboutPage />
        </>
      ),
      index: true
    },
     {
      path: '/policies',
      element: (
        <>
          <TrackPageViews /> {/* Add tracker here too */}
          <PoliciesPage />
        </>
      ),
      index: true
    },
    {
      path: '/login',
      element: (
        <>
          <TrackPageViews /> {/* Add tracker here */}
          <SignIn />
        </>
      ),
      index: true
    },
    {
      path: '/signup',
      element: (
        <>
          <TrackPageViews /> {/* Add tracker here */}
          <SignUp />
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
    {
      path: '/group-test/:testId',
      element: (
        <>
          <TrackPageViews /> {/* Add tracker here */}
          <GroupTestPage />
        </>
      )
    },
    // Also expose /enroll-course at top-level so older navigation links continue to work
    {
      path: '/enroll-course',
      element: (
        <>
          <TrackPageViews />
          <EnrollCoursePage />
        </>
      )
    }
  ];

  const routes = useRoutes([...dashboardRoutes, ...publicRoutes]);

  return routes;
}
