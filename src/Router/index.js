//创建路由实例，绑定path.element

import Layout from "@/Pages/Layout";
import Month from "@/Pages/Month";
import New from "@/Pages/New";
import Year from "@/Pages/Year";
import { createBrowserRouter } from "react-router-dom";

const router=createBrowserRouter([
  //一级路由
  {
    path: '/',
    element: <Layout />,
    //二级路由
    children: [
      {
        //path: 'month',
        index: true,//设置默认二级路由，一级路由访问时二级路由自动得到渲染
        element:<Month/>
      },
      {
        path: 'year',
        element:<Year/>
      }
    ]
  },
  {
    path: 'new',
    element:<New/>
  }
])
export default router