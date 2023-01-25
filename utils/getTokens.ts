import http from 'axios.config';

const ACCESS_TOKEN_EXPIRATION_TIME = 3600 * 1000; // one hour expiration
const REFRESH_TOKEN_EXPIRATION_TIME = 3600 * 1000 * 24; // one day expiration

export const setTimeStamp = () => {
  if (typeof window !== 'undefined') {
    window.localStorage.setItem('token_timestamp', '' + Date.now());
  }
};

const getTimeStamp = () => {
  if (typeof window !== 'undefined') {
    const timestamp: number = Number(window.localStorage.getItem('token_timestamp'));

    return timestamp;
  }
};

export const refreshToken = async () => {
  if (typeof window !== 'undefined') {
    if (Date.now() - getTimeStamp()! > REFRESH_TOKEN_EXPIRATION_TIME) {
      window.localStorage.removeItem('token');
      window.localStorage.removeItem('token_timestamp');
      console.error('Refresh token expired. Redirecting to Login page....');
      window.location.replace('login');
    } else {
      try {
        const { data } = await http.post('/auth/token/refresh/', {
          refresh: getRefreshToken(),
        });
        const { access } = data;
        localStorage.setItem(
          'token',
          JSON.stringify({
            access_token: access,
            refresh_token: getRefreshToken(),
          }),
        );
        setTimeStamp();
        window.location.reload();
        return;
      } catch (e) {
        console.error(e);
      }
    }
  }
};

export const getAccessToken = () => {
  if (typeof window !== 'undefined') {
    const localAccessToken = getToken();

    if (getTimeStamp() !== undefined && getTimeStamp() !== 0) {
      if (Date.now() - getTimeStamp()! > ACCESS_TOKEN_EXPIRATION_TIME) {
        console.warn('Access token expired. Refreshing...');
        refreshToken();
      }
    }

    if (
      (!localAccessToken || localAccessToken === undefined) &&
      window.location.pathname !== '/login' &&
      window.location.pathname !== '/' && 
      window.location.pathname !== "/signup" && 
      window.location.pathname !== "/comingSoon" && 
      window.location.pathname !== "/404"
    ) {
      window.location.replace('login');
    }

    return localAccessToken;
  }
};

export const getRefreshToken = () => {
  if (typeof window !== 'undefined') {
    const token = JSON.parse(`${window.localStorage.getItem('token')}`);
    return token?.refresh_token;
  }
};

export const getToken = () => {
  if (typeof window !== 'undefined') {
    const token = JSON.parse(`${window.localStorage.getItem('token')}`);
    return token?.access_token;
  }
};
