import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
// ---------------------------------------------------------

const Categories_items_ = async () => {
  const response = await axios.get(
    "https://ecommerce.routemisr.com/api/v1/categories"
  );
  return response.data;
};
// ---------------------------------------------------------
// --------------------createAsyncThunk-------------------------------------

// تعريف thunk لإرسال طلب POST
export const Categories_items = createAsyncThunk(
  "Categories_items",
  async (Data, thunkAPI) => {
    try {
      // استدعاء دالة API التي تستخدم axios
      const response = await Categories_items_();
   
      
      return response; // إرجاع البيانات إذا نجح الطلب
    } catch (error) {
    console.error(error)
   
      

      return thunkAPI.rejectWithValue(error.response.data); // إرجاع الخطأ إذا فشل الطلب
    }
  }
);

const Categories_items__ = createSlice({
  name: "Categories_items",
  initialState: {
    data: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // الحالة عندما يكون الطلب جارياً
      .addCase(Categories_items.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      // الحالة عندما يكون الطلب قد تم بنجاح
      .addCase(Categories_items.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload.data; // تخزين البيانات المرتجعة في الـ state
      })
      // الحالة عندما يفشل الطلب
      .addCase(Categories_items.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload; // تخزين رسالة الخطأ
      });
  },
});

export default Categories_items__.reducer;

// ---------------------------------------------------------
