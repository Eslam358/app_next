import axios from "axios";
import Cookies from "js-cookie";
// Axios Interceptor Instance

  const data_Cookies_person = Cookies.get("Data_person");
  const Cookies_person = data_Cookies_person
    ? JSON.parse(data_Cookies_person)
    : "";


const AxiosInstance = axios.create({
  // baseURL: process.env.BASE_URL
  baseURL: "https://ecommerce.routemisr.com",
  headers: {
    "Content-Type": "application/json",
    token: Cookies_person.token || "",
  },
});


// Axios Interceptor: Response Method
AxiosInstance.interceptors.response.use(
    (response) => {
        // Can be modified response
        return response;
    },
    (error) => {
        // Handle response errors here
        console.log(error, "ooooooooooooooooooooooooooooo");
        return Promise.reject(error);
    }
);

export default AxiosInstance;
