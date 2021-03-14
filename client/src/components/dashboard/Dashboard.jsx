import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
// import { logoutUser, setLoggedIn } from "../../redux/actions/authActions";
import { Button, Box, TextField, Typography } from '@material-ui/core'

import AddTodo from "../AddTodo.jsx";
import TodoList from "../TodoList.jsx";
import Axios from "axios";

const Dashboard = () => {
	const [todoList, setTodoList] = useState([]);
	const user = useSelector(state => state.auth.user);
	// const auth = useSelector(state => state.auth);
	// const dispatch = useDispatch();

	useEffect(() => {
		loadData();
	}, []);

	const loadData = async () => {
		const res = await Axios.get(`/api/todos/${user.id}/todos`);
		setTodoList(res.data);
	};

	const addTodo = async item => {
		item.user = user.id;
		try {
			await Axios.post(`/api/todos/${user.id}/todos/add-todo`, item);
			loadData();
			return;
		} catch (err) {
			return err;
		}
	};

	const deleteTodo = async id => {
		try {
			await Axios.delete(`/api/todos/${user.id}/todos/delete/${id}`);
			loadData();
		} catch (err) {
			console.log(err);
		}
	};


	return (
		<Box display='flex' flexDirection='column' justyfyContent='center'>
			<Box alignSelf='center' mt={3}>
				<Typography variant='h5' >
					Welcome, <span style={{ color: '#b71b1b' }}>{user.name}</span>{" "}
				</Typography>
				<Typography variant='body2' >
					You can start addding your task here.
				</Typography>
			</Box>


			<Box alignSelf='center' mt={5}>
				<AddTodo addTodo={addTodo} />

			</Box>

			<Box alignSelf='center' mt={3}>
				<TodoList list={todoList} deleteTodo={deleteTodo} />

			</Box>
		</Box>
	);
};

export default Dashboard;
