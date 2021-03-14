import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
// import { registerUser } from "../../redux/actions/authActions";
import Axios from "axios";
import { Button, Box, TextField, Typography } from '@material-ui/core'

const Register = props => {
   const [state, setState] = useState({
      name: "",
      email: "",
      password: "",
      password2: "",
   });

   const [errors, setErrors] = useState({});

   // const dispatch = useDispatch();
   const isAuth = useSelector(state => state.auth.isAuthenticated);
   // const getErrors = useSelector(state => state.errors);

   useEffect(() => {
      setState({
         name: "",
         email: "",
         password: "",
         password2: "",
      });
   }, []);

   if (isAuth) {
      props.history.push("/dashboard");
   }

   const handleChange = async e => {
      await setState({
         ...state,
         [e.target.name]: e.target.value,
      });
   };

   const handleSubmit = e => {
      e.preventDefault();
      const newUser = {
         name: state.name,
         email: state.email,
         password: state.password,
         password2: state.password2,
      };

      Axios.post("/api/users/register", newUser)
         .then(res => {
            props.history.push("/login");
         })
         .catch(err => {
            // dispatch({
            //    type: "GET_ERRORS",
            //    payload: err.response.data,
            // });

            setErrors(err.response.data);
         });
   };

   return (
      <Box display='flex' flexDirection='column' justifyContent='space-between' alignContent="center">
         <Box alignSelf='center' m={3}>
            <Typography variant='body1'>Register Here
            </Typography>
         </Box>

         <Box alignSelf='center' m={3}>
            <form onSubmit={handleSubmit}>

               <TextField name="name" label="Name" onChange={handleChange} />

               <p className="input-error">{errors.name}</p>

               <TextField type='email' name="email" label="Email" onChange={handleChange} />

               <p className="input-error">{errors.email || errors.message}</p>

               <TextField type='password' name="password" label="Password" onChange={handleChange} />

               <p className="input-error">{errors.password}</p>

               <TextField type='password' name="password2" label="Confirm-Password" onChange={handleChange} />

               <p className="input-error">{errors.password2}</p>
               <Button disableElevation fullWidth color="primary" type="submit" variant='contained'>Register</Button>

            </form>
         </Box>
      </Box >
   );
};

export default Register;
