import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Transition } from "@headlessui/react";
import { useAuth } from "./../../hooks/useAuth";
import { styleGlobal } from "./../../utils/styleGloba";
import { FaUserAlt, FaUserCircle } from "react-icons/fa";
import {
  AiFillSetting,
  AiOutlineLogout,
  AiOutlineSetting,
} from "react-icons/ai";
const Header = (onClose) => {
  const [isOpen, setIsOpen] = useState(false);

  const auth = useAuth();
  // route
  const navigate = useNavigate();

  const location = useLocation();

  const _handleLogout = () => {
    setShowDropDown(false);
    localStorage.removeItem("_user");
    navigate("/login");
  };

  useEffect(() => {}, [auth.auth]);

  const [active, setActive] = useState("");

  const [showDropDown, setShowDropDown] = useState(false);

  useEffect(() => {
    switch (true) {
      case /wallet/.test(location.pathname):
        setActive("wallet");
        break;
      case /login/.test(location.pathname):
        setActive("login");
        break;
      case /trading-volume/.test(location.pathname):
        setActive("trading-volume");
        break;
      case /top-global/.test(location.pathname):
        setActive("top-global");
        break;
      case /peer-to-peer/.test(location.pathname):
        setActive("peer-to-peer");
        break;
      default:
        setActive("");
    }
  }, [location, active]);

  return (
    <div>
      <nav
        className="bg-purleCommon"
        style={{ background: styleGlobal.backgroundCommon }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center w-full px-16 container">
              <div className="flex-shrink-0 w-1/5">
                <img
                  onClick={() => navigate("/home")}
                  className="w-10"
                  style={{ width: "150px" }}
                  src="https://remitano.com/logo-new-white-small.png"
                  alt="Workflow"
                />
              </div>
              <div className="hidden md:block w-4/5">
                <div className="ml-20 flex justify-end items-center space-x-4 flex-shrink-1">
                  <Link
                    style={{ textDecoration: "none" }}
                    to="/peer-to-peer"
                    onClick={() => setActive("peer-to-peer")}
                    className={`hover:bg-purple-700 hover:text-white ${
                      active === "peer-to-peer" ? "text-white" : "text-gray-300"
                    } px-3 py-2 rounded-md text-sm font-medium`}
                  >
                    P2P Trading
                  </Link>

                  <Link
                    style={{ textDecoration: "none" }}
                    to="/top-global"
                    onClick={() => setActive("top-global")}
                    className={`hover:bg-purple-700 hover:text-white ${
                      active === "top-global" ? "text-white" : "text-gray-300"
                    } px-3 py-2 rounded-md text-sm font-medium no-underline`}
                  >
                    Top Global
                  </Link>

                  <Link
                    style={{ textDecoration: "none" }}
                    to="/trading-volume"
                    onClick={() => setActive("trading-volume")}
                    className={`hover:bg-purple-700 hover:text-white ${
                      active === "trading-volume"
                        ? "text-white"
                        : "text-gray-300"
                    } px-3 py-2 rounded-md text-sm font-medium`}
                  >
                    Trading Volume
                  </Link>
                  {auth.auth ? (
                    <>
                      <Link
                        style={{ textDecoration: "none" }}
                        className={`hover:bg-purple-700 hover:text-white ${
                          active === "wallet" ? "text-white" : "text-gray-300"
                        } px-3 py-2 rounded-md text-sm font-medium`}
                        to="/wallet"
                        onClick={() => setActive("wallet")}
                      >
                        Wallet
                      </Link>
                      {/* <Link
                        to="login"
                        onClick={() => setActive("login")}
                        className="text-gray-300 hover:bg-purple-700 hover:text-white hover:text-white px-3 py-2 rounded-md text-sm font-medium flex items-center"
                        style={{ width: "fit-content", textDecoration: "none" }}
                      >
                        <FaUserAlt />
                        Tran Phi ANh
                      </Link> */}
                      <div
                        className="relative px-3 py-2 rounded-md text-sm font-medium flex items-center"
                        onMouseLeave={() => setShowDropDown(!showDropDown)}
                        onMouseEnter={() => setShowDropDown(true)}
                      >
                        <button
                          className="dropDownSetting"
                          onClick={() => setShowDropDown(!showDropDown)}
                        >
                          <AiOutlineSetting size={17} color="white" />
                        </button>
                        {showDropDown ? (
                          <div
                            className="absolute bg-white rounded-sm shadow top-8 h-20 w-24 text-center"
                            style={{ left: "-50px" }}
                          >
                            <button
                              className="hover:bg-slate-300 p-2 flex justify-around font-semibold items-center w-full"
                              onClick={() => navigate("/my-profile")}
                            >
                              <FaUserAlt />
                              Profile
                            </button>
                            <button
                              className="hover:bg-slate-300 p-2 flex justify-around font-semibold items-center w-full"
                              onClick={() => _handleLogout()}
                            >
                              <AiOutlineLogout />
                              Logout
                            </button>
                          </div>
                        ) : null}
                      </div>
                      {/* <button
                        className="text-gray-300 hover:bg-purple-700 hover:text-white hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                        onClick={() => _handleLogout()}
                      >
                        Logout
                      </button> */}
                    </>
                  ) : (
                    <Link
                      style={{ textDecoration: "none" }}
                      to="login"
                      className={`hover:bg-purple-700 hover:text-white ${
                        active === "login" ? "text-white" : "text-gray-300"
                      } px-3 py-2 rounded-md text-sm font-medium`}
                    >
                      Login/Register
                    </Link>
                  )}
                </div>
              </div>
            </div>
            <div className="-mr-2 flex md:hidden">
              <button
                onClick={() => setIsOpen(!isOpen)}
                type="button"
                className="bg-gray-900 inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
                aria-controls="mobile-menu"
                aria-expanded="false"
              >
                <span className="sr-only">Open main menu</span>
                {!isOpen ? (
                  <svg
                    className="block h-6 w-6"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  </svg>
                ) : (
                  <svg
                    className="block h-6 w-6"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                )}
              </button>
            </div>
          </div>
        </div>

        <Transition
          show={isOpen}
          enter="transition ease-out duration-100 transform"
          enterFrom="opacity-0 scale-95"
          enterTo="opacity-100 scale-100"
          leave="transition ease-in duration-75 transform"
          leaveFrom="opacity-100 scale-100"
          leaveTo="opacity-0 scale-95"
        >
          {(ref) => (
            <div className="md:hidden" id="mobile-menu">
              <div ref={ref} className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                <Link
                  to="/home"
                  className="hover:bg-purple-700 hover:text-white text-white block px-3 py-2 rounded-md text-base font-medium"
                >
                  Home
                </Link>

                <Link
                  to="/peer-to-peer"
                  className="text-gray-300 hover:bg-purple-700 hover:text-white hover:text-white block px-3 py-2 rounded-md text-base font-medium"
                >
                  P2P
                </Link>

                <Link
                  to="/top-global"
                  className="text-gray-300 hover:bg-purple-700 hover:text-white hover:text-white block px-3 py-2 rounded-md text-base font-medium"
                >
                  Top Global
                </Link>

                <Link
                  to="/trading-volume"
                  className="text-gray-300 hover:bg-purple-700 hover:text-white hover:text-white block px-3 py-2 rounded-md text-base font-medium"
                >
                  Trading Volume
                </Link>
                {auth.auth ? (
                  <>
                    <Link
                      to="/wallet"
                      className="text-gray-300 hover:bg-purple-700 hover:text-white hover:text-white block px-3 py-2 rounded-md text-base font-medium"
                    >
                      Wallet
                    </Link>
                    <Link
                      to="/my-profile"
                      className="text-gray-300 hover:bg-purple-700 hover:text-white hover:text-white block px-3 py-2 rounded-md text-base font-medium"
                    >
                      Profile
                    </Link>
                    <Link
                      onClick={() => _handleLogout()}
                      className="text-gray-300 hover:bg-purple-700 hover:text-white hover:text-white block px-3 py-2 rounded-md text-base font-medium"
                    >
                      Logout
                    </Link>
                  </>
                ) : (
                  <Link
                    href="/login"
                    className="text-gray-300 hover:bg-purple-700 hover:text-white hover:text-white block px-3 py-2 rounded-md text-base font-medium"
                  >
                    Login/Register
                  </Link>
                )}
              </div>
            </div>
          )}
        </Transition>
      </nav>
    </div>
  );
};

export default Header;
