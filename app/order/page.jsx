"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";
import Image from "next/image";

const Page = () => {
  //   const order = localStorage.getItem("cartOwner") || undefined;
  const [orders, setOrders] = useState([]);
  /**
   * Fetch user orders from the API.
   */
  const fetchOrders = async (id) => {
    console.log(id);
    try {
      const response = await axios.get(
        `https://ecommerce.routemisr.com/api/v1/orders/user/${id}`
      );

      if (response.status === 200) {
        setOrders(response.data);
      }
    } catch (error) {
      console.error(
        "Error fetching orders:",
        error.response?.data || error.message
      );
    }
  };

  useEffect(() => {
    const localStorage_ = localStorage.getItem("cartOwner");
    if (localStorage_) {
      fetchOrders(localStorage.getItem("cartOwner"));
    }
  }, []);

  return (
    <div>
      <section>
        <div className="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
          <div className="mx-auto max-w-3xl">
            <header className="text-center">
              <h1 className="text-xl font-bold text-gray-900 sm:text-3xl">
                Your Orders
              </h1>
            </header>

            <div className="mt-8">
              {/* --------------- */}
              {orders?.map((cart) => (
                <div key={cart.id} className="">
                  <div className="mt-8">
                    <span className="relative flex justify-center">
                      <div className="absolute inset-x-0 top-1/2 h-px -translate-y-1/2 bg-transparent bg-gradient-to-r from-transparent via-gray-500 to-transparent opacity-75"></div>

                      <span className="relative z-10 bg-white px-6">
                        Orders {cart.createdAt?.replace("T", " ").slice(0, -8)}
                      </span>
                    </span>
                  </div>

                  <ul className="space-y-4 mt-8">
                    {cart?.cartItems.map((item) => (
                      <li key={item._id} className="flex items-center gap-4">
                        <Image
                          src={item.product.imageCover}
                          alt="igg"
                          width={100}
                          height={100}
                          className="size-16 rounded object-cover"
                        />

                        <div>
                          <h3 className="text-sm text-gray-900">
                            {item.product.title}
                          </h3>

                          <dl className="mt-0.5 space-y-px text-[10px] text-gray-600">
                            <div>
                              <dt className="inline">price :</dt>
                              <dd className="inline ">
                                {item.price}
                              </dd>
                            </div>

                            <div>
                              <dt className="inline text-[red]">Total :  {item.price * item.count} </dt>
                              <dd className="inline">
                                {item.product.quantity}
                              </dd>
                            </div>
                          </dl>
                        </div>

                        <div className="flex flex-1 items-center justify-end gap-2">
                          <form>
                            <label htmlFor="Line1Qty" className="sr-only">
                              {" "}
                              Quantity{" "}
                            </label>

                            <input
                              type="number"
                              min="1"
                              value={item.count}
                              readOnly
                              className="h-8 w-12 rounded border-gray-200 bg-gray-50 p-0 text-center text-xs text-gray-600 [-moz-appearance:_textfield] focus:outline-none [&::-webkit-inner-spin-button]:m-0 [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:m-0 [&::-webkit-outer-spin-button]:appearance-none"
                            />
                          </form>

                         
                        </div>
                      </li>
                    ))}
                  </ul>

                  <div className="mt-8 flex justify-end border-t border-gray-100 pt-8">
                    <div className="w-screen max-w-lg space-y-4">
                      <dl className="space-y-0.5 text-sm text-gray-700">
                        <div className="flex justify-between">
                          <dt>Subtotal</dt>
                          <dd>£ {cart.totalOrderPrice}</dd>
                        </div>

                        <div className="flex justify-between">
                          <dt>VAT</dt>
                          <dd>£00</dd>
                        </div>

                        <div className="flex justify-between">
                          <dt>Discount</dt>
                          <dd>-£00</dd>
                        </div>

                        <div className="flex justify-between !text-base font-medium">
                          <dt>Total</dt>
                          <dd>£{cart.totalOrderPrice}</dd>
                        </div>
                      </dl>
                    </div>
                  </div>
                </div>
              ))}
<div><h1>No Orders</h1></div>
              {/* --------------- */}
              <div className="mt-8 flex justify-end border-t border-gray-100 pt-8">
            
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Page;
