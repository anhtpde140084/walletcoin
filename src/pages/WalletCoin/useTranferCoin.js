import { useEffect, useMemo, useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addChangeTransfer } from "../../redux/actions/UserActions";

export default function useTranferCoin() {
  const [notifi, setNotifi] = useState("");

  const [error, setError] = useState("");

  const dispatch = useDispatch();

  const doSubmit = (dataTransfer) => {
    axios
      .post(
        `${process.env.REACT_APP_BASE_URL}/api/v1/transfer/postTrainsfer`,
        dataTransfer
      )
      .then((res) => {
        if (res.data.success) {
          dispatch(addChangeTransfer(true));
        } else {
          setNotifi(res.data.mes);
        }
      })
      .catch((e) => console.log(e));
  };

  useEffect(() => {}, []);

  return {
    notifi,
    doSubmit,
  };
}
