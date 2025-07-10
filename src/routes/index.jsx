import NotFound from '../pages/NotFound';
import { Suspense, lazy } from 'react';
import { Navigate, Outlet, useRoutes } from 'react-router-dom';
import PrivateRoute from '../Layouts/PrivateRoute';

const NewDashboardLayout = lazy(() => import('../Layouts/dashboardlayout'));
const SignIn = lazy(() => import('../pages/SignIn'));
const Settings = lazy(() => import('../pages/Settings'));
const SignUp = lazy(() => import('../pages/Signup'));
const DashboardPage = lazy(() => import('../Layouts/dashboard'));
const Chat = lazy(() => import('../pages/chat'));
const CreateGroupTest = lazy(() => import('../pages/CreateGroupTest'));
const GroupTestPage = lazy(() => import('../pages/GroupTestPage'));
const MyTests = lazy(() => import('../pages/MyTests'));
const Test = lazy(() => import('../pages/Test'));
const PastQuestions = lazy(() => import('../pages/PastQuestions'));
const LandingPage = lazy(() => import('../pages/LandingPage'));
const PetroMarkAI = lazy(() => import('../pages/Petromark'));
const MaterialsManagement = lazy(() => import('../pages/MaterialsManagement'));
const Tools = lazy(() => import('../Layouts/ToolPage'));
const NotFounds = lazy(() => import('../pages/NotFound'));
// ----------------------------------------------------------------------

export default function AppRouter() {
  const routes = useRoutes([
    // Public routes that don't need authentication
    {
      path: '/',
      element: <LandingPage />,
    },
    {
      path: '/login',
      element: <SignIn />,
    },
    {
      path: '/signup',
      element: <SignUp />,
    },
    {
      path: '/404',
      element: <NotFounds />
    },
    // Protected routes
    {
      element: <PrivateRoute />, // This component wraps all protected routes
      children: [
        {
          path: 'dashboard',
          element: (
            <NewDashboardLayout>
              <Suspense>
                <Outlet />
              </Suspense>
            </NewDashboardLayout>
          ),
          children: [
            { element: <DashboardPage />, index: true },
            { path: 'past-questions', element: <PastQuestions /> },
            { path: 'my-tests', element: <MyTests /> },
            { path: 'materials-management', element: <MaterialsManagement /> },
            { path: 'create-group-test', element: <CreateGroupTest /> },
            { path: 'petromark-ai', element: <PetroMarkAI /> },
            { path: 'tools', element: <Tools /> },
            { path: 'chat', element: <Chat /> },
            { path: 'settings', element: <Settings /> },
          ],
        },
        // Standalone protected routes (without the main dashboard layout)
        {
          path: 'test/:testId',
          element: <Test />,
        },
        {
          path: 'group-test/:testId',
          element: <GroupTestPage />,
        },
      ],
    },
    // Catch-all for not found routes
    {
      path: '*',
      element: <Navigate to="/404" replace />
    },
  ]);

  return routes;
}
