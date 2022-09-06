import React from 'react';
import Layout from './HOC/Layout';
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider } from '@mui/material';
import { theme } from './styles/theme';
import ReduxProvider from './store/ReduxProvider';

function App() {
  return <ReduxProvider>
    <ThemeProvider theme={theme}>
      <CssBaseline enableColorScheme/>
      <Layout />
    </ThemeProvider>
  </ReduxProvider>;
}

export default App;
