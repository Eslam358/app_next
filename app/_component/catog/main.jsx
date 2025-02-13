import Card from "./card";
import AxiosInstance from "@/app/_utils/axiosInstance";

import React from "react";

const Main = async () => {
  let response = await AxiosInstance.get("/api/v1/products");

  let data = response.data.data;
  return (
    <div>



      
      <h1 className="text-2xl font-bold text-center p-7 ">Api ssr</h1>

      <div className="mx-auto max-w-screen-xl grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 justify-items-center">
        {data.map((item) => (
          <Card key={item.id} data={item} />
        ))}
      </div>
    </div>
  );
};

export default Main;
