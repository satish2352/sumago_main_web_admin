import React, { useEffect, useState } from 'react';
import {
  Typography,
  TextField,
  Button,
  Grid,
  FormControl,
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

const Blogdetails = () => {
  const [show, setShow] = useState(false);
  const [title, setTitle] = useState('');
  const [text, setText] = useState('');
  const [subtitle, setSubtitle] = useState('');
  const [date, setDate] = useState('');
  const [img, setImg] = useState(null);
  const [imgPreview, setImgPreview] = useState(null); // For displaying the existing image
  const [errors, setErrors] = useState({});
  const [data, setData] = useState([]);
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    axios
      .get('/Blogdetails/getBlogdetails')
      .then((result) => {
        setData(result.data);
      })
      .catch((err) => {
        console.log('err', err);
      });
  };

  const onClick = () => {
    setShow(true);
    resetForm();
  };

  const onClick1 = () => {
    setShow(false);
  };

  const resetForm = () => {
    setTitle('');
    setText('');
    setSubtitle('');
    setDate('');
    setImg(null);
    setImgPreview(null);
    setErrors({});
    setEditingId(null);
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
    if (!subtitle.trim()) {
      errors.subtitle = 'Subtitle is required';
      isValid = false;
    }
    if (!date.trim()) {
      errors.date = 'Date is required';
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

  const SubmitForm = (e) => {
    e.preventDefault();
    if (validateForm()) {
      const formData = new FormData();
      formData.append('title', title);
      formData.append('text', text);
      formData.append('subtitle', subtitle);
      formData.append('date', date);
      if (img) {
        formData.append('img', img);
      }

      const url = editingId ? `/Blogdetails/updateBlogdetailsRecord/${editingId}` : '/Blogdetails/createBlogdetailsRecord';
      const method = editingId ? 'put' : 'post';

      axios({
        method: method,
        url: url,
        data: formData,
        headers: { 'Content-Type': 'multipart/form-data' },
      })
        .then((resp) => {
          console.log('resp', resp);
          alert('Form submitted successfully');
          setShow(true);
          fetchData(); // Refresh data after successful submit
        })
        .catch((err) => {
          console.log('err', err);
          alert(`Error: ${err.response?.data?.message || 'Something went wrong!'}`);
        });

      resetForm();
    }
  };

  const handleEdit = (item) => {
    setTitle(item.title);
    setText(item.text);
    setSubtitle(item.subtitle);
    setDate(item.date);
    setImg(null);
    setImgPreview(item.img); // Set the existing image URL
    setEditingId(item.id);
    setShow(false);
  };

  const handleDelete = (blogId) => {
    axios
      .delete(`/Blogdetails/deleteBlogdetailsRecord/${blogId}`)
      .then((response) => {
        console.log('Blog detail deleted successfully');
        fetchData(); // Refresh data after successful delete
      })
      .catch((error) => {
        console.error('Error deleting blog detail:', error);
      });
  };

  return (
    <PageContainer title="Blog Details" description="This is a sample page for managing blog details">
      <DashboardCard
        title="Blog Details"
        buttonName={show ? 'View Blog Details' : 'Add Blog Detail'}
        onClick={show ? onClick1 : onClick}
      >
        {show ? (
          <form onSubmit={SubmitForm}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
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
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Subtitle"
                  value={subtitle}
                  onChange={(e) => setSubtitle(e.target.value)}
                  variant="outlined"
                />
                {errors.subtitle && (
                  <span className="error" style={{ color: 'red' }}>
                    {errors.subtitle}
                  </span>
                )}
              </Grid>
              <Grid item xs={12} sm={6}>
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
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  variant="outlined"
                />
                {errors.date && (
                  <span className="error" style={{ color: 'red' }}>
                    {errors.date}
                  </span>
                )}
              </Grid>
              <Grid item xs={12} sm={6}>
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
                  <TableCell style={{ fontWeight: 'bold', fontSize: '1rem' }}>Subtitle</TableCell>
                  <TableCell style={{ fontWeight: 'bold', fontSize: '1rem' }}>Text</TableCell>
                  <TableCell style={{ fontWeight: 'bold', fontSize: '1rem' }}>Date</TableCell>
                  <TableCell style={{ fontWeight: 'bold', fontSize: '1rem' }}>Image</TableCell>
                  <TableCell style={{ fontWeight: 'bold', fontSize: '1rem' }}>Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {data.length === 0 ? (
                  <div style={{ marginLeft: '10px', color: 'red' }}>
                    <h3>No data found</h3>
                  </div>
                ) : (
                  data.map((item, id) => (
                    <TableRow key={id}>
                      <TableCell>{item?.title}</TableCell>
                      <TableCell>{item?.subtitle}</TableCell>
                      <TableCell>{item?.text}</TableCell>
                      <TableCell>{item?.date}</TableCell>
                      <TableCell>
                        <img src={item?.img} alt={item?.title} style={{ width: '30px', height: '30px' }} />
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



export default Blogdetails