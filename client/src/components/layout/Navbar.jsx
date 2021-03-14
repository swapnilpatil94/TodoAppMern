import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, Router, useHistory } from "react-router-dom";
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import { Button, Box } from '@material-ui/core'
import { logoutUser, setLoggedIn } from "../../redux/actions/authActions.js";

const Navbar = () => {
	const history = useHistory()
	const isLoggedIn = useSelector(state => state.auth.isLoggedIn);
	const dispatch = useDispatch();

	useEffect(() => { }, [isLoggedIn]);

	const handleLogout = () => {
		dispatch(logoutUser());
		dispatch(setLoggedIn(false));
	};
	return (
		<AppBar position="static">
			<Toolbar>
				<Box display="flex" justifyContent='space-between'>
					<Button color="inherit" onClick={() => history.push('/')}>Home</Button>

					<Box display="flex" justifyContent='space-between'>
						{isLoggedIn ? (
							<Box >
								<Button color="inherit" onClick={handleLogout}>Logout</Button>

							</Box>
						) : (
							<Box>
								<Button color="inherit" onClick={() => history.push('/register')}>Register</Button>

								<Button color="inherit" onClick={() => history.push('/login')}>Login</Button>
							</Box>
						)}
					</Box>
				</Box>

			</Toolbar>
		</AppBar>

	);
};

export default Navbar;
