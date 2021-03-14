import React from "react";
import { Link } from "react-router-dom";
import { Button, Box, TextField, Typography, IconButton } from '@material-ui/core'
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';

const TodoList = ({ list, deleteTodo }) => {
	return (
		<Box style={{ width: '50vw' }}>

			{list.map(todo => (
				<Box key={todo._id} display='flex' justifyContent='space-between' alignItems='center'
					style={{ backgroundColor: "#c590491f", borderRadius: '100px', padding: '2% 6% 2% 6%' }}
					mt={2}
				>
					<Typography variant='body2' fullWidth m={2}>
						<Link to={`/todo-details/${todo._id}`}>{todo.name}</Link>
					</Typography>
					<Box>
						<Typography variant='body2' fullWidth m={2}>
							{todo.priority}
						</Typography>
					</Box>
					<Box>
						<IconButton>
							<Link to={`/edit/${todo._id}`} className="edit">
								<EditIcon color="action" />
							</Link>
						</IconButton>
						<IconButton onClick={() => deleteTodo(todo._id)}>
							<DeleteIcon color="secondary" />
						</IconButton>
					</Box>


				</Box>
			))}

		</Box>
	);
};

export default TodoList;
