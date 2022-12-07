import React, { useState, useEffect } from 'react'
import Axios from "axios";
import next from "../../assets/next.png"
import { getMyTransferHistory } from '../../api/useTransferHistory';
import useMyHistory from './useMyTransferHistory';
import { redirect, useLocation, useNavigate, useRoutes } from 'react-router-dom';

const MyTranferHistory = () => {
    const [transferHistory, setTransferHistory] = useState([]);
    // const [totalprice, settotalprice] = useState(0);

    const { data, nameCoin, price, state } = useMyHistory();

    const navigate = useNavigate();

    const totalPrice = (item, price) => {
        if (nameCoin === 'NTC') {
            return item.total_coin_NTC * price;
        } else if (nameCoin === 'NCO') {
            return item.total_coin_NCO * price;
        } else if (nameCoin === 'NUSD') {
            return item.total_coin_NUSD * price;
        }
    }
    const totalCoin = (item) => {
        if (nameCoin === 'NTC') {
            return item.total_coin_NTC;
        } else if (nameCoin === 'NCO') {
            return item.total_coin_NCO;
        } else if (nameCoin === 'NUSD') {
            return item.total_coin_NUSD;
        }
    }

    return (
        <>
            <div className='h-screen w-full container' style={{ textAlign: "left", marginTop: "20px" }}>
                <div>
                    <p style={{ backgroundColor: "#210c34", color: "white", padding: "15px" }} className='text-lg'>My Transfer History: {nameCoin}</p>
                </div>
                <table className='border w-full text-sm text-left text-gray-500 dark:text-gray-400'>
                    <thead className='bg-gray-50 border-b-2 border-gray-200'>
                        <tr>
                            <th className='p-3 text-sm font-semibold tracking-wide text-center'>Wallet Transfer</th>
                            <th className='p-3 text-sm font-semibold tracking-wide text-center'><img src={next} style={{ width: "20px" }} /></th>
                            <th className='p-3 text-sm font-semibold tracking-wide text-center'>Wallet Receiving</th>
                            <th className='p-3 text-sm font-semibold tracking-wide text-center'>Transfer Date</th>
                            <th className='p-3 text-sm font-semibold tracking-wide text-center'>Transaction validation</th>
                            <th className='p-3 text-sm font-semibold tracking-wide text-center'>Total Coin</th>
                            <th className='p-3 text-sm font-semibold tracking-wide text-center'>Total Price</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            data && data.length ? (
                                data.slice(0, 10).map((item, index) => (
                                    <tr className='bg-white border-b' key={item.id}>
                                        <td className='p-3 text-sm text-gray-700 text-center'><b>{item.transfer_wallet_code}</b></td>
                                        <td className='p-3 text-sm text-gray-700 text-center'><img src={next} style={{ width: "20px" }} /></td>
                                        <td className='p-3 text-sm text-gray-700 text-center'><b>{item.take_wallet_code}</b></td>
                                        <td className='p-3 text-sm text-gray-700 text-center'><b style={{ fontSize: "12px" }}>{(new Date(item.createdAt)).toString().slice(0, 31)}</b></td>
                                        <td className='p-3 text-sm text-gray-700 text-center'><b>6/6</b></td>
                                        <td className='p-3 text-sm text-gray-700 text-center'>{totalCoin(item)}<b style={{ color: "#0033CC" }}>NTC</b></td>
                                        <td className='p-3 text-sm text-gray-700 text-center'>{totalPrice(item, price)} <b style={{ color: "#0033CC" }}>USD</b></td>
                                    </tr>
                                ))
                            ) : null
                        }
                    </tbody>
                </table>
            </div>
        </>
    )
}

export default MyTranferHistory
