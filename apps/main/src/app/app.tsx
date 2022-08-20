import { Route, Router, Routes } from 'react-router-dom';
import { BaseLayout } from '../components/templates/layout/base.layout';
import { HomePage } from '../pages';
import { AuthPage } from '../pages/AuthPage';
import { FriendPage } from '../pages/FriendPage';
import { ProfilePage } from '../pages/ProfilePage';

export function App() {
  return (
    <>
      {/* <Routes>
        <Route path="/auth/:type" element={<AuthPage />} />
      </Routes> */}

      {/* <FriendPage /> */}

      <ProfilePage />

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
