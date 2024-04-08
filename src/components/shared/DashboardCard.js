// import React from 'react';
// import { Card, CardContent, Typography, Stack, Box } from '@mui/material';

// const DashboardCard = ({
//   title,
//   subtitle,
//   children,
//   action,
//   footer,
//   cardheading,
//   headtitle,
//   headsubtitle,
//   middlecontent,
// }) => {
//   return (
//     <Card sx={{ padding: 0 }} elevation={9} variant={undefined}>
//       {cardheading ? (
//         <CardContent>
//           <Typography variant="h5">{headtitle}</Typography>
//           <Typography variant="subtitle2" color="textSecondary">
//             {headsubtitle}
//           </Typography>
//         </CardContent>
//       ) : (
//         <CardContent sx={{ p: '30px' }}>
//           {title ? (
//             <Stack
//               direction="row"
//               spacing={2}
//               justifyContent="space-between"
//               alignItems={'center'}
//               mb={3}
//             >
//               <Box>
//                 {title ? <Typography variant="h5">{title}</Typography> : ''}

//                 {subtitle ? (
//                   <Typography variant="subtitle2" color="textSecondary">
//                     {subtitle}
//                   </Typography>
//                 ) : (
//                   ''
//                 )}
//               </Box>
//               {action}
//             </Stack>
//           ) : null}

//           {children}
//         </CardContent>
//       )}

//       {middlecontent}
//       {footer}
//     </Card>
//   );
// };

// export default DashboardCard;

import React from 'react';
import { Card, CardContent, Typography, Stack, Button } from '@mui/material';

const DashboardCard = ({
  title,
  subtitle,
  children,
  action,
  footer,
  cardheading,
  headtitle,
  headsubtitle,
  middlecontent,
  buttonName,
  onClick,
}) => {
  return (
    <Card sx={{ padding: 0 }} elevation={9} variant={undefined}>
      {cardheading ? (
        <CardContent>
          <Stack direction="row" justifyContent="space-between">
            <Typography variant="h5">{headtitle}</Typography>
            <Button variant="outlined" color="success">
              Submit
            </Button>
          </Stack>
        </CardContent>
      ) : (
        <CardContent sx={{ p: '30px' }}>
          {title ? (
            <Stack
              direction="row"
              spacing={2}
              justifyContent="space-between"
              alignItems={'center'}
              mb={3}
            >
              <Typography variant="h5">{title}</Typography>
              {buttonName && (
                <Button variant="outlined" onClick={onClick} color="primary">
                  {buttonName}
                </Button>
              )}
              {action}
            </Stack>
          ) : null}
          {children}
        </CardContent>
      )}

      {middlecontent}
      {footer}
    </Card>
  );
};

export default DashboardCard;
