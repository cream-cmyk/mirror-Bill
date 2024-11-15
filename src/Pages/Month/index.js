/*默认导出不需要{}*/
import { NavBar, DatePicker } from 'antd-mobile'
import classNames from 'classnames'
import dayjs from 'dayjs'
import { useEffect, useMemo } from 'react'
//import { useSelector } from 'react-redux'
import './index.scss'
import _, { orderBy } from 'lodash'
import DailyBill from './components/DayBill'
import { useDate } from '@/hooks/useDate'
import { useMonthBillList } from '@/hooks/useBillList'
import { getOverview } from '@/contants'
import { useLocation } from 'react-router-dom'
import TwoLineOverview from '@/components/TwoLineOverview'

const Month = () => {
  //使用 useLocation 来获取路由状态,获取传递状态
  const { state } = useLocation()

  const { date, visible, onShowDate, onHideDate, onDateChange } = useDate()
  const selectedYear = date.get('year')
  const selectedMonth = date.get('month')
  //获取当前月账单列表
  const currentBillList = useMonthBillList(selectedYear, selectedMonth)
  //对传入的账单数据进行汇总，计算每种类型的金额并记录最后一条数据的日期
  const overView = getOverview(currentBillList)

  //数据做二次处理useMemo
  const monthBills = useMemo(() => {
    //返回计算后的值  按月分组 lodash
    const billGroup = _.groupBy(currentBillList, (item) => dayjs(item.date).format("YYYY-MM-DD"))
    const sortedKeys = orderBy(Object.keys(billGroup),
      // 转成日期数字，在进行比较
      (item) => +new Date(item),
      'desc')
    return {
      keys: sortedKeys,
      billGroup,
    }
  }, [currentBillList])
  console.log(monthBills)


  // //选择框弹状态--默认false
  // const [dateVisible, setDateVisible] = useState(false)
  // //修改日期状态
  // const [currentDate, setCurrentDate] = useState(() => {
  //   return dayjs(new Date()).format('YYYY | MM')
  // })
  // //修改当前获取月度列表
  // const [currentMonthList, setCurrentMonthList] = useState([])

  // //点击确认，调用函数
  // const onConfirmFun = (date) => {
  //   //切换弹框状态
  //   setDateVisible(false)
  //   console.log(date)
  //   //格式化回调日期
  //   const formatDate = dayjs(date).format('YYYY | MM')
  //   //修改日期view
  //   setCurrentDate(formatDate)
  //   // 根据获取到的时间作为key取当月的账单数组
  //   setCurrentMonthList(monthGroup[formatDate] || [])
  // }

  // //计算统计
  // const viewAll = useMemo(() => {
  //   //收入 currentMonthList做过滤
  //   const income = currentMonthList.filter((item) => item.type === "income")
  //     //对于数组中的每个对象 c，回调函数计算 c.money ,然后将这个值加到累积器 a 上
  //     .reduce((a, c) => a + c.money, 0)
  //   //支出
  //   const pay = currentMonthList.filter((item) => item.type === "pay")
  //     .reduce((a, c) => a + c.money, 0)
  //   return {
  //     income, pay,
  //     total: income + pay
  //   }
  // }, [currentMonthList])//根据currentMonthList进行变化，所以他作为依赖项传入

  //首次加载--初始化的时候把当前月的数据显示出来
  useEffect(() => {
    //dayjs()不传参，默认传当前日期时间
    //const nowDate = dayjs().format('YYYY | MM')
    //以当前时间作为key获取账单(monthGroup函数依赖于billList从异步请求接收数据，首次加载会为空，要判空)
    if (state === null) 
      return
      onDateChange(state.date)
    
  }, [state, onDateChange])

  // //当前月按日分组账单数据
  // const dayGroup = useMemo(() => {
  //   const group = _.groupBy(currentMonthList, (item) => dayjs(item.date).format('YYYY-MM-DD'))
  //   const keys = Object.keys(group)
  //   return {
  //     keys,
  //     group
  //   }
  // }, [currentMonthList])
  // console.log(dayGroup)

  const renderMonthBills = () => {
    const { keys, billGroup } = monthBills
    return (
      /*单日列表统计*/
      keys.map(item => {
        const dateText = dayjs(item).format('MM月DD日')
        const overView = getOverview(billGroup[item])
        return (
          <DailyBill
            key={item}
            overView={overView}
            dateText={dateText}
            billList={billGroup[item]}
          />)
      }))
  }
  return (
    <div className="monthlyBill">
      <NavBar className="nav" backArrow={false}>
        月度收支
      </NavBar>
      <div className="content">
        <div className="header">
          {/* 时间切换区域 */}
          <div className="date" onClick={onShowDate}>
            <span className="text">
              {selectedYear}|{selectedMonth + 1}月账单
            </span>
            {/*expand存在箭头朝下，否则朝上，所以用className通过dateVisible状态值来判断expand是否存在*/}
            <span className={classNames('arrow', visible && 'expand')}></span>
          </div>
          {/* 统计区域 */}
          <div className='twoLineOverview'>
            <TwoLineOverview
              pay={overView.pay}
              income={overView.income}
              type='month'
            />
          </div>
          {/* 时间选择器 */}
          <DatePicker
            className="kaDate"
            title="记账日期"
            precision="month"
            visible={visible}
            onCancel={onHideDate}
            //因为点击确定还有别的功能需要实现，所以把“关闭弹窗”功能放在回调函数中实现
            onConfirm={onDateChange}
            //蒙层区域
            onClose={onHideDate}
            max={new Date()}
          />
        </div>
        {renderMonthBills()}
      </div>
    </div >
  )
}

export default Month