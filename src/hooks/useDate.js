import { useState } from 'react'
import dayjs from 'dayjs'
import isToday from 'dayjs/plugin/isToday'
dayjs.extend(isToday)

export const useDate = () => {
  const [date, setDate] = useState(new Date())
  //可见性状态
  const [visible, setVisible] = useState(false)
  //日期格式化
  const dayjsDate = dayjs(date)
  //日期文本
  const dateText = dayjsDate.isToday() ? '今天' : dayjsDate.format('YYYY/MM/DD')

  //显示日期选择器
  const onShowDate = () => setVisible(true)
  //隐藏日期选择器
  const onHideDate = () => setVisible(false)
  //日期更改处理
  const onDateChange = (val) => setDate(val)

  return {
    date: dayjsDate,
    dateText,
    visible,
    onShowDate,
    onHideDate,
    onDateChange,
  }
}
