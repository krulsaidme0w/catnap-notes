import { createTheme, ThemeProvider } from '@mui/material';

import 'fontsource-roboto-mono';

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

function LeftNavbar(): JSX.Element {
	return (
		<ThemeProvider theme={theme}>
		</ThemeProvider>
	);
}

export default LeftNavbar;
