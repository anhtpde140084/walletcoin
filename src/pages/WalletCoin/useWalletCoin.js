import { useEffect, useMemo, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";

export default function useWalletCoin() {
  const _user = localStorage.getItem("_user");

  const [wallets, setWallets] = useState();

  const [alert, setAlert] = useState('');

  const [statusKyc, setStatusKyc] = useState(0);

  const [total, setTotal] = useState(0);

  const getWallet = async () => {
    const id = JSON.parse(_user).user_id;
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/api/v1/user/getProfile`,
        { id }
      );
      if (res && res.data.success) {
        setWallets(res.data.data.wallet);
        setStatusKyc(res.data.data.kyc.status)
      } 
    } catch (error) {
      // setAlert('Something wrong, please check receiver address!')
    }
  };

  const { hasTransfer } = useSelector((state) => state.userReducer);

  useEffect(() => {
    getWallet();
  }, [hasTransfer]);

  useMemo(() => {
    if (wallets) {
      let total =
        wallets.coin_price_NCO * wallets.total_coin_NCO +
        wallets.coin_price_NTC * wallets.total_coin_NTC +
        wallets.coin_price_NUSD * wallets.total_coin_NUSD;
      setTotal(total);
    }
  }, [wallets]);

  return {
    wallets,
    total,
    statusKyc,
  };
}
