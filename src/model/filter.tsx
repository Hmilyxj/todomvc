import { setupStore } from '@pure-model/core'
import { createReactModel } from '@pure-model/react'



export type Filter = {}

const initialState: Filter = {
  arr: ['all', 'active', 'completed'],
  active: 'all',
}


export default createReactModel(() => {
  let { store, actions } = setupStore({
    // 可选参数，会反映到 redux-devtools 里的 name
    name: 'filter',
    // 必选参数：initialState
    initialState,
    // 必须参数：reducers，更新状态函数
    reducers: {
      filterActiveAc,
      filterActive,
    },
    // 可选参数，是否开启 redux-logger，默认为 false
    logger: true,
    // 可选参数，是否开启 redux-devtools，默认为 true
    devtools: true,
  })

  // 必须返回 store + actions 的对象结构
  return { store, actions }
})


// export const filterActiveAc = (active: any) => ({ type: FILTER_ACTIVE, active })

// export const filterActive = (active: any) => {
//   // 一旦配置 redux-thunk 中间件，这里就支持返回返回的形式啦
//   return (dispatch: (arg0: { type: string; active: any }) => void) => {
//     setTimeout(() => {
//       dispatch(filterActiveAc(active))
//     }, 2000)
//   }
// }

export const filterActive = (filter: Filter, active: string) => {
  return {
    ...filter,
    active: active
  }
}

export const filterActiveAc = (filter: Filter) => {
  return filter
}

