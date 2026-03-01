import { useState } from "react";
import Game from "../components/Game";
import type { Player } from "../types";
import Setup from "../components/Setup";
import flip7card from "/flip7card.png";


export default function App() {
  const [players, setPlayers] = useState<Player[]>([]);
  const [started, setStarted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  function startGame() {
    if (players.length < 2) {
      setError("Cadastre pelo menos 2 jogadores para iniciar o jogo");
      setTimeout(() => {
        setError(null);
      }, 3000);
      return;
    }
    setStarted(true);
  }

  function resetGame() {
    setPlayers(players.map((p) => ({ ...p, score: 0 })));
    setStarted(false);
  }

  return (
    <div className="app-wrapper">
      <div className="container">
        <h1>Placar Flip7</h1>
        <p className="subtitle">
          Gerencie suas partidas e pontuações de forma fácil e rápida. <br />
          Que vença o melhor (ou não) !
        </p>

        {!started ? (
          <>
            {error && <div className="error-message">{error}</div>}
            <Setup
              players={players}
              setPlayers={setPlayers}
              startGame={startGame}
            />
            <img src={flip7card} alt="Flip7 Card" />
          </>
        ) : (
          <Game
            players={players}
            setPlayers={setPlayers}
            resetGame={resetGame}
          />
        )}
      </div>

      <footer className="app-footer">
        © Desenvolvido por
        <a
          href="https://github.com/brendatrindade"
          target="_blank"
          rel="noopener noreferrer"
          className="footer-link"
        >
          Brenda Trindade
        </a>
      </footer>
    </div>
  );
}
