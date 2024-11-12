import { NavBar, DatePicker } from 'antd-mobile'
import classNames from 'classnames'
import dayjs from 'dayjs'
import { useMemo, useState } from 'react'
import { useSelector } from 'react-redux'
import './index.scss'
import _ from 'lodash'

const Month = () => {
  //按月做分组处理   1.从Redux拿到数据
  const billList = useSelector(state => state.bill.billList)
  //2.数据做二次处理useMemo
  const monthGroup = useMemo(() => {
    //返回计算后的值  3.按月分组 lodash
    return _.groupBy(billList, (item) => dayjs(item.date).format("YYYY | MM"))
  }, [billList])
  console.log(monthGroup)

  //选择框弹出状态--默认false
  const [dateVisible, setDateVisible] = useState(false)
  //修改日期状态
  const [currentDate, setCurrentDate] = useState(() => {
    return dayjs(new Date()).format('YYYY | MM')
  })
  //修改当前获取月度列表
  const [currentMonthList, setCurrentMonthList] = useState([])

  //点击确认，调用函数
  const onConfirmFun = (date) => {
    //切换弹框状态
    setDateVisible(false)
    console.log(date)
    //格式化回调日期
    const formatDate = dayjs(date).format('YYYY | MM')
    //修改日期view
    setCurrentDate(formatDate)
    // 根据获取到的时间作为key取当月的账单数组
    setCurrentMonthList(monthGroup[formatDate])
  }

  //计算统计
  const viewAll = useMemo(() => {
    //收入 currentMonthList做过滤
    const income = currentMonthList.filter((item) => item.type === "income")
      //对于数组中的每个对象 c，回调函数计算 c.money ,然后将这个值加到累积器 a 上
      .reduce((a, c) => a + c.money, 0)
    //支出
    const pay = currentMonthList.filter((item) => item.type === "pay")
      .reduce((a, c) => a + c.money, 0)
    return {
      income, pay,
      total: income + pay
    }
  }, [currentMonthList])//根据currentMonthList进行变化，所以他作为依赖项传入

  return (
    <div className="monthlyBill">
      <NavBar className="nav" backArrow={false}>
        月度收支
      </NavBar>
      <div className="content">
        <div className="header">
          {/* 时间切换区域 */}
          <div className="date" onClick={() => setDateVisible(true)}>
            <span className="text">
              {currentDate + ''}月账单
            </span>
            {/*expand存在箭头朝下，否则朝上，所以用className通过dateVisible状态值来判断expand是否存在*/}
            <span className={classNames('arrow', dateVisible && 'expand')}></span>
          </div>
          {/* 统计区域 */}
          <div className='twoLineOverview'>
            <div className="item">
              {/*toFixed(2)保留两位小数*/}
              <span className="money">{viewAll.pay.toFixed(2)}</span>
              <span className="type">支出</span>
            </div>
            <div className="item">
              <span className="money">{viewAll.income.toFixed(2)}</span>
              <span className="type">收入</span>
            </div>
            <div className="item">
              <span className="money">{viewAll.total.toFixed(2)}</span>
              <span className="type">结余</span>
            </div>
          </div>
          {/* 时间选择器 */}
          <DatePicker
            className="kaDate"
            title="记账日期"
            precision="month"
            visible={dateVisible}
            onCancel={() => setDateVisible(false)}
            //因为点击确定还有别的功能需要实现，所以把“关闭弹窗”功能放在回调函数中实现
            onConfirm={onConfirmFun}
            //蒙层区域
            onClose={() => setDateVisible(false)}
            max={new Date()}
          />
        </div>
      </div>
    </div >
  )
}

export default Month