import React from 'react'
import ReactDOM from 'react-dom'
// import { Provider } from 'react-redux'
import { Provider } from '@pure-model/react'
import TodoModel from './model/todo'
import FilterModel from './model/filter'
import { persistStore } from 'redux-persist'
import { PersistGate } from 'redux-persist/integration/react'
import './styles/base.css'
import './styles/index.css'
import App from './App'


ReactDOM.render(
  <Provider list={[
    {
      Model: TodoModel, // 必选参数，要注入的 React Model 对象
      context: undefined, // 可选参数，要注入到 model 内部的 context 对象
    },
    {
      Model: FilterModel, // 必选参数，要注入的 React Model 对象
      context: undefined, // 可选参数，要注入到 model 内部的 context 对象
    },
  ]}>
    <App />
  </Provider>,
  document.querySelector('#root')
)

