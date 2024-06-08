import React, { useEffect, useState } from 'react';
import {
  Typography,
  TextField,
  Button,
  Grid,
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

const OfferedServices = () => {
  const [services, setServices] = useState([]);
  const [title, setTitle] = useState('');
  const [text, setText] = useState('');
  const [img, setImg] = useState(null);
  const [imgPreview, setImgPreview] = useState(null); // For displaying the existing image
  const [errors, setErrors] = useState({});
  const [editingId, setEditingId] = useState(null);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = () => {
    axios.get('/offeredservices/getofferedservices')
      .then((response) => {
        setServices(response.data);
      })
      .catch((error) => {
        console.error('Error fetching offered services:', error);
      });
  };

  const validateForm = () => {
    let errors = {};
    let isValid = true;

    if (!title.trim()) {
      errors.title = 'Title is required';
      isValid = false;
    }
    if (!text.trim()) {
      errors.text = 'Text is required';
      isValid = false;
    }
    if (!img && !imgPreview) {
      errors.img = 'Image is required';
      isValid = false;
    }

    setErrors(errors);
    return isValid;
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setImg(file);
    setImgPreview(URL.createObjectURL(file)); // Show preview of new image
  };

  const resetForm = () => {
    setTitle('');
    setText('');
    setImg(null);
    setImgPreview(null);
    setErrors({});
    setEditingId(null);
    setShowForm(false);
  };

  const handleSubmitForm = (e) => {
    e.preventDefault();
    if (validateForm()) {
      const formData = new FormData();
      formData.append('title', title);
      formData.append('text', text);
      if (img) {
        formData.append('img', img);
      }

      const url = editingId ? `/offeredservices/updateofferedservicesRecord/${editingId}` : '/offeredservices/createofferedservicesRecord';
      const method = editingId ? 'put' : 'post';

      axios({
        method: method,
        url: url,
        data: formData,
        headers: { 'Content-Type': 'multipart/form-data' },
      })
        .then((response) => {
          console.log('Service saved successfully:', response);
          alert('Service saved successfully');
          fetchServices(); // Refresh data after successful save
          resetForm();
        })
        .catch((error) => {
          console.error('Error saving service:', error);
          alert(`Error: ${error.response?.data?.message || 'Something went wrong!'}`);
        });
    }
  };

  const handleEdit = (service) => {
    setTitle(service.title);
    setText(service.text);
    setImg(null); // Clear the image input field
    setImgPreview(service.img); // Set the existing image URL
    setEditingId(service.id);
    setShowForm(true); // Show the form for editing
  };

  const handleDelete = (serviceId) => {
    axios.delete(`/offeredservices/deleteofferedservicesRecord/${serviceId}`)
      .then((response) => {
        console.log('Service deleted successfully');
        fetchServices(); // Refresh data after successful delete
      })
      .catch((error) => {
        console.error('Error deleting service:', error);
      });
  };

  return (
    <PageContainer title="Offered Services" description="Manage offered services">
      <DashboardCard
        title="Offered Services"
        buttonName={showForm ? 'View Services' : 'Add Service'}
        onClick={showForm ? () => resetForm() : () => setShowForm(true)}
      >
        {showForm ? (
          <form onSubmit={handleSubmitForm}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  variant="outlined"
                />
                {errors.title && (
                  <span className="error" style={{ color: 'red' }}>
                    {errors.title}
                  </span>
                )}
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Text"
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  variant="outlined"
                />
                {errors.text && (
                  <span className="error" style={{ color: 'red' }}>
                    {errors.text}
                  </span>
                )}
              </Grid>
              <Grid item xs={12}>
                <input
                  type="file"
                  onChange={handleFileChange}
                  accept="image/*"
                />
                {errors.img && (
                  <span className="error" style={{ color: 'red' }}>
                    {errors.img}
                  </span>
                )}
              </Grid>
              <Grid item xs={12}>
                {imgPreview && (
                  <div>
                    <img src={imgPreview} alt="Preview" style={{ width: '100px', height: '100px', marginBottom: '10px' }} />
                  </div>
                )}
                <Button variant="contained" type="submit" color="primary">
                  {editingId ? 'Update' : 'Submit'}
                </Button>
              </Grid>
            </Grid>
          </form>
        ) : (
          <TableContainer component={Paper}>
            <Table stickyHeader>
              <TableHead>
                <TableRow>
                  <TableCell style={{ fontWeight: 'bold', fontSize: '1rem' }}>Title</TableCell>
                  <TableCell style={{ fontWeight: 'bold', fontSize: '1rem' }}>Text</TableCell>
                  <TableCell style={{ fontWeight: 'bold', fontSize: '1rem' }}>Image</TableCell>
                  <TableCell style={{ fontWeight: 'bold', fontSize: '1rem' }}>Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {services.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={4} style={{ textAlign: 'center' }}>No data found</TableCell>
                  </TableRow>
                ) : (
                  services.map((service) => (
                    <TableRow key={service.id}>
                      <TableCell>{service.title}</TableCell>
                      <TableCell>{service.text}</TableCell>
                      <TableCell>
                        <img src={service.img} alt="Thumbnail" style={{ width: '50px', height: '50px' }} />
                      </TableCell>
                      <TableCell>
                        <IconButton aria-label="edit" onClick={() => handleEdit(service)}>
                          <EditIcon />
                        </IconButton>
                        <IconButton aria-label="delete" onClick={() => handleDelete(service.id)}>
                          <DeleteIcon />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </DashboardCard>
    </PageContainer>
  );
};

export default OfferedServices;
