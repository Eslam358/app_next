import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import Cookies from "js-cookie";

// ---------------------------------------------------------
const postData_wishlist = async (data) => {
  const data_Cookies_person = Cookies.get("Data_person");
  const Cookies_person = data_Cookies_person
    ? JSON.parse(data_Cookies_person)
    : "";

  if (data.remove) {
    true;
    const response = await axios.delete(
      `https://ecommerce.routemisr.com/api/v1/wishlist/${data.id}`, // رابط API
      {
        headers: {
          token: Cookies_person.token || "",
        },
      }
    );
    return response.data;
  } else {
    const response = await axios.post(
      `https://ecommerce.routemisr.com/api/v1/wishlist`, // رابط API
      {
        productId: data.id,
      },
      {
        headers: {
          token: Cookies_person.token || "",
        },
      }
    );
    return response.data;
  }
};
// ---------------------------------------------------------
// --------------------createAsyncThunk-------------------------------------

// تعريف thunk لإرسال طلب POST
export const wishlist = createAsyncThunk("wishlist", async (Data, thunkAPI) => {
  try {
    const response = await postData_wishlist(Data);

    return response; // إرجاع البيانات إذا نجح الطلب
  } catch (error) {
    console.error(error);

    return thunkAPI.rejectWithValue(error.response.data); // إرجاع الخطأ إذا فشل الطلب
  }
});

const wishlistSlice = createSlice({
  name: "wishlistSlice",
  initialState: {
    data: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // الحالة عندما يكون الطلب جارياً
      .addCase(wishlist.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      // الحالة عندما يكون الطلب قد تم بنجاح
      .addCase(wishlist.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload; // تخزين البيانات المرتجعة في الـ state
      })
      // الحالة عندما يفشل الطلب
      .addCase(wishlist.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload; // تخزين رسالة الخطأ
      });
  },
});

export default wishlistSlice.reducer;

// ---------------------------------------------------------
