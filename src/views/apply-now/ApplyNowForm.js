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
  Badge,
} from '@mui/material';
import PageContainer from 'src/components/container/PageContainer';
import DashboardCard from '../../components/shared/DashboardCard';
import axios from 'axios';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import * as XLSX from 'xlsx';
import { useNavigate } from 'react-router';
import CloudDownloadIcon from '@mui/icons-material/CloudDownload';
const ApplyNowForm = () => {
  const [data, setData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get('applynow/find')
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

  const handleDelete = (applynow) => {
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
            if (err?.response?.status === 401) {
              navigate('/auth/login');
            }
            console.log('err', err);
          });
      })
      .catch((error) => {
        if (error?.response?.status === 401) {
          navigate('/auth/login');
        }
        console.error('Error deleting applynow:', error);
      });
  };
  const downloadExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Applnow');
    XLSX.writeFile(workbook, 'Applnow.xlsx');
  };
  const handleDownload = async (url) => {
    try {
      const response = await fetch(url, { method: 'GET' });
      if (!response.ok) throw new Error('Network response was not ok.');

      const blob = await response.blob();
      const link = document.createElement('a');
      link.href = window.URL.createObjectURL(blob);
      link.download = url.split('/').pop(); // Extract filename from URL
      link.style.display = 'none'; // Hide link
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error('Error downloading file:', error);
    }
  };

  return (
    <PageContainer title="ApplyNow Form" description="this is Sample page">
      <DashboardCard title="">
        <Grid
          container
          justifyContent="space-between"
          alignItems="center"
          style={{ marginBottom: '20px' }}
        >
          <Grid item>
            <Typography variant="h6">ApplyNow Form</Typography>
          </Grid>
          <Grid item>
            <Button
              variant="contained"
              color="primary"
              onClick={downloadExcel}
              style={{ marginBottom: '20px' }}
            >
              Download Excel
            </Button>
          </Grid>
        </Grid>

        <TableContainer component={Paper}>
          <div style={{ overflowX: 'auto' }}>
            <Table stickyHeader>
              <TableHead>
                <TableRow>
                  <TableCell style={{ fontWeight: 'bold', fontSize: '0.6rem' }}>Action</TableCell>
                  <TableCell style={{ fontWeight: 'bold', fontSize: '0.6rem' }}>CV</TableCell>
                  <TableCell style={{ fontWeight: 'bold', fontSize: '0.6rem' }}>
                    Cover Letter
                  </TableCell>

                  <TableCell style={{ fontWeight: 'bold', fontSize: '0.6rem' }}>
                    Application Type
                  </TableCell>
                  <TableCell style={{ fontWeight: 'bold', fontSize: '0.6rem' }}>Name</TableCell>
                  <TableCell style={{ fontWeight: 'bold', fontSize: '0.6rem' }}>Title</TableCell>
                  <TableCell style={{ fontWeight: 'bold', fontSize: '0.6rem' }}>Email</TableCell>

                  <TableCell style={{ fontWeight: 'bold', fontSize: '0.6rem' }}>Phone No.</TableCell>
                  <TableCell style={{ fontWeight: 'bold', fontSize: '0.6rem' }}>Address</TableCell>

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
                          <IconButton
                            aria-label="delete"
                            style={{ color: 'red' }}
                            onClick={() => handleDelete(item?.id)}
                          >
                            <DeleteIcon />
                          </IconButton>
                          <TableCell>
                            {item?.cv && (
                              <a href={item?.cv}  onClick={() => {
                                  // Prevent default action
                                  handleDownload(item.cv); // Trigger download
                                }}target='_blank' style={{ textDecoration: 'none', color: "green" }} download>
                                <Badge color="success" badgeContent={0}>
                                  <CloudDownloadIcon />
                                </Badge>
                              </a>
                            )}
                          </TableCell>
                          <TableCell>
                            {item?.cover_letter && (
                              <a
                                href={item.cover_letter}
                                target='_blank'
                                onClick={() => {
                                  // Prevent default action
                                  handleDownload(item.cover_letter); // Trigger download
                                }}
                                style={{ textDecoration: 'none', color: 'green' }}
                              >
                                <Badge color="success" badgeContent={0}>
                                  <CloudDownloadIcon />
                                </Badge>
                              </a>
                            )}
                          </TableCell>

                          <TableCell>{item?.applicationType}</TableCell>
                          <TableCell>{item?.name}</TableCell>
                          <TableCell>{item?.title}</TableCell>
                          <TableCell>{item?.email}</TableCell>
                          <TableCell>{item?.phone}</TableCell>

                          <TableCell>{item?.address}</TableCell>

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
