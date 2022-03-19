import WordRow from "./components/WordRow"

const App = () => {

  return (
    <div className="mx-auto w-96">
      <header className="border-b border-gray-500 pb-2 mb-2">
        <h1 className="text-4xl text-center">Wordle</h1>
      </header>
      <main>
        <WordRow letters="hell" />
        <WordRow letters="hello"/>
      </main>
    </div>
  )
}

export default App