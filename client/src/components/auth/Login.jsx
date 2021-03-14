import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Box, TextField, Typography } from '@material-ui/core'
import { loginUser, setLoggedIn } from "../../redux/actions/authActions";
import Axios from "axios";
import setAuthToken from "../../redux/utils/setAuthToken";
import jwt_decode from "jwt-decode";

const Login = props => {
   const [state, setState] = useState({
      email: "",
      password: "",
   });
   const [errors, setErrors] = useState({});
   const dispatch = useDispatch();

   const isAuth = useSelector(state => state.auth.isAuthenticated);
   // const isLoggedIn = useSelector(state => state.auth);

   useEffect(() => {
      setState({
         email: "",
         password: "",
      });
      if (isAuth) {
         props.history.push("/dashboard");
         dispatch(setLoggedIn(true));
      }
   }, [isAuth]);

   const handleChange = async e => {
      await setState({
         ...state,
         [e.target.name]: e.target.value,
      });
   };

   const handleSubmit = e => {
      e.preventDefault();
      const userData = {
         email: state.email,
         password: state.password,
      };

      Axios.post("/api/users/login", userData)
         .then(res => {
            const { token } = res.data;
            localStorage.setItem("jwtToken", token);

            setAuthToken(token);

            const decoded = jwt_decode(token);
            dispatch(loginUser(decoded));
            dispatch(setLoggedIn(true));
         })
         .catch(err => {
            setErrors(err.response.data);
         });
   };

   return (
      <Box display='flex' flexDirection='column' justifyContent='space-between' alignContent="center">

         <Box alignSelf='center' m={3}>
            <Typography variant='body1'>Login Here
            </Typography>
         </Box>

         <Box alignSelf='center' m={3}>

            <form onSubmit={handleSubmit}>
               <TextField type='email' name="email" label="Email" onChange={handleChange} />

               <p className="input-error">
                  {errors.email || errors.emailNotFound}
               </p>
               <TextField name="password" label="Password" onChange={handleChange} />
               <p className="input-error">
                  {errors.password || errors.passwordIncorrect}
               </p>
               {/* <button type="submit">Login</button> */}

               <Button disableElevation fullWidth color="primary" type="submit" variant='contained'>Login</Button>

            </form>
         </Box >
      </Box >

   );
};

export default Login;
