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
import { Typography, TextField, Button, Grid, Input, FormControl, FormLabel, TableContainer, Paper, Table, TableHead, TableRow, TableCell, TableBody } from '@mui/material';
import PageContainer from 'src/components/container/PageContainer';
import DashboardCard from '../../components/shared/DashboardCard';
import axios from 'axios';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

const Testimonials = () => {
  const [show, setShow] = useState(false)
  const [name, setName] = useState("")
  const [review, setReview] = useState("")
  const [designation, setDesignation] = useState("")
  const [img, setImg] = useState()
  const [errors, setErrors] = useState({});
  const [data, setData] = useState([])

  useEffect(() => {
    axios.get("/testimonials/find").then((result) => {
      setData(result.data)
    }).catch((err) => {
      console.log("err", err);
    });
  }, [show])

  // const handleEdit = (data) => {
  //   setShow(false);
  //   setDesignation(data?.designation)
  //   setName(data?.name)
  //   setReview(data?.review)
  //   setImg(data?.img)
  //   console.log("data?.name:", data?.name, "data?.review:", data?.review, "data?.img:", data?.img, "data?.designation:", data?.designation);
  // }
  const onClick = () => {
    setShow(true)
  }
  const onClick1 = () => {
    setShow(false)
  }

  const validateForm = () => {
    let errors = {};
    let isValid = true;

    if (!designation.trim()) {
      errors.designation = 'designation is required';
      isValid = false;
    }
    if (!review.trim()) {
      errors.review = 'review is required';
      isValid = false;
    }

    if (!name.trim()) {
      errors.name = 'name is required';
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
      formData.append("name", name)
      formData.append("designation", designation)
      formData.append("review", review)
      formData.append("img", img)
      console.log("formData", formData);
      axios.post("testimonials/create", formData, { headers: { "Content-Type": "multipart/form-data" } }).then((resp) => {
        console.log("resp", resp)
        alert('Form submitted successfully');
      }).catch((err) => {
        console.log("err", err);
      })
      setDesignation("")
      setName("")
      setReview("")
      setImg(null)
      setErrors({}) // Resetting errors as well
      setShow(true)
    }
  };


  const handleDelete = (testimonialId) => {
    console.log("testimonialId", testimonialId);
    axios.delete(`testimonials/delete/${testimonialId}`)
      .then((response) => {
        console.log('Testimonial deleted successfully');
        axios.get("/testimonials/find").then((result) => {
          setData(result.data)
        }).catch((err) => {
          console.log("err", err);
        });
      })
      .catch((error) => {
        console.error('Error deleting testimonial:', error);
      });
  };

  return (
    <PageContainer title="Testimonials" description="this is Sample page">
      <DashboardCard title="Testimonials" buttonName={show ? "Add Testimonial" : "View Testimonial"} onClick={show ? onClick1 : onClick}>
        {
          show ?
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
                  {/* Example data */}
                  {
                    data.length == 0 ?
                      <div style={{ marginLeft: "10px", color: "red" }}>
                        <h3>No data found</h3>
                      </div>
                      :
                      data.map((item, id) => {
                        console.log("item", item);
                        return (
                          <>
                            <TableRow>
                              <TableCell>{item?.name}</TableCell>
                              <TableCell>{item?.designation}</TableCell>
                              <TableCell>{item?.review}</TableCell>
                              <TableCell>{item?.img}</TableCell>
                              {/* <IconButton aria-label="edit" style={{ color: 'blue' }} onClick={() => handleEdit(item)}>
                              <EditIcon />
                            </IconButton> */}
                              <IconButton aria-label="delete" style={{ color: 'red' }} onClick={() => handleDelete(item?.id)}>
                                <DeleteIcon />
                              </IconButton>
                            </TableRow >
                          </>
                        )
                      })
                  }
                </TableBody>
              </Table>
            </TableContainer>
            :
            <form onSubmit={SubmitForm}>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField fullWidth label="Name" onChange={(e) => setName(e.target.value)} variant="outlined" />
                  {errors.name && <span className="error" style={{ color: 'red' }}>{errors.name}</span>}
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField fullWidth label="Designation" onChange={(e) => setDesignation(e.target.value)} variant="outlined" />
                  {errors.designation && <span className="error" style={{ color: 'red' }}>{errors.designation}</span>}
                </Grid>
                <Grid item xs={12}>
                  <TextField fullWidth multiline rows={2} onChange={(e) => setReview(e.target.value)} label="Review" variant="outlined" />
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
        }





      </DashboardCard>
    </PageContainer >
  );
};

export default Testimonials;
