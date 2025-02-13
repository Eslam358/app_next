import axios from "axios";
import Cookies from "js-cookie";

// دالة للحصول على بيانات المستخدم من Cookies
const getCookiesData = () => {
  const data = Cookies.get("Data_person");
  try {
    return data ? JSON.parse(data) : null;
  } catch (error) {
    console.error("Error parsing cookies data:", error);
    return null;
  }
};

// إنشاء مثيل Axios
const AxiosInstance = axios.create({
  baseURL: process.env.BASE_URL || "https://ecommerce.routemisr.com",
  headers: {
    "Content-Type": "application/json",
    token: getCookiesData()?.token || "",
  },
});

// إضافة Interceptor لطلبات Axios
AxiosInstance.interceptors.request.use(
  (config) => {
    const userData = getCookiesData();
    if (userData?.token) {
      config.headers.token = userData.token;
    }
    return config;
  },
  (error) => {
    console.error("Request error:", error);
    return Promise.reject(error);
  }
);

// إضافة Interceptor لاستجابات Axios
AxiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    console.error("Response error:", error);
    return Promise.reject(error);
  }
);

export default AxiosInstance;
