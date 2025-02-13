"use client";
import Image from "next/image";
import Link from "next/link";
import { useSelector, useDispatch } from "react-redux";
import { Delete_Data_Person } from "../_reduxtoolkit/slice/global/Data_Person";
import { cart_items } from "../_reduxtoolkit/slice/Cart/Items_Cart.js";
import Cover from "./global/cover";
import ViewCart from "./cart/view_cart";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const Navbar = () => {
  const user_info = useSelector((state) => state.Data_Person);
  const order = localStorage.getItem("cartOwner");
  const cart_item_ = useSelector((state) => state.cart_items);

  const Pathname = usePathname();

  const dispatch = useDispatch();
  const [view_info, setView_info] = useState(false);
  const [view_cart, setView_cart] = useState(false);
  const [viewOrder, setViewOrder] = useState(false);
  const [orderData, setOrderData] = useState({});

  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (user_info.token) {
      dispatch(cart_items());
    }
  }, [user_info.token]);

  function sig_out() {
    dispatch(Delete_Data_Person());
    setView_info(false);
  }

  return (
    <header className="bg-white">
      <div className="mx-auto flex h-16 max-w-screen-xl  items-center gap-8 px-4 sm:px-6 lg:px-8 ">
        <Link className="block text-teal-600" href="/">
          <span className="sr-only">Home</span>
          <Image src="/logo.svg" width={50} height={50} alt="logo" priority />
        </Link>

        <div className="flex flex-1 items-center justify-end md:justify-between ">
          <nav aria-label="Global" className="hidden md:block">
            <ul className="flex items-center gap-6 text-sm">
              <li>
                <a
                  className="text-gray-500 transition hover:text-gray-500/75"
                  href="#"
                >
                  {" "}
                  About{" "}
                </a>
              </li>

              <li>
                <a
                  className="text-gray-500 transition hover:text-gray-500/75"
                  href="#"
                >
                  {" "}
                  Careers{" "}
                </a>
              </li>

              <li>
                <Link
                  // style={order ? { color: "red" } : {}}
                  className={`text-gray-500 transition hover:text-gray-500/75 ${
                    order ? "text-primary" : ""
                  }`}
                  href="/order"
                >
                  {" "}
                  Order{" "}
                </Link>
              </li>

              <li>
                <a
                  className="text-gray-500 transition hover:text-gray-500/75"
                  href="#"
                >
                  {" "}
                  Services{" "}
                </a>
              </li>

              <li>
                <a
                  className="text-gray-500 transition hover:text-gray-500/75"
                  href="#"
                >
                  {" "}
                  Projects{" "}
                </a>
              </li>
            </ul>
          </nav>

          <div className="flex items-center gap-4">
            {!(isClient && user_info.message === "success") ? (
              <div className="sm:flex sm:gap-4">
                <Link
                  className="block rounded-md bg-primary px-5 py-2.5 text-sm font-medium text-white transition hover:bg-secondary"
                  href="/login"
                >
                  Login
                </Link>

                <Link
                  className="hidden rounded-md bg-gray-100 px-5 py-2.5 text-sm font-medium text-teal-600 transition hover:text-teal-600/75 sm:block"
                  href="/Register"
                >
                  Register
                </Link>
              </div>
            ) : (
              <div className="flex ">
                <div className="relative">
                  <button
                    className="  px-2 py-2.5"
                    onClick={() => setView_info(true)}
                  >
                    <Image
                      src="/person_.svg"
                      width={25}
                      height={25}
                      alt="logo"
                    />
                  </button>

                  <section
                    style={{
                      clipPath: `${
                        view_info
                          ? "polygon(0 0, 100% 0, 100% 100%, 0 100%)"
                          : "polygon(41% 0, 41% 0, 46% 100%, 46% 100%)"
                      }  `,
                      transition: "clip-path 0.3s ease-in-out",
                    }}
                    className="w-[300] rounded-3xl shadow-2xl absolute right-[-110] sm:right-0 top-14    bg-white z-20"
                  >
                    <div className="p-8 text-center sm:p-12 ">
                      <Image
                        src="/logo.svg"
                        width={30}
                        height={30}
                        alt="logo"
                        className="mx-auto mb-5"
                      />
                      <p className="flex text-sm font-semibold uppercase  text-primary justify-center gap-2">
                        <Image
                          src="/person_.svg"
                          width={25}
                          height={25}
                          alt="logo"
                        />
                        {user_info?.user?.name}
                      </p>

                      <h3 className="mt-2 text-sm ">
                        {user_info?.user?.email}
                      </h3>

                      <button
                        className="mt-8 inline-block w-full rounded-full bg-pink-600 py-2 text-sm font-bold text-white shadow-xl"
                        onClick={sig_out}
                      >
                        log out
                      </button>
                    </div>
                  </section>
                </div>
                <div className="relative">
                  <button
                    className="   px-2 py-2.5   "
                    disabled={Pathname === "/cart"}
                    onClick={() => setView_cart(!view_cart)}
                  >
                    <Image
                      src="/shopping_cart_.svg"
                      width={35}
                      height={35}
                      alt="logo"
                    />
                  </button>{" "}
                  {cart_item_.data?.products.length > 0 && (
                    <span className="absolute top-0 right-[-10] inline-flex items-center whitespace-nowrap rounded-full bg-purple-100 p-2.5 py-0.5 text-sm text-primary">
                      {cart_item_.data?.products.length}
                    </span>
                  )}
                  <ViewCart
                    view_cart={view_cart}
                    setView={setView_cart}
                    data={cart_item_}
                  />
                </div>
              </div>
            )}

            <button className="block rounded bg-gray-100 p-2.5 text-gray-600 transition hover:text-gray-600/75 md:hidden">
              <span className="sr-only">Toggle menu</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="size-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
      {view_info && <Cover setView={setView_info} />}
    </header>
  );
};

export default Navbar;
