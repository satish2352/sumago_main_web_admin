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
import { useNavigate } from 'react-router';

const Homeslider = () => {
  const [id, setId] = useState(null);
  const [show, setShow] = useState(true);
  const [title, setTitle] = useState('');
  const [text, setText] = useState('');
  const [img, setImg] = useState(null);
  const [errors, setErrors] = useState({});
  const [data, setData] = useState([]);
  const [isEdit, setIsEdit] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    axios
      .get('/homeslider/gethomeslider')
      .then((result) => {
        setData(result.data);
      })
      .catch((err) => {
        if (err?.response?.status === 401) {
          navigate('/auth/login');
        }
        console.log('err', err);
      });
  }, [show]);

  const onClick = () => {
    setShow(false);
    resetForm();
  };

  const onClick1 = () => {
    setShow(true);
  };

  const resetForm = () => {
    setId(null);
    setTitle('');
    setText('');
    setImg(null);
    setErrors({});
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
      formData.append('title', title);
      formData.append('text', text);
      if (img) formData.append('img', img);

      const endpoint = id ? `/homeslider/updatehomeslider/${id}` : '/homeslider/createhomeslider';
      const method = id ? 'put' : 'post';

      axios({
        method,
        url: endpoint,
        data: formData,
        headers: { 'Content-Type': 'multipart/form-data' },
      })
        .then((resp) => {
          console.log('resp', resp);
          alert('Form submitted successfully');
          setShow(true);
          resetForm();
        })
        .catch((err) => {
          if (err?.response?.status === 401) {
            navigate('/auth/login');
          }
          console.log('err', err);
        });
    }
  };

  const handleDelete = (sliderId) => {
    axios
      .delete(`/homeslider/deletehomesliderRecord/${sliderId}`)
      .then((response) => {
        console.log('Slider deleted successfully');
        axios
          .get('/homeslider/gethomeslider')
          .then((result) => {
            setData(result.data);
          })
          .catch((err) => {
            if (err?.response?.status === 401) {
              navigate('/auth/login');
            }
            console.log('err', err);
          });
      })
      .catch((error) => {
        if (error?.response?.status === 401) {
          navigate('/auth/login');
        }
        console.error('Error deleting slider:', error);
      });
  };

  const handleEdit = (data) => {
    setId(data.id);
    setTitle(data.title);
    setText(data.text);
    setImg(null); // Assume new image upload is optional
    setShow(false);
  };

  return (
    <PageContainer title="Home Slider" description="this is Sample page">
      <DashboardCard
        title="Home Slider"
        buttonName={!show ? 'View Sliders' : 'Add Slider'}
        onClick={!show ? onClick1 : onClick}
      >
        {show ? (
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
                {data.length === 0 ? (
                  <div style={{ marginLeft: '10px', color: 'red' }}>
                    <h3>No data found</h3>
                  </div>
                ) : (
                  data.map((item, id) => (
                    <TableRow key={id}>
                      <TableCell>{item.title}</TableCell>
                      <TableCell>{item.text}</TableCell>
                      <TableCell>
                        <img
                          src={item.img}
                          alt={item.title}
                          style={{ width: '100px', height: '100px' }}
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
        ) : (
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
                <Button
                  variant="contained"
                  type="submit"
                  color={`${!isEdit ? 'success' : 'primary'}`}
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

export default Homeslider;
