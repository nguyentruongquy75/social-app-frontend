import { StrictMode } from 'react';
import { SWRConfig } from 'swr';
import { RecoilRoot } from 'recoil';
import { BrowserRouter } from 'react-router-dom';
import * as ReactDOM from 'react-dom/client';

import App from './app/app';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <SWRConfig
    value={{
      refreshInterval: 1000,
    }}
  >
    <BrowserRouter>
      <RecoilRoot>
        <StrictMode>
          <App />
        </StrictMode>
      </RecoilRoot>
    </BrowserRouter>
  </SWRConfig>
);
