import { useEffect, useState } from 'react'
import './App.css'

function App () {
  const [search, setSearch] = useState('')
  const [todos, setTodos] = useState([])
  const filteredTodos = todos.filter(todo =>
    todo.text.toLowerCase().includes(search.toLowerCase())
  )
  const completedTodos = todos.filter(todo =>
    todo.completed)

  useEffect(() => {
    fetch('http://localhost:4000/todos')
      .then(resp => resp.json())
      .then(todosFromServer => setTodos(todosFromServer))
  }, [])

  
  function deleteTodo (id: number) {
    const todosCopy = todos.filter(todo => todo.id !== id)

    fetch(`http://localhost:4000/todos/${id}`, {
      method: 'DELETE'
    })

    setTodos(todosCopy)
  }

  function createTodo (text: string) {
    let newTodo = {
      text: text,
      completed: false
    }
    fetch('http://localhost:4000/todos', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newTodo)
    })
      .then(resp => resp.json())
      .then(todoFromServer => {
        setTodos([...todos, todoFromServer])
      })
  }

  return (
    <div className="App">
      <h1>To do APP</h1>
      <input className='search-input'
      placeholder='search'
      onChange={event => {
        setSearch(event.target.value)
      }} />
    <form
      onSubmit={event => {
        event.preventDefault()
        createTodo(event.target.text.value)
        event.target.reset()
      }}
    >
    <input className='addtodoform-input'
        type='text'
        placeholder='TODO Name'
        name='text'
        required
      />
      <button className='add-btn'>ADD</button>
      
    </form>
    <ul>
      {filteredTodos.map(todo => (
        <li className={todo.completed ? 'completed' : ''}>
        <span >
          <li className='listof-todos'>{todo.text}</li>
        </span>
  

        <button className='check-btn' 
        onClick={()=>{
          const todosCopy = structuredClone(todos);
          const match = todosCopy.find((target) => target.id === todo.id);
          match.completed = !match.completed;
          fetch('http://localhost:4000/todos/${match.id}'),{
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
            },
            body:JSON.stringify(match),
          }
          setTodos(todosCopy);
        }}
        >
          ✔️
        </button>
        <button className='delete-btn'
          onClick={() => {
            deleteTodo(todo.id)
          }}
        >
          X
        </button>
      </li>
      ))}
    </ul>
    <h3 className='completed-h'> Completed !</h3>
          <ul>
              {completedTodos.map(item => (
                <li className='completed'>
                  <p>{item.text}😍</p>
                </li>
              ))}
            </ul>
    </div>
  )
}

export default App
