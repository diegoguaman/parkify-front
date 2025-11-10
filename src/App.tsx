import "@fontsource/lato";
import { CssBaseline, ThemeProvider } from '@mui/material';
import theme from './shared/ui/theme';
import { router } from './app/router';
import { RouterProvider } from 'react-router-dom';
import { ToastContainer } from "react-toastify";
import GlobalModal from "./shared/ui/components/GlobalModal";
// import WebSocketProvider from './providers/WebSocketProvider'; // ⚠️ Comentado temporalmente
// import ConnectionStatus from './shared/ui/components/ConnectionStatus'; // ⚠️ Comentado temporalmente

// import { useMockAvailabilityUpdates } from './features/parkings/hooks/useMockAvailabilityUpdates' // para simular cambios sin backend

const App = () => {

  //useMockAvailabilityUpdates() // para simular cambios sin backend

  return (
  <ThemeProvider theme={theme}>
    <CssBaseline />
    {/* ⚠️ WebSocketProvider comentado hasta que el backend esté listo */}
    {/* <WebSocketProvider> */}
      <RouterProvider router={router} />
      <GlobalModal />
      {/* <ConnectionStatus /> */}
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        closeOnClick
        pauseOnHover
        draggable
        theme="colored"
      />
    {/* </WebSocketProvider> */}
  </ThemeProvider>
  );
};

export default App;
