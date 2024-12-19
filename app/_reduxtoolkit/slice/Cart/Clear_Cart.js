import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

import Cookies from "js-cookie";


// ---------------------------------------------------------
const ClearData_cart_ = async () => { 
   const data_Cookies_person = Cookies.get("Data_person");
    const Cookies_person  =data_Cookies_person?  JSON.parse(data_Cookies_person):"";
      const response = await axios.delete(
        `https://ecommerce.routemisr.com/api/v1/cart`, // رابط API
        {
          headers: {
            token: Cookies_person.token || "",
          },
        }
      );
      return response.data;

};
// ---------------------------------------------------------
// --------------------createAsyncThunk-------------------------------------

// تعريف thunk لإرسال طلب POST
export const Clear_cart_ = createAsyncThunk("wishlist", async (Data, thunkAPI) => {
  try {
    const response = await ClearData_cart_();


    return response; // إرجاع البيانات إذا نجح الطلب
  } catch (error) {
    console.error(error)

    return thunkAPI.rejectWithValue(error.response.data); // إرجاع الخطأ إذا فشل الطلب
  }
});

const Clear_cart__ = createSlice({
  name: "Clear_cart_",
  initialState: {
    data: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // الحالة عندما يكون الطلب جارياً
      .addCase(Clear_cart_.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      // الحالة عندما يكون الطلب قد تم بنجاح
      .addCase(Clear_cart_.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload; // تخزين البيانات المرتجعة في الـ state
      })
      // الحالة عندما يفشل الطلب
      .addCase(Clear_cart_.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload; // تخزين رسالة الخطأ
      });
  },
});

export default Clear_cart__.reducer;

// ---------------------------------------------------------
