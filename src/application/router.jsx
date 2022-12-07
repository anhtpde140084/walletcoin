import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "../components/common/header";
import HomePage from "../pages/home/homePage";
import Login from "../pages/Login/Login";
import PageNotFound from "../pages/PageNotFound/PageNotFound";
import Register from "../pages/Register/Register";
import TopWallet from "../pages/Topwallet/TopWallet";
import TranferHistory from "../pages/TranferHistory/TranferHistory";
import WalletCoin from "../pages/WalletCoin/WalletCoin";
import Footer from './../components/common/footer';
import KycUser from './../pages/kycUser/KycUser';
import MyTranferHistory from "../pages/MyTranferHistory/MyTranferHistory";
import PeerToPeer from "../pages/PeerToPeer/PeerToPeer";
import ProtectedRoutes from "./ProtectRoutes";
import Profile from './../pages/Profile/Profile';
import { useDispatch, useSelector } from 'react-redux';
import { BarLoader, DoubleBubble, SlidingPebbles } from 'react-spinner-animated';
import 'react-spinner-animated/dist/index.css'

const Router = () => {
  // const { currentUser } = useSelector((state) => state.userReducer);

  // const dispatch = useDispatch();

  // useEffect(() => {
  //   dispatch(addCurrentUser('da dit pat'))
  // }, []);

  return (
    <BrowserRouter>
      {/* <DoubleBubble text={"Loading..."} bgColor={"#F0A500"}
        center={true} width={"150px"} height={"150px"} /> */}
      <div className="mainBox flex flex-col justify-between" style={{height: '100%'}}>
        <Header />
        <div className="border-b" style={{height: 'fit-content'}}>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/home" element={<HomePage />} />
            <Route path="/" element={<HomePage />} />
            <Route path="*" element={<PageNotFound />} />
            <Route element={<ProtectedRoutes />}>
              <Route path="/kyc" element={<KycUser />} />
              <Route path="/wallet" element={<WalletCoin />} />
              <Route path="/my-history" element={<MyTranferHistory />} />
              <Route path="/my-profile" element={<Profile />} />
            </Route>
            <Route path="/trading-volume" element={<TranferHistory />} />
            <Route path="/top-global" element={<TopWallet />} />
            <Route path="/peer-to-peer" element={<PeerToPeer />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </BrowserRouter>
  )
}

export default Router;