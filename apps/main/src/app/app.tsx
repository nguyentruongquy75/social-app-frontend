import { ToastContainer } from 'react-toastify';
import { Route, Router, Routes } from 'react-router-dom';
import { BaseLayout } from '../components/templates/layout/base.layout';
import { HomePage } from '../pages';
import { AuthPage } from '../pages/AuthPage';
import { FriendPage, FRIEND_PAGE_TYPE } from '../pages/FriendPage';
import { ProfilePage } from '../pages/ProfilePage';

import 'react-toastify/dist/ReactToastify.css';
import { io } from 'socket.io-client';
import { useEffect } from 'react';
import { EVENTS } from '../constants';
import { useRecoilState } from 'recoil';
import { userState } from '../stores';

const socket = io('http://localhost:80');

export function App() {
  const [user, _] = useRecoilState(userState);

  useEffect(() => {
    user && socket.emit(EVENTS.ONLINE, user.id);
  }, [user]);

  return (
    <>
      <Routes>
        <Route path="/auth/:type" element={<AuthPage />} />

        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/profile/:id" element={<ProfilePage />} />
        <Route
          path="/friends"
          element={<FriendPage type={FRIEND_PAGE_TYPE.FRIEND} />}
        />
        <Route
          path="/friends/invitations"
          element={<FriendPage type={FRIEND_PAGE_TYPE.INVITATION} />}
        />

        <Route path="/" element={<HomePage />} />
      </Routes>

      <ToastContainer autoClose={2000} hideProgressBar />

      <style jsx global>
        {`
          body {
            margin: 0;
            background-color: #f0f2f5;
          }
          a {
            color: inherit;
            text-decoration: none;
          }
        `}
      </style>
    </>
  );
}

export default App;
