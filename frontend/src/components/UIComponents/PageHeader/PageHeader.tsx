import { AppBar, Toolbar, Typography, Button, createTheme, ThemeProvider } from '@mui/material';

const theme = createTheme({
	typography: {
		fontFamily: 'Source Code Pro, monospace',
	},
	palette: {
		background: {
			paper: '#000',
		},
	},
});

function PageHeader(): JSX.Element {
	return (
		<ThemeProvider theme={theme}>
		  <AppBar position='static' sx={{ bgcolor: 'background.paper' }}>
			<Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
			  	<Typography variant='h5'>
					qNote
			  	</Typography>
			  	<Button color='inherit'>Add Note</Button>
			</Toolbar>
		  </AppBar>
		</ThemeProvider>
	);
}

export default PageHeader;
