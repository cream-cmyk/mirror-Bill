//账单列表相关Store

import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const billStore= createSlice({
  name: 'bill',
  //数据状态
  initialState: {
    billList:[]
  },
  reducers: {
    //同步修改方法
    setBillList (state, action) {
      state.billList=action.payload
    }
  }
})

//编写异步请求
const getBillList = () => {
  return async (dispath) => {
    //异步请求
    const res = await axios.get('http://localhost:8888/ka')
    //触发同步reducer
    dispath(setBillList(res.data))
  }
  
}

//解构createAction函数
const { setBillList,} = billStore.actions
const Billreducer=billStore.reducer
//导出
export { setBillList,getBillList}

export default Billreducer