import axios from "axios";
import { useEffect, useMemo, useState } from "react";
import { useDispatch } from "react-redux";
import { updateLoading } from "../../redux/actions/UserActions";
import { permissionKyc } from "../../utils/permission";

export const uploadImage = (files, setImage) => {
  const formData = new FormData();
  formData.append("upload_preset", "walletcoin");
  formData.append("file", files);
  formData.append("cloud_name", "dik3ynw8s");
  axios
    .post("https://api.cloudinary.com/v1_1/dik3ynw8s/upload", formData)
    .then((res) => {
      setImage(res.data);
    })
    .catch((e) => console.warn(e));
};

export default function useKycUser() {
  const [alert, setAlert] = useState("");
  const [alertColor, setAlertColor] = useState("");
  const [permission, setPermission] = useState("");
  const [issSendData, setIsSendData] = useState(false);
  const dispatch = useDispatch();

  const checkPermission = (data) => {
    if (data === permissionKyc.approve) {
      return permissionKyc.approve;
    } else if (data === permissionKyc.pending_review)
      return permissionKyc.pending_review;
    else return permissionKyc.nonKyc;
  };

  const getPermissionKyc = async () => {
    dispatch(updateLoading(true));
    try {
      const _user = localStorage.getItem("_user");
      const user_id = JSON.parse(_user).user_id;
      const res = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/api/v1/kyc/getUserKyc`,
        { user_id }
      );
      if (res && res.data.success) {
        let per = checkPermission(res.data.data.permission);
        setPermission(per);
      }
      dispatch(updateLoading(false));
    } catch (error) {
      dispatch(updateLoading(false));
    }
  };

  useEffect(() => {
    getPermissionKyc();
  }, []);

  const validate = (data) => {
    if (
      data.fullname !== "" &&
      data.birthday !== "" &&
      data.address !== "" &&
      data.card_id !== "" &&
      data.phonenumber !== "" &&
      data.image_drive !== ""
    ) {
      return true;
    } 
    // =====
    if (data.country === "United State") {
      if (
        data.ein_image !== "" &&
        data.image_passport != "" &&
        data.image_ssn !== "" &&
        data.ein_id !== "" &&
        data.ssn_id !== "" &&
        data.image_ssn !== ""
      ) {
        return true;
      }
    } 
    return false;
  };

  const doSubmit = async (data) => {
    if (validate(data)) {
      dispatch(updateLoading(true));
      try {
        const res = await axios.post(
          `${process.env.REACT_APP_BASE_URL}/api/v1/kyc/postKyc`,
          data
        );
        if (res.data.success) {
          setIsSendData(true);
          setAlert(
            "Thank for your submit! We will try to respond to you as soon as possible."
          );
          setAlertColor("green");
        } else {
          setAlert("Something wrong!");
          setAlertColor("red");
        }
        dispatch(updateLoading(false));
      } catch (error) {
        dispatch(updateLoading(false));
        setAlert("Something wrong!");
        setAlertColor("red");
      }
    } else {
      setAlert("Please enter all field!");
      setAlertColor("red");
    }
  };
  return {
    doSubmit,
    alert,
    alertColor,
    permission,
    issSendData
  };
}
