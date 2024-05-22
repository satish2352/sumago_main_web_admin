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

const Funatsumago = () => {
  const [show, setShow] = useState(false);
  const [category, setCategory] = useState('');
  const [img, setImg] = useState(null);
  const [errors, setErrors] = useState({});
  const [data, setData] = useState([]);
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    axios
      .get('culture_category_details/getallCultureDetails')
      .then((result) => {
        setData(result.data);
      })
      .catch((err) => {
        console.log('err', err);
      });
  }, [show]);

  const onClick = () => {
    setShow(true);
    setCategory('');
    setImg(null);
    setErrors({});
    setEditingId(null);
  };
  const onClick1 = () => {
    setShow(false);
  };

  const validateForm = () => {
    let errors = {};
    let isValid = true;

    if (!category.trim()) {
      errors.category = 'Category is required';
      isValid = false;
    }

    if (!img && !editingId) {
      errors.img = 'Image is required';
      isValid = false;
    }

    setErrors(errors);
    return isValid;
  };

  const SubmitForm = (e) => {
    e.preventDefault();
    if (validateForm()) {
      const formData = new FormData();
      formData.append('category', category);
      if (img) {
        formData.append('img', img);
      }

      if (editingId) {
        axios
          .put(`culture_category_details/update/${editingId}`, formData, {
            headers: { 'Content-Type': 'multipart/form-data' },
          })
          .then((resp) => {
            console.log('resp', resp);
            alert('Category updated successfully');
            setShow(true);
            setEditingId(null);
          })
          .catch((err) => {
            console.log('err', err);
          });
      } else {
        axios
          .post('culture_category_details/createCultureDetails', formData, {
            headers: { 'Content-Type': 'multipart/form-data' },
          })
          .then((resp) => {
            console.log('resp', resp);
            alert('Form submitted successfully');
            setShow(true);
          })
          .catch((err) => {
            console.log('err', err);
          });
      }
      setCategory('');
      setImg(null);
      setErrors({});
    }
  };

  const handleEdit = (item) => {
    setCategory(item.category);
    setEditingId(item.id);
    setShow(false);
  };

  const handleDelete = (life_category_details) => {
    console.log('culture_category_details', life_category_details);
    axios
      .delete(`culture_category_details/delete/${life_category_details}`)
      .then((response) => {
        console.log('Life category details deleted successfully');
        axios
          .get('culture_category_details/getallCultureDetails')
          .then((result) => {
            setData(result.data);
          })
          .catch((err) => {
            console.log('err', err);
          });
      })
      .catch((error) => {
        console.error('Error deleting life_category_details:', error);
      });
  };

  return (
    <PageContainer title="Life Category Details" description="this is Sample page">
      <DashboardCard
        title="Life Category Details"
        buttonName={show ? 'Add Life Category Details' : 'View Life Category Details'}
        onClick={show ? onClick1 : onClick}
      >
        {show ? (
          <TableContainer component={Paper}>
            <Table stickyHeader>
              <TableHead>
                <TableRow>
                  <TableCell style={{ fontWeight: 'bold', fontSize: '1rem' }}>Category</TableCell>
                  <TableCell style={{ fontWeight: 'bold', fontSize: '1rem' }}>Profile Image</TableCell>
                  <TableCell style={{ fontWeight: 'bold', fontSize: '1rem' }}>Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {data.length === 0 ? (
                  <div style={{ marginLeft: '10px', color: 'red' }}>
                    <h3>No data found</h3>
                  </div>
                ) : (
                  data.map((item, id) => {
                    return (
                      <TableRow key={id}>
                        <TableCell>{item?.category}</TableCell>
                        <TableCell>
                          <img src={item?.img} alt={item?.category} style={{ width: '50px', height: '50px' }} />
                        </TableCell>
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
                    );
                  })
                )}
              </TableBody>
            </Table>
          </TableContainer>
        ) : (
          <form onSubmit={SubmitForm}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Category"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  variant="outlined"
                />
                {errors.category && (
                  <span className="error" style={{ color: 'red' }}>
                    {errors.category}
                  </span>
                )}
              </Grid>
              <Grid item xs={12}>
                <div>
                  <FormLabel style={{ marginBottom: '10px' }}>File Upload</FormLabel>
                  <Input
                    type="file"
                    onChange={(e) => setImg(e.target.files[0])}
                    fullWidth
                    style={{ marginTop: '10px' }}
                  />
                  {errors.img && (
                    <span className="error" style={{ color: 'red' }}>
                      {errors.img}
                    </span>
                  )}
                </div>
              </Grid>
              <Grid item xs={12}>
                <Button variant="contained" type="submit" color="primary">
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


export default Funatsumago
