import classNames from 'classnames'
import { useState, useRef, useEffect, SetStateAction } from 'react'
import TodoModel from '../../model/todo'

export default function TodoItem({ item }) {
  const inputRef = useRef(null)
  // const dispatch = useDispatch()
  const [currentId, setCurrentId] = useState('')
  const [currentName, setCurrentName] = useState('')
  let todoState = TodoModel.useState()
  let todoActions = TodoModel.useActions()
  const handleDel = (id: any) => todoActions.todoDel(id)
  const handleChange = (id: any) => todoActions.todoChangeDone(id)
  const handleDblClick = (id: SetStateAction<string>, name: SetStateAction<string>) => {
    setCurrentId(id)
    setCurrentName(name)
  }
  const handleBlur = () => setCurrentId('')
  // 先把输入的数据挤下来，敲回车的时候再更新到 Redux
  const handleEditChange = (e: { target: { value: SetStateAction<string> } }) => setCurrentName(e.target.value)
  const handleKeyUp = (e: { key: string }) => {
    if (e.key === 'Escape') return handleDblClick('', '')
    if (e.key === 'Enter') {
      todoActions.todoModifyName({ id: item.id, name: currentName })
      handleDblClick('', '')
    }
  }
  useEffect(() => inputRef.current.focus(), [currentId])
  return (
    <li
      className={classNames({
        completed: item.done,
        editing: currentId === item.id,
      })}
    >
      <div className='view'>
        <input
          className='toggle'
          type='checkbox'
          checked={item.done}
          onChange={() => handleChange(item.id)}
        />
        <label onDoubleClick={() => handleDblClick(item.id, item.name)}>
          {item.name}
        </label>
        <button className='destroy' onClick={() => handleDel(item.id)}></button>
      </div>
      <input
        className='edit'
        value={currentName}
        onChange={handleEditChange}
        ref={inputRef}
        onBlur={handleBlur}
        onKeyUp={handleKeyUp}
      />
    </li>
  )
}
