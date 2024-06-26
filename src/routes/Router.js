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
import ProtectedRoutes from 'src/ProtectedRoutes';
import TeamMember from 'src/views/Team Member/TeamMember';
import Appreciations from 'src/views/Appreciations/Appreciations'
import CompanyCulture from 'src/views/Company Culture/CompanyCulture';
import Funatsumago from 'src/views/funatsumago/Funatsumago';
import Funcategory from 'src/views/funatsumago/Funcategory';
import CompanyCultureCategories from 'src/views/Company Culture/CompanyCultureCategories';
import Brocherdetail from 'src/views/Brocherdeatils/Brocherdetail';
import Homeslider from 'src/views/Homeslider/Homeslider';
import BlogDetail from 'src/views/BlogDetail/BlogDetail';
import Mission from 'src/views/Mission/Mission';
import Vission from 'src/views/vission/Vission';
import HomeTechnologies from 'src/views/HomeTechnologies/HomeTechnologies';
import WhySumago from 'src/views/WhySumago/WhySumago';
import HomeCards from 'src/views/HomeCards/HomeCards ';
import OfferedServices from 'src/views/OfferedServices/OfferedServices';
/* ***Layouts**** */
const FullLayout = Loadable(lazy(() => import('../layouts/full/FullLayout')));
const BlankLayout = Loadable(lazy(() => import('../layouts/blank/BlankLayout')));

/* ****Pages***** */
const Dashboard = Loadable(lazy(() => import('../views/dashboard/Dashboard')));
const ValuableClients = Loadable(lazy(() => import('../views/valuable-clients/ValuableClients')));
const HeaderContact = Loadable(lazy(() => import('../views/HeaderContact/HeaderContact')));
const Testimonials = Loadable(lazy(() => import('../views/testimonials/Testimonials')));
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
      { path: '/', element: <Navigate to="/auth/login" /> },
      // { path: '/dashboard', exact: true, element: <Dashboard /> },
      // { path: '/testimonials', exact: true, element: <ProtectedRoutes Component={Testimonials} /> },
      { path: '/clients', exact: true, element: <ProtectedRoutes Component={ValuableClients} /> },
      {
        path: '/life-category',
        exact: true,
        element: <ProtectedRoutes Component={Life_category} />,
      },
      {
        path: '/life-category-details',
        exact: true,
        element: <ProtectedRoutes Component={LifeCategoryDetails} />,
      },
      {
        path: '/OfferedServices',
        exact: true,
        element: <ProtectedRoutes Component={OfferedServices} />,
      },
      { path: '/job-opening', exact: true, element: <ProtectedRoutes Component={JobOpening} /> },
      {
        path: '/internship-opening',
        exact: true,
        element: <ProtectedRoutes Component={InternshipOpening} />,
      },
      {
        path: '/office-location',
        exact: true,
        element: <ProtectedRoutes Component={OfficeLocation} />,
      },
      {
        path: '/headerDetails',
        exact: true,
        element: <ProtectedRoutes Component={HeaderContact} />,
      },
      {
        path: '/brocherdetail',
        exact: true,
        element: <ProtectedRoutes Component={Brocherdetail} />,
      },
      {
        path: '/team-member',
        exact: true,
        element: <ProtectedRoutes Component={TeamMember} />,
      },
      {
        path: '/appreciations',
        exact: true,
        element: <ProtectedRoutes Component={Appreciations} />,
      },
      {
        path: '/CompanyCulture',
        exact: true,
        element: <ProtectedRoutes Component={CompanyCulture} />,
      },
      {
        path: '/companyCultureCategories',
        exact: true,
        element: <ProtectedRoutes Component={CompanyCultureCategories} />,
      },
      {
        path: '/homeslider',
        exact: true,
        element: <ProtectedRoutes Component={Homeslider} />,
      },
      {
        path: '/blogdeatils',
        exact: true,
        element: <ProtectedRoutes Component={BlogDetail} />,
      },
      {
        path: '/mission',
        exact: true,
        element: <ProtectedRoutes Component={Mission} />,
      },
      {
        path: '/vission',
        exact: true,
        element: <ProtectedRoutes Component={Vission} />,
      },
      {
        path: '/homeTechnologies',
        exact: true,
        element: <ProtectedRoutes Component={HomeTechnologies} />,
      },
      {
        path: '/HomeCards',
        exact: true,
        element: <ProtectedRoutes Component={HomeCards} />,
      },
      {
        path: '/blogDetail',
        exact: true,
        element: <ProtectedRoutes Component={BlogDetail} />,
      },
      {
        path: '/WhySumago',
        exact: true,
        element: <ProtectedRoutes Component={WhySumago} />,
      },

      { path: '/contactform', exact: true, element: <ProtectedRoutes Component={ContactForm} /> },
      { path: '/applynow', exact: true, element: <ProtectedRoutes Component={ApplyNowForm} /> },
      { path: '/quotes', exact: true, element: <ProtectedRoutes Component={QuotesForm} /> },
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
      { path: '404', element: <Error /> },
      { path: '/auth/register', element: <Register /> },
      { path: '/auth/login', element: <Login /> },
      // { path: '*', element: <Navigate to="/auth/404" /> },
    ],
  },
];

export default Router;
