import { StrictMode } from 'react';
import { SWRConfig } from 'swr';
import { RecoilRoot } from 'recoil';
import { BrowserRouter } from 'react-router-dom';
import * as ReactDOM from 'react-dom/client';

import App from './app/app';
import { createTheme, ThemeProvider } from '@mui/material';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

const theme = createTheme({
  typography: {
    fontFamily: 'Segoe UI',
  },
});

root.render(
  <SWRConfig
    value={{
      refreshInterval: 1000,
    }}
  >
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <RecoilRoot>
          <StrictMode>
            <App />
          </StrictMode>
        </RecoilRoot>
      </BrowserRouter>
    </ThemeProvider>
  </SWRConfig>
);
