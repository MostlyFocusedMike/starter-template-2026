import { useEffect } from "react"

function App() {
  useEffect(() => {
    const fetchTest = async () => {
      const res = await fetch('/api/users')
      const data = await res.json();
      console.log('data:', data);
    }

    fetchTest();
  })

  return (
    <main>
      <hgroup className="m-4 px-2 py-1 w-fit">
        <h1 className="font-bold text-5xl">Starter Template</h1>
        <p className="text-2xl italic text-right">Go Make Something</p>
      </hgroup>
    </main>
  )
}

export default App
