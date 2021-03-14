import React, { useState, useEffect } from "react";
import Axios from "axios";
import { useSelector } from "react-redux";
import moment from "moment";
import { Button, Box, TextField, Typography, IconButton } from '@material-ui/core'

const TodoDetails = ({ match: { params } }) => {
	const [todo, setTodo] = useState({});
	const user = useSelector(state => state.auth.user);

	useEffect(() => {
		loadData();
	}, []);

	const loadData = async () => {
		let res = await Axios.get(`/api/todos/${user.id}/todos/${params.id}`);
		setTodo(res.data);
	};

	return (
		<Box p={2.5}>
			<h1>Details</h1>
			<hr />
			<Typography variant='body1'> Name : {todo.name} </Typography>
			<Typography variant='body1'> Priority : {todo.priority} </Typography>

			<Typography variant='body1'> Created by :  {user.name} </Typography>
			<Typography variant='body1'> Created on{" : "}
				{moment(todo.date).format("dddd, MMMM Do YYYY, h:mm:ss a")} </Typography>
		</Box >
	);
};

export default TodoDetails;
