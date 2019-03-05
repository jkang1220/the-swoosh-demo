import React from 'react';
import Typography from '@material-ui/core/Typography';

const ErrorHandlingComponent = ({ message }) => {
	return (
		<div>
			<img
				alt="error"
				src="https://safetymanagementgroup.com/wp-content/uploads/2017/07/Oopsbutton.jpg"
			/>
			<Typography variant="h5" component="h5">
				UH OH SOMETHING WENT WRONG. ERROR MESSAGE:
			</Typography>
			<Typography variant="h6" component="h6">
				{message}
			</Typography>
		</div>
	);
};

export default ErrorHandlingComponent;
