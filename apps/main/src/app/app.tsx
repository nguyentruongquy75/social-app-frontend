import { Route, Router, Routes } from 'react-router-dom';
import { AuthPage } from '../pages/AuthPage';

export function App() {
  return (
    <>
      <Routes>
        <Route path="/auth/:type" element={<AuthPage />} />
      </Routes>

      <style jsx global>
        {`
          body {
            margin: 0;
            background-color: #f0f2f5;
          }
        `}
      </style>
    </>
  );
}

export default App;
