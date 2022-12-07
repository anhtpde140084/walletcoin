import React, { useState, useEffect } from 'react';
import { AiFillLock } from 'react-icons/ai';
import { useNavigate } from 'react-router-dom';
import MyModal from '../common/Modal';
import { useSelector } from 'react-redux';

const MyTableCoin = (props) => {

    // take props
    const { data, statusKyc, alert } = props;

    const navigate = useNavigate();

    const { hasTransfer } = useSelector((state) => state.userReducer);

    useEffect(() => {
        setShowMyModal({
            isShow: false
        })
    }, [hasTransfer])


    const [showMyModal, setShowMyModal] = useState({
        isShow: false,
        type: '',
        title: "",
        showWithDraw: "",
    });

    const [walletCode, setWalletCode] = useState('');

    const [alertError, setAlertError] = useState('');

    const handleOnClose = () => {
        setShowMyModal({
            isShow: false,
            type: '',
            showWithDraw: false,
            title: '',
        })
    };

    const handleShowModalDeposit = (name, type) => {
        if (statusKyc === 2 || type === 'NUSD') {
            setAlertError('');
            switch (type) {
                case 'NUSD':
                    setWalletCode(data.coin_code_NUSD);
                    break;
                case 'NTC':
                    setWalletCode(data.coin_code_NTC);
                    break;
                case 'NCO':
                    setWalletCode(data.coin_code_NCO);
                    break;
                default:
                    break;
            }
            if (name === 'deposit') {
                setShowMyModal({
                    isShow: true,
                    type: type,
                    showWithDraw: false,
                    title: 'My Wallet Information',
                })
            } else {
                setShowMyModal({
                    isShow: true,
                    type: type,
                    showWithDraw: true,
                    title: 'Transaction Information',
                    walletCode: ''
                })
            }
        } else {
            setAlertError('Please verify your account before transaction!');
        }
    };

    const _handleGoToHistory = (data, nameCoin, price) => {
        if (statusKyc === 2 || nameCoin === 'NUSD') {
            setAlertError('');
            navigate('/my-history', { state: { data: data, nameCoin: nameCoin, price: price } });
        } else {
            setAlertError('Please verify your account before transaction!')
        }
    }
    return (
        <div className='h-full w-full'>
            {
                alertError ? (
                    <div className="notificat flex justify-center">
                        <p className={`text-center bg-red-500 p-[1px] min-w-[25%] rounded text-white`}>{alertError}</p>
                    </div>
                ) : null
            }
            {
                alert ? (
                    <div className="notificat flex justify-center">
                        <p className={`text-center bg-red-500 p-[1px] min-w-[25%] rounded text-white`}>{alert}</p>
                    </div>
                ) : null
            }
            <table className='border w-full text-sm text-left text-gray-500 dark:text-gray-400'>
                <thead className='bg-gray-50 border-b-2 border-gray-200'>
                    <tr className='w-full'>
                        <th className='p-3 text-sm font-semibold tracking-wide text-left' style={{ width: '30%' }}>COIN NAME</th>
                        <th className='p-3 text-sm font-semibold tracking-wide text-center' style={{ width: '20%' }}>AMOUNT</th>
                        <th className='p-3 text-sm font-semibold tracking-wide text-right'></th>
                        <th className='p-3 text-sm font-semibold tracking-wide text-right'></th>
                        <th className='p-3 text-sm font-semibold tracking-wide text-right'></th>
                    </tr>
                </thead>
                <tbody>
                    <tr className='border-b'>
                        <td className='p-3 text-sm text-gray-700'>
                            <div className='flex m-0 items-center justify-between'>
                                <div className="boxContent flex items-center">
                                    <img src="" className='w-5 h-5 rounded-full mr-1' />
                                    <span className='uppercase font-bold mr-2 self-cente'>NUSD</span>
                                    <span className='self-center text-gray-700 text-opacity-60'>(NCoin USD)</span>
                                </div>
                            </div>
                        </td>
                        <td className={`p-3 text-sm text-gray-700 text-center flex flex-col`}>
                            <span className='text=black font-bold text-base'>
                                {data?.total_coin_NUSD === 0 ? '00.00' : data?.total_coin_NUSD.toFixed(2)}
                            </span>
                            <span className='text-gray-500'>
                                {data?.coin_price_NUSD * data?.total_coin_NUSD === 0 ? '00.00' : (data?.coin_price_NUSD * data?.total_coin_NUSD).toFixed(2)}$
                            </span>
                        </td>
                        <td className='p-3 font-bold text-sm text-[#563672] text-center'>
                            <button className='border rounded px-2 py-1' onClick={() => handleShowModalDeposit('deposit', 'NUSD')}>
                                Deposit
                            </button>
                        </td>
                        <td className='p-3 font-bold text-sm text-[#563672] text-center'>
                            <button className='border rounded px-2 py-1' onClick={() => handleShowModalDeposit('withdraw', 'NUSD')}>
                                Withdraw
                            </button>
                        </td>
                        <td className="p-3 font-bold text-sm text-[#563672] text-center">
                            <button className='border rounded px-2 py-1' onClick={() => _handleGoToHistory(data?.coin_code_NUSD, 'NUSD', data?.coin_price_NUSD)}>
                                History
                            </button>
                        </td>
                    </tr>
                    <tr className='border-b'>
                        <td className='p-3 text-sm text-gray-700'>
                            <div className='flex m-0 items-center justify-between'>
                                <div className="boxContent flex items-center">
                                    <img src="" className='w-5 h-5 rounded-full mr-1' />
                                    <span className='uppercase font-bold mr-2 self-cente'>NTC</span>
                                    <span className='self-center text-gray-700 text-opacity-60'>(NCoin)</span>
                                </div>
                                {
                                    statusKyc !== 2 ? (<AiFillLock className='ml-2' />) : null
                                }
                            </div>
                        </td>
                        <td className={`p-3 text-sm text-gray-700 text-center flex flex-col`}>
                            <span className='text=black font-bold text-base'>
                                {data?.total_coin_NTC === 0 ? '00.00' : data?.total_coin_NTC.toFixed(2)}
                            </span>
                            <span className='text-gray-500'>
                                {data?.total_coin_NTC * data?.coin_price_NTC === 0 ? '00.00' : (data?.total_coin_NTC * data?.coin_price_NTC).toFixed(2)}$
                            </span>
                        </td>
                        <td className='p-3 font-bold text-sm text-[#563672] text-center'>
                            <button className='border rounded px-2 py-1' onClick={() => handleShowModalDeposit('deposit', 'NTC')}>
                                Deposit
                            </button>
                        </td>
                        <td className='p-3 font-bold text-sm text-[#563672] text-center'>
                            <button className='border rounded px-2 py-1' onClick={() => handleShowModalDeposit('withdraw', 'NTC')}>
                                Withdraw
                            </button>
                        </td>
                        <td className="p-3 font-bold text-sm text-[#563672] text-center">
                            <button className='border rounded px-2 py-1' onClick={() => _handleGoToHistory(data?.coin_code_NTC, 'NTC', data?.coin_price_NTC)}>
                                History
                            </button>
                        </td>
                    </tr>
                    <tr className='border-b'>
                        <td className='p-3 text-sm text-gray-700'>
                            <div className='flex m-0 items-center justify-between'>
                                <div className="boxContent flex items-center">
                                    <img src="" className='w-5 h-5 rounded-full mr-1' />
                                    <span className='uppercase font-bold mr-2 self-cente'>NCO</span>
                                    <span className='self-center text-gray-700 text-opacity-60'>(NCO Token)</span>
                                </div>
                                <AiFillLock className='ml-2' />
                            </div>
                        </td>
                        <td className={`p-3 text-sm text-gray-700 text-center flex flex-col`}>
                            <span className='text=black font-bold text-base'>
                                {data?.total_coin_NCO === 0 ? '00.00' : data?.total_coin_NCO.toFixed(2)}
                            </span>
                            <span className='text-gray-500'>
                                {data?.coin_price_NCO * data?.total_coin_NCO === 0 ? '00.00' : (data?.coin_price_NCO * data?.total_coin_NCO).toFixed(2)}$
                            </span>
                        </td>
                        <td className='p-3 font-bold text-sm text-[#563672] text-center'>
                            <button className='border rounded px-2 py-1' onClick={() => handleShowModalDeposit('deposit', 'NCO')}>
                                Deposit
                            </button>
                        </td>
                        <td className='p-3 font-bold text-sm text-[#563672] text-center'>
                            <button className='border rounded px-2 py-1' onClick={() => handleShowModalDeposit('withdraw', 'NCO')}>
                                Withdraw
                            </button>
                        </td>
                        <td className="p-3 font-bold text-sm text-[#563672] text-center">
                            <button className='border rounded px-2 py-1' onClick={() => _handleGoToHistory(data?.coin_code_NCO, 'NCO', data?.coin_price_NCO)}>
                                History
                            </button>
                        </td>
                    </tr>
                    <tr className='border-b'>
                        <td className='p-3 text-sm text-gray-700'>
                            <div className='flex m-0 items-center justify-between'>
                                <div className="boxContent flex items-center">
                                    <img src="https://assets.coingecko.com/coins/images/1/large/bitcoin.png?1547033579" className='w-5 h-5 rounded-full mr-1' />
                                    <span className='uppercase font-bold mr-2 self-cente'>BTC</span>
                                    <span className='self-center text-gray-700 text-opacity-60'>(Bitcoin)</span>
                                </div>
                                <AiFillLock className='ml-2' />
                            </div>
                        </td>
                        <td className={`p-3 text-sm text-gray-700 text-center flex flex-col`}>
                            <span className='text=black font-bold text-base'>
                                00.00
                            </span>
                            <span className='text-gray-500'>
                                00.00$
                            </span>
                        </td>
                        <td className='p-3 font-bold text-sm text-[#563672] text-center'>
                            <button className='border rounded px-2 py-1'>
                                Deposit
                            </button>
                        </td>
                        <td className='p-3 font-bold text-sm text-[#563672] text-center'>
                            <button className='border rounded px-2 py-1'>
                                Withdraw
                            </button>
                        </td>
                        <td className="p-3 font-bold text-sm text-[#563672] text-center">
                            <button className='border rounded px-2 py-1'>
                                History
                            </button>
                        </td>
                    </tr>
                    <tr className='border-b'>
                        <td className='p-3 text-sm text-gray-700'>
                            <div className='flex m-0 items-center justify-between'>
                                <div className="boxContent flex items-center">
                                    <img src="https://assets.coingecko.com/coins/images/325/large/Tether.png?1668148663" className='w-5 h-5 rounded-full mr-1' />
                                    <span className='uppercase font-bold mr-2 self-cente'>USDT</span>
                                    <span className='self-center text-gray-700 text-opacity-60'>(Tether USDT)</span>
                                </div>
                                <AiFillLock className='ml-2' />
                            </div>
                        </td>
                        <td className={`p-3 text-sm text-gray-700 text-center flex flex-col`}>
                            <span className='text=black font-bold text-base'>
                                00.00
                            </span>
                            <span className='text-gray-500'>
                                00.00$
                            </span>
                        </td>
                        <td className='p-3 font-bold text-sm text-[#563672] text-center'>
                            <button className='border rounded px-2 py-1'>
                                Deposit
                            </button>
                        </td>
                        <td className='p-3 font-bold text-sm text-[#563672] text-center'>
                            <button className='border rounded px-2 py-1'>
                                Withdraw
                            </button>
                        </td>
                        <td className="p-3 font-bold text-sm text-[#563672] text-center">
                            <button className='border rounded px-2 py-1'>
                                History
                            </button>
                        </td>
                    </tr>
                    <tr className='border-b'>
                        <td className='p-3 text-sm text-gray-700'>
                            <div className='flex m-0 items-center justify-between'>
                                <div className="boxContent flex items-center">
                                    <img src="https://assets.coingecko.com/coins/images/279/large/ethereum.png?1595348880" className='w-5 h-5 rounded-full mr-1' />
                                    <span className='uppercase font-bold mr-2 self-cente'>ETH</span>
                                    <span className='self-center text-gray-700 text-opacity-60'>(Ethereum)</span>
                                </div>
                                <AiFillLock className='ml-2' />
                            </div>
                        </td>
                        <td className={`p-3 text-sm text-gray-700 text-center flex flex-col`}>
                            <span className='text=black font-bold text-base'>
                                00.00
                            </span>
                            <span className='text-gray-500'>
                                00.00$
                            </span>
                        </td>
                        <td className='p-3 font-bold text-sm text-[#563672] text-center'>
                            <button className='border rounded px-2 py-1'>
                                Deposit
                            </button>
                        </td>
                        <td className='p-3 font-bold text-sm text-[#563672] text-center'>
                            <button className='border rounded px-2 py-1'>
                                Withdraw
                            </button>
                        </td>
                        <td className="p-3 font-bold text-sm text-[#563672] text-center">
                            <button className='border rounded px-2 py-1'>
                                History
                            </button>
                        </td>
                    </tr>
                    <tr className='border-b'>
                        <td className='p-3 text-sm text-gray-700'>
                            <div className='flex m-0 items-center justify-between'>
                                <div className="boxContent flex items-center">
                                    <img src="https://assets.coingecko.com/coins/images/825/large/bnb-icon2_2x.png?1644979850" className='w-5 h-5 rounded-full mr-1' />
                                    <span className='uppercase font-bold mr-2 self-cente'>BNB</span>
                                    <span className='self-center text-gray-700 text-opacity-60'>(Binance Coin)</span>
                                </div>
                                <AiFillLock className='ml-2' />
                            </div>
                        </td>
                        <td className={`p-3 text-sm text-gray-700 text-center flex flex-col`}>
                            <span className='text=black font-bold text-base'>
                                00.00
                            </span>
                            <span className='text-gray-500'>
                                00.00$
                            </span>
                        </td>
                        <td className='p-3 font-bold text-sm text-[#563672] text-center'>
                            <button className='border rounded px-2 py-1'>
                                Deposit
                            </button>
                        </td>
                        <td className='p-3 font-bold text-sm text-[#563672] text-center'>
                            <button className='border rounded px-2 py-1'>
                                Withdraw
                            </button>
                        </td>
                        <td className="p-3 font-bold text-sm text-[#563672] text-center">
                            <button className='border rounded px-2 py-1'>
                                History
                            </button>
                        </td>
                    </tr>
                    <tr className='border-b'>
                        <td className='p-3 text-sm text-gray-700'>
                            <div className='flex m-0 items-center justify-between'>
                                <div className="boxContent flex items-center">
                                    <img src="https://assets.coingecko.com/coins/images/9576/large/BUSD.png?1568947766" className='w-5 h-5 rounded-full mr-1' />
                                    <span className='uppercase font-bold mr-2 self-cente'>BUSD</span>
                                    <span className='self-center text-gray-700 text-opacity-60'>(Binance USD)</span>
                                </div>
                                <AiFillLock className='ml-2' />
                            </div>
                        </td>
                        <td className={`p-3 text-sm text-gray-700 text-center flex flex-col`}>
                            <span className='text=black font-bold text-base'>
                                00.00
                            </span>
                            <span className='text-gray-500'>
                                00.00$
                            </span>
                        </td>
                        <td className='p-3 font-bold text-sm text-[#563672] text-center'>
                            <button className='border rounded px-2 py-1'>
                                Deposit
                            </button>
                        </td>
                        <td className='p-3 font-bold text-sm text-[#563672] text-center'>
                            <button className='border rounded px-2 py-1'>
                                Withdraw
                            </button>
                        </td>
                        <td className="p-3 font-bold text-sm text-[#563672] text-center">
                            <button className='border rounded px-2 py-1'>
                                History
                            </button>
                        </td>
                    </tr>
                    <tr className='border-b'>
                        <td className='p-3 text-sm text-gray-700'>
                            <div className='flex m-0 items-center justify-between'>
                                <div className="boxContent flex items-center">
                                    <img src="https://assets.coingecko.com/coins/images/6319/thumb/USD_Coin_icon.png?1547042389" className='w-5 h-5 rounded-full mr-1' />
                                    <span className='uppercase font-bold mr-2 self-cente'>USDC</span>
                                    <span className='self-center text-gray-700 text-opacity-60'>(USD Coin)</span>
                                </div>
                                <AiFillLock className='ml-2' />
                            </div>
                        </td>
                        <td className={`p-3 text-sm text-gray-700 text-center flex flex-col`}>
                            <span className='text=black font-bold text-base'>
                                00.00
                            </span>
                            <span className='text-gray-500'>
                                00.00$
                            </span>
                        </td>
                        <td className='p-3 font-bold text-sm text-[#563672] text-center'>
                            <button className='border rounded px-2 py-1'>
                                Deposit
                            </button>
                        </td>
                        <td className='p-3 font-bold text-sm text-[#563672] text-center'>
                            <button className='border rounded px-2 py-1'>
                                Withdraw
                            </button>
                        </td>
                        <td className="p-3 font-bold text-sm text-[#563672] text-center">
                            <button className='border rounded px-2 py-1'>
                                History
                            </button>
                        </td>
                    </tr>
                    <tr className='border-b'>
                        <td className='p-3 text-sm text-gray-700'>
                            <div className='flex m-0 items-center justify-between'>
                                <div className="boxContent flex items-center">
                                    <img src="https://assets.coingecko.com/coins/images/1094/thumb/tron-logo.png?1547035066" className='w-5 h-5 rounded-full mr-1' />
                                    <span className='uppercase font-bold mr-2 self-cente'>TRX</span>
                                    <span className='self-center text-gray-700 text-opacity-60'>(Tron)</span>
                                </div>
                                <AiFillLock className='ml-2' />
                            </div>
                        </td>
                        <td className={`p-3 text-sm text-gray-700 text-center flex flex-col`}>
                            <span className='text=black font-bold text-base'>
                                00.00
                            </span>
                            <span className='text-gray-500'>
                                00.00$
                            </span>
                        </td>
                        <td className='p-3 font-bold text-sm text-[#563672] text-center'>
                            <button className='border rounded px-2 py-1'>
                                Deposit
                            </button>
                        </td>
                        <td className='p-3 font-bold text-sm text-[#563672] text-center'>
                            <button className='border rounded px-2 py-1'>
                                Withdraw
                            </button>
                        </td>
                        <td className="p-3 font-bold text-sm text-[#563672] text-center">
                            <button className='border rounded px-2 py-1'>
                                History
                            </button>
                        </td>
                    </tr>
                    <tr className='border-b'>
                        <td className='p-3 text-sm text-gray-700'>
                            <div className='flex m-0 items-center justify-between'>
                                <div className="boxContent flex items-center">
                                    <img src="https://assets.coingecko.com/coins/images/877/thumb/chainlink-new-logo.png?1547034700" className='w-5 h-5 rounded-full mr-1' />
                                    <span className='uppercase font-bold mr-2 self-cente'>LINK</span>
                                    <span className='self-center text-gray-700 text-opacity-60'>(Chainlink)</span>
                                </div>
                                <AiFillLock className='ml-2' />
                            </div>
                        </td>
                        <td className={`p-3 text-sm text-gray-700 text-center flex flex-col`}>
                            <span className='text=black font-bold text-base'>
                                00.00
                            </span>
                            <span className='text-gray-500'>
                                00.00$
                            </span>
                        </td>
                        <td className='p-3 font-bold text-sm text-[#563672] text-center'>
                            <button className='border rounded px-2 py-1'>
                                Deposit
                            </button>
                        </td>
                        <td className='p-3 font-bold text-sm text-[#563672] text-center'>
                            <button className='border rounded px-2 py-1'>
                                Withdraw
                            </button>
                        </td>
                        <td className="p-3 font-bold text-sm text-[#563672] text-center">
                            <button className='border rounded px-2 py-1'>
                                History
                            </button>
                        </td>
                    </tr>

                </tbody>
            </table>
            {
                showMyModal.isShow &&
                <MyModal isWidthDraw={showMyModal.showWithDraw} walletCode={walletCode} title={showMyModal.title} type={showMyModal.type} visible={showMyModal.isShow} onClose={handleOnClose} allCoins={data} />
            }
        </div>
    );
};

export default MyTableCoin;