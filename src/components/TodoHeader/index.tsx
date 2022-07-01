import { SetStateAction, useState } from 'react'
import TodoModel from '../../model/todo'

export default function TodoHeader() {
  const [name, setName] = useState('')
  let todoActions = TodoModel.useActions()
  const handleChange = (e: { target: { value: SetStateAction<string> } }) => setName(e.target.value)
  const handleKeyUp = (e: { key: string }) => {
    if (e.key === 'Enter') {
      if (name.trim().length === 0) return
      todoActions.todoAdd(name)
      setName('')
    }
  }
  return (
    <header className='header'>
      <h1>todos</h1>
      <input
        className='new-todo'
        placeholder='What needs to be done?'
        autoFocus
        value={name}
        onChange={handleChange}
        onKeyUp={handleKeyUp}
      />
    </header>
  )
}
