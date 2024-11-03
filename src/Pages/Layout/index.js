import { Outlet } from "react-router-dom"

const Layout = () => {
  return (
    <div>这是Layout一级路由
      {/* 配置二级路由出口 */}
      <Outlet />
    </div>
  )
}
export default Layout