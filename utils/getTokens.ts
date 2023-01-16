import http from 'axios.config';
export const getRefreshToken = () => {
  if (typeof window !== 'undefined') {
    const token = JSON.parse(`${localStorage.getItem('token')}`);
    return token?.refresh_token;
  }
};

export const getAccessToken = () => {
  if (typeof window !== 'undefined') {
    const token = JSON.parse(`${localStorage.getItem('token')}`);
    return token?.access_token;
  }
};

export const refreshToken = async () => {
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
  } catch (error) {
    console.log(error);
  }
};
