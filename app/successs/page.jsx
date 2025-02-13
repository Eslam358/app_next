"use client";
import axios from "axios";
import Cookies from "js-cookie";
import Link from "next/link";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { cart_items } from "@/app/_reduxtoolkit/slice/Cart/Items_Cart.js";

/*************  ✨ Codeium Command ⭐  *************/
/**
 * AlertSce component handles fetching and creating orders for cart items.
 *
 * It uses user data from cookies for authentication and interacts with an external API to
 * create new orders and fetch existing orders. The component initializes the cart items
 * on mount and handles order creation once the cart items are initialized.
 *
 * @component
 */

/******  74041db9-9b61-4e24-a8af-c5cc93b4a839  *******/
const AlertSce = () => {
  console.log("0");
  const [isOrderInitialized, setIsOrderInitialized] = useState(false);
  const [orders, setOrders] = useState([]);
  const cartItems = useSelector((state) => state.cart_items);
  const dispatch = useDispatch();

  /**
   * Get user data from cookies.
   * @returns {Object|null} Parsed user data or null if unavailable/invalid.
   */
  const getCookiesData = () => {
    const data = Cookies.get("Data_person");
    try {
      return data ? JSON.parse(data) : null;
    } catch (error) {
      console.error("Error parsing cookies data:", error);
      return null;
    }
  };

  /**
   * Create a new order using the API.
   * @param {string} id - Product ID for the order.
   */
  const createOrder = async (id) => {
    const { token } = getCookiesData();

    try {
      const response = await axios.post(
        `https://ecommerce.routemisr.com/api/v1/orders/${id}`,
        {
          shippingAddress: {
            details: "details",
            phone: "01010800921",
            city: "Cairo",
          },
        },
        {
          headers: { token },
        }
      );

      console.log("Order created successfully:", response);
    } catch (error) {
      console.error(
        "Error creating order:",
        error.response?.data || error.message
      );
      alert("Failed to create the order. Please try again.");
    }
  };



  // Fetch orders and initialize cart items on component mount
  useEffect(() => {
    const initializeData = async () => {
      await dispatch(cart_items());
      setIsOrderInitialized(true);
    };

    initializeData();
    console.log("1");
  }, [dispatch]);

  // Handle order creation for cart items after initialization
  useEffect(() => {
    console.log("2", cartItems);
    if (cartItems.data?.products.length > 0 && isOrderInitialized) {
      const products = cartItems.data?.products;
      const initializeData = async () => {
        await createOrder(cartItems.cartId);
       
        localStorage.setItem("cartOwner", cartItems.cartOwner);

         dispatch(cart_items());
      };
      initializeData();
    }
  }, [isOrderInitialized]);

  return (
    <div>
     

      {/* Example of a success message */}
      <div
        role="alert"
        className="rounded-xl border py-12 border-gray-100 text-center bg-white p-4"
      >
        <div className="flex flex-col justify-center items-center gap-4">
          <span className="text-green-600 animate-bounce mt-16">
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
              Payment Success
            </strong>
            <p className="mt-1 text-sm text-gray-700">
              Your product changes have been saved.
            </p>
          </div>

          <Link
            href="/"
            className="text-white rounded-full px-5 py-2 mt-4 font-bold transition bg-cyan-600"
          >
            <span>Go to the Home</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AlertSce;
