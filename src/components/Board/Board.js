import React, { useRef, useState } from "react";
import "./board.css";

export default function Board(props) {
  const { items, increase, decrease } = props;

  const [player, setPlayer] = useState({});
  const [house, setHouse] = useState({});
  const [note, setNote] = useState("");

  const spinRef = useRef();
  const resultRef = useRef();
  const houseRef = useRef();
  const playerRef = useRef();
  const noteRef = useRef();
  const shadowRefs = useRef([]);

  const spinBoard = (ele) => {
    const randomEle = items[Math.floor(Math.random() * items.length)];
    localStorage.setItem("house", JSON.stringify(randomEle));
    localStorage.setItem("player", JSON.stringify(ele));

    const localPlayer = JSON.parse(localStorage.getItem("player"));
    const localHouse = JSON.parse(localStorage.getItem("house"));

    setHouse((house) => randomEle);
    setPlayer((player) => ele);

    spinRef.current.classList.add("spin");
    updateResult(localPlayer, localHouse);
  };

  const updateHouse = (ele1, ele2) => {
    if (spinRef.current.classList.contains("hidden")) {
      setTimeout(() => {
        houseRef.current.classList.add("visible");
      }, 1500);
      setTimeout(() => {
        updateWinner(ele1, ele2);

        noteRef.current.classList.add("visible");
      }, 2500);
    }
  };

  const updateWinner = (ele1, ele2) => {
    if (ele1.name === "paper" && ele2.name === "rock") {
      shadowRefs.current[0].classList.add("winner");
      setNote("YOU WIN");
      increase();
    } else if (ele1.name === "paper" && ele2.name === "spock") {
      shadowRefs.current[0].classList.add("winner");
      setNote("YOU WIN");
      increase();
    } else if (ele1.name === "spock" && ele2.name === "rock") {
      shadowRefs.current[0].classList.add("winner");
      setNote("YOU WIN");
      increase();
    } else if (ele1.name === "spock" && ele2.name === "scissors") {
      shadowRefs.current[0].classList.add("winner");
      setNote("YOU WIN");
      increase();
    } else if (ele1.name === "rock" && ele2.name === "scissors") {
      shadowRefs.current[0].classList.add("winner");
      setNote("YOU WIN");
      increase();
    } else if (ele1.name === "rock" && ele2.name === "lizard") {
      shadowRefs.current[0].classList.add("winner");
      setNote("YOU WIN");
      increase();
    } else if (ele1.name === "lizard" && ele2.name === "paper") {
      shadowRefs.current[0].classList.add("winner");
      setNote("YOU WIN");
      increase();
    } else if (ele1.name === "lizard" && ele2.name === "spock") {
      shadowRefs.current[0].classList.add("winner");
      setNote("YOU WIN");
      increase();
    } else if (ele1.name === "scissors" && ele2.name === "paper") {
      shadowRefs.current[0].classList.add("winner");
      setNote("YOU WIN");
      increase();
    } else if (ele1.name === "scissors" && ele2.name === "lizard") {
      shadowRefs.current[0].classList.add("winner");
      setNote("YOU WIN");
      increase();
    } else if (ele1.name === ele2.name) {
      setNote("DRAW");
    } else {
      houseRef.current.classList.add("winner");
      shadowRefs.current[1].classList.add("winner");
      setNote("YOU LOSE");
      decrease();
    }
  };

  const updateResult = (ele1, ele2) => {
    setTimeout(() => {
      spinRef.current.classList.remove("spin");
      spinRef.current.classList.add("hidden");
      resultRef.current.classList.add("show");

      updateHouse(ele1, ele2);
    }, 1500);
  };

  const hndleClik = () => {
    spinRef.current.classList.remove("hidden");
    resultRef.current.classList.remove("show");
    houseRef.current.classList.remove("visible");
    noteRef.current.classList.remove("visible");
    shadowRefs.current[0].classList.remove("winner");
    shadowRefs.current[1].classList.remove("winner");
  };

  const uiItems = items.map((item, i) => {
    return (
      <div
        key={i}
        id={item.id}
        className={item.name}
        onClick={(ele) => spinBoard(item)}
      >
        <div className="img">
          <img src={item.image} />
        </div>
      </div>
    );
  });

  return (
    <div className="board">
      <div className="game-board" ref={spinRef}>
        {uiItems}
      </div>
      <div className="game-result" ref={resultRef}>
        <div className="Player">
          <p className="text">YOU PICKED</p>
          <div className="shadow" ref={(el) => (shadowRefs.current[0] = el)}>
            <div className={player.name} ref={playerRef}>
              <div className="img">
                <img src={player.image} />
              </div>
            </div>
          </div>
        </div>
        <div className="note" ref={noteRef}>
          <p>{note && note}</p>
          <button className="play-again" onClick={hndleClik}>
            PLAY AGAIN
          </button>
        </div>
        <div className="house">
          <p className="text">THE HOUSE PICKED</p>
          <div className="shadow" ref={(el) => (shadowRefs.current[1] = el)}>
            <div className={house.name} ref={houseRef}>
              <div className="img">
                <img src={house.image} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
