import React, { useRef } from 'react'
import { useState, useMemo, useEffect } from 'react';
import { AiFillCheckCircle, AiOutlineCopy } from 'react-icons/ai';
import { QRCodeSVG } from 'qrcode.react';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import useTranferCoin from '../../pages/WalletCoin/useTranferCoin';
import { useForm } from 'react-hook-form';

const MyModal = ({ visible, onClose, title, isWidthDraw, walletCode, type, allCoins }) => {

    const [copySuccess, setCopySuccess] = useState(false);

    const [numberUsd, setNumberUsd] = useState(0);

    const [numberCoinNUSD, setNumberCoinNUSD] = useState(0);

    const [numberCoinNTC, setNumberCoinNTC] = useState(0);

    const [numberCoinNCO, setNumberCoinNCO] = useState(0);

    const [numberCoin, setNumberCoin] = useState(0);

    const { register, handleSubmit, watch, formState: { errors } } = useForm();

    const {
        doSubmit,
        notifi
    } = useTranferCoin();

    const handleOnClose = (e) => {
        if (e.target.id === 'container')
            onClose();
        setCopySuccess(false);
    }

    useEffect(() => {
        if (visible === false) {
            setNumberCoin(0);
            setNumberUsd(0);
            setCopySuccess(false);
        }
        return () => {
            setNumberCoin(0);
            setNumberUsd(0);
            setCopySuccess(false);
        }
    }, [visible])

    const handleOnChangesCoins = (e) => {
        let coins = e.target.value;
        setNumberCoin(coins);
        if (type === 'NUSD') {
            setNumberUsd(coins * allCoins.coin_price_NUSD)
        } else if (type === 'NCO') {
            setNumberUsd(coins * allCoins.coin_price_NCO)
        } else if (type === 'NTC') {
            setNumberUsd(coins * allCoins.coin_price_NTC)
        } else {
            setNumberUsd(0)
        }
    }

    const handleOnChangesUsd = (e) => {
        let coins = e.target.value;
        setNumberUsd(coins);
        if (type === 'NUSD') {
            setNumberCoin(coins / allCoins.coin_price_NUSD)
        } else if (type === 'NCO') {
            setNumberCoin(coins / allCoins.coin_price_NCO)
        } else if (type === 'NTC') {
            setNumberCoin(coins / allCoins.coin_price_NTC);
        } else {
            setNumberCoin(0)
        }
    }

    const handleGetAllCoins = () => {
        if (type === 'NUSD') {
            setNumberCoinNUSD(allCoins.total_coin_NUSD);
            setNumberCoin(allCoins.total_coin_NUSD);
            setNumberUsd(allCoins.total_coin_NUSD * allCoins.coin_price_NUSD);
        } else if (type === 'NCO') {
            setNumberCoinNCO(allCoins.total_coin_NCO);
            setNumberCoin(allCoins.total_coin_NCO);
            setNumberUsd(allCoins.total_coin_NCO * allCoins.coin_price_NCO);
        } else if (type === 'NTC') {
            setNumberCoinNTC(allCoins.total_coin_NTC);
            setNumberCoin(allCoins.total_coin_NTC);
            setNumberUsd(allCoins.total_coin_NTC * allCoins.coin_price_NTC)
        } else {
            setNumberCoin(0)
        }
    }

    const handlePost = (data) => {
        const _user = localStorage.getItem("_user");
        const id = JSON.parse(_user).user_id;
        let dataTransfer = {};
        switch (type) {
            case 'NTC':
                dataTransfer = {
                    user_id: id,
                    transfer_wallet_code: allCoins.coin_code_NTC,
                    take_wallet_code: data.addessCode,
                    total_coin_NTC: data.numberCoins === "0" ? numberCoinNTC : data.numberCoins,
                }
                break;
            case 'NUSD':
                dataTransfer = {
                    user_id: id,
                    transfer_wallet_code: allCoins.coin_code_NUSD,
                    take_wallet_code: data.addessCode,
                    total_coin_NUSD: data.numberCoins === "0" ? numberCoinNUSD : data.numberCoins,
                }
                break;
            case 'NCO':
                dataTransfer = {
                    user_id: id,
                    transfer_wallet_code: allCoins.coin_code_NCO,
                    take_wallet_code: data.addessCode,
                    total_coin_NCO: data.numberCoins === "0" ? numberCoinNCO : data.numberCoins,
                }
                break;
            default:
                break;
        }
        if (dataTransfer !== {}) {
            doSubmit(dataTransfer);
        }
    }

    if (!visible) return null;

    return (
        <div id='container' onClick={handleOnClose} className="fixed inset-0 bg-gray-400 bg-opacity-30 backdrop-blur-sm flex justify-center items-center">
            <div className="bg-white p-2 rounded shadow">
                <div className="box w-[400px] min-h-[400px]" style={{ height: 'fit-content' }}>
                    <p className='text-center font-bold mt-1 text-lg'>
                        {title}
                    </p>
                    {
                        notifi ? (
                            <div className="notificat flex justify-center">
                                <p className={`text-center bg-red-500 min-w-[25%] rounded text-white`}>{notifi}</p>
                            </div>
                        ) : null
                    }
                    {
                        !isWidthDraw ? (
                            <>
                                <div className="border p-1 rounded codeWallet text-center flex items-center justify-center" style={{ width: 'fit-content', margin: '0 auto' }}>
                                    <span className='whitespace-nowrap overflow-hidden text-ellipsis'>
                                        <span className='font-semibold mr-1'>
                                            Network:
                                        </span>
                                        Ncoin Network
                                    </span>
                                    <div className='ml-2 rounde p-1 '>
                                        <AiFillCheckCircle className='text-green-500' />
                                    </div>
                                </div>
                                <div className="mt-2 boxImage w-50 h-50" style={{ margin: '0 auto' }}>
                                    <QRCodeSVG value={walletCode} width="100%" height="100%" />,
                                    {/* <img src='https://www.investopedia.com/thmb/hJrIBjjMBGfx0oa_bHAgZ9AWyn0=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/qr-code-bc94057f452f4806af70fd34540f72ad.png' /> */}
                                </div>
                                <div className='text-center my-2'>
                                    <div className="borderLeft"></div>
                                    <p className='font-bold'>Or</p>
                                    <div className="borderLeft"></div>
                                </div>
                                <div className="border p-1 rounded codeWallet text-center flex items-center justify-center">
                                    <span className='whitespace-nowrap overflow-hidden text-ellipsis'>{walletCode}</span>
                                    <CopyToClipboard text={walletCode}
                                        onCopy={() => setCopySuccess(true)}>
                                        <div className='pointer-events-auto ml-2 border rounded bg-gray-100 p-1 cursor-pointer'>
                                            <AiOutlineCopy />
                                        </div>
                                    </CopyToClipboard>
                                </div>
                                {
                                    copySuccess && (
                                        <div className="notifi w-full text-center mt-2">
                                            <span className='border rounded p-1 w-full text-center text-green-500 font-semibold text-xs'>Copied</span>
                                        </div>
                                    )
                                }
                            </>
                        ) : (
                            <form className="withDraw mt-4 px-5" onSubmit={handleSubmit(handlePost)}>

                                <div className="textLong rounded flex flex-col my-2">
                                    <span className='font-semibold'>Network:<span className='text-red-500'>*</span></span>
                                    <div className="bg-gray-100 text-left border p-1 rounded codeWallet text-center flex items-center justify-between">
                                        <span className='pl-2'>
                                            Ncoin Network
                                        </span>
                                        <div className='ml-2 rounde p-1 '>
                                            <AiFillCheckCircle className='text-green-500' />
                                        </div>
                                    </div>
                                </div>
                                <div className="textLong rounded flex flex-col my-2">
                                    <span className='font-semibold'>Address Wallet Reciever {type === 'NTC' && type !== '' ? 'NTC' : type === 'NUSD' ? 'NUSD' : 'NCO'}:<span className='text-red-500'>*</span></span>
                                    <input required {...register("addessCode")} placeholder='Enter address' type='text' className='border w-full h-8 pl-2' />
                                </div>
                                <div className="textLong rounded flex flex-col my-2">
                                    <div className="label flex justify-between items-center">
                                        <span className='font-semibold'>Number Coin:<span className='text-red-500'>*</span></span>
                                        <span className='text-xs cursor-pointer text-[#563672]' onClick={handleGetAllCoins}>All Coins</span>
                                    </div>
                                    <input required {...register("numberCoins")} type='number' placeholder='Enter number coin' className='border w-full h-8 pl-2' value={numberCoin} onChange={handleOnChangesCoins} />
                                </div>
                                <div className="textLong rounded flex flex-col my-2">
                                    <span className='font-semibold'>USD:<span className='text-red-500'>*</span></span>
                                    <input type='number' required {...register("numberUsd")} placeholder='Enter number USD' className='border w-full h-8 pl-2' value={numberUsd} onChange={handleOnChangesUsd} />
                                </div>
                                <div className="textLong rounded flex flex-col my-2">
                                    <span className='font-semibold'>Message (Optional):</span>
                                    <textarea placeholder='Maximum 100 characters' {...register("message")} className="pl-2 resize-none rounded-md w-full border"></textarea>
                                </div>
                                <div className="button w-full text-center mt-3">
                                    <button className='bg-[#563672] hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'>Send</button>
                                </div>
                            </form>
                        )
                    }


                </div>
            </div>
        </div>
    )
}

export default MyModal
