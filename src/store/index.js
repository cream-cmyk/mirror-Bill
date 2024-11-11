//组合子模块billStore
import { configureStore } from "@reduxjs/toolkit";
import Billreducer from "./modules/billStore";

const store=configureStore({
  reducer: {
    bill:Billreducer
  }
})
export default store
