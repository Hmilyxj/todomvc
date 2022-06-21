
import { setupStore } from '@pure-model/core'
import { createReactModel } from '@pure-model/react'

export type Todo = {
  id: number
  name: string
  done: boolean
}

export type Todos = Todo[]

// 定义初始化 state
const initialState: Todos = JSON.parse(localStorage.getItem('todoState'))

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
    },
    // 可选参数，是否开启 redux-logger，默认为 false
    logger: true,
    // 可选参数，是否开启 redux-devtools，默认为 true
    devtools: true,
  })

  // 必须返回 store + actions 的对象结构
  return { store, actions }
})

export const todoDel = (todos: Todos, id: number) => {
  return todos.filter((item) => item.id !== id)
}

export const todoChangeDone = (todos: Todos, id: number) => {
  return todos.map((todo) => {
    if (todo.id !== id) return todo
    return {
      ...todo,
      done: !todo.done,
    }
  })
}


export const todoAdd = (todos: Todos, name: string) => {
  let item = {
    id: Date.now(),
    name,
    done: false,
  }
  return todos.concat(item)
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
  return todos.filter((item) => !item.done)
}