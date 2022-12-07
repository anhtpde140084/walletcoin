import Axios from "axios";

export const login = async (data, setError) => {
  try {
    const res = await Axios.post(
      `/api/v1/auth/login`,
      data
    );
    if (res && res.data.success) {
      const user = {
        access_token: res.data.data.access_token,
        refresh_token: res.data.data.refresh_token,
        user_id: res.data.data.userId
      };
      // save to local storage
      localStorage.setItem("_user", JSON.stringify(user));
      // set error cho page
      setError('');
      return res.data;
    } else {
      setError(res.data.mes);
      return res.data;
    }
  } catch (error) {
    setError("Login fail");
  }
};
