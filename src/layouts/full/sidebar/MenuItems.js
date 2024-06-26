import {
  IconAperture,
  IconCopy,
  IconLayoutDashboard,
  IconLogin,
  IconMoodHappy,
  IconTypography,
  IconUserPlus,
} from '@tabler/icons';

import { uniqueId } from 'lodash';

const Menuitems = [
  {
    navlabel: true,
    subheader: 'Home',
  },

  {
    id: uniqueId(),
    title: 'Homeslider',
    icon: IconAperture,
    href: '/homeslider',
  },

  {
    id: uniqueId(),
    title: 'HomeCards',
    icon: IconAperture,
    href: '/HomeCards',
  },
  {
    id: uniqueId(),
    title: 'Quotes Form',
    icon: IconAperture,
    href: '/quotes',
  },
  // {
  //   id: uniqueId(),
  //   title: 'Testimonials',
  //   icon: IconAperture,
  //   href: '/testimonials',
  // },
  {
    id: uniqueId(),
    title: 'Valuable Clients',
    icon: IconAperture,
    href: '/clients',
  },

  {
    navlabel: true,
    subheader: 'Career',
  },
  {
    id: uniqueId(),
    title: 'ApplyNow Form',
    icon: IconAperture,
    href: '/applynow',
  },
  {
    id: uniqueId(),
    title: 'life Category',
    icon: IconAperture,
    href: '/life-category',
  },
  {
    id: uniqueId(),
    title: 'life Category Details',
    icon: IconAperture,
    href: '/life-category-details',
  },
  {
    id: uniqueId(),
    title: 'Job Opening',
    icon: IconAperture,
    href: '/job-opening',
  },
  {
    id: uniqueId(),
    title: 'Internship Opening',
    icon: IconAperture,
    href: '/internship-opening',
  },
  {
    id: uniqueId(),
    title: 'HomeTechnologies',
    icon: IconAperture,
    href: '/homeTechnologies',
  },
  {
    id: uniqueId(),
    title: 'WhySumago',
    icon: IconAperture,
    href: '/WhySumago',
  },
  {
    navlabel: true,
    subheader: 'Contact',
  },
  {
    id: uniqueId(),
    title: 'Header Contact',
    icon: IconAperture,
    href: '/headerDetails',
  },
  {
    id: uniqueId(),
    title: 'Office Location',
    icon: IconAperture,
    href: '/office-location',
  },
  {
    id: uniqueId(),
    title: 'Contact Form',
    icon: IconAperture,
    href: '/contactform',
  },
  {
    navlabel: true,
    subheader: 'about-us',
  },
  {
    id: uniqueId(),
    title: 'Mission',
    icon: IconAperture,
    href: '/mission',
  },
  {
    id: uniqueId(),
    title: 'BlogDetail',
    icon: IconAperture,
    href: '/blogDetail',
  },
  {
    id: uniqueId(),
    title: 'Vission',
    icon: IconAperture,
    href: '/vission',
  },
  {
    id: uniqueId(),
    title: 'Team Member',
    icon: IconAperture,
    href: '/team-member',
  },
  {
    id: uniqueId(),
    title: 'CultureCategories',
    icon: IconAperture,
    href: '/companyCultureCategories',
  },
  {
    id: uniqueId(),
    title: 'CompanyCulture',
    icon: IconAperture,
    href: '/companyCulture',
  },
  {
    id: uniqueId(),
    title: 'Appreciations',
    icon: IconAperture,
    href: '/Appreciations',
  },
  {
    navlabel: true,
    subheader: 'Our-Solutions',
  },
  {
    id: uniqueId(),
    title: 'Brocherdetail',
    icon: IconAperture,
    href: '/brocherdetail',
  }
  // {
  //   id: uniqueId(),
  //   title: 'Register',
  //   icon: IconUserPlus,
  //   href: '/auth/register',
  // },
  // {
  //   navlabel: true,
  //   subheader: 'Home',
  // },

  // {
  //   id: uniqueId(),
  //   title: 'Dashboard',
  //   icon: IconLayoutDashboard,
  //   href: '/dashboard',
  // },
  // {
  //   navlabel: true,
  //   subheader: 'Utilities',
  // },
  // {
  //   id: uniqueId(),
  //   title: 'Typography',
  //   icon: IconTypography,
  //   href: '/ui/typography',
  // },
  // {
  //   id: uniqueId(),
  //   title: 'Shadow',
  //   icon: IconCopy,
  //   href: '/ui/shadow',
  // },
  // {
  //   id: uniqueId(),
  //   title: 'Icons',
  //   icon: IconMoodHappy,
  //   href: '/icons',
  // },
];

export default Menuitems;
