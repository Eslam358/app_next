"use client";

import React, { useState } from "react";

const Cover = ({ setView }) => {
  return (
    <div>
      <button
        onClick={() => setView(false)}
        className="fixed end-0 top-0 z-10  bg-primary opacity-15  p-1.5 text-gray-900 transition hover:text-gray-900/75 h-full w-full "
      ></button>
    </div>
  );
};

export default Cover;
