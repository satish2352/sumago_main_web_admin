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

const InternshipOpening = () => {
  const [show, setShow] = useState(false);
  const [designation, setDesignation] = useState('');
  const [opening, setOpening] = useState('');
  const [location, setLocation] = useState('');
  const [qualification, setQualification] = useState('');
  const [errors, setErrors] = useState({});
  const [data, setData] = useState([]);

  useEffect(() => {
    axios
      .get('internship/find')
      .then((result) => {
        setData(result.data);
      })
      .catch((err) => {
        console.log('err', err);
      });
  }, [show]);

  const onClick = () => {
    setShow(true);
  };
  const onClick1 = () => {
    setShow(false);
  };

  const validateForm = () => {
    let errors = {};
    let isValid = true;

    if (!opening.trim()) {
      errors.opening = 'internship opening is required';
      isValid = false;
    } else if (!/^\d+$/.test(opening.trim())) {
      errors.opening = 'internship opening must contain only numbers';
      isValid = false;
    }

    if (!designation.trim()) {
      errors.designation = 'designation is required';
      isValid = false;
    }
    if (!location.trim()) {
      errors.location = 'location is required';
      isValid = false;
    }
    if (!qualification.trim()) {
      errors.qualification = 'qualification is required';
      isValid = false;
    }

    setErrors(errors);
    return isValid;
  };
  const SubmitForm = (e) => {
    e.preventDefault();
    if (validateForm()) {
      let newData = {
        designation,
        opening,
        location,
        qualification,
      };
      axios
        .post('internship/create', newData, {
          headers: { 'Content-Type': 'application/json' },
        })
        .then((resp) => {
          console.log('resp', resp);
          alert('Form submitted successfully');
        })
        .catch((err) => {
          console.log('err', err);
        });
      setDesignation('');
      setOpening('');
      setLocation('');
      setQualification('');
      setErrors({}); // Resetting errors as well
      setShow(true);
    }
  };

  const handleDelete = (internship) => {
    console.log('internship', internship);
    axios
      .delete(`internship/delete/${internship}`)
      .then((response) => {
        console.log('internship deleted successfully');
        axios
          .get('internship/find')
          .then((result) => {
            setData(result.data);
          })
          .catch((err) => {
            console.log('err', err);
          });
      })
      .catch((error) => {
        console.error('Error deleting internship:', error);
      });
  };

  return (
    <PageContainer title="Internship Opening" description="this is Sample page">
      <DashboardCard
        title="Internship Opening"
        buttonName={show ? 'Add Internship Opening' : 'View Internship Opening'}
        onClick={show ? onClick1 : onClick}
      >
        {show ? (
          <TableContainer component={Paper}>
            <Table stickyHeader>
              <TableHead>
                <TableRow>
                  <TableCell style={{ fontWeight: 'bold', fontSize: '1rem' }}>
                    Designation
                  </TableCell>
                  <TableCell style={{ fontWeight: 'bold', fontSize: '1rem' }}>Opening</TableCell>
                  <TableCell style={{ fontWeight: 'bold', fontSize: '1rem' }}>Location</TableCell>
                  <TableCell style={{ fontWeight: 'bold', fontSize: '1rem' }}>
                    Qualification
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
                          <TableCell>{item?.designation}</TableCell>
                          <TableCell>{item?.opening}</TableCell>
                          <TableCell>{item?.location}</TableCell>
                          <TableCell>{item?.qualification}</TableCell>
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
        ) : (
          <form onSubmit={SubmitForm}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Designation"
                  onChange={(e) => setDesignation(e.target.value)}
                  variant="outlined"
                />
                {errors.designation && (
                  <span className="error" style={{ color: 'red' }}>
                    {errors.designation}
                  </span>
                )}
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Opening"
                  onChange={(e) => setOpening(e.target.value)}
                  variant="outlined"
                />
                {errors.opening && (
                  <span className="error" style={{ color: 'red' }}>
                    {errors.opening}
                  </span>
                )}
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Location"
                  onChange={(e) => setLocation(e.target.value)}
                  variant="outlined"
                />
                {errors.location && (
                  <span className="error" style={{ color: 'red' }}>
                    {errors.location}
                  </span>
                )}
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Qualification"
                  onChange={(e) => setQualification(e.target.value)}
                  variant="outlined"
                />
                {errors.qualification && (
                  <span className="error" style={{ color: 'red' }}>
                    {errors.qualification}
                  </span>
                )}
              </Grid>
              <Grid item xs={12}>
                <Button variant="contained" type="submit" color="primary">
                  Submit
                </Button>
              </Grid>
            </Grid>
          </form>
        )}
      </DashboardCard>
    </PageContainer>
  );
};

export default InternshipOpening;
