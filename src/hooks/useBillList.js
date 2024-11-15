import { useEffect, useMemo } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import dayjs from 'dayjs'

import { getBillList } from '@/store/modules/billStore'

export const useBillList = () => {
  const dispatch = useDispatch()
  const { billList } = useSelector(state => state.bill)

  useEffect(() => {
    dispatch(getBillList())
  }, [dispatch])

  return { billList }
}
//根据用户选择的年份过滤账单列表
export const useYearBillList = (selectedYear) => {
  const { billList } = useBillList()
  //useMemo ( ,[])：1.它返回经过过滤的账单列表。2.一个依赖数组 [billList, selectedYear]，表示只有当 billList 或 selectedYear 发生变化时，才会重新计算 yearBills。
  const yearBills = useMemo(
    () =>
      //dayjs(item.date).get('year') 将账单的日期转换为年份，并与 selectedYear 进行比较
      billList.filter((item) => selectedYear === dayjs(item.date).get('year')),
    [billList, selectedYear]//依赖参数
  )

  return yearBills
}
////根据用户选择的年份,月份过滤账单列表
export const useMonthBillList = (selectedYear, selectedMonth) => {
  const selectedYearBills = useYearBillList(selectedYear)
  const currentBillList = useMemo(
    () =>
      selectedYearBills.filter(item => {
        return selectedMonth === dayjs(item.date).get('month')
      }),
    [selectedYearBills, selectedMonth]
  )

  return currentBillList
}
