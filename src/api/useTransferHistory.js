import axios from "axios";

export const getTransferHistoryNTC = async (setTransferHistoryNTC, setTransferData) => {
  try {
    const res = await axios.get(
      `${process.env.REACT_APP_BASE_URL}/api/v1/transfer/getTopWalletNTC`
    );

    if (res) {
      setTransferHistoryNTC(res.data.data);
      setTransferData(res.data.data);
    }

  } catch (error) {
    console.log(error);
  }
};

export const getTransferHistoryNCO = async (setTransferHistoryNCO, setTransferData) => {
  try {
    const res = await axios.get(
      `${process.env.REACT_APP_BASE_URL}/api/v1/transfer/getTopWalletNCO`
    );

    if (res) {
      setTransferHistoryNCO(res.data.data);
      setTransferData(res.data.data);
    }
  } catch (error) {
    console.log(error);
  }
  return {
    setTransferHistoryNCO,
  };
};

export const getTransferHistoryNUSD = async (setTransferHistoryNUSD, setTransferData) => {
  try {
    const res = await axios.get(
      `${process.env.REACT_APP_BASE_URL}/api/v1/transfer/getTopWalletNUSD`
    );
    if (res) {
      setTransferHistoryNUSD(res.data.data);
      setTransferData(res.data.data);
    }
  } catch (error) {
    console.log(error);
  }
  return {
    setTransferHistoryNUSD,
  };
};

export const getMyTransferHistory = async (setTransferHistory) => {
  try {
    const res = await axios.get(
      `${process.env.REACT_APP_BASE_URL}/api/v1/transfer/getHistoryTranfer`
    );
    if (res) {
      setTransferHistory(res.data.data);
    }
  } catch (error) {
    console.log(error);
  }
  return {
    setTransferHistory,
  };
};

export const searchTopWalletByCoin = async (setTransferData, text, type) => {
  try {
    const res = await axios.post(
      `${process.env.REACT_APP_BASE_URL}/api/v1/transfer/searchTopWalletByCoin`, {
        text, type
      }
    );
    if (res) {
      setTransferData(res.data.data);
    }
  } catch (error) {
    console.log(error);
  }
};
