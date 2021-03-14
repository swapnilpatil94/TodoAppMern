import React, { useState, useEffect } from "react";
import { Button, Box, TextField, Typography, Select, MenuItem, InputLabel } from '@material-ui/core'

const AddTodo = ({ addTodo }) => {
	const [value, setValue] = useState("");
	const [errors, setErrors] = useState({});
	const [priority, setPriority] = useState('high');

	const handleChange = async e => {
		await setValue(e.target.value);
	};
	const handleSubmit = e => {
		e.preventDefault();
		let data = {
			name: value,
			priority: priority
		};
		let errors = addTodo(data);
		// console.log(errors);
		errors.then(data => {
			if (data) {
				setErrors(data.response.data);
			} else {
				setErrors({});
			}
		});
		setValue("");
	};
	return (
		<Box display='flex' flexDirection='column' justifyContent='center'>
			<Box>
				<form onSubmit={handleSubmit}>

					<TextField name="name" value={value} placeholder="Todo Here..." label="Todo" onChange={handleChange} />
					<p className="input-error">{errors.name}</p>

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

					<Box mt={2}>
						<Button disableElevation fullWidth color="primary" type="submit" variant='contained'>Add Todo</Button>
					</Box>
				</form>
			</Box>

		</Box >

	);
};

export default AddTodo;
