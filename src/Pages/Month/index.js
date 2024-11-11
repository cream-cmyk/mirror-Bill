import { NavBar, DatePicker } from 'antd-mobile'
import classNames from 'classnames'
import dayjs from 'dayjs'
import { useState } from 'react'
import './index.scss'

const Month = () => {
  //选择框弹出状态--默认false
  const [dateVisible, setDateVisible] = useState(false)
  //点击确认，调用函数
  const onConfirmFun = (date) => {
    setDateVisible(false)
    console.log(date)
    setCurrentDate(dayjs(date).format('YYYY | MM'))
  }
  const [currentDate, setCurrentDate] = useState(() => {
    return dayjs(new Date()).format('YYYY | MM')
  })
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
              <span className="money">{100}</span>
              <span className="type">支出</span>
            </div>
            <div className="item">
              <span className="money">{200}</span>
              <span className="type">收入</span>
            </div>
            <div className="item">
              <span className="money">{200}</span>
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