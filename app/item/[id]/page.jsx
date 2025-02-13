import React from "react";
import AxiosInstance from "@/app/_utils/axiosInstance";
import Image from "next/image";

const ItemDetails = async ({ params }) => {
  const slug = (await params).id;
  let response = await AxiosInstance.get(`/api/v1/products/${slug}`);

  let data = response.data.data;

  return (
    <div>
     
      <section>
        <div className="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 lg:px-8">
      <h2 className="text-2xl font-semibold text-gray-900 sm:text-3xl">
                 {data.title}
                </h2>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:items-center md:gap-8 justify-items-center">
            <div >
              <Image
                src={data.imageCover}
                className="rounded"
                width={370}
                height={138}
                alt="im"
          
              />
            </div>

            <div>
              <div className="max-w-lg md:max-w-none">
                <h2 className="text-2xl font-semibold text-gray-900 sm:text-3xl">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                </h2>

                <p className="mt-4 text-gray-700">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Tenetur doloremque saepe architecto maiores repudiandae amet
                  perferendis repellendus, reprehenderit voluptas sequi.
                </p>
                <p className="text-gray-700 py-4 font-bold">
                  $49.99
                  <span className="text-gray-400 line-through ml-5">$80</span>
                </p>
                <form className="mt-4 flex gap-4">
                  <button className="block w-full rounded bg-gray-100 px-4 py-3 text-sm font-medium text-gray-900 transition hover:scale-105">
                    Add to Cart
                  </button>

                  <button
                    type="button"
                    className="block w-full rounded bg-gray-900 px-4 py-3 text-sm font-medium text-white transition hover:scale-105"
                  >
                    Buy Now
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ItemDetails;
