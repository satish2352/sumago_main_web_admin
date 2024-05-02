import React, { useState } from 'react';
import {
  Box,
  Typography,
  FormGroup,
  FormControlLabel,
  Button,
  Stack,
  Checkbox,
} from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import CustomTextField from '../../../components/forms/theme-elements/CustomTextField';

const AuthLogin = ({ title, subtitle, subtext }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  let nevigate = useNavigate();

  const handleSubmit = async () => {
    let newData = { email, password };
    axios
      .post('/auth/login', newData)
      .then((res) => {
        console.log("res", res.data.token);
        localStorage.setItem("token", res?.data?.token)
        localStorage.setItem('login', true);
        nevigate('/quotes');
      })
      .catch((err) => {
        console.log("err", err);
        // alert(error.response.data.message);
        // setError(error.response.data.message);
      });
    // try {
    //   const response = await axios.post('/auth/login', newData);
    //   console.log(response); // Handle success
    //   localStorage.setItem('login', true);
    //   nevigate('/quotes');
    //   // Redirect or set authentication status in your application
    // } catch (error) {
    //   alert(error.response.data.message);
    //   setError(error.response.data.message); // Handle error
    // }
  };
  return (
    <>
      {title ? (
        <Typography fontWeight="700" variant="h2" mb={1}>
          {title}
        </Typography>
      ) : null}

      {subtext}

      <Stack>
        <Box>
          <Typography
            variant="subtitle1"
            fontWeight={600}
            component="label"
            htmlFor="email"
            mb="5px"
          >
            Email Id
          </Typography>
          <CustomTextField
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            variant="outlined"
            fullWidth
          />
        </Box>
        <Box mt="25px">
          <Typography
            variant="subtitle1"
            fontWeight={600}
            component="label"
            htmlFor="password"
            mb="5px"
          >
            Password
          </Typography>
          <CustomTextField
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            variant="outlined"
            fullWidth
          />
        </Box>
        <Stack justifyContent="space-between" direction="row" alignItems="center" my={2}>
          {/* <FormGroup>
                    <FormControlLabel
                        control={<Checkbox defaultChecked />}
                        label="Remeber this Device"
                    />
                </FormGroup> */}
          <Typography
            component={Link}
            to="/"
            fontWeight="500"
            sx={{
              textDecoration: 'none',
              color: 'primary.main',
            }}
          >
            Forgot Password ?
          </Typography>
        </Stack>
      </Stack>
      <Box>
        <Button
          color="primary"
          variant="contained"
          size="large"
          fullWidth
          component={Link}
          //   to="/"
          type="button"
          onClick={handleSubmit}
        >
          Sign In
        </Button>
      </Box>
      {subtitle}
    </>
  );
};

export default AuthLogin;
