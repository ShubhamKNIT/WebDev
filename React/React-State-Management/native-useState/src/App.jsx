import { useState } from 'react'

function NameList() {
  const [list, setList] = useState(['Alice', 'Bob']);
  const [name, setName] = useState('Jack');

  function addName() {
    setList([...list, name]);
    setName('');
  }

  return (
    <div className="NameList">
      <input value={name} onChange={e => setName(e.target.value)} />
      <button onClick={addName}>Add Name</button>
      <ul>
        {list.map((n, index) => (
          <li key={index}>{n}</li>
        ))}
      </ul>
    </div>
  )
}

function Counter() {
  const [count, setCount] = useState(0);

  function addOne() {
    setCount(count + 1);
  }

  return (
    <div className="Counter">
      <button onClick={addOne}>Count = {count}</button>
    </div>
  )
}

function App() {
  return (
    <div>
      <Counter />
      <NameList />
    </div>
  )
}

export default App;
