import { Button, DatePicker, Input, NavBar } from 'antd-mobile'
import Icon from '@/components/icon/index'
import './index.scss'
import classNames from 'classnames'
import { billListData } from '@/contants'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { addBillListPost } from '@/store/modules/billStore'

const New = () => {
  const navigate = useNavigate()
  //切换收入支持状态---默认支出pay；收入income
  const [billType, setBillType] = useState('pay')

  //收集金额
  const [billMoney, setbillMoney] = useState(0)
  const moneyChage = (value) => {
    setbillMoney(value)
  }
  //收集账单状态
  const [billuseFor, setBilluseFor] = useState('')

  //调异步请求dispath
  const dispath = useDispatch();
  //保存账单
  const saveBill = () => {
    //收集数据
    const data = {
      type: billType,
      money: billType === "income" ? +billMoney : -billMoney,
      date: new Date(),
      useFor: billuseFor
    }
    console.log(data)
    dispath(addBillListPost(data))
  }

  return (
    <div className="keepAccounts">
      <NavBar className="nav" onBack={() => navigate(-1)}>
        记一笔
      </NavBar>

      <div className="header">
        <div className="kaType">
          <Button
            onClick={() => setBillType('pay')}
            shape="rounded"
            className={classNames(billType === 'pay' ? 'selected' : '')}
          >
            支出
          </Button>
          <Button onClick={() => setBillType('income')}
            className={classNames(billType === 'income' ? 'selected' : '')}
            shape="rounded"
          >
            收入
          </Button>
        </div>

        <div className="kaFormWrapper">
          <div className="kaForm">
            <div className="date">
              <Icon type="calendar" className="icon" />
              <span className="text">{'今天'}</span>
              <DatePicker
                className="kaDate"
                title="记账日期"
                max={new Date()}
              />
            </div>
            <div className="kaInput">
              <Input
                className="input"
                placeholder="0.00"
                type="number"
                value={billMoney}
                onChange={moneyChage}
              />
              <span className="iconYuan">¥</span>
            </div>
          </div>
        </div>
      </div>

      <div className="kaTypeList">
        {/* 2. 适配数据 */}
        {billListData[billType].map(item => {
          return (
            <div className="kaType" key={item.type}>
              <div className="title">{item.name}</div>
              <div className="list">
                {item.list.map(item => {
                  return (
                    <div
                      className={classNames(
                        'item',
                        billuseFor === item.type ? 'selected' : ''
                      )}
                      key={item.type}
                      onClick={() => {
                        setBilluseFor(item.type)
                      }}

                    >
                      <div className="icon">
                        <Icon type={item.type} />
                      </div>
                      <div className="text">{item.name}</div>
                    </div>
                  )
                })}
              </div>
            </div>
          )
        })}
      </div>

      <div className="btns">
        <Button className="btn save" onClick={saveBill}>
          保 存
        </Button>
      </div>
    </div>
  )
}
export default New