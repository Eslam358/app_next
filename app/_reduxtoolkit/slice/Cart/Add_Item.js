import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import AxiosInstance from "@/axiosInstance";
// ---------------------------------------------------------
const postData_cart_item = async (data) => {
  let response = await AxiosInstance.post("/api/v1/cart", {  productId: data});
  console.log("response postData_cart_item", response);

  return response.data;
};

// --------------------createAsyncThunk-------------------------------------

export const cart_add_item = createAsyncThunk(
  "wishlist",
  async (Data, thunkAPI) => {
    try {
      const response = await postData_cart_item(Data);

      return response;
    } catch (error) {
      console.error(error);

      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

const cart_add_item_ = createSlice({
  name: "cart_add_item",
  initialState: {
    data: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder

      .addCase(cart_add_item.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(cart_add_item.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload; // تخزين البيانات المرتجعة في الـ state
      })
      // الحالة عندما يفشل الطلب
      .addCase(cart_add_item.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload; // تخزين رسالة الخطأ
      });
  },
});

export default cart_add_item_.reducer;

// ---------------------------------------------------------
