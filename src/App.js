import "./App.css";
import { useRef, useState } from "react";
import Board from "./components/Board/Board";
import Logo from "./images/logo-bonus.svg";
import Layer from "../src/images/image-rules-bonus.svg";
import Close from "../src/images/icon-close.svg";
import Lizard from "./images/icon-lizard.svg";
import Paper from "./images/icon-paper.svg";
import Rock from "./images/icon-rock.svg";
import Scissors from "./images/icon-scissors.svg";
import Spock from "./images/icon-spock.svg";

function App() {
  const [itemsArry] = useState([
    {
      name: "lizard",
      image: Lizard,
    },
    {
      name: "paper",
      image: Paper,
    },
    {
      name: "rock",
      image: Rock,
    },
    {
      name: "scissors",
      image: Scissors,
    },
    {
      name: "spock",
      image: Spock,
    },
  ]);

  const [score, setScore] = useState(0);

  const incScore = () => {
    setScore((score) => (score += 1));
    console.log(score);
  };

  const decScore = () => {
    if (score > 0) {
      setScore((score) => (score -= 1));
    }
  };

  const layerRef = useRef();

  const openRules = () => {
    layerRef.current.style.left = 0;
  };

  const closeRules = () => {
    layerRef.current.style.left = "100%";
  };

  return (
    <div className="App">
      <header className="header">
        <img src={Logo} />
        <div className="score">
          <p className="text">SCORE</p>
          <span className="num">{score}</span>
        </div>
      </header>
      <Board
        items={itemsArry}
        score={score}
        increase={incScore}
        decrease={decScore}
      />
      <button className="rules" onClick={openRules}>
        Rules
      </button>
      <div className="layer" ref={layerRef}>
        <div className="rules-img">
          <div className="actions">
            <p>RULES</p>
            <img className="close" src={Close} onClick={closeRules} />
          </div>
          <img src={Layer} />
        </div>
      </div>
    </div>
  );
}

export default App;
