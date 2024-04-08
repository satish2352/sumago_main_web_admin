import React, { lazy } from 'react';
import { Navigate } from 'react-router-dom';
import Loadable from '../layouts/full/shared/loadable/Loadable';
import Life_category from 'src/views/life/Life';
import LifeCategoryDetails from 'src/views/life/LifeCategoryDetails';
import JobOpening from 'src/views/job-opening/JobOpening';
import InternshipOpening from 'src/views/Internship-opening/InternshipOpening';
import OfficeLocation from 'src/views/office-location/OfficeLocation';
import ContactForm from 'src/views/contactform/ContactForm';
import ApplyNowForm from 'src/views/apply-now/ApplyNowForm';
import QuotesForm from 'src/views/Quotes-Form/QuotesForm';

/* ***Layouts**** */
const FullLayout = Loadable(lazy(() => import('../layouts/full/FullLayout')));
const BlankLayout = Loadable(lazy(() => import('../layouts/blank/BlankLayout')));

/* ****Pages***** */
const Dashboard = Loadable(lazy(() => import('../views/dashboard/Dashboard')));
const ValuableClients = Loadable(lazy(() => import('../views/valuable-clients/ValuableClients')));
const Testimonials = Loadable(lazy(() => import('../views/testimonials/Testimonials')));
// import ValuableClients from 'src/views/valuable-clients/ValuableClients';
// import Testimonials from '../views/sample-page/Testimonials';
const Icons = Loadable(lazy(() => import('../views/icons/Icons')));
const TypographyPage = Loadable(lazy(() => import('../views/utilities/TypographyPage')));
const Shadow = Loadable(lazy(() => import('../views/utilities/Shadow')));
const Error = Loadable(lazy(() => import('../views/authentication/Error')));
const Register = Loadable(lazy(() => import('../views/authentication/Register')));
const Login = Loadable(lazy(() => import('../views/authentication/Login')));

const Router = [
  {
    path: '/',
    element: <FullLayout />,
    children: [
      { path: '/', element: <Navigate to="/dashboard" /> },
      { path: '/dashboard', exact: true, element: <Dashboard /> },
      { path: '/testimonials', exact: true, element: <Testimonials /> },
      { path: '/clients', exact: true, element: <ValuableClients /> },
      { path: '/life-category', exact: true, element: <Life_category /> },
      { path: '/life-category-details', exact: true, element: <LifeCategoryDetails /> },
      { path: '/job-opening', exact: true, element: <JobOpening /> },
      { path: '/internship-opening', exact: true, element: <InternshipOpening /> },
      { path: '/office-location', exact: true, element: <OfficeLocation /> },
      { path: '/contactform', exact: true, element: <ContactForm /> },
      { path: '/applynow', exact: true, element: <ApplyNowForm /> },
      { path: '/quotes', exact: true, element: <QuotesForm /> },
      { path: '/icons', exact: true, element: <Icons /> },
      { path: '/ui/typography', exact: true, element: <TypographyPage /> },
      { path: '/ui/shadow', exact: true, element: <Shadow /> },
      { path: '*', element: <Navigate to="/auth/404" /> },
    ],
  },
  {
    path: '/auth',
    element: <BlankLayout />,
    children: [
      { path: '404', element: <Error /> },
      { path: '/auth/register', element: <Register /> },
      { path: '/auth/login', element: <Login /> },
      { path: '*', element: <Navigate to="/auth/404" /> },
    ],
  },
];

export default Router;
