// import React from 'react';
// import { Typography } from '@mui/material';
// import PageContainer from 'src/components/container/PageContainer';
// import DashboardCard from '../../components/shared/DashboardCard';

// const SamplePage = () => {
//   return (
//     <PageContainer title="Sample Page" description="this is Sample page">

//       <DashboardCard title="Sample Page">

//       </DashboardCard>
//     </PageContainer>
//   );
// };

// export default SamplePage;

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

const LifeCategoryDetails = () => {
  const [show, setShow] = useState(false);
  const [category, setCategory] = useState('');
  const [img, setImg] = useState();
  const [errors, setErrors] = useState({});
  const [data, setData] = useState([]);

  useEffect(() => {
    axios
      .get('/life_category_details/find_all')
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

    if (!category.trim()) {
      errors.category = 'category is required';
      isValid = false;
    }

    if (!img) {
      errors.img = 'image is required';
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
      formData.append('img', img);
      console.log('formData', formData);
      axios
        .post('life_category_details/create', formData, {
          headers: { 'Content-Type': 'multipart/form-data' },
        })
        .then((resp) => {
          console.log('resp', resp);
          alert('Form submitted successfully');
        })
        .catch((err) => {
          console.log('err', err);
        });
      setCategory('');
      setImg(null);
      setErrors({}); // Resetting errors as well
      setShow(true);
    }
  };

  const handleDelete = (life_category_details) => {
    console.log('life_category_details', life_category_details);
    axios
      .delete(`life_category_details/delete/${life_category_details}`)
      .then((response) => {
        console.log('Testimonial deleted successfully');
        axios
          .get('/life_category_details/find_all')
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
                  <TableCell style={{ fontWeight: 'bold', fontSize: '1rem' }}>
                    Profile Image
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
                          <TableCell>{item?.category}</TableCell>
                          <TableCell>{item?.img}</TableCell>
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
              <Grid item xs={12} sm={12}>
                <TextField
                  fullWidth
                  label="Category"
                  onChange={(e) => setCategory(e.target.value)}
                  variant="outlined"
                />
                {errors.category && (
                  <span className="error" style={{ color: 'red' }}>
                    {errors.category}
                  </span>
                )}
              </Grid>
              <Grid item xs={12} sm={12}>
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

export default LifeCategoryDetails;
