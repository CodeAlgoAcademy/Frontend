import React, { ReactNode, useEffect } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { refreshToken } from 'utils/getTokens';
import ErrorModal from './errorModal';
import Preloader from './preloader';
import { useDispatch } from 'react-redux';
import { closePreloader } from '../store/fetchSlice';

interface Props {
  children?: ReactNode;
}
const Layout = ({ children }: Props) => {
  const dispatch = useDispatch();
  const router = useRouter();
  useEffect(() => {
    const tokens = localStorage.getItem('token');
    if (
      router.pathname !== '/login' &&
      router.pathname !== '/' &&
      router.pathname !== '/signup' &&
      !tokens
    ) {
      router.push('/login');
    }
  }, []);
  useEffect(() => {
    const tokens = localStorage.getItem('token');

    if (router.pathname !== '/login' && router.pathname !== '/signup' && tokens) {
      const interval: NodeJS.Timer = setInterval(refreshToken, 3000000);
      refreshToken();

      return () => {
        clearInterval(interval);
      };
    }
  }, []);
  useEffect(() => {
    dispatch(closePreloader());
  }, []);
  return (
    <GoogleOAuthProvider
      clientId={'http://354436342116-6kjbapf9ar5ad4rkho0hen2jndlcagff.apps.googleusercontent.com/'}
    >
      <div>
        <Head>
          <title>CodeAlgo Academy</title>
        </Head>
        <main>{children}</main>
        <ErrorModal />
        <Preloader />
      </div>
    </GoogleOAuthProvider>
  );
};

export default Layout;
