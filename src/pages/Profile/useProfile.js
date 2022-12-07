import { useEffect, useState } from "react";
import axios from "axios";

export default function useProfile() {
  const _user = localStorage.getItem("_user");

  const [profile, setProfile] = useState();

  const id = JSON.parse(_user).user_id;

  const getProfile = async () => {
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/api/v1/user/getProfile`,
        { id }
      );
      if (res) {
        setProfile(res.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getProfile();
  }, []);

  return {
    profile,
  };
}
