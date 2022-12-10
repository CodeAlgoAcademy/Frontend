export const getRefreshToken = () => {
  if (typeof window !== 'undefined') {
    const token = JSON.parse(`${localStorage.getItem("token")}`);
    return token?.refresh_token;
  }
};

export const getAccessToken = () => {
  if (typeof window !== 'undefined') {
    const token = JSON.parse(`${localStorage.getItem("token")}`);
    return token?.access_token;
  }
};
