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

const QuotesForm = () => {
  const [data, setData] = useState([]);
  useEffect(() => {
    axios
      .get('quotes/find')
      .then((result) => {
        setData(result.data);
      })
      .catch((err) => {
        console.log('err', err);
      });
  }, []);

  const handleDelete = (quotes) => {
    console.log('Quotes', quotes);
    axios
      .delete(`quotes/delete/${quotes}`)
      .then((response) => {
        console.log('Quotes deleted successfully');
        axios
          .get('quotes/find')
          .then((result) => {
            setData(result.data);
          })
          .catch((err) => {
            console.log('err', err);
          });
      })
      .catch((error) => {
        console.error('Error deleting Quotes:', error);
      });
  };

  return (
    <PageContainer title="Quotes Form" description="this is Sample page">
      <DashboardCard title="Quotes Form">
        <TableContainer component={Paper}>
          <Table stickyHeader>
            <TableHead>
              <TableRow>
                <TableCell style={{ fontWeight: 'bold', fontSize: '1rem' }}>Name</TableCell>
                <TableCell style={{ fontWeight: 'bold', fontSize: '1rem' }}>Email</TableCell>
                <TableCell style={{ fontWeight: 'bold', fontSize: '1rem' }}>Phone No.</TableCell>
                <TableCell style={{ fontWeight: 'bold', fontSize: '1rem' }}>
                  Type of Services:
                </TableCell>
                <TableCell style={{ fontWeight: 'bold', fontSize: '1rem' }}>
                  Other Service
                </TableCell>
                <TableCell style={{ fontWeight: 'bold', fontSize: '1rem' }}>Address </TableCell>
                <TableCell style={{ fontWeight: 'bold', fontSize: '1rem' }}>Comment</TableCell>
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
                        <TableCell>{item?.name}</TableCell>
                        <TableCell>{item?.email}</TableCell>
                        <TableCell>{item?.phone}</TableCell>
                        <TableCell>{item?.service}</TableCell>
                        <TableCell>{item?.other_service}</TableCell>
                        <TableCell>{item?.address}</TableCell>
                        <TableCell>{item?.comment}</TableCell>
                        {/* <IconButton aria-label="edit" style={{ color: 'blue' }} onClick={() => handleEdit(item)}>
                              <EditIcon />
                            </IconButton> */}
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
        </TableContainer>
      </DashboardCard>
    </PageContainer>
  );
};

export default QuotesForm;
