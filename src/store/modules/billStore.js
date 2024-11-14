//账单列表相关Store

import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const billStore = createSlice({
  name: 'bill',
  //数据状态
  initialState: {
    billList: []
  },
  reducers: {
    //同步修改账单方法
    setBillList (state, action) {
      state.billList = action.payload
    },
    //同步增加账单
    addBillList (state, action) {
      state.billList.push(action.payload)
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

const addBillListPost = (data) => {
  return async (dispath) => {
    //异步请求
    const res = await axios.post('http://localhost:8888/ka', data)
    //触发同步reducer
    dispath(addBillList(res.data))
  }
}

//解构createAction函数
const { setBillList, addBillList } = billStore.actions
const Billreducer = billStore.reducer
//导出
export { setBillList, addBillList, getBillList, addBillListPost }

export default Billreducer