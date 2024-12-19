import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import Cookies from "js-cookie";

// ---------------------------------------------------------

const postData_wishlist_list = async () => {
  const data_Cookies_person = Cookies.get("Data_person");
  const Cookies_person = data_Cookies_person
    ? JSON.parse(data_Cookies_person)
    : "";

  const response = await axios.get(
    "https://ecommerce.routemisr.com/api/v1/wishlist",

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
export const wishlist_list = createAsyncThunk(
  "wishlist_list",
  async (Data, thunkAPI) => {
    try {
      // استدعاء دالة API التي تستخدم axios
      const response = await postData_wishlist_list();

      return response; // إرجاع البيانات إذا نجح الطلب
    } catch (error) {
      console.error(error);

      return thunkAPI.rejectWithValue(error.response.data); // إرجاع الخطأ إذا فشل الطلب
    }
  }
);

const wishlist_listSlice = createSlice({
  name: "wishlist_listSlice",
  initialState: {
    data: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // الحالة عندما يكون الطلب جارياً
      .addCase(wishlist_list.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      // الحالة عندما يكون الطلب قد تم بنجاح
      .addCase(wishlist_list.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload.data; // تخزين البيانات المرتجعة في الـ state
      })
      // الحالة عندما يفشل الطلب
      .addCase(wishlist_list.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload; // تخزين رسالة الخطأ
      });
  },
});

export default wishlist_listSlice.reducer;

// ---------------------------------------------------------
