import http from "axios.config";
export const getRefreshToken = () => {
  const { refresh_token } = JSON.parse(`${localStorage.getItem("token")}`);
  return refresh_token;
};

export const getAccessToken = () => {
  const { access_token } = JSON.parse(`${localStorage.getItem("token")}`);
  return access_token;
};

export const refreshToken = async () => {
  try {
    const { data } = await http.post("/auth/token/refresh/", {
      refresh: getRefreshToken(),
    });
    const { access } = data;
    localStorage.setItem(
      "token",
      JSON.stringify({
        access_token: access,
        refresh_token: getRefreshToken(),
      })
    );
    console.log(access);
  } catch (error) {
    console.log(error);
  }
};
