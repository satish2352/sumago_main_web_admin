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
const  Brocherdetail = () => {
  const [data, setData] = useState([]);
  useEffect(() => {
    axios
      .get('/broucherDownload/getBroucherDownloadRecord')
      .then((result) => {
        setData(result.data);
      })
      .catch((err) => {
        console.log('err', err);
      });
  }, []);

 
  const downloadExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Applnow');
    XLSX.writeFile(workbook, 'Applnow.xlsx');
  };
  return (
    <PageContainer title="ApplyNow Form" description="this is Sample page">
      <DashboardCard title="">
        <Grid container justifyContent="space-between" alignItems="center" style={{ marginBottom: '20px' }}>
          <Grid item>
            <Typography variant="h6">ApplyNow Form</Typography>
          </Grid>
          <Grid item>
            <Button variant="contained" color="primary" onClick={downloadExcel} style={{ marginBottom: '20px' }}>
              Download Excel
            </Button>
          </Grid>
        </Grid>

        <TableContainer component={Paper}>
          <div style={{ overflowX: 'auto' }}>
            <Table stickyHeader>
              <TableHead>
                <TableRow>
                
                  <TableCell style={{ fontWeight: 'bold', fontSize: '1rem' }}>Name</TableCell>
                  <TableCell style={{ fontWeight: 'bold', fontSize: '1rem' }}>Email</TableCell>
                 
                  <TableCell style={{ fontWeight: 'bold', fontSize: '1rem' }}>Phone No.</TableCell>
                  <TableCell style={{ fontWeight: 'bold', fontSize: '1rem' }}>Location</TableCell>
             
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
                          <TableCell>{item?. fullname}</TableCell>
                          <TableCell>{item?.email}</TableCell>
                          <TableCell>{item?.location}</TableCell>
                          <TableCell>{item?.phone}</TableCell>
                         
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


export default Brocherdetail