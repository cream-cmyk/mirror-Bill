import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
//import sum from '@/test'==import sum from './test'
import router from './Router';
import { RouterProvider } from 'react-router-dom';
//导入定制主题文件
import './theme.css'
import { Provider } from 'react-redux';
import store from './store/index'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <div>
    <Provider store={store}>
    <RouterProvider router={router} />
    </Provider>
    
  </div>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals

