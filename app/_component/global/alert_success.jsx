import Link from "next/link";
import React from "react";

const AlertSce = () => {
  return (
    <div>
      <div
        role="alert"
        className="rounded-xl border border-gray-100 text-center bg-white p-4"
      >
        <div className="flex flex-col justify-center items-center  gap-4">
          <span className="text-green-600">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="size-40"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </span>

          <div className="flex-1">
            <strong className="block font-medium text-gray-900">
              {" "}
              payment success{" "}
            </strong>
            <p className="mt-1 text-sm text-gray-700">
              Your product changes have been saved.{" "}
            </p>
          </div>

          <Link
            href={"/"}
            className="text-white rounded-full px-5 py-2 mt-4 font-bold transition  bg-cyan-600"
          >
            <span className="">Go to the Home</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AlertSce;
