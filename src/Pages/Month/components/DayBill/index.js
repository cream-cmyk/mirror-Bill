import classNames from 'classnames'
import './index.scss'
import { useState } from 'react'
import { billTypeToName } from '../../../../contants/index'
import Icon from '@/components/icon/index'
import OneLineOverview from '@/components/OneLineOverview'


const DailyBill = ({ dateText, billList, overView }) => {

  const [visible, setVisible] = useState(false)

  return (
    <div className={classNames('dailyBill')}>
      <div className="header" onClick={() => setVisible(!visible)}>
        <div className="dateIcon">
          <span className="date">{dateText}</span>
          {/*expand:箭头朝上*/}
          <span className={classNames('arrow', visible && 'expand')}></span>
        </div>
        <OneLineOverview pay={overView.pay} income={overView.income} />

      </div>
      {/* 单日列表 */}
      <div className="billList" style={{ display: visible ? "block" : 'none' }}>
        {billList.map(item => {
          return (
            <div className="bill" key={item.id}>
              {/*图标适配*/}
              <Icon type={item.useFor} />
              <div className="detail">
                {/*中文适配*/}
                <div className="billType">{billTypeToName[item.useFor]}</div>
              </div>
              <div className={classNames('money', item.type)}>
                {item.money.toFixed(2)}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
export default DailyBill