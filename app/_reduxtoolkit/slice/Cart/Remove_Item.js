import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import AxiosInstance from "@/axiosInstance";

// ---------------------------------------------------------
const RemoveData_cart_item = async (data) => {
  let response = await AxiosInstance.delete(`/api/v1/cart/${data}`);
  console.log("RemoveData_cart_item",response)

  return response.data;
};
// ---------------------------------------------------------
// --------------------createAsyncThunk-------------------------------------

// تعريف thunk لإرسال طلب POST
export const Remove_cart_item = createAsyncThunk(
  "wishlist",
  async (Data, thunkAPI) => {
    try {
      const response = await RemoveData_cart_item(Data);

      return response; // إرجاع البيانات إذا نجح الطلب
    } catch (error) {
      console.error(error);

      return thunkAPI.rejectWithValue(error.response.data); // إرجاع الخطأ إذا فشل الطلب
    }
  }
);

const Remove_cart_item_ = createSlice({
  name: "Remove_cart_item",
  initialState: {
    data: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // الحالة عندما يكون الطلب جارياً
      .addCase(Remove_cart_item.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      // الحالة عندما يكون الطلب قد تم بنجاح
      .addCase(Remove_cart_item.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload.data; // تخزين البيانات المرتجعة في الـ state
      })
      // الحالة عندما يفشل الطلب
      .addCase(Remove_cart_item.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload; // تخزين رسالة الخطأ
      });
  },
});

export default Remove_cart_item_.reducer;

// ---------------------------------------------------------
