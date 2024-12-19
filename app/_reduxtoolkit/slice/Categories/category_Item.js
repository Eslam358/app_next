import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
// ---------------------------------------------------------

const Category_items_ = async () => {
  const response = await axios.get(
    "https://ecommerce.routemisr.com/api/v1/products?category=6439d2d167d9aa4ca970649f"
  );
  return response.data;
};
// ---------------------------------------------------------
// --------------------createAsyncThunk-------------------------------------

// تعريف thunk لإرسال طلب POST
export const Category_items = createAsyncThunk(
  "Category_items",
  async (Data, thunkAPI) => {
    try {
      // استدعاء دالة API التي تستخدم axios
      const response = await Category_items_();
  
      return response; // إرجاع البيانات إذا نجح الطلب
    } catch (error) {
    console.error(error)
   
      

      return thunkAPI.rejectWithValue(error.response.data); // إرجاع الخطأ إذا فشل الطلب
    }
  }
);

const Category_items__ = createSlice({
  name: "Category_items",
  initialState: {
    data: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // الحالة عندما يكون الطلب جارياً
      .addCase(Category_items.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      // الحالة عندما يكون الطلب قد تم بنجاح
      .addCase(Category_items.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload.data; // تخزين البيانات المرتجعة في الـ state
      })
      // الحالة عندما يفشل الطلب
      .addCase(Category_items.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload; // تخزين رسالة الخطأ
      });
  },
});

export default Category_items__.reducer;

// ---------------------------------------------------------
