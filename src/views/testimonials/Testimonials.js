import React, { useEffect, useState } from 'react';
import { Typography, TextField, Button, Grid, Input, FormControl, FormLabel, TableContainer, Paper, Table, TableHead, TableRow, TableCell, TableBody } from '@mui/material';
import PageContainer from 'src/components/container/PageContainer';
import DashboardCard from '../../components/shared/DashboardCard';
import axios from 'axios';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

const Testimonials = () => {
  const [id, setId] = useState(null);
  const [show, setShow] = useState(false);
  const [name, setName] = useState("");
  const [review, setReview] = useState("");
  const [designation, setDesignation] = useState("");
  const [img, setImg] = useState(null);
  const [errors, setErrors] = useState({});
  const [data, setData] = useState([]);

  useEffect(() => {
    axios.get("/testimonials/find").then((result) => {
      setData(result.data);
    }).catch((err) => {
      console.log("err", err);
    });
  }, [show]);

  const onClick = () => {
    setShow(true);
    setId(null);
    setName("");
    setReview("");
    setDesignation("");
    setImg(null);
  };

  const onClick1 = () => {
    setShow(false);
  };

  const validateForm = () => {
    let errors = {};
    let isValid = true;

    if (!designation.trim()) {
      errors.designation = 'Designation is required';
      isValid = false;
    }
    if (!review.trim()) {
      errors.review = 'Review is required';
      isValid = false;
    }
    if (!name.trim()) {
      errors.name = 'Name is required';
      isValid = false;
    }
    if (!img && !id) {
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
      formData.append("name", name);
      formData.append("designation", designation);
      formData.append("review", review);
      if (img) formData.append("img", img);

      const endpoint = id ? `/testimonials/update/${id}` : "/testimonials/create";
      const method = id ? 'put' : 'post';

      axios({ method, url: endpoint, data: formData, headers: { "Content-Type": "multipart/form-data" } })
        .then((resp) => {
          console.log("resp", resp);
          alert('Form submitted successfully');
          setShow(true);
        }).catch((err) => {
          console.log("err", err);
        });

      setId(null);
      setName("");
      setReview("");
      setDesignation("");
      setImg(null);
      setErrors({});
    }
  };

  const handleDelete = (testimonialId) => {
    axios.delete(`/testimonials/delete/${testimonialId}`)
      .then((response) => {
        console.log('Testimonial deleted successfully');
        axios.get("/testimonials/find").then((result) => {
          setData(result.data);
        }).catch((err) => {
          console.log("err", err);
        });
      })
      .catch((error) => {
        console.error('Error deleting testimonial:', error);
      });
  };

  const handleEdit = (data) => {
    setId(data.id);
    setName(data.name);
    setReview(data.review);
    setDesignation(data.designation);
    setImg(null); // Assume new image upload is optional
    setShow(false);
  };

  return (
    <PageContainer title="Testimonials" description="this is Sample page">
      <DashboardCard title="Testimonials" buttonName={show ? "View Testimonials" : "Add Testimonial"} onClick={show ? onClick1 : onClick}>
        {show ? (
          <TableContainer component={Paper}>
            <Table stickyHeader>
              <TableHead>
                <TableRow>
                  <TableCell style={{ fontWeight: "bold", fontSize: "1rem" }}>Name</TableCell>
                  <TableCell style={{ fontWeight: "bold", fontSize: "1rem" }}>Designation</TableCell>
                  <TableCell style={{ fontWeight: "bold", fontSize: "1rem" }}>Review</TableCell>
                  <TableCell style={{ fontWeight: "bold", fontSize: "1rem" }}>Profile Image</TableCell>
                  <TableCell style={{ fontWeight: "bold", fontSize: "1rem" }}>Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {data.length === 0 ? (
                  <div style={{ marginLeft: "10px", color: "red" }}>
                    <h3>No data found</h3>
                  </div>
                ) : (
                  data.map((item, id) => (
                    <TableRow key={id}>
                      <TableCell>{item.name}</TableCell>
                      <TableCell>{item.designation}</TableCell>
                      <TableCell>{item.review}</TableCell>
                      <TableCell>
                        <img src={item.img} alt={item.name} style={{ width: '100px', height: '100px' }} />
                      </TableCell>
                      <TableCell>
                        <IconButton aria-label="edit" style={{ color: 'blue' }} onClick={() => handleEdit(item)}>
                          <EditIcon />
                        </IconButton>
                        <IconButton aria-label="delete" style={{ color: 'red' }} onClick={() => handleDelete(item.id)}>
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
                <TextField fullWidth label="Name" value={name} onChange={(e) => setName(e.target.value)} variant="outlined" />
                {errors.name && <span className="error" style={{ color: 'red' }}>{errors.name}</span>}
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField fullWidth label="Designation" value={designation} onChange={(e) => setDesignation(e.target.value)} variant="outlined" />
                {errors.designation && <span className="error" style={{ color: 'red' }}>{errors.designation}</span>}
              </Grid>
              <Grid item xs={12}>
                <TextField fullWidth multiline rows={2} value={review} onChange={(e) => setReview(e.target.value)} label="Review" variant="outlined" />
                {errors.review && <span className="error" style={{ color: 'red' }}>{errors.review}</span>}
              </Grid>
              <Grid item xs={12} sm={12}>
                <div>
                  <FormLabel style={{ marginBottom: '10px' }}>File Upload</FormLabel>
                  <Input type="file" onChange={(e) => setImg(e.target.files[0])} fullWidth style={{ marginTop: '10px' }} />
                  {errors.img && <span className="error" style={{ color: 'red' }}>{errors.img}</span>}
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

export default Testimonials;
