import { ToastContainer } from 'react-toastify';
import { Route, Router, Routes } from 'react-router-dom';
import { BaseLayout } from '../components/templates/layout/base.layout';
import { HomePage } from '../pages';
import { AuthPage } from '../pages/AuthPage';
import { FriendPage } from '../pages/FriendPage';
import { ProfilePage } from '../pages/ProfilePage';

import 'react-toastify/dist/ReactToastify.css';

export function App() {
  return (
    <>
      <Routes>
        <Route path="/auth/:type" element={<AuthPage />} />
      </Routes>

      {/* <FriendPage /> */}

      {/* <ProfilePage /> */}

      <ToastContainer autoClose={2000} hideProgressBar />

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
