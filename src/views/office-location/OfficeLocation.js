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

const OfficeLocation = () => {
  const [id, setId] = useState();
  const [show, setShow] = useState(true);
  const [address, setAddress] = useState('');
  const [email, setEmail] = useState('');
  const [contact, setContact] = useState('');
  const [geolocation, setGeolocation] = useState('');
  const [errors, setErrors] = useState({});
  const [data, setData] = useState([]);
  const [isEdit, setIsEdit] = useState(false);

  function findData() {
    axios
      .get('location/getlocation')
      .then((result) => {
        setData(result.data);
      })
      .catch((err) => {
        console.log('err', err);
      });
  }
  useEffect(() => {
    findData();
  }, [show, isEdit]);

  const onClick = () => {
    setShow(true);
    setIsEdit(true);
  };
  const onClick1 = () => {
    setShow(false);
    setIsEdit(false);
  };

  const validateForm = () => {
    let errors = {};
    let isValid = true;

    if (!contact.trim()) {
      errors.contact = 'Phone number is required';
      isValid = false;
    } else if (!/^[6789]\d{9}$/.test(contact.trim())) {
      errors.contact = 'Phone number must be 10 digits long';
      isValid = false;
    }

    if (!address.trim()) {
      errors.address = 'address is required';
      isValid = false;
    }
    if (!email.trim()) {
      errors.email = 'email is required';
      isValid = false;
    }
    if (!geolocation.trim()) {
      errors.geolocation = 'geolocation is required';
      isValid = false;
    }

    setErrors(errors);
    return isValid;
  };
  const SubmitForm = (e) => {
    e.preventDefault();
    if (validateForm()) {
      let newData = {
        address,
        email,
        contact,
        geolocation,
      };
      axios
        .post('location/create', newData, {
          headers: { 'Content-Type': 'application/json' },
        })
        .then((resp) => {
          console.log('resp', resp);
          alert('Data submitted successfully');
          setShow(true);
          findData();
        })
        .catch((err) => {
          console.log('err', err);
        });
      setAddress('');
      setEmail('');
      setContact('');
      setGeolocation('');
      setErrors({}); // Resetting errors as well
    }
  };

  const handleDelete = (location) => {
    console.log('location', location);
    axios
      .delete(`location/delete/${location}`)
      .then((response) => {
        console.log('data deleted successfully');
        findData();
      })
      .catch((error) => {
        console.error('Error deleting location:', error);
      });
  };

  const handleEdit = (data) => {
    console.log('data', data);

    setAddress(data.address);
    setEmail(data.email);
    setContact(data.contact);
    setGeolocation(data.geolocation);
    setId(data.id);
    setShow(false);
    setIsEdit(true);
  };

  const EditSubmit = (e) => {
    e.preventDefault();
    let newData = { address, email, contact, geolocation };
    console.log('newData', newData);
    axios
      .put(`/location/update/${id}`, newData)
      .then((response) => {
        findData();
        setShow(true);
        console.log('data edited successfully');
      })
      .catch((error) => {
        console.error('Error updating location:', error);
      });
  };

  return (
    <PageContainer title="Office Location" description="this is Sample page">
      <DashboardCard
        title="Office Location"
        buttonName={show ? 'Add Office Location' : 'View Office Location'}
        onClick={show ? onClick1 : onClick}
      >
        {show ? (
          <TableContainer component={Paper}>
            <Table stickyHeader>
              <TableHead>
                <TableRow>
                  <TableCell style={{ fontWeight: 'bold', fontSize: '1rem' }}>Sr No.</TableCell>
                  <TableCell style={{ fontWeight: 'bold', fontSize: '1rem' }}>Address</TableCell>
                  <TableCell style={{ fontWeight: 'bold', fontSize: '1rem' }}>Email</TableCell>
                  <TableCell style={{ fontWeight: 'bold', fontSize: '1rem' }}>Phone No.</TableCell>
                  <TableCell style={{ fontWeight: 'bold', fontSize: '1rem' }}>Location</TableCell>
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
                          <TableCell>{id + 1}</TableCell>
                          <TableCell>{item?.address}</TableCell>
                          <TableCell>{item?.email}</TableCell>
                          <TableCell>{item?.contact}</TableCell>
                          <TableCell>{item?.geolocation}</TableCell>
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
                        </TableRow>
                      </>
                    );
                  })
                )}
              </TableBody>
            </Table>
          </TableContainer>
        ) : (
          <form onSubmit={isEdit ? EditSubmit : SubmitForm}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Address"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  variant="outlined"
                />
                {errors.address && (
                  <span className="error" style={{ color: 'red' }}>
                    {errors.address}
                  </span>
                )}
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  variant="outlined"
                />
                {errors.email && (
                  <span className="error" style={{ color: 'red' }}>
                    {errors.email}
                  </span>
                )}
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Phone No."
                  value={contact}
                  onChange={(e) => setContact(e.target.value)}
                  variant="outlined"
                />
                {errors.contact && (
                  <span className="error" style={{ color: 'red' }}>
                    {errors.contact}
                  </span>
                )}
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Location"
                  value={geolocation}
                  onChange={(e) => setGeolocation(e.target.value)}
                  variant="outlined"
                />
                {errors.geolocation && (
                  <span className="error" style={{ color: 'red' }}>
                    {errors.geolocation}
                  </span>
                )}
              </Grid>
              <Grid item xs={12}>
                <Button
                  variant="contained"
                  type="submit"
                  color={`${isEdit ? 'success' : 'primary'}`}
                >
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

export default OfficeLocation;
