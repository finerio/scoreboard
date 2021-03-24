//import logo from "./logo.svg";
import "./App.scss";
import Scoreboard from "./components/Scoreboard";
import Title from "./components/Title";

function App() {
  return (
    <div className="App">
      <main>
        <Title />
        <Scoreboard />
      </main>
    </div>
  );
}

export default App;
