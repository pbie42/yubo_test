import { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Pagination from '@mui/material/Pagination';
import DataGridDemo from './components/Data';

function App() {
	const [users, setUsers] = useState([]);
	const [term, setTerm] = useState('');
	const [lastPage, setLastPage] = useState(0);

	useEffect(() => {
		const getAllUsers = async () => {
			try {
				const usersResult = await axios.post(`http://localhost:5500/page`, {
					page: 1,
				});

				setUsers(usersResult.data.users.data);
				if (usersResult.data.users.pagination.lastPage) {
					setLastPage(usersResult.data.users.pagination.lastPage);
				}
			} catch (error) {
				console.log(error);
			}
		};

		getAllUsers();
	}, []);

	const handleSearch = async () => {
		try {
			const usersResult = await axios.post(
				`http://localhost:5500/users/search`,
				{
					term,
					page: 1,
				}
			);
			setUsers(usersResult.data.users.data);
			if (usersResult.data.users.pagination.lastPage) {
				setLastPage(usersResult.data.users.pagination.lastPage);
			}
		} catch (error) {
			console.log(error);
		}
	};

	const handlePagination = async (event, value) => {
		try {
			let usersResult;
			if (term) {
				usersResult = await axios.post(
					`http://localhost:5500/users/search`,
					{
						term,
						page: value,
					}
				);
			} else
				usersResult = await axios.post(`http://localhost:5500/page`, {
					page: value,
				});
			setUsers(usersResult.data.users.data);
			if (usersResult.data.users.pagination.lastPage) {
				setLastPage(usersResult.data.users.pagination.lastPage);
			}
		} catch (error) {
			console.log(error);
		}
	};
	return (
		<div
			className="App"
			style={{
				display: 'flex',
				flexDirection: 'column',
				alignItems: 'center',
			}}
		>
			<Box>
				<TextField
					value={term}
					onChange={(e) => setTerm(e.target.value)}
					variant="outlined"
				/>
				<Button onClick={handleSearch}>Search</Button>
			</Box>
			<Pagination count={lastPage} onChange={handlePagination} />
			{users.length > 0 ? (
				<DataGridDemo rows={users} />
			) : (
				<Typography>Hello World</Typography>
			)}
		</div>
	);
}

export default App;
