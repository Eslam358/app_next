"use client";

import Image from "next/image";

const SnackBars = ({ text, state }) => {
  return (
    <div>
      <div className="fixed  ml-4 bottom-3">
        <div
          style={{ backgroundColor: state ? "#4CAF50" : "#f44336" }}
          className={`w-[300] flex items-center justify-between gap-4 rounded-lg border  px-5 py-3 transition-colors focus:outline-none focus:ring`}
        >
          <span className="font-medium text-white transition-colors group-hover:text-indigo-600 group-active:text-indigo-500">
            {text}
          </span>

          <span className="shrink-0 rounded-full border border-current bg-white p-2 text-indigo-600 group-active:text-indigo-500">
            {state ? (
              <Image
                className=""
                src="/check_.svg"
                width={25}
                height={25}
                alt="logo"
              />
            ) : (
              <Image
                className=""
                src="/close.svg"
                width={25}
                height={25}
                alt="logo"
              />
            )}
          </span>
        </div>
      </div>
    </div>
  );
};

export default SnackBars;
