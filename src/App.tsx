import  { useState } from 'react'
import   styles  from "@/app.module.scss";

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className={styles.test}>
      
      <h1>Vite + React</h1>
      <div className={styles.box}>
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </div>
  )
}

export default App
