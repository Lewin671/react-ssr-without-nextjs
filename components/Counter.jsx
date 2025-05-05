import React, { useState } from 'react'

const Counter = () => {
  const [count, setCount] = useState(0)

  const handleClick = () => {
    setCount(count + 1)
  }

  return (
    <div>
      <button onClick={handleClick}>Clicked {count} times</button>
      <p>Note: State updates require client-side hydration to work.</p>
    </div>
  )
}

export default Counter
