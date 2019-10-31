import React, {useState} from 'react'

/* 
take in an initial mode
set the mode state with the initial mode provided
return an object with a property mode 
*/
export default function useVisualMode (initial) {
  const [mode, setMode] = useState(initial)
  const [history, setHistory] = useState([initial]);
  function transition (newMode, replace) {
    setMode(newMode)
    if (replace === true) {
      // history.pop()
      // setHistory(history)
      setHistory([initial]);
    } else {
      setHistory([...history, mode])
    }
  }
  function back () { 
    setMode(history.pop())
  }
  return { mode, transition, back }
  
}

// export {useVisualMode}