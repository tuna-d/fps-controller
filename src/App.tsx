import "./App.css"
import BabylonScene from "./Scene/BabylonScene"

function App() {
  return (
    <main className="bg-zinc-600 h-screen flex flex-col items-center justify-center">
      <h1 className="text-4xl text-white mb-4">First Person Controller</h1>
      <BabylonScene />
    </main>
  )
}

export default App
