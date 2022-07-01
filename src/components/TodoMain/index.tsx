// @ts-nocheck
import TodoModel from '../../model/todo'
import FilterModel from '../../model/filter'
import TodoItem from '../TodoItem'

export default function TodoMain() {
  let todoState = TodoModel.useState()
  let todoActions = TodoModel.useActions()
  let filterState = FilterModel.useState()
  let renderLists
  const ac = filterState.active
  if (ac === 'active') {
    renderLists = todoState.filter((item) => !item.done)
  }
  else if (ac === 'completed') {
    renderLists = todoState.filter((item) => item.done)
  }
  else {
    renderLists = todoState
  }

  const lists = todoState
  // @ts-ignore
  const nowStatus = lists.every((item) => item.done)
  const handleChangeAll = () => todoActions.todoCheckAll(!nowStatus)
  return (
    <section className='main'>
      <input
        id='toggle-all'
        className='toggle-all'
        type='checkbox'
        checked={nowStatus}
        onChange={handleChangeAll}
      />
      <label htmlFor='toggle-all'>Mark all as complete</label>
      <ul className='todo-list'>
        {renderLists.map((item) => (
          <TodoItem item={item} key={item.id} />
        ))}
      </ul>
    </section>
  )
}
