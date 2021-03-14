import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Button, Box, TextField, Typography, Select, MenuItem, InputLabel } from '@material-ui/core'

import Axios from "axios";

const EditTodo = ({ match: { params }, history }) => {
	const user = useSelector(state => state.auth.user);
	const [value, setValue] = useState("");
	const [errors, setErrors] = useState({});
	const [priority, setPriority] = useState('');

	useEffect(() => {
		getTodo();
	}, []);

	const getTodo = async () => {
		const res = await Axios.get(`/api/todos/${user.id}/todos/${params.id}`);
		setValue(res.data.name);
		setPriority(res.data.priority)
	};

	const updateTodo = async data => {
		try {
			const res = await Axios.patch(
				`/api/todos/${user.id}/todos/edit/${params.id}`,
				data
			);
			history.push("/dashboard");
		} catch (err) {
			setErrors(err.response.data);
		}
	};

	const handleChange = async e => {
		await setValue(e.target.value);
	};

	const handleSubmit = e => {
		e.preventDefault();
		const data = {
			name: value,
			priority
		};
		updateTodo(data);
	};

	return (
		<Box display='flex' flexDirection='column' justifyContent='center'>
			<Box alignSelf='center'>
				<h1>Edit Todo</h1>
			</Box>
			<Box alignSelf='center'>

				<form onSubmit={handleSubmit}>
					<Box mt={2}>

						<TextField name="name"
							value={value}
							label="Edit Todo"
							onChange={handleChange}
						/>

					</Box>
					<Box mt={2}>
						<InputLabel id="priority">Priority</InputLabel>

						<Select
							fullWidth
							id='priority'
							label='Priority'
							name="priority"
							value={priority}
							onChange={(event) => {
								setPriority(event.target.value);
								console.log(event.target.value)
							}}
						>

							<MenuItem value={'high'}>high</MenuItem>
							<MenuItem value={'medium'}>medium</MenuItem>
							<MenuItem value={'low'}>low</MenuItem>
						</Select>
						<p className="input-error">{errors.name}</p>
					</Box>

					<Box mt={2}>
						<Button disableElevation fullWidth color="primary" type="submit" variant='contained'>Edit Todo</Button>
					</Box>
				</form>
			</Box>

		</Box>
	);
};

export default EditTodo;
