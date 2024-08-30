import logo from './logo.svg';
import './App.css';
import ModelViewer from './components/ModelViewer';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <h1>Welcome to the MR Store Experience</h1>
        <ModelViewer />
      </header>
    </div>
  );
}

export default App;
