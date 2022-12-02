export const getRefreshToken = () => {
  const { refresh_token } = JSON.parse(`${localStorage.getItem("token")}`);
  return refresh_token;
};

export const getAccessToken = () => {
  const { access_token } = JSON.parse(`${localStorage.getItem("token")}`);
  return access_token;
};
