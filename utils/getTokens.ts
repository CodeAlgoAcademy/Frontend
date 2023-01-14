import http from 'axios.config';

const EXPIRATION_TIME = 3600 * 1000;

export const setTimeStamp = () => {
  if (typeof window !== "undefined") {
    window.localStorage.setItem('token_timestamp', ""+Date.now())
  }
}

export const getTimeStamp = () => {
  if (typeof window !== "undefined") {
    const timestamp: number = Number(window.localStorage.getItem('token_timestamp'))

    return timestamp;
  }
}

export const refreshToken = async () => {
  if (typeof window !== "undefined") {
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
        setTimeStamp()
        window.location.reload();
        return;
    } catch (e) {
        console.error(e);
    }
  }
};

export const getAccessToken = () => {
  if (typeof window !== "undefined") {
    const localAccessToken = getToken()
  
    if (getTimeStamp() !== undefined && getTimeStamp() !== 0) {
      if (Date.now() - getTimeStamp()! > EXPIRATION_TIME) {
        console.warn("Access token expired. Refreshing...");
        refreshToken()
      }
    }
  
    if ((!localAccessToken || localAccessToken === undefined) && window.location.pathname !== '/login') {
      window.location.replace('login')
    }

    return localAccessToken;
  }
}

export const getRefreshToken = () => {
  if (typeof window !== "undefined") {
    const token = JSON.parse(`${window.localStorage.getItem('token')}`);
    return token?.refresh_token;
  }
};

export const getToken = () => {
  if (typeof window !== "undefined") {
    const token = JSON.parse(`${window.localStorage.getItem('token')}`);
    return token?.access_token;
  }
};