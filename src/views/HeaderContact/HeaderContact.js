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

const HeaderContact = () => {
  const [id, setId] = useState();
  const [show, setShow] = useState(true);
  const [phone1, setPhone1] = useState('');
  const [phone2, setPhone2] = useState('');
  const [phone3, setPhone3] = useState('');
  const [email, setEmail] = useState('');
  const [errors, setErrors] = useState({});
  const [data, setData] = useState([]);
  const [isEdit, setIsEdit] = useState(false);
  const navigate = useNavigate();
  function findData() {
    axios
      .get('/contactInfo/getContactRecords')
      .then((result) => {
        setData(result.data);
      })
      .catch((err) => {
        console.log('err', err);
        if (err?.response?.status === 401) {
          navigate('/auth/login');
        }
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

    if (!phone1.trim()) {
      errors.phone1 = 'Phone number is required';
      isValid = false;
    } else if (!/^[6789]\d{9}$/.test(phone1.trim())) {
      errors.phone1 = 'Phone number must be 10 digits long';
      isValid = false;
    }
    if (!phone2.trim()) {
      errors.phone2 = 'Phone number is required';
      isValid = false;
    } else if (!/^[6789]\d{9}$/.test(phone2.trim())) {
      errors.phone2 = 'Phone number must be 10 digits long';
      isValid = false;
    }
    if (!phone3.trim()) {
      errors.phone3 = 'Phone number is required';
      isValid = false;
    } else if (!/^[6789]\d{9}$/.test(phone3.trim())) {
      errors.phone3 = 'Phone number must be 10 digits long';
      isValid = false;
    }
    if (!email.trim()) {
      errors.email = 'email is required';
      isValid = false;
    }
    setErrors(errors);
    return isValid;
  };
  const SubmitForm = (e) => {
    e.preventDefault();
    if (validateForm()) {
      let newData = {
        phone1: phone1,
        phone2: phone2,
        phone3: phone3,
        email: email,
      };
      axios
        .post('/contactInfo/records', newData, {
          headers: { 'Content-Type': 'application/json' },
        })
        .then((resp) => {
          console.log('resp', resp);
          alert('Data added successfully');
          findData();
        })
        .catch((err) => {
          if (err?.response?.status === 401) {
            navigate('/auth/login');
          }
          console.log('err', err);
        });
      setPhone1('');
      setPhone2('');
      setPhone3('');
      setEmail('');
      setErrors({}); // Resetting errors as well
      setShow(true);
      setIsEdit(false);
    }
  };

  const handleDelete = (data) => {
    axios
      .delete(`/contactInfo/records/${data}`)
      .then((response) => {
        console.log('Data deleted successfully');
        findData();
      })
      .catch((error) => {
        if (error?.response?.status === 401) {
          navigate('/auth/login');
        }
        console.error('Error deleting data:', error);
      });
  };

  const handleEdit = (data) => {
    setPhone1(data.phone1);
    setPhone2(data.phone2);
    setPhone3(data.phone3);
    setEmail(data.email);
    setId(data.id);
    setShow(false);
    setIsEdit(true);
  };

  const EditSubmit = (e) => {
    e.preventDefault();
    let newData = { phone1, phone2, phone3, email };
    axios
      .put(`/contactInfo/records/${id}`, newData)
      .then((response) => {
        console.log("response", response);
        console.log('data updated successfully');
        findData();
        setShow(true);
        console.log('Data edited successfully');
      })
      .catch((error) => {
        if (error?.response?.status === 401) {
          navigate('/auth/login');
        }
        console.error('Error updating data:', error);
      });
  };
  return (
    <PageContainer title="Header Contact" description="this is Sample page">
      <DashboardCard
        title="Header Contact"
        buttonName={show ? 'Add Contact Info' : 'View Contact'}
        onClick={show ? onClick1 : onClick}
      >
        {show ? (
          <TableContainer component={Paper}>
            <Table stickyHeader>
              <TableHead>
                <TableRow>
                  <TableCell style={{ fontWeight: 'bold', fontSize: '1rem' }}>Sr No.</TableCell>
                  <TableCell style={{ fontWeight: 'bold', fontSize: '1rem' }}>Phone 1</TableCell>
                  <TableCell style={{ fontWeight: 'bold', fontSize: '1rem' }}>Phone 2</TableCell>
                  <TableCell style={{ fontWeight: 'bold', fontSize: '1rem' }}>Phone 3</TableCell>
                  <TableCell style={{ fontWeight: 'bold', fontSize: '1rem' }}>Email</TableCell>
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
                          <TableCell>{item?.phone1}</TableCell>
                          <TableCell>{item?.phone2}</TableCell>
                          <TableCell>{item?.phone3}</TableCell>
                          <TableCell>{item?.email}</TableCell>
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
                  label="Phone 1"
                  value={phone1}
                  onChange={(e) => setPhone1(e.target.value)}
                  variant="outlined"
                />
                {errors.phone1 && (
                  <span className="error" style={{ color: 'red' }}>
                    {errors.phone1}
                  </span>
                )}
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Phone 2"
                  value={phone2}
                  onChange={(e) => setPhone2(e.target.value)}
                  variant="outlined"
                />
                {errors.phone2 && (
                  <span className="error" style={{ color: 'red' }}>
                    {errors.phone2}
                  </span>
                )}
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Phone 3"
                  value={phone3}
                  onChange={(e) => setPhone3(e.target.value)}
                  variant="outlined"
                />
                {errors.phone3 && (
                  <span className="error" style={{ color: 'red' }}>
                    {errors.phone3}
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

export default HeaderContact;
