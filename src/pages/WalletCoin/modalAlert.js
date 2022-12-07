import React, { useEffect, useState } from "react";
import { Circles } from "react-loader-spinner";
import CountUp from "react-countup";
import pause from "../../assets/pause.png";
const ModalAlert = ({ visible, notification, onClose }) => {
  const [done, setDone] = useState(false);

  if (!visible) return null;

  const handleOnClose = (e) => {
    setDone(false);
    onClose();
  };

  return (
    <div
      id="container"
      className="fixed inset-0 bg-gray-400 bg-opacity-30 backdrop-blur-sm flex justify-center items-center"
    >
      <div className="bg-white p-2 rounded shadow">
        <div
          className="box w-[400px] min-h-[400px] flex flex-col"
          style={{ height: "fit-content" }}
        >
          <p className="text-center font-bold mt-1 text-lg">
            Transaction Validation!
          </p>

          <div className="p-1 rounded codeWallet text-center flex flex-col items-center justify-center mt-[25px]">
            {!done ? (
              <Circles
                height="120"
                width="120"
                radius="9"
                color="#563672"
                ariaLabel="loading"
                wrapperStyle
                wrapperClass
              />
            ) : (
              <img src={pause} className="-mt-1"/>
            )}

            <span className="whitespace-nowrap overflow-hidden text-ellipsis">
              Inprogress...
            </span>
            <span>
              <CountUp end={100} duration={5} onEnd={() => setDone(true)} />%
            </span>
            {done ? (
              <>
                <button
                  className="bg-purleCommon hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-[50px]"
                  onClick={handleOnClose}
                >
                  Done 6/6
                </button>
              </>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModalAlert;
