
import { setupStore, setupStartCallback } from '@pure-model/core'
import { createReactModel } from '@pure-model/react'

export type Todo = {
  id: number
  name: string
  done: boolean
}

export type Todos = Todo[]
// 定义初始化 state
const initialState: Todos = []

export default createReactModel(() => {
  let { store, actions } = setupStore({
    // 可选参数，会反映到 redux-devtools 里的 name
    name: 'todos',
    // 必选参数：initialState
    initialState,
    // 必须参数：reducers，更新状态函数
    reducers: {
      todoDel,
      todoChangeDone,
      todoAdd,
      todoCheckAll,
      todoModifyName,
      todoClearDoned,
      updateTodoState,
      updateTodoStatus,
    },
    // 可选参数，是否开启 redux-logger，默认为 false
    logger: true,
    // 可选参数，是否开启 redux-devtools，默认为 true
    devtools: true,
  })
  setupStartCallback(() => {
    const list = localStorage.getItem('todoState')
    actions.updateTodoState(JSON.parse(list) || [])
  })
  // 必须返回 store + actions 的对象结构
  return { store, actions }
})

export const updateTodoState = (todos: Todos, list) => {
  return list
}

export const updateTodoStatus = (todos: Todos, { id, done }: { id: number; done: boolean }) => {
  return todos.map((item) => {
    if (item.id !== id) return item
    return {
      ...item,
      done,
    }
  })
}

export const todoDel = (todos: Todos, id: number) => {
  let result = todos.filter((item) => item.id !== id)
  localStorage.setItem('todoState', JSON.stringify(result))
  return result
}

export const todoChangeDone = (todos: Todos, id: number) => {
  let result = todos.map((todo) => {
    if (todo.id !== id) return todo
    return {
      ...todo,
      done: !todo.done,
    }
  })
  
  localStorage.setItem('todoState', JSON.stringify(result))
  return result
}


export const todoAdd = (todos: Todos, name: string) => {
  let item = {
    id: Date.now(),
    name,
    done: false,
  }
  const list = todos.concat(item)
  localStorage.setItem('todoState', JSON.stringify(list))
  return list
}

export const todoCheckAll = (todos: Todos, done: boolean) => {
  return todos.map((item) => ({ ...item, done: done }))
}

export const todoModifyName = (todos: Todos, { id, name }: { id: number; name: string }) => {
  return todos.map((item) => {
    if (item.id !== id) return item
    return {
      ...item,
      name: name,
    }
  })
}

export const todoClearDoned = (todos: Todos) => {
  let result = todos.filter((item) => !item.done)
  localStorage.setItem('todoState', JSON.stringify(result))
  return result
}
