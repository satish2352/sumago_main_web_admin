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

const ValuableClients = () => {
  const [id, setId] = useState();
  const [show, setShow] = useState(true);
  const [name, setName] = useState('');
  const [counter, setCounter] = useState('');
  const [errors, setErrors] = useState({});
  const [data, setData] = useState([]);
  const [isEdit, setIsEdit] = useState(false);
  function findData() {
    axios
      .get('/clientCount/find')
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

    if (!counter.trim()) {
      errors.counter = 'counter is required';
      isValid = false;
    } else if (!/^\d+$/.test(counter.trim())) {
      errors.counter = 'counter must contain only numbers';
      isValid = false;
    }

    if (!name.trim()) {
      errors.name = 'name is required';
      isValid = false;
    }

    setErrors(errors);
    return isValid;
  };
  const SubmitForm = (e) => {
    e.preventDefault();
    if (validateForm()) {
      let newData = {
        counter: counter,
        name: name,
      };
      axios
        .post('clientCount/create', newData, {
          headers: { 'Content-Type': 'application/json' },
        })
        .then((resp) => {
          console.log('resp', resp);
          alert('Form submitted successfully');
        })
        .catch((err) => {
          console.log('err', err);
        });
      setCounter('');
      setName('');
      setErrors({}); // Resetting errors as well
      setShow(true);
      setIsEdit(false);
    }
  };

  const handleDelete = (clientCount) => {
    console.log('clientCount', clientCount);
    axios
      .delete(`clientCount/delete/${clientCount}`)
      .then((response) => {
        console.log('clientCount deleted successfully');
        findData();
      })
      .catch((error) => {
        console.error('Error deleting clientCount:', error);
      });
  };

  const handleEdit = (data) => {
    console.log('data', data);
    setName(data.name);
    setCounter(data.counter);
    setId(data.id);
    setShow(false);
    setIsEdit(true);
  };

  const EditSubmit = (e) => {
    e.preventDefault();
    let newData = { name, counter };
    console.log('newData', newData);
    axios
      .put(`/clientCount/update/${id}`, newData)
      .then((response) => {
        console.log('clientCount updated successfully');
      })
      .catch((error) => {
        console.error('Error updating clientCount:', error);
      });
    setShow(true);
  };
  return (
    <PageContainer title="Valuable Clients" description="this is Sample page">
      <DashboardCard
        title="ValuableClients"
        buttonName={show ? 'Add Valuable Clients' : 'View Valuable Clients'}
        onClick={show ? onClick1 : onClick}
      >
        {show ? (
          <TableContainer component={Paper}>
            <Table stickyHeader>
              <TableHead>
                <TableRow>
                  <TableCell style={{ fontWeight: 'bold', fontSize: '1rem' }}>Sr No.</TableCell>
                  <TableCell style={{ fontWeight: 'bold', fontSize: '1rem' }}>Title</TableCell>
                  <TableCell style={{ fontWeight: 'bold', fontSize: '1rem' }}>Counts</TableCell>
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
                          <TableCell>{item?.name}</TableCell>
                          <TableCell>{item?.counter}</TableCell>
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
                  label="Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  variant="outlined"
                />
                {errors.name && (
                  <span className="error" style={{ color: 'red' }}>
                    {errors.name}
                  </span>
                )}
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Counts"
                  value={counter}
                  onChange={(e) => setCounter(e.target.value)}
                  variant="outlined"
                />
                {errors.designation && (
                  <span className="error" style={{ color: 'red' }}>
                    {errors.counter}
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

export default ValuableClients;
