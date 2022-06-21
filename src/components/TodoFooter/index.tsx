import classNames from 'classnames'
import { Key } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import TodoModel from '../../model/todo'
import FilterModel from '../../model/filter'

export default function TodoFooter() {
  // const dispatch = useDispatch()
  let todoState = TodoModel.useState()
  let todoActions = TodoModel.useActions()
  let filterActions = FilterModel.useActions()
  let filterState = FilterModel.useState()
  // @ts-ignore
  const lists = todoState
  // @ts-ignore
  const { arr, active } = filterState

  const leftCount = lists.filter((item: { done: any }) => !item.done).length
  const handleClearDoned = () => todoActions.todoClearDoned()
  const handleActive = (item: any) => filterActions.filterActive(item)
  const isShowClear = lists.some((item: { done: any }) => item.done)
  return (
    <footer className='footer'>
      <span className='todo-count'>
        <strong>{leftCount}</strong> item left
      </span>
      <ul className='filters'>
        {arr.map((item: any) => (
          <li key={item} onClick={() => handleActive(item)}>
            <a
              className={classNames({
                selected: active === item,
              })}
              href='#/'
            >
              {item.slice(0, 1).toUpperCase() + item.slice(1)}
            </a>
          </li>
        ))}
      </ul>
      {isShowClear && (
        <button className='clear-completed' onClick={handleClearDoned}>
          Clear completed
        </button>
      )}
    </footer>
  )
}
