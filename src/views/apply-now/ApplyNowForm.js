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
        setData(result.data);
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
                              <a href={item?.cv} style={{ textDecoration: 'none', color:"green" }} download>
                                <Badge color="success" badgeContent={0}>
                                  <CloudDownloadIcon />
                                </Badge>
                              </a>
                            )}
                          </TableCell>
                          <TableCell>
                            {item?.cover_letter && (
                              <a
                                href={item?.cover_letter}
                                style={{ textDecoration: 'none', color:"green" }}
                                download
                              >
                                <Badge color="success" badgeContent={0}>
                                  <CloudDownloadIcon />
                                </Badge>
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
