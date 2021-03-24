// src/components/Scoreboard.js
import { useState } from "react";
import AddPlayerForm from "./AddPlayerForm";
import Player from "./Player";
import "./Scoreboard.scss";

/*
    { id: 1, name: "Violeta", score: 0 },
    { id: 2, name: "Eszter", score: 0 },
    { id: 3, name: "Jeroen v2", score: 0 },
    { id: 4, name: "Lisa", score: 0 },
*/

export default function Scoreboard() {
  const [players, set_players] = useState([]);

  const [sort_by, set_sort_by] = useState("score"); // either "score" or "name"

  function compare_score(player_a, player_b) {
    return player_b.score - player_a.score;
  }

  function compare_name(player_a, player_b) {
    return player_a.name.localeCompare(player_b.name);
  }

  const change_sorting = (event) => {
    console.log("new sort order:", event.target.value);
    set_sort_by(event.target.value);
  };

  function resetScore() {
    const new_players_array = players.map((player) => {
      return {
        ...player,
        score: 0,
      };
    });

    set_players(new_players_array);
  }

  function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
  }

  function randomizeScore() {
    const new_players_array = players.map((player) => {
      return {
        ...player,
        score: getRandomInt(101),
      };
    });

    set_players(new_players_array);
  }

  function addPlayer(name) {
    //console.log("Let's add a new player with the name:", name);

    let localArr = [...players];

    localArr.push({ id: players.length + 1, name: name, score: 0 });

    set_players(localArr);
  }

  // Defining the callback function:
  const incrementScore = (id) => {
    //console.log("player id", id);

    const new_players_array = players.map((player) => {
      // decide whether this player's score needs to be incremented
      if (player.id === id) {
        // and if so, create a new player object,
        return {
          // but first copying over the player object's data
          ...player,
          // and then overriding the score property to be incremented
          score: player.score + 1,
        };
      } else {
        // else, just keep them
        return player;
      }
    });

    set_players(new_players_array);
  };

  const players_sorted =
    // first "copy" the array
    [...players]
      // then sort it with the `compare_score` callback function
      .sort(sort_by === "name" ? compare_name : compare_score);

  return (
    <div className="Scoreboard">
      <p>Player's scores:</p>
      <p>
        Sort order:{" "}
        <select onChange={change_sorting} value={sort_by}>
          <option value="score">Sort by score</option>
          <option value="name">Sort by name</option>
        </select>
      </p>
      <button onClick={resetScore}>Reset</button>
      <button onClick={randomizeScore}>Randomize</button>
      <ul>
        {players_sorted.map((player) => (
          <Player
            key={player.id}
            id={player.id}
            name={player.name}
            score={player.score}
            incrementScore={incrementScore}
          />
        ))}
      </ul>
      <AddPlayerForm addPlayer={addPlayer} />
    </div>
  );
}
