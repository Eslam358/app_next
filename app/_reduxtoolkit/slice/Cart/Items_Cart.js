import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import Cookies from "js-cookie";
import AxiosInstance from "@/axiosInstance";
// ---------------------------------------------------------

const cart_items_ = async () => {
  let response = await AxiosInstance.get("/api/v1/cart");
  console.log("cart_items_", response);

  return response.data;
};
// ---------------------------------------------------------
// --------------------createAsyncThunk-------------------------------------

// تعريف thunk لإرسال طلب POST
export const cart_items = createAsyncThunk(
  "cart_items",
  async (Data, thunkAPI) => {
    try {
      // استدعاء دالة API التي تستخدم axios
      const response = await cart_items_();
      console.log(response)

      return response; // إرجاع البيانات إذا نجح الطلب
    } catch (error) {
      console.error(error);

      return thunkAPI.rejectWithValue(error.response.data); // إرجاع الخطأ إذا فشل الطلب
    }
  }
);

const cart_items__ = createSlice({
  name: "cart_items",
  initialState: {
    data: {
      totalCartPrice: 0,
      products: [],
    },
    loading: false,
    error: null,
  },
  reducers: {
    refresh_cart: (state, action) => {
      state.data = action.payload;
    },
    Update_cart: (state, action) => {
      const findindex_product = state.data.products.findIndex(
        (item) => item.product.id === action.payload.id
      );
      if (findindex_product !== -1) {
        state.data.products[findindex_product].count = action.payload.count;
      }
    },

    Add_cart: (state, action) => {
      state.data.totalCartPrice = action.payload.cartAdd.totalCartPrice;

      const findindex_product = state.data.products?.findIndex(
        (item) => item.product.id === action.payload.item.id
      );
      const find_product = action.payload.cartAdd.products.find(
        (item) => item.product === action.payload.item.id
      );
      if (findindex_product === -1) {
        state.data.products.push({
          ...find_product,
          product: action.payload.item,
        });
      } else if (findindex_product) {
        state.data.products[findindex_product].count = find_product.count;
      }
    },
    Remove_cart: (state, action) => {
      const findindex_product = state.data.products.findIndex(
        (item) => item.product.id === action.payload
      );
      if (findindex_product !== -1) {
        state.data.products.splice(findindex_product, 1);
      }
    },
  },
  extraReducers: (builder) => {
    builder
      // الحالة عندما يكون الطلب جارياً
      .addCase(cart_items.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      // الحالة عندما يكون الطلب قد تم بنجاح
      .addCase(cart_items.fulfilled, (state, action) => {
        state.loading = false;
        state.data.products = action.payload.data.products;
        console.log(" state.data.products = action.payload.data.products",action.payload.data.products )
        state.data.totalCartPrice = action.payload.data.totalCartPrice;
      })
      // الحالة عندما يفشل الطلب
      .addCase(cart_items.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { refresh_cart, Add_cart, Remove_cart, Update_cart } =
  cart_items__.actions;
export default cart_items__.reducer;

// ---------------------------------------------------------
/*
{_id: '672ad3794f0f1ef513f844f6', cartOwner: '66db34fbb4b0251d8d9698a1', products: Array(7), createdAt: '2024-11-06T02:24:57.770Z', updatedAt: '2024-11-23T06:28:32.214Z', …}
cartOwner
: 
"66db34fbb4b0251d8d9698a1"
createdAt
: 
"2024-11-06T02:24:57.770Z"
products
: 
Array(7)
0
: 
count
: 
1
price
: 
42960
product
: 
brand
: 
{_id: '64089faf24b25627a25315cd', name: 'Dell', slug: 'dell', image: 'https://ecommerce.routemisr.com/Route-Academy-brands/1678286767914.png'}
category
: 
{_id: '6439d2d167d9aa4ca970649f', name: 'Electronics', slug: 'electronics', image: 'https://ecommerce.routemisr.com/Route-Academy-categories/1681511121316.png'}
id
: 
"6408da1c6406cd15828e8f0a"
imageCover
: 
"https://ecommerce.routemisr.com/Route-Academy-products/1678301723274-cover.jpeg"
quantity
: 
253
ratingsAverage
: 
4.3
subcategory
: 
[{…}]
title
: 
"Victus 16-D1016Ne Laptop With 16-Inch Display Core I7-12700H Processor 16Gb Ram 1Tb Nvidia Geforce Rtx3050 Ti Graphics English/Arabic Ceramic White"
_id
: 
"6408da1c6406cd15828e8f0a"
[[Prototype]]
: 
Object
_id
: 
"672b0be24f0f1ef513f84fda"
[[Prototype]]
: 
Object
1
: 
{count: 8, _id: '672b49c14f0f1ef513f883c3', product: {…}, price: 170}
2
: 
{count: 2, _id: '67412881803e888e0537c204', product: {…}, price: 149}
3
: 
{count: 1, _id: '674132cf803e888e0537d398', product: {…}, price: 149}
4
: 
{count: 1, _id: '67416d50803e888e0537f289', product: {…}, price: 1949}
5
: 
{count: 1, _id: '67416ed8803e888e0537f504', product: {…}, price: 744}
6
: 
{count: 1, _id: '67417610803e888e0538334c', product: {…}, price: 4829}
length
: 
7
[[Prototype]]
: 
Array(0)
totalCartPrice
: 
52289
updatedAt
: 
"2024-11-23T06:28:32.214Z"
__v
: 
13
_id
: 
"672ad3794f0f1ef513f844f6"

.......................
products
: 
Array(7)
0
: 
count
: 
1
price
: 
42960
product
: 
brand
: 
{_id: '64089faf24b25627a25315cd', name: 'Dell', slug: 'dell', image: 'https://ecommerce.routemisr.com/Route-Academy-brands/1678286767914.png'}
category
: 
{_id: '6439d2d167d9aa4ca970649f', name: 'Electronics', slug: 'electronics', image: 'https://ecommerce.routemisr.com/Route-Academy-categories/1681511121316.png'}
id
: 
"6408da1c6406cd15828e8f0a"
imageCover
: 
"https://ecommerce.routemisr.com/Route-Academy-products/1678301723274-cover.jpeg"
quantity
: 
253
ratingsAverage
: 
4.3
subcategory
: 
[{…}]
title
: 
"Victus 16-D1016Ne Laptop With 16-Inch Display Core I7-12700H Processor 16Gb Ram 1Tb Nvidia Geforce Rtx3050 Ti Graphics English/Arabic Ceramic White"
_id
: 
"6408da1c6406cd15828e8f0a"
[[Prototype]]
: 
Object
_id
: 
"672b0be24f0f1ef513f84fda"
*/
