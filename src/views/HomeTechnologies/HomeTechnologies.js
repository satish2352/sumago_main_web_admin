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
import { useNavigate } from 'react-router';
const HomeTechnologies = () => {
  const [technologies, setTechnologies] = useState([]);
  const [title, setTitle] = useState('');
  const [img, setImg] = useState(null);
  const [imgPreview, setImgPreview] = useState(null); // For displaying the existing image
  const [errors, setErrors] = useState({});
  const [editingId, setEditingId] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    fetchTechnologies();
  }, []);

  const fetchTechnologies = () => {
    axios
      .get('/hometechnologies/gethometechnologies')
      .then((response) => {
        setTechnologies(response.data);
      })
      .catch((error) => {
        if (error?.response?.status === 401) {
          navigate('/auth/login');
        }
        console.error('Error fetching technologies:', error);
      });
  };

  const validateForm = () => {
    let errors = {};
    let isValid = true;

    if (!title.trim()) {
      errors.title = 'Title is required';
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
      if (img) {
        formData.append('img', img);
      }

      const url = editingId
        ? `/hometechnologies/updatehometechnologiesRecord/${editingId}`
        : '/hometechnologies/createhometechnologiesRecord';
      const method = editingId ? 'put' : 'post';

      axios({
        method: method,
        url: url,
        data: formData,
        headers: { 'Content-Type': 'multipart/form-data' },
      })
        .then((response) => {
          console.log('Technology saved successfully:', response);
          alert('Technology saved successfully');
          fetchTechnologies(); // Refresh data after successful save
          resetForm();
        })
        .catch((error) => {
          if (error?.response?.status === 401) {
            navigate('/auth/login');
          }
          console.error('Error saving technology:', error);
          alert(`Error: ${error.response?.data?.message || 'Something went wrong!'}`);
        });
    }
  };

  const handleEdit = (technology) => {
    setTitle(technology.title);
    setImg(null); // Clear the image input field
    setImgPreview(technology.img); // Set the existing image URL
    setEditingId(technology.id);
    setShowForm(true); // Show the form for editing
  };

  const handleDelete = (technologyId) => {
    axios
      .delete(`/hometechnologies/deletehometechnologiesRecord/${technologyId}`)
      .then((response) => {
        console.log('Technology deleted successfully');
        fetchTechnologies(); // Refresh data after successful delete
      })
      .catch((error) => {
        if (error?.response?.status === 401) {
          navigate('/auth/login');
        }
        console.error('Error deleting technology:', error);
      });
  };

  return (
    <PageContainer title="Home Technologies" description="Manage home technologies">
      <DashboardCard
        title="Home Technologies"
        buttonName={showForm ? 'View Technologies' : 'Add Technology'}
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
                <input type="file" onChange={handleFileChange} accept="image/*" />
                {errors.img && (
                  <span className="error" style={{ color: 'red' }}>
                    {errors.img}
                  </span>
                )}
              </Grid>
              <Grid item xs={12}>
                {imgPreview && (
                  <div>
                    <img
                      src={imgPreview}
                      alt="Preview"
                      style={{ width: '100px', height: '100px', marginBottom: '10px' }}
                    />
                  </div>
                )}
                <Button variant="contained" type="submit" color={editingId ? 'success' : 'primary'}>
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
                  <TableCell style={{ fontWeight: 'bold', fontSize: '1rem' }}>Image</TableCell>
                  <TableCell style={{ fontWeight: 'bold', fontSize: '1rem' }}>Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {technologies.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={3} style={{ textAlign: 'center' }}>
                      No data found
                    </TableCell>
                  </TableRow>
                ) : (
                  technologies.map((technology, index) => (
                    <TableRow key={technology.id}>
                      <TableCell>{technology.title}</TableCell>
                      <TableCell>
                        <img
                          src={technology.img}
                          alt="Thumbnail"
                          style={{ width: '50px', height: '50px' }}
                        />
                      </TableCell>
                      <TableCell>
                        <IconButton
                          aria-label="edit"
                          style={{ color: 'blue' }}
                          onClick={() => handleEdit(technology)}
                        >
                          <EditIcon />
                        </IconButton>
                        <IconButton
                          aria-label="delete"
                          style={{ color: 'red' }}
                          onClick={() => handleDelete(technology.id)}
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
        )}
      </DashboardCard>
    </PageContainer>
  );
};

export default HomeTechnologies;
