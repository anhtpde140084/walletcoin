import { useEffect, useMemo, useState } from "react";
import axios from "axios";
import {  useLocation } from "react-router-dom";

export default function useMyHistory() {
  const { state } = useLocation();

  const [data, setData] = useState();
  const [nameCoin, setNameCoin] = useState('');
  const [price, setPrice] = useState();

  const getWallet = async () => {
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/api/v1/transfer/getWallet/${state.data}`
      );
      if (res && res.data.success) {
        setNameCoin(state.nameCoin);
        setData(res.data.data);
        setPrice(state.price)
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getWallet();
  }, []);

  return {
    state,
    data,
    nameCoin,
    price
  };
}
