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

const TeamMember = () => {
  const [show, setShow] = useState(false);
  const [name, setName] = useState('');
  const [designation, setDesignation] = useState('');
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
      .get('/team/getteamRecord')
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
    setName('');
    setDesignation('');
    setImg(null);
    setImgPreview(null);
    setErrors({});
    setEditingId(null);
  };

  const validateForm = () => {
    let errors = {};
    let isValid = true;

    if (!name.trim()) {
      errors.name = 'Name is required';
      isValid = false;
    }
    if (!designation.trim()) {
      errors.designation = 'Designation is required';
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
      formData.append('name', name);
      formData.append('designation', designation);
      if (img) {
        formData.append('img', img);
      }
      const url = editingId ? `/team/updateTeamRecord/${editingId}` : '/team/createteamRecord';
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
          setShow(false);
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
    console.log("item",item);
    setName(item.name);
    setDesignation(item.designation);
    setImg(null);
    setImgPreview(item.img); // Set the existing image URL
    setEditingId(item.id);
    setShow(true);
  };

  const handleDelete = (teamId) => {
    axios
      .delete(`/team/deleteTeamRecord/${teamId}`)
      .then((response) => {
        console.log('Team record deleted successfully');
        fetchData(); // Refresh data after successful delete
      })
      .catch((error) => {
        console.error('Error deleting team record:', error);
      });
  };

  return (
    <PageContainer title="Team Record" description="This is a sample page for managing team records">
      <DashboardCard
        title="Team Record"
        buttonName={show ? 'View Team Records' : 'Add Team Record'}
        onClick={show ? onClick1 : onClick}
      >
        {show ? (
       <form onSubmit={SubmitForm}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  variant="outlined"
                />
                {errors.name && (
                  <span className="error" style={{ color: 'red' }}>
                    {errors.name}
                  </span>
                )}
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Designation"
                  value={designation}
                  onChange={(e) => setDesignation(e.target.value)}
                  variant="outlined"
                />
                {errors.designation && (
                  <span className="error" style={{ color: 'red' }}>
                    {errors.designation}
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
                <Button variant="contained" type="submit" color={editingId ? "success" : "primary"}>
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
                <TableCell style={{ fontWeight: 'bold', fontSize: '1rem' }}>Name</TableCell>
                <TableCell style={{ fontWeight: 'bold', fontSize: '1rem' }}>Designation</TableCell>
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
                    <TableCell>{item?.name}</TableCell>
                    <TableCell>{item?.designation}</TableCell>
                    <TableCell>
                      <img src={item?.img} alt={item?.category} style={{ width: '30px', height: '30px' }} />
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

export default TeamMember;
