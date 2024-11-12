import classNames from 'classnames'
import './index.scss'
import { useMemo } from 'react'

const DailyBill = ({ date, billList }) => {
  //计算统计
  const viewDayResult = useMemo(() => {
    //收入 billList
    const income = billList.filter((item) => item.type === "income")
      //对于数组中的每个对象 c，回调函数计算 c.money ,然后将这个值加到累积器 a 上
      .reduce((a, c) => a + c.money, 0)
    //支出
    const pay = billList.filter((item) => item.type === "pay")
      .reduce((a, c) => a + c.money, 0)
    return {
      income, pay,
      total: income + pay
    }
  }, [billList])//根据billList进行变化，所以他作为依赖项传入
  return (
    <div className={classNames('dailyBill')}>
      <div className="header">
        <div className="dateIcon">
          <span className="date">{date}</span>
          <span className={classNames('arrow')}></span>
        </div>
        <div className="oneLineOverview">
          <div className="pay">
            <span className="type">支出</span>
            <span className="money">{viewDayResult.pay.toFixed(2)}</span>
          </div>
          <div className="income">
            <span className="type">收入</span>
            <span className="money">{viewDayResult.income.toFixed(2)}</span>
          </div>
          <div className="balance">
            <span className="money">{viewDayResult.total.toFixed(2)}</span>
            <span className="type">结余</span>
          </div>
        </div>
      </div>
    </div>
  )
}
export default DailyBill