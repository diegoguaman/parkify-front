import { CssBaseline, ThemeProvider } from '@mui/material';
import theme from './shared/ui/theme';
import { router } from './app/router';
import { RouterProvider } from 'react-router-dom';
{/* eliminar */}
import Header from './shared/ui/Header';
{/* eliminar */}

const App = () => (
  <ThemeProvider theme={theme}>
    {/* eliminar */}
    <Header /> 
    {/* eliminar */}
    <CssBaseline />
    <RouterProvider router={router} />
  </ThemeProvider>
);

export default App;
