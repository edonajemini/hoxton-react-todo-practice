import { useState } from 'react'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="App">
      <h1>To do APP</h1>
      <ul className='first-list'>
        <li className='done-list'>Done ✔️
          <li className='done-list-smaller'>Learn HTML</li>
          <li className='done-list-smaller'>Learn CSS</li>
          <li className='done-list-smaller'>Learn JS</li>
          <li className='done-list-smaller'>Learn TypeScript</li>
          <li className='done-list-smaller'>Learn React</li>
        </li>

        <li className='notdone-list'>Not done yet!
            <li className='done-list-smaller'>Learn servers</li>
            <li className='done-list-smaller'>Learn Node </li>
            <li className='done-list-smaller'>Learn Java</li>
        </li>
      </ul>
    </div>
  )
}

export default App
