import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import Cookies from "js-cookie";

// ---------------------------------------------------------
const postData_cart_item = async (data) => {
  const data_Cookies_person = Cookies.get("Data_person");
   const Cookies_person  =data_Cookies_person?  JSON.parse(data_Cookies_person):"";
  const response = await axios.put(
    `https://ecommerce.routemisr.com/api/v1/cart/${data.id}`, // رابط API
    {
     
    count: data.count
    },
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
export const cart_Update_quantity = createAsyncThunk("wishlist", async (Data, thunkAPI) => {
  try {
    const response = await postData_cart_item(Data);


    return response; // إرجاع البيانات إذا نجح الطلب
  } catch (error) {
    console.error(error)

    return thunkAPI.rejectWithValue(error.response.data); // إرجاع الخطأ إذا فشل الطلب
  }
});

const cart_Update_quantity_ = createSlice({
  name: "cart_Update_quantity",
  initialState: {
    data: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // الحالة عندما يكون الطلب جارياً
      .addCase(cart_Update_quantity.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      // الحالة عندما يكون الطلب قد تم بنجاح
      .addCase(cart_Update_quantity.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload.data; // تخزين البيانات المرتجعة في الـ state
      })
      // الحالة عندما يفشل الطلب
      .addCase(cart_Update_quantity.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload; // تخزين رسالة الخطأ
      });
  },
});

export default cart_Update_quantity_.reducer;

// ---------------------------------------------------------
