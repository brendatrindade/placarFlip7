import { useState } from "react"
import type { Player, Round } from "../types"
import PlayerCard from "./PlayerCard"
import History from "./History"
import { ArrowPathIcon, CheckCircleIcon } from "@heroicons/react/24/outline"

interface Props {
  players: Player[]
  setPlayers: React.Dispatch<React.SetStateAction<Player[]>>
  resetGame: () => void
}

const WIN_SCORE = 200

export default function Game({ players, setPlayers, resetGame }: Props) {
  const [rounds, setRounds] = useState<Round[]>([])
  const [currentStarterIndex, setCurrentStarterIndex] = useState<number>(() => 
  Math.floor(Math.random() * players.length)
)
  const [roundInputs, setRoundInputs] = useState<number[]>(
    Array(players.length).fill(0)
  )

  function addRound() {
    const newRounds = [...rounds, roundInputs]
    setRounds(newRounds)
    recalculateScores(newRounds)

    setRoundInputs(Array(players.length).fill(0))
    setCurrentStarterIndex(
      (currentStarterIndex + 1) % players.length
    )
  }

  function removeRound(index: number) {
    const newRounds = rounds.filter((_, i) => i !== index)
    setRounds(newRounds)
    recalculateScores(newRounds)
  }

  function updateRound(index: number, newRound: Round) {
    const newRounds = rounds.map((round, i) =>
      i === index ? newRound : round
    )

    setRounds(newRounds)
    recalculateScores(newRounds)
  }

  function recalculateScores(updatedRounds: Round[]) {
    const newScores = players.map((player, playerIndex) => {
      const total = updatedRounds.reduce(
        (sum, round) => sum + (round[playerIndex] || 0),
        0
      )
      return { ...player, score: total }
    })

    setPlayers(newScores)
  }
  const eligible = players.filter(p => p.score >= WIN_SCORE)
  const winner =
    eligible.length > 0
      ? [...eligible].sort((a, b) => b.score - a.score)[0]
      : null

  return (
    <>
      {winner && (
        <div className="winner-message">
          {winner.name} venceu com {winner.score} pontos
        </div>
      )}

      <div className="players-board">
        {players.map((player, i) => (
          <PlayerCard
            key={i}
            player={player}
            index={i}
            currentStarterIndex={currentStarterIndex}
            totalPlayers={players.length}
            winScore={WIN_SCORE}
            isWinner={winner?.name === player.name}
          />
        ))}
      </div>
      <hr style={{ margin: "30px 0" }} />
      <h3>Inserir Pontuação da Rodada</h3>

      <div className="round-inputs">
        {players.map((p, i) => (
            <div key={i} className="round-input-card">
              <label>{p.name} somou:</label>
              <input
                  type="number"
                  value={roundInputs[i]}
                  onChange={(e) => {
                  const newInputs = [...roundInputs]
                  newInputs[i] = parseInt(e.target.value) || 0
                  setRoundInputs(newInputs)
                  }}
              />
            </div>
        ))}
      </div>
      <button
        className="icon-btn success"
        onClick={addRound}
      >
        <CheckCircleIcon className="icon" />
      </button>

      <hr style={{ margin: "30px 0" }} />
      <h3>Histórico</h3>

      <History
        rounds={rounds}
        playersNames={players.map(p => p.name)}
        removeRound={removeRound}
        updateRound={updateRound}
      />

      <button className="btn-danger" onClick={resetGame}>
        <ArrowPathIcon className="btn-icon" />
        Reiniciar Jogo
      </button>
    </>
  )
}