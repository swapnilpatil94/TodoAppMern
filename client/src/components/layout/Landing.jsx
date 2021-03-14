import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Button, Box } from '@material-ui/core'

import { setLoggedIn } from "../../redux/actions/authActions.js";
const Landing = ({ history }) => {
	const dispatch = useDispatch();
	const isAuth = useSelector(state => state.auth.isAuthenticated);
	useEffect(() => {
		if (isAuth) {
			history.push("/dashboard");
			dispatch(setLoggedIn(true));
		}
	}, []);

	return (<React.Fragment>
		<Box display='flex' flexDirection='column' alignContent='center' justifyContent='space-between'>
			<Box alignSelf='center' m={2}>
				<h1>Welcome to Todo App !</h1>
				<p>Register and login to add, edit, delete your daily tasks.</p>
			</Box>

			<Box alignSelf='center' m={2}>
				<Button color="primary" variant='contained' onClick={() => history.push('/register')}>Register</Button>
			</Box>
			<Box alignSelf='center' m={2}>
				<Button color="primary" variant='contained' onClick={() => history.push('/login')}>Login</Button>
			</Box>




		</Box>
	</React.Fragment >
	);
};

export default Landing;
