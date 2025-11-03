import { useState, useMemo, useCallback } from 'react'
import './App.css'

function SortedList({ list, sortFunc }) {
  const sortedList = useMemo(
    () => [...list].sort(sortFunc),
    [list, sortFunc]
  );

  return (
    <div>
      Sorted List: {sortedList.join(', ')}
    </div>
  );
}


function App() {
  const [numbers] = useState([10, 20, 30]);
  // const total = numbers.reduce((acc, num) => acc + num, 0);

  // used for large math calculation (basically optimizes calculation)
  const total = useMemo(
    () => numbers.reduce((acc, num) => acc + num, 0),
    [numbers]
  );

  const [names] = useState(['Alice', 'Jack', 'Bob', 'Jade', 'Arthur']);
  // const sortedNames = [...names].sort(); // runs everytime component rerenders

  // stablize function even after rerenders
  const sortFunc = useCallback(
    () => (a, b) => a.localeCompare(b) * -1,
    []
  )

  return (
    <>
      <div>
        Total: {total}
      </div>
      <div>
        Name: {names.join(' ')}
      </div>
      <SortedList list={names} sortFunc={sortFunc}/>
    </>
  )
}

export default App

// in-short: both of them - useMemo, useCallback 
// prevents unecessary re-renders in a child component