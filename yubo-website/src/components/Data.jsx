import * as React from 'react';
import axios from 'axios';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import Button from '@mui/material/Button';

const RenderDetailsButton = ({ params }) => {
	const [isDeleted, setIsDeleted] = React.useState(params.row.isDeleted);
	const handleClick = async () => {
		try {
			const res = await axios.post(`http://localhost:5500/users`, {
				user: params.row,
			});
			setIsDeleted(!isDeleted);
		} catch (error) {
			console.log(error);
		}
		console.log('we are here');
	};
	return (
		<strong>
			{isDeleted ? (
				<Button onClick={handleClick}>Reactivate</Button>
			) : (
				<Button onClick={handleClick}>Remove</Button>
			)}
		</strong>
	);
};

const columns = [
	{ field: 'id', headerName: 'ID', width: 90 },
	{
		field: 'name',
		headerName: 'First name',
		width: 150,
		editable: false,
	},
	{
		field: 'username',
		headerName: 'User name',
		width: 150,
		editable: false,
	},
	{
		field: 'city',
		headerName: 'City',
		width: 110,
		editable: false,
	},
	{
		field: 'country',
		headerName: 'Country',
		width: 110,
		editable: false,
	},
	{
		field: 'isDeleted',
		headerName: 'Delete/Reactivate',
		width: 150,
		renderCell: (params) => <RenderDetailsButton params={params} />,
	},
];

export default function DataGridDemo({ rows }) {
	return (
		<div style={{ height: 400, width: '100%' }}>
			<DataGrid
				rows={rows}
				columns={columns}
				pageSize={5}
				rowsPerPageOptions={[5]}
				checkboxSelection={false}
				disableSelectionOnClick
				components={{ Toolbar: GridToolbar }}
			/>
		</div>
	);
}
