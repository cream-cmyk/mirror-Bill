import { Outlet } from "react-router-dom"

//定制主题
import { Button } from "antd-mobile"

import { useDispatch } from "react-redux"
import { useEffect } from "react"
import{getBillList} from '../../store/modules/billStore'

const Layout = () => {
   //组件触发action并渲染数据
  //1.钩子函数useDispatch-->dispatch 2.actionCreate导入进来 3.useEffect钩子函数执行
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getBillList())
  },[dispatch])
  return (
    <div>这是Layout一级路由
      {/* 配置二级路由出口 */}
      <Outlet />
      <Button color="primary">全局生效</Button>
      <div className="puple">
      <Button color="primary">局部生效</Button>
      </div>
    </div>

  )
}
export default Layout