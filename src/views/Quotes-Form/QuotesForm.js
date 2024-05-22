import React, { useEffect, useState } from 'react';
import {
  Typography,
  Button,
  Grid,
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  IconButton,
} from '@mui/material';
import PageContainer from 'src/components/container/PageContainer';
import DashboardCard from '../../components/shared/DashboardCard';
import axios from 'axios';
import DeleteIcon from '@mui/icons-material/Delete';
import * as XLSX from 'xlsx';

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
    axios
      .delete(`quotes/delete/${quotes}`)
      .then(() => {
        console.log('Quote deleted successfully');
        axios
          .get('quotes/find')
          .then((result) => {
            setData(result.data);
          })
          .catch((err) => {
            console.log('Error fetching quotes:', err);
          });
      })
      .catch((error) => {
        console.error('Error deleting quote:', error);
      });
  };

  const downloadExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Quotes');
    XLSX.writeFile(workbook, 'QuotesData.xlsx');
  };

  return (
    <PageContainer title="Quotes Form" description="This is Sample page">
      <DashboardCard>
        <Grid container justifyContent="space-between" alignItems="center" style={{ marginBottom: '20px' }}>
          <Grid item>
            <Typography variant="h6">Quotes Form</Typography>
          </Grid>
          <Grid item>
            <Button variant="contained" color="primary" onClick={downloadExcel}>
              Download Excel
            </Button>
          </Grid>
        </Grid>

        <TableContainer component={Paper} style={{ maxHeight: '70vh' }}> {/* Adjust maxHeight as needed */}
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Sr No.</TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Phone No.</TableCell>
                <TableCell>Type of Services</TableCell>
                <TableCell>Other Service</TableCell>
                <TableCell>Address</TableCell>
                <TableCell>Comment</TableCell>
                <TableCell>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={9} style={{ textAlign: 'center', color: 'red' }}>
                    <Typography variant="h6">No data found</Typography>
                  </TableCell>
                </TableRow>
              ) : (
                data.map((item, id) => (
                  <TableRow key={id}>
                    <TableCell>{id + 1}</TableCell>
                    <TableCell>{item?.name}</TableCell>
                    <TableCell>{item?.email}</TableCell>
                    <TableCell>{item?.phone}</TableCell>
                    <TableCell>{item?.service}</TableCell>
                    <TableCell>{item?.other_service}</TableCell>
                    <TableCell>{item?.address}</TableCell>
                    <TableCell>{item?.comment}</TableCell>
                    <TableCell>
                      <IconButton aria-label="delete" style={{ color: 'red' }} onClick={() => handleDelete(item?.id)}>
                        <DeleteIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </DashboardCard>
    </PageContainer>
  );
};

export default QuotesForm;
