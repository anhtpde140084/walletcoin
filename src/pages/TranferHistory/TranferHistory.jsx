import React, { useState, useEffect } from 'react'
import GoogleLoginButton from '../../components/common/googleLoginButton'
import Axios from "axios";
import next from "../../assets/next.png"
import { styleGlobal } from '../../utils/styleGloba';
import Pagination from '../../components/common/Pagination';
import useDidMountEffect from '../../hooks/useDidMountEffect';
import useDebounce from './../../hooks/useDebound';

const TranferHistory = () => {
    const [TransferHistory, setTransferHistory] = useState([]);

    const [selectedValue, setSelectedValue] = useState('total_coin_NTC');

    const [selectedPage, setSelectedPage] = useState(20);

    const [offet, setOffset] = useState(0);

    const [count, setCount] = useState(0);

    const [textSearch, setTextSearch] = useState('');

    const query = useDebounce(textSearch, 500);

    useEffect(() => {
        if(query != '') {
            searchData(query)
        }
    }, [query]);

    const getTransferHistory = async () => {
        try {
            const res = await Axios.post(
                `${process.env.REACT_APP_BASE_URL}/api/v1/transfer/getHistoryTranfer`,
                { coinType: selectedValue, offset: offet, pageItem: selectedPage }
            );
            if (res && res.data.success) {
                const newData = res.data.data.slice(0, selectedPage);
                setTransferHistory(newData);
            }
        } catch (error) {
            console.log(error);
        }
    };

    const searchData = async (text) => {
        try {
            const res = await Axios.post(
                `${process.env.REACT_APP_BASE_URL}/api/v1/transfer/searchHistoryTransfer`, {
                text
            }
            );
            if (res && res.data.success) {
                const newData = res.data.data;
                setTransferHistory(newData);
            }
        } catch (error) {
            console.log(error);
        }
    };

    const _handleSearch = (e) => {
        setTextSearch(e.target.value);
    }

    const getTransferHistoryInit = async () => {
        try {
            const res = await Axios.post(
                `${process.env.REACT_APP_BASE_URL}/api/v1/transfer/getHistoryTranfer`,
                { coinType: selectedValue, offset: offet, pageItem: selectedPage }
            );
            if (res && res.data.success) {
                const newData = res.data.data.slice(0, selectedPage);
                const count = Math.ceil((res.data.data.length) / selectedPage);
                setCount(count);
                setTransferHistory(newData);
            }
        } catch (error) {
            console.log(error);
        }
    };

    const totalpricec = (totalcoin) => {
        let totalPrice = parseFloat(totalcoin) * 0.3;
        return totalPrice;
    }

    useDidMountEffect(() => {
        getTransferHistoryInit()
    }, [])

    useEffect(() => {
        getTransferHistory();
    }, [selectedValue, selectedPage, offet]);

    const _handleSelect = (e) => {
        setSelectedValue(e.target.value);
    }

    const _handleSelectPage = (e) => {
        setTextSearch('');
        setOffset(1);
        setSelectedPage(e.target.value);
        const count = Math.ceil((TransferHistory.length) / e.target.value);
        setCount(count);
    }

    const _handlePaginate = data => {
        setOffset(data);
    }

    const _handlePrev = () => {
        if (offet > 1) {
            setOffset(offet - 1);
        }
    }

    const _handleNext = () => {
        if (offet !== count) {
            setOffset(offet + 1);
        }
    }

    return (
        <>
            <div className='w-full container py-5 h-[50%]'>
                <div className="boxHeader h-20 border text-white p-2 rounded h-16 flex justify-between px-3 items-center" style={{ background: styleGlobal.backgroundColor2 }}>
                    <p className='p-0 m-0'>Transfer History</p>
                    <p className='p-0 m-0'>Total transfer: {TransferHistory ? TransferHistory.length + 1 : 0}</p>
                </div>
                <div className="my-2 flex sm:flex-row flex-col">
                    <div className="flex flex-row mb-1 sm:mb-0">
                        <div className="relative">
                            <select
                                defaultValue={selectedPage}
                                onChange={_handleSelectPage}
                                className="appearance-none h-full rounded-l border block appearance-none w-full bg-white border-gray-400 text-gray-700 py-2 px-4 pr-8 leading-tight focus:outline-none focus:bg-white focus:border-gray-500">
                                <option value="5">5</option>
                                <option value="10">10</option>
                                <option value="20">20</option>
                            </select>
                            <div
                                className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                                <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                                    <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                                </svg>
                            </div>
                        </div>
                        <div className="relative">
                            <select defaultValue={selectedValue}
                                onChange={_handleSelect}
                                className="appearance-none h-full rounded-r border sm:rounded-r-none sm:border-r-0 border-r border-b block appearance-none w-full bg-white border-gray-400 text-gray-700 py-2 px-4 pr-8 leading-tight focus:outline-none focus:border-l focus:border-r focus:bg-white focus:border-gray-500">
                                <option value="total_coin_NTC">NTC</option>
                                <option value="total_coin_NCO">NCO</option>
                                <option value="total_coin_NUSD">NUSD</option>
                            </select>
                            <div
                                className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                                <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                                    <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                                </svg>
                            </div>
                        </div>
                    </div>
                    <div className="block relative">
                        <span className="h-full absolute inset-y-0 left-0 flex items-center pl-2">
                            <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current text-gray-500">
                                <path
                                    d="M10 4a6 6 0 100 12 6 6 0 000-12zm-8 6a8 8 0 1114.32 4.906l5.387 5.387a1 1 0 01-1.414 1.414l-5.387-5.387A8 8 0 012 10z">
                                </path>
                            </svg>
                        </span>
                        <input placeholder="Search" value={textSearch} onChange={_handleSearch}
                            className="appearance-none rounded-r rounded-l sm:rounded-l-none border border-gray-400 border-b block pl-8 pr-6 py-2 w-full bg-white text-sm placeholder-gray-400 text-gray-700 focus:bg-white focus:placeholder-gray-600 focus:text-gray-700 focus:outline-none" />
                    </div>
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
                            TransferHistory && TransferHistory.length ? (
                                TransferHistory.slice(0, 10).map((item, index) => (
                                    <tr className='bg-white border-b' key={index}>
                                        <td className='p-3 text-sm text-gray-700 text-center'><b>{item.transfer_wallet_code}</b></td>
                                        <td className='p-3 text-sm text-gray-700 text-center'><img src={next} style={{ width: "20px" }} /></td>
                                        <td className='p-3 text-sm text-gray-700 text-center'><b>{item.take_wallet_code}</b></td>
                                        <td className='p-3 text-sm text-gray-700 text-center'><b style={{ fontSize: "12px" }}>{(new Date(item.createdAt)).toString().slice(0, 31)}</b></td>
                                        <td className='p-3 text-sm text-gray-700 text-center'><b>6/6</b></td>
                                        <td className='p-3 text-sm text-gray-700 text-center'>{item.totalCoin}<b style={{ color: "#0033CC" }}> {item.typeCoin}</b></td>
                                        <td className='p-3 text-sm text-gray-700 text-center'>{totalpricec(item.totalCoin).toFixed(2)} <b style={{ color: "#0033CC" }}> USD</b></td>
                                    </tr>
                                ))
                            ) : null
                        }
                    </tbody>
                </table>
                <Pagination count={count} paginate={_handlePaginate} next={_handleNext} prev={_handlePrev} />
            </div>
        </>
    )
}

export default TranferHistory