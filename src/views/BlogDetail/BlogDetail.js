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

const BlogDetail = () => {
  const [blogData, setBlogData] = useState([]);
  const [blogTitle, setBlogTitle] = useState('');
  const [blogText, setBlogText] = useState('');
  const [blogDate, setBlogDate] = useState('');
  const [blogSubtitle, setBlogSubtitle] = useState('');
  const [blogImg, setBlogImg] = useState(null);
  const [blogImgPreview, setBlogImgPreview] = useState(null); // For displaying the existing image
  const [blogErrors, setBlogErrors] = useState({});
  const [editingBlogId, setEditingBlogId] = useState(null);
  const [showBlogForm, setShowBlogForm] = useState(false);

  useEffect(() => {
    fetchBlogDetails();
  }, []);

  const fetchBlogDetails = () => {
    axios.get('/Blogdetails/getBlogdetails')
      .then((response) => {
        setBlogData(response.data);
      })
      .catch((error) => {
        console.error('Error fetching blog details:', error);
      });
  };

  const validateBlogForm = () => {
    let errors = {};
    let isValid = true;

    if (!blogTitle.trim()) {
      errors.title = 'Title is required';
      isValid = false;
    }
    if (!blogText.trim()) {
      errors.text = 'Text is required';
      isValid = false;
    }
    if (!blogDate.trim()) {
      errors.date = 'Date is required';
      isValid = false;
    }
    if (!blogSubtitle.trim()) {
      errors.subtitle = 'Subtitle is required';
      isValid = false;
    }
    if (!blogImg && !blogImgPreview) {
      errors.img = 'Image is required';
      isValid = false;
    }

    setBlogErrors(errors);
    return isValid;
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setBlogImg(file);
    setBlogImgPreview(URL.createObjectURL(file)); // Show preview of new image
  };

  const resetBlogForm = () => {
    setBlogTitle('');
    setBlogText('');
    setBlogDate('');
    setBlogSubtitle('');
    setBlogImg(null);
    setBlogImgPreview(null);
    setBlogErrors({});
    setEditingBlogId(null);
    setShowBlogForm(false);
  };

  const handleSubmitBlogForm = (e) => {
    e.preventDefault();
    if (validateBlogForm()) {
      const formData = new FormData();
      formData.append('title', blogTitle);
      formData.append('text', blogText);
      formData.append('date', blogDate);
      formData.append('subtitle', blogSubtitle);
      if (blogImg) {
        formData.append('img', blogImg);
      }

      const url = editingBlogId ? `/Blogdetails/updateBlogdetailsRecord/${editingBlogId}` : '/Blogdetails/createBlogdetailsRecord';
      const method = editingBlogId ? 'put' : 'post';

      axios({
        method: method,
        url: url,
        data: formData,
        headers: { 'Content-Type': 'multipart/form-data' },
      })
        .then((response) => {
          console.log('Blog details saved successfully:', response);
          alert('Blog details saved successfully');
          fetchBlogDetails(); // Refresh data after successful save
          resetBlogForm();
        })
        .catch((error) => {
          console.error('Error saving blog details:', error);
          alert(`Error: ${error.response?.data?.message || 'Something went wrong!'}`);
        });
    }
  };

  const handleEditBlog = (blog) => {
    setBlogTitle(blog.title);
    setBlogText(blog.text);
    setBlogDate(blog.date);
    setBlogSubtitle(blog.subtitle);
    setBlogImg(null); // Clear the image input field
    setBlogImgPreview(blog.img); // Set the existing image URL
    setEditingBlogId(blog.id);
    setShowBlogForm(true); // Show the form for editing
  };

  const handleDeleteBlog = (blogId) => {
    axios.delete(`/Blogdetails/deleteBlogdetailsRecord/${blogId}`)
      .then((response) => {
        console.log('Blog details deleted successfully');
        fetchBlogDetails(); // Refresh data after successful delete
      })
      .catch((error) => {
        console.error('Error deleting blog details:', error);
      });
  };

  return (
    <PageContainer title="Blog Details" description="Manage blog details">
      <DashboardCard
        title="Blog Details"
        buttonName={showBlogForm ? 'View Blog Details' : 'Add Blog Details'}
        onClick={showBlogForm ? () => resetBlogForm() : () => setShowBlogForm(true)}
      >
        {showBlogForm ? (
          <form onSubmit={handleSubmitBlogForm}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Title"
                  value={blogTitle}
                  onChange={(e) => setBlogTitle(e.target.value)}
                  variant="outlined"
                />
                {blogErrors.title && (
                  <span className="error" style={{ color: 'red' }}>
                    {blogErrors.title}
                  </span>
                )}
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Text"
                  value={blogText}
                  onChange={(e) => setBlogText(e.target.value)}
                  variant="outlined"
                  multiline
                  rows={4}
                />
                {blogErrors.text && (
                  <span className="error" style={{ color: 'red' }}>
                    {blogErrors.text}
                  </span>
                )}
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Date"
                  value={blogDate}
                  onChange={(e) => setBlogDate(e.target.value)}
                  variant="outlined"
                />
                {blogErrors.date && (
                  <span className="error" style={{ color: 'red' }}>
                    {blogErrors.date}
                  </span>
                )}
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Subtitle"
                  value={blogSubtitle}
                  onChange={(e) => setBlogSubtitle(e.target.value)}
                  variant="outlined"
                />
                {blogErrors.subtitle && (
                  <span className="error" style={{ color: 'red' }}>
                    {blogErrors.subtitle}
                  </span>
                )}
              </Grid>
              <Grid item xs={12}>
                <input
                  type="file"
                  onChange={handleFileChange}
                  accept="image/*"
                />
                {blogErrors.img && (
                  <span className="error" style={{ color: 'red' }}>
                    {blogErrors.img}
                  </span>
                )}
              </Grid>
              <Grid item xs={12}>
                {blogImgPreview && (
                  <div>
                    <img src={blogImgPreview} alt="Preview" style={{ width: '100px', height: '100px', marginBottom: '10px' }} />
                  </div>
                )}
                <Button variant="contained" type="submit" color="primary">
                  {editingBlogId ? 'Update' : 'Submit'}
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
                  <TableCell style={{ fontWeight: 'bold', fontSize: '1rem' }}>Date</TableCell>
                  <TableCell style={{ fontWeight: 'bold', fontSize: '1rem' }}>Subtitle</TableCell>
                  <TableCell style={{ fontWeight: 'bold', fontSize: '1rem' }}>Image</TableCell>
                  <TableCell style={{ fontWeight: 'bold', fontSize: '1rem' }}>Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {blogData.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={5} style={{ textAlign: 'center' }}>No data found</TableCell>
                  </TableRow>
                ) : (
                  blogData.map((blog, index) => (
                    <TableRow key={blog.id}>
                      <TableCell>{blog.title}</TableCell>
                      <TableCell>{blog.date}</TableCell>
                      <TableCell>{blog.subtitle}</TableCell>
                      <TableCell>
                        <img src={blog.img} alt="Thumbnail" style={{ width: '50px', height: '50px' }} />
                      </TableCell>
                      <TableCell>
                        <IconButton aria-label="edit" onClick={() => handleEditBlog(blog)}>
                          <EditIcon />
                        </IconButton>
                        <IconButton aria-label="delete" onClick={() => handleDeleteBlog(blog.id)}>
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


export default BlogDetail