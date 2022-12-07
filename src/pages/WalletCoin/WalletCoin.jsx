import React, { useEffect } from 'react'
import MyModal from '../../components/common/Modal';
import MyTableCoin from '../../components/tables/myTableCoins';
import { useState } from 'react';
import { styleGlobal } from '../../utils/styleGloba';
import useWalletCoin from './useWalletCoin';
import { useDispatch, useSelector } from 'react-redux';
import ModalAlert from './modalAlert';
import { addChangeTransfer } from '../../redux/actions/UserActions';

const WalletCoin = () => {

  const { total, wallets, statusKyc, alert } = useWalletCoin();

  const { hasTransfer } = useSelector((state) => state.userReducer);

  const [showAlertModal, setShowAlertModal] = useState(false);

  const dispatch = useDispatch();

  const handleOnClose = () => {
    dispatch(addChangeTransfer(false));
    setShowAlertModal(false);
  };

  useEffect(() => {
    if(hasTransfer) {
      setShowAlertModal(true);
    }
  }, [hasTransfer])
  

  return (
    <div className='w-full container py-5'>
      {/* {
        notifi ? (
          <div className="flex justify-center"><p className='text-center border bg-green-500 w-[200px]'>{notifi}</p></div>
        ) : null
      } */}
      <div className="boxHeader h-20 border text-white p-2 rounded h-16" style={{ background: styleGlobal.backgroundColor2 }}>
        <p className='p-0 m-0'>Estimated assets value: </p>
        <p>{`${total && total === 0 ? '---$' : "$" + total.toFixed(2)}`}</p>
      </div>

      <div className="tableCoinHave mt-5">
        <MyTableCoin data={wallets} statusKyc={statusKyc} alert={alert} />
      </div>
      <ModalAlert visible={showAlertModal} onClose={handleOnClose} />
    </div>
  )
}

export default WalletCoin
