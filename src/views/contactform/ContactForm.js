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
import * as XLSX from 'xlsx';
const ContactForm = () => {
  const [data, setData] = useState([]);
  useEffect(() => {
    axios
      .get('/contact/getrecords')
      .then((result) => {
        setData(result.data);
      })
      .catch((err) => {
        console.log('err', err);
      });
  }, []);

  const handleDelete = (contact) => {
    console.log('contact', contact);
    axios
      .delete(`/contact/records/${contact}`)
      .then((response) => {
        console.log('contact deleted successfully');
        axios
          .get('/contact/getrecords')
          .then((result) => {
            setData(result.data);
          })
          .catch((err) => {
            console.log('err', err);
          });
      })
      .catch((error) => {
        console.error('Error deleting contact:', error);
      });
  };
  const downloadExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Contact');
    XLSX.writeFile(workbook, 'Contact.xlsx');
  };

  return (
    <PageContainer title="Contact Form" description="this is Sample page">
      <DashboardCard title="">
        <Grid container justifyContent="space-between" alignItems="center" style={{ marginBottom: '20px' }}>
          <Grid item>
            <Typography variant="h6">Contact Form</Typography>
          </Grid>
          <Grid item>
            <Button variant="contained" color="primary" onClick={downloadExcel} style={{ marginBottom: '20px' }}>
              Download Excel
            </Button>
          </Grid>
        </Grid>

        <TableContainer component={Paper}>
          <Table stickyHeader>
            <TableHead>
              <TableRow>
                <TableCell style={{ fontWeight: 'bold', fontSize: '1rem' }}>Sr No.</TableCell>
                <TableCell style={{ fontWeight: 'bold', fontSize: '1rem' }}>Name</TableCell>
                <TableCell style={{ fontWeight: 'bold', fontSize: '1rem' }}>Email</TableCell>
                <TableCell style={{ fontWeight: 'bold', fontSize: '1rem' }}>Phone No.</TableCell>
                <TableCell style={{ fontWeight: 'bold', fontSize: '1rem' }}>Website</TableCell>
                <TableCell style={{ fontWeight: 'bold', fontSize: '1rem' }}>Message</TableCell>
                {/* <TableCell style={{ fontWeight: 'bold', fontSize: '1rem' }}>Action</TableCell> */}
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
                        <TableCell>{id + 1}</TableCell>
                        <TableCell>{item?.name}</TableCell>
                        <TableCell>{item?.email}</TableCell>
                        <TableCell>{item?.phone}</TableCell>
                        <TableCell>{item?.website}</TableCell>
                        <TableCell>{item?.message}</TableCell>
                        {/* <IconButton aria-label="edit" style={{ color: 'blue' }} onClick={() => handleEdit(item)}>
                              <EditIcon />
                            </IconButton> */}
                        {/* <IconButton
                          aria-label="delete"
                          style={{ color: 'red' }}
                          onClick={() => handleDelete(item?.id)}
                        >
                          <DeleteIcon />
                        </IconButton> */}
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

export default ContactForm;
