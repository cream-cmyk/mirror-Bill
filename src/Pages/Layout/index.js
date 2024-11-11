import React, { useEffect } from 'react'
import { Badge, TabBar } from 'antd-mobile'
import {
  BillOutline,
  AddCircleOutline,
  CalculatorOutline,
} from 'antd-mobile-icons'
import { useDispatch } from 'react-redux'
import { Outlet, useNavigate } from 'react-router-dom'
import './index.scss'
import { getBillList } from '@/store/modules/billStore'
const tabs = [
    {
      key: '/month',
      title: '月度账单',
      //图标
      icon: <BillOutline />,
      //徽标
      badge: Badge.dot,
    },
    {
      key: '/new',
      title: '记账',
      icon: <AddCircleOutline />,
      badge: '5',
    },
    {
      key: '/year',
      title: '年度账单',
      icon: <CalculatorOutline/>,
      badge: '99+',
    }
  ]
const Layout = () => {

  const dispath = useDispatch()
  useEffect(() => {
    dispath(getBillList())
  }, [dispath])
//切换菜单---跳转路由
  const navigate=useNavigate()

//当用户点击某个选项卡时，TabBar 组件会自动将该选项卡的 key 作为参数(path)传递给 onChange 回调函数
  const swithRouter = (path) => {
    console.log(path)
    navigate(path)
  }

  return (
    <div className='layout'>
    <div className='container'>
      <Outlet/>
    </div>
      <div className='footer'>
        {/*TabBar 组件通过 onChange 属性接收一个回调函数*/}
    <TabBar onChange={swithRouter}>
          {tabs.map(item => (
            <TabBar.Item
              key={item.key}
              icon={item.icon}
              title={item.title}
              badge={item.badge} />
          ))}
        </TabBar>
    </div>
    </div>
     
  )
 }
 export default Layout
