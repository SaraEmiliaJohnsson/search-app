
import './App.css'
import { SearchApp } from './components/SearchApp'

const App: React.FC = () => {
  return (
    <div className="App">
      <header className="bg-blue-600 text-white p-4">
        <h1 className="text-3xl">Search App</h1>
      </header>
      <main className="p-4">
        <SearchApp />
      </main>
    </div>
  );
};

export default App
