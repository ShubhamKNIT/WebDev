import { useState, useEffect } from 'react'
import './App.css'

function App() {
  const [names, setNames] = useState([]);

  // allows to run code before rendering
  useEffect(() => {
    fetch("/names.json")
      .then((response) => response.json())
      .then((data) => setNames(data));
  }, []);

  // const [selectedName, setSelectedName] = useState("");
  const [selectedNameDetails, setSelectedNameDetails] = useState(null);
  
  // useEffect(() => {
  //   if (selectedName) {
  //     fetch(`/${selectedName}.json`)
  //       .then((response) => response.json())
  //       .then((data) => setSelectedNameDetails(data));
  //   }
  // }, [selectedName]);

  // make limited use of useEffect only when needed
  const onSelectedNameChange = (name) => {
    fetch(`/${name}.json`)
      .then((response) => response.json())
      .then((data) => setSelectedNameDetails(data));
  };

  return (
    <div>
      {/* <div>Names: {names.join(', ')}</div> */}
      <div>
        {names.map((name) => {
          return (
            <button onClick={() => onSelectedNameChange(name)}>
              {name}
            </button>
          )
        })}
      </div>
      <div>
        {JSON.stringify(selectedNameDetails)}
      </div>
    </div>
  )
}

export default App

/*
When to USE (when something could be dynamic in nature):
  1. Fetching API data
  2. setting up supscriptions/event listeners
  3. managing timers/intervals
  4. sync with external systens

When to AVOID:
  1. Computing derived state
  2. Upadting state unecessarily
  3. Running effects for purely UI logic
  4. Duplicating logic that belongs to event handlers
*/