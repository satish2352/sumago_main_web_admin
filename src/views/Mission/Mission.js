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
  MenuItem,
} from '@mui/material';
import PageContainer from 'src/components/container/PageContainer';
import DashboardCard from '../../components/shared/DashboardCard';
import axios from 'axios';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { useNavigate } from 'react-router';

const Mission = () => {
  const [showForm, setShowForm] = useState(false);
  const [title, setTitle] = useState('');
  const [img, setImg] = useState(null);
  const [imgPreview, setImgPreview] = useState(null); // For displaying the existing image
  const [errors, setErrors] = useState({});
  const [data, setData] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    axios
      .get('/aboutmission/find_all')
      .then((result) => {
        setData(result.data);
      })
      .catch((err) => {
        if (err?.response?.status === 401) {
          navigate('/auth/login');
        }
        console.log('Error fetching mission details:', err);
      });
  };

  const resetForm = () => {
    setTitle('');
    setImg(null);
    setImgPreview(null);
    setErrors({});
    setEditingId(null);
    setShowForm(false);
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

  const handleSubmitForm = (e) => {
    e.preventDefault();
    if (validateForm()) {
      const formData = new FormData();
      formData.append('title', title);
      if (img) {
        formData.append('img', img);
      }

      const url = editingId
        ? `/aboutmission/update/${editingId}`
        : '/aboutmission/create';
      const method = editingId ? 'put' : 'post';

      axios({
        method: method,
        url: url,
        data: formData,
        headers: { 'Content-Type': 'multipart/form-data' },
      })
        .then((response) => {
          console.log('Mission details saved successfully:', response);
          alert('Mission details saved successfully');
          fetchData(); // Refresh data after successful save
          resetForm();
        })
        .catch((error) => {
          if (error?.response?.status === 401) {
            navigate('/auth/login');
          }
          console.error('Error saving mission details:', error);
          alert(`Error: ${error.response?.data?.message || 'Something went wrong!'}`);
        });
    }
  };

  const handleEdit = (item) => {
    setTitle(item.title);
    setImg(null); // Clear the image input field
    setImgPreview(item.img); // Set the existing image URL
    setEditingId(item.id);
    setShowForm(true);
  };

  const handleDelete = (id) => {
    axios
      .delete(`/aboutmission/delete/${id}`)
      .then((response) => {
        console.log('Mission details deleted successfully');
        fetchData(); // Refresh data after successful delete
      })
      .catch((error) => {
        if (error?.response?.status === 401) {
          navigate('/auth/login');
        }
        console.error('Error deleting mission details:', error);
      });
  };

  return (
    <PageContainer title="Mission" description="Manage mission details">
      <DashboardCard
        title="Mission"
        buttonName={showForm ? 'View Mission Details' : 'Add Mission Details'}
        onClick={showForm ? resetForm : () => setShowForm(true)}
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
                <FormControl>
                  <FormLabel style={{ marginBottom: '10px' }}>File Upload</FormLabel>
                  <Input
                    type="file"
                    onChange={handleFileChange}
                    fullWidth
                    style={{ marginTop: '10px' }}
                  />
                  {errors.img && (
                    <span className="error" style={{ color: 'red' }}>
                      {errors.img}
                    </span>
                  )}
                </FormControl>
                {imgPreview && (
                  <div>
                    <img
                      src={imgPreview}
                      alt="Preview"
                      style={{ width: '100px', height: '100px', marginTop: '10px' }}
                    />
                  </div>
                )}
              </Grid>
              <Grid item xs={12}>
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
                {data.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={3} style={{ textAlign: 'center', color: 'red' }}>
                      No data found
                    </TableCell>
                  </TableRow>
                ) : (
                  data.map((item) => (
                    <TableRow key={item.id}>
                      <TableCell>{item.title}</TableCell>
                      <TableCell>
                        <img
                          src={item.img}
                          alt={item.title}
                          style={{ width: '50px', height: '50px' }}
                        />
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
                          onClick={() => handleDelete(item.id)}
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

export default Mission;
