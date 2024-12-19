// import { createSlice } from "@reduxjs/toolkit";
// import Cookies from "js-cookie";

// const save_Cookies_person = (data) => {
//   Cookies.set("Data_person", JSON.stringify(data));
// };

// const Cookies_person = (async () => {
//   const data_Cookies_person = await Cookies.get("Data_person");
//   if (data_Cookies_person || data_Cookies_person === "undefined") {
//     return  JSON.parse(data_Cookies_person)
//   }
//   return;
// })();

// const Data_Person = createSlice({
//   initialState: {},
//   name: "Data_Person",
//   reducers: {
//     Data_Person_fun_get: (state, action) => {
//       save_Cookies_person(action.payload);

//       return (state = action.payload);
//     },
//     Data_Person_fun_local: () => {
//       if (Object.keys(Cookies_person).length) {
//         return Cookies_person;
//       }
//     },
//     Delete_Data_Person_: () => {
//       Cookies.remove("Data_person");
//       return {};
//     },
//   },
// });

// export const {
//   Data_Person_fun_get,
//   Data_Person_fun_local,
//   Delete_Data_Person_,
// } = Data_Person.actions;
// export default Data_Person.reducer;

import { createSlice } from "@reduxjs/toolkit";
import Cookies from "js-cookie";

// حفظ البيانات في الكوكيز
const saveCookiesPerson = (data) => {
  Cookies.set("Data_person", JSON.stringify(data));
};

const data_Cookies_person = Cookies.get("Data_person");
// تحميل البيانات من الكوكيز
const loadCookiesPerson =
  data_Cookies_person && data_Cookies_person !== "undefined"
    ? JSON.parse(data_Cookies_person)
    : "";

// تعريف Slice
const Data_Person = createSlice({
  name: "Data_Person",
  initialState: loadCookiesPerson, // تحميل البيانات كحالة ابتدائية
  reducers: {
    // حفظ البيانات وتحديث الكوكيز
    Data_Person_fun_get: (state, action) => {
      saveCookiesPerson(action.payload);
      return action.payload;
    },
    // حذف البيانات من الحالة والكوكيز
    Delete_Data_Person: () => {
      Cookies.remove("Data_person");
      return {};
    },
  },
});

// استخراج الإجراءات والمخفض
export const { Data_Person_fun_get, Delete_Data_Person } = Data_Person.actions;
export default Data_Person.reducer;
