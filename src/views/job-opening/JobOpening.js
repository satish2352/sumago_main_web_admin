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
import { useNavigate } from 'react-router';
const JobOpening = () => {
  const [show, setShow] = useState(true);
  const [designation, setDesignation] = useState('');
  const [opening, setOpening] = useState('');
  const [location, setLocation] = useState('');
  const [qualification, setQualification] = useState('');
  const [errors, setErrors] = useState({});
  const [data, setData] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const navigate = useNavigate();
  useEffect(() => {
    axios
      .get('jobs/find')
      .then((result) => {
        setData(result.data);
      })
      .catch((err) => {
        if (err?.response?.status === 401) {
          navigate('/auth/login');
        }
        console.log('err', err);
      });
  }, [show]);

  const onClick = () => {
    setShow(true);
    setDesignation('');
    setOpening('');
    setLocation('');
    setQualification('');
    setErrors({});
    setEditingId(null);
  };
  const onClick1 = () => {
    setShow(false);
  };

  const validateForm = () => {
    let errors = {};
    let isValid = true;

    if (!opening.trim()) {
      errors.opening = 'Job opening is required';
      isValid = false;
    } else if (!/^\d+$/.test(opening.trim())) {
      errors.opening = 'Job opening must contain only numbers';
      isValid = false;
    }

    if (!designation.trim()) {
      errors.designation = 'Designation is required';
      isValid = false;
    }
    if (!location.trim()) {
      errors.location = 'Location is required';
      isValid = false;
    }
    if (!qualification.trim()) {
      errors.qualification = 'Qualification is required';
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

      const url = editingId ? `jobs/update/${editingId}` : 'jobs/create';
      const method = editingId ? 'put' : 'post';

      axios({
        method: method,
        url: url,
        data: newData,
        headers: { 'Content-Type': 'application/json' },
      })
        .then((resp) => {
          console.log('resp', resp);
          alert('Form submitted successfully');
          setShow(true);
          setEditingId(null);
        })
        .catch((err) => {
          if (err?.response?.status === 401) {
            navigate('/auth/login');
          }
          console.log('err', err);
          alert(`Error: ${err.response?.data?.message || 'Something went wrong!'}`);
        });

      setDesignation('');
      setOpening('');
      setLocation('');
      setQualification('');
      setErrors({});
    }
  };

  const handleEdit = (item) => {
    setDesignation(item.designation);
    setOpening(item.opening);
    setLocation(item.location);
    setQualification(item.qualification);
    setEditingId(item.id);
    setShow(false);
  };

  const handleDelete = (jobs) => {
    console.log('jobs', jobs);
    axios
      .delete(`jobs/delete/${jobs}`)
      .then((response) => {
        console.log('Job deleted successfully');
        axios
          .get('jobs/find')
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
        console.error('Error deleting job:', error);
      });
  };

  return (
    <PageContainer title="Job Opening" description="this is Sample page">
      <DashboardCard
        title="Job Opening"
        buttonName={show ? 'Add Job Opening' : 'View Job Opening'}
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
                {data.length === 0 ? (
                  <div style={{ marginLeft: '10px', color: 'red' }}>
                    <h3>No data found</h3>
                  </div>
                ) : (
                  data.map((item, id) => (
                    <TableRow key={id}>
                      <TableCell>{item?.designation}</TableCell>
                      <TableCell>{item?.opening}</TableCell>
                      <TableCell>{item?.location}</TableCell>
                      <TableCell>{item?.qualification}</TableCell>
                      <TableCell>
                        <IconButton
                          aria-label="edit"
                          style={{ color: 'blue' }}
                          onClick={() => handleEdit(item)}
                        >
                          <EditIcon />
                        </IconButton>
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
        ) : (
          <form onSubmit={SubmitForm}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Designation"
                  value={designation}
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
                  value={opening}
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
                  value={location}
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
                  value={qualification}
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
                <Button variant="contained" type="submit" color={editingId ? 'success' : 'primary'}>
                  {editingId ? 'Update' : 'Submit'}
                </Button>
              </Grid>
            </Grid>
          </form>
        )}
      </DashboardCard>
    </PageContainer>
  );
};

export default JobOpening;
