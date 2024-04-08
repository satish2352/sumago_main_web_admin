import React, { useEffect, useState } from 'react';
import {
  Typography,
  TextField,
  Button,
  Grid,
  Input,
  FormControl,
  FormLabel,
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from '@mui/material';
import PageContainer from 'src/components/container/PageContainer';
import DashboardCard from '../../components/shared/DashboardCard';
import axios from 'axios';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

const ApplyNowForm = () => {
  const [data, setData] = useState([]);
  useEffect(() => {
    axios
      .get('applynow/find')
      .then((result) => {
        setData(result.data);
      })
      .catch((err) => {
        console.log('err', err);
      });
  }, []);

  const handleDelete = (applynow) => {
    console.log('applynow', applynow);
    axios
      .delete(`applynow/delete/${applynow}`)
      .then((response) => {
        console.log('applynow deleted successfully');
        alert('data deleted successfully ');
        axios
          .get('applynow/find')
          .then((result) => {
            setData(result.data);
          })
          .catch((err) => {
            console.log('err', err);
          });
      })
      .catch((error) => {
        console.error('Error deleting applynow:', error);
      });
  };

  return (
    <PageContainer title="ApplyNow Form" description="this is Sample page">
      <DashboardCard title="ApplyNow Form">
        <TableContainer component={Paper}>
          <div style={{ overflowX: 'auto' }}>
            <Table stickyHeader>
              <TableHead>
                <TableRow>
                  <TableCell style={{ fontWeight: 'bold', fontSize: '1rem' }}>
                    Application Type
                  </TableCell>
                  <TableCell style={{ fontWeight: 'bold', fontSize: '1rem' }}>Name</TableCell>
                  <TableCell style={{ fontWeight: 'bold', fontSize: '1rem' }}>Title</TableCell>
                  <TableCell style={{ fontWeight: 'bold', fontSize: '1rem' }}>Email</TableCell>
                  <TableCell style={{ fontWeight: 'bold', fontSize: '1rem' }}>
                    Confirm Email
                  </TableCell>
                  <TableCell style={{ fontWeight: 'bold', fontSize: '1rem' }}>Phone No.</TableCell>
                  <TableCell style={{ fontWeight: 'bold', fontSize: '1rem' }}>Address</TableCell>
                  <TableCell style={{ fontWeight: 'bold', fontSize: '1rem' }}>CV</TableCell>
                  <TableCell style={{ fontWeight: 'bold', fontSize: '1rem' }}>
                    Cover Letter
                  </TableCell>
                  <TableCell style={{ fontWeight: 'bold', fontSize: '1rem' }}>Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {/* Example data */}
                {data.length == 0 ? (
                  <div style={{ marginLeft: '10px', color: 'red' }}>
                    <h3>No data found</h3>
                  </div>
                ) : (
                  data.map((item, id) => {
                    console.log('item', item);
                    return (
                      <>
                        <TableRow>
                          <TableCell>{item?.applicationType}</TableCell>
                          <TableCell>{item?.name}</TableCell>
                          <TableCell>{item?.title}</TableCell>
                          <TableCell>{item?.email}</TableCell>
                          <TableCell>{item?.confmEmail}</TableCell>
                          <TableCell>{item?.phone}</TableCell>
                          <TableCell>{item?.address}</TableCell>
                          <TableCell>
                            {item?.cv && (
                              <a href={item?.cv} style={{ textDecoration: 'none' }} download>
                                CV
                              </a>
                            )}
                          </TableCell>
                          <TableCell>
                            {item?.cover_letter && (
                              <a
                                href={item?.cover_letter}
                                style={{ textDecoration: 'none' }}
                                download
                              >
                                Cover Letter
                              </a>
                            )}
                          </TableCell>
                          <IconButton
                            aria-label="delete"
                            style={{ color: 'red' }}
                            onClick={() => handleDelete(item?.id)}
                          >
                            <DeleteIcon />
                          </IconButton>
                        </TableRow>
                      </>
                    );
                  })
                )}
              </TableBody>
            </Table>
          </div>
        </TableContainer>
      </DashboardCard>
    </PageContainer>
  );
};

export default ApplyNowForm;
