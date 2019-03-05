import React from 'react';
import Typography from '@material-ui/core/Typography';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableFooter from '@material-ui/core/TableFooter';

const ProfileTable = ({ userData }) => {
	const { username, first_name, last_name, email, address } = userData;
	const properties = [
		{ 'Username': username },
		{ 'First Name': first_name },
		{ 'Last Name': last_name },
		{ 'Email': email },
		{ 'Address': address }
	];

	return (
		<Table>
			<TableHead>
				<TableRow>
				</TableRow>
			</TableHead>
			<TableBody>
				{properties.map((item, i) => {
					return (<TableRow key={i}>
						<TableCell align="center">
							<Typography variant="h5" component="h5" inline={true}>
								{`${Object.keys(item)}: `}
							</Typography>
							<Typography variant="h5" component="h5" inline={true}>
								{item[Object.keys(item)]}
							</Typography>
						</TableCell>
					</TableRow>)
				})}
			</TableBody>
			<TableFooter>
				<TableRow>
				</TableRow>
			</TableFooter>
		</Table>
	)
};

export default ProfileTable
