import Axios from "axios";

export const getListCoin = async (setListCoin) => {
  try {
    const res = await Axios.get(
      "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=200&page=1&sparkline=true"
    );
    if (res) {
      setListCoin(res.data);
    }
  } catch (error) {
    console.log(error);
  }
};