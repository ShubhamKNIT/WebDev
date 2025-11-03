import { useRef, useEffect } from 'react'
import './App.css'
import { useState } from 'react';

function App() {
  const inputRef = useRef(null);

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  const idRef = useRef(1);
  const [names, setNames] = useState([
    {id: idRef.current++, name: 'John'},
    {id: idRef.current++, name: 'Jane'},
  ]);

  const onAddName = () => {
    const newName = inputRef.current.value.trim();
    if (newName) {
      setNames([...names, {id: idRef.current++, name: newName}]);
    }
    inputRef.current.value = '';
  };

  return (
    <div>
      <div>
        {names.map((person) => {
          return (
            <div key={person.id}>{person.name}</div>
          )
        })}
      </div>
      <input type="text" ref={inputRef} />
      <button onClick={onAddName}>AddName</button>
    </div>
  )
}

export default App
