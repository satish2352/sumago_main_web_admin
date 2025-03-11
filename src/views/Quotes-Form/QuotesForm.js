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
  TablePagination,
} from '@mui/material';
import PageContainer from 'src/components/container/PageContainer';
import DashboardCard from '../../components/shared/DashboardCard';
import axios from 'axios';
import DeleteIcon from '@mui/icons-material/Delete';
import * as XLSX from 'xlsx';
import { useNavigate } from 'react-router';

const QuotesForm = () => {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5); // Default rows per page
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get('quotes/find')
      .then((result) => {
        const sortedData = result.data.sort((a, b) => b.id - a.id);
        setData(sortedData);
      })
      .catch((err) => {
        if (err?.response?.status === 401) {
          navigate('/auth/login');
        }
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
            if (err?.response?.status === 401) {
              navigate('/auth/login');
            }
            console.log('Error fetching quotes:', err);
          });
      })
      .catch((error) => {
        if (error?.response?.status === 401) {
          navigate('/auth/login');
        }
        console.error('Error deleting quote:', error);
      });
  };

  const downloadExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Quotes');
    XLSX.writeFile(workbook, 'QuotesData.xlsx');
  };

  // Handle pagination change
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <PageContainer title="Quotes Form" description="This is Sample page">
      <DashboardCard>
        <Grid
          container
          justifyContent="space-between"
          alignItems="center"
          style={{ marginBottom: '20px' }}
        >
          <Grid item>
            <Typography variant="h6">Quotes Form</Typography>
          </Grid>
          <Grid item>
            <Button variant="contained" color="primary" onClick={downloadExcel}>
              Download Excel
            </Button>
          </Grid>
        </Grid>

        <TableContainer component={Paper} style={{ maxHeight: '70vh' }}>
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
                {/* <TableCell>Comment</TableCell> */}
                <TableCell>City</TableCell>
                <TableCell>Firm</TableCell>
                <TableCell>Date</TableCell>
                <TableCell>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={12} style={{ textAlign: 'center', color: 'red' }}>
                    <Typography variant="h6">No data found</Typography>
                  </TableCell>
                </TableRow>
              ) : (
                data
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((item, id) => (
                    <TableRow key={id}>
                      <TableCell>{page * rowsPerPage + id + 1}</TableCell>
                      <TableCell>{item?.name}</TableCell>
                      <TableCell>{item?.email}</TableCell>
                      <TableCell>{item?.phone}</TableCell>
                      <TableCell>{item?.services}</TableCell>
                      <TableCell>{item?.industry}</TableCell>
                      <TableCell>{item?.address}</TableCell>
                      {/* <TableCell>{item?.comment}</TableCell> */}
                      <TableCell>{item?.city}</TableCell>
                      <TableCell>{item?.firm}</TableCell>
                      <TableCell>{new Date(item?.created_at).toLocaleDateString()}</TableCell>
                      <TableCell>
                        <IconButton
                          aria-label="delete"
                          style={{ color: 'red' }}
                          onClick={() => handleDelete(item?.id)}
                        >
                          <DeleteIcon />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))
              )}
            </TableBody>
          </Table>
        </TableContainer>

        {/* Pagination Controls */}
        <TablePagination
          rowsPerPageOptions={[6, 10, 25]}
          component="div"
          count={data.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </DashboardCard>
    </PageContainer>
  );
};

export default QuotesForm;
