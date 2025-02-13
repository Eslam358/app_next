"use client";

import React, { useState } from "react";
import Image from "next/image";
import AxiosInstance from "@/app/_utils/axiosInstance";
import SnackBars from "@/app/_component/global/Snackbars";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useSelector, useDispatch } from "react-redux";
import {
  Data_Person_fun_get,
  Data_Person_fun_local,
  Delete_Data_Person_,
} from "../../_reduxtoolkit/slice/global/Data_Person";

const Page = () => {
  const [success, setSuccess] = useState({});
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const router = useRouter();

  const count = useSelector((state) => state.Data_Person);
  const dispatch = useDispatch();

  function handel(e, fun) {
    fun(e);
  }

  const validateForm = () => {
    const errors = {};
    if (!email) errors.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
      errors.email = "Invalid Email format";
    if (!password) errors.password = "Password is required";
    else if (password.length < 8)
      errors.password = "Password must be at least 8 characters long";
    return errors;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    // const formData = new FormData(event.currentTarget);
    // const formJson = Object.fromEntries(formData.entries());
    // console.log(formJson);
    const errors = validateForm();
    setErrors(errors);
    if (Object.keys(errors).length > 0) {
      return;
    }

    const data = {
      email: email,
      password: password,
    };
    try {
      const response = await AxiosInstance.post("/api/v1/auth/signin", data);
      setSuccess((e) => ({
        message: `hi ${response.data.user.name}`,
        view: true,
        status: true,
      }));
      dispatch(Data_Person_fun_get(response.data));

      router.push("/");

      setTimeout(() => {
        setSuccess({});
      }, 3000);
    } catch (err) {
      setErrors((e) => ({
        ...e,
        serverError: "Something went wrong, please try again later",
      }));
      setSuccess((e) => ({
        message: "Something went wrong",
        view: true,
        status: false,
      }));
      setTimeout(() => {
        setSuccess({});
      }, 3000);

      console.log(err, "Something went wrong, please try again later");
    }
  };

  return (
    <>
      <div className="mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-lg">
          <h1 className="text-center text-2xl font-bold text-primary sm:text-3xl">
            Get started today
          </h1>

          <p className="mx-auto mt-4 max-w-md text-center text-gray-500">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Obcaecati
            sunt dolores deleniti inventore quaerat mollitia?
          </p>

          <form
            onSubmit={handleSubmit}
            className="mb-0 mt-6 space-y-4 rounded-lg p-4 shadow-lg sm:p-6 lg:p-8"
          >
            <p className="text-center text-lg font-medium">
              Sign in to your account
            </p>

            <div>
              <label htmlFor="email" className="sr-only">
                Email
              </label>

              <div className="relative">
                <input
                  onChange={(e) => handel(e.target.value, setEmail)}
                  value={email}
                  type="email"
                  className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
                  placeholder="Enter email"
                  name="email"
                  autoComplete="email"
                />

                <span className="absolute inset-y-0 end-0 grid place-content-center px-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="size-4 text-gray-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
                    />
                  </svg>
                </span>
              </div>
              {errors.email && (
                <p className="text-red-500 text-xs">{errors.email}</p>
              )}
            </div>

            <div>
              <label htmlFor="password" className="sr-only">
                Password
              </label>

              <div className="relative">
                <input
                  onChange={(e) => handel(e.target.value, setPassword)}
                  value={password}
                  type="password"
                  className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
                  placeholder="Enter password"
                autoComplete="current-password"
                />

                <span className="absolute inset-y-0 end-0 grid place-content-center px-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="size-4 text-gray-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                    />
                  </svg>
                </span>
              </div>
              <p className="ml-2  text-xs text-secondary">{errors.password}</p>
            </div>

            <button
              type="submit"
              className="block w-full rounded-lg bg-primary px-5 py-3 text-sm font-medium text-white"
            >
              Sign in
            </button>

            <p className="text-center text-sm text-gray-500">
              No account?
              <Link className="underline" href="/Register">
                Register
              </Link>
            </p>
          </form>
        </div>
      </div>

      {success.view && (
        <SnackBars text={success.message} state={success.status} />
      )}
    </>
  );
};

export default Page;
