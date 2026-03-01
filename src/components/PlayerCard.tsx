import type { Player } from "../types"

interface Props {
  player: Player
  index: number
  currentStarterIndex: number
  totalPlayers: number
  winScore: number
  isWinner: boolean
}

export default function PlayerCard({
  player,
  index,
  currentStarterIndex,
  totalPlayers,
  winScore,
  isWinner
}: Props) {
  const remaining = Math.max(winScore - player.score, 0)

  let classes = "player-card"
  if (index === currentStarterIndex) classes += " starting-player"
  if (index === (currentStarterIndex + 1) % totalPlayers)
    classes += " next-player"
  if (player.score >= winScore) classes += " over-200"
  if (isWinner) classes += " winner-card"

  return (
    <div className={classes}>
      <div className="player-name">{player.name}</div>
      <div className="player-score">{player.score}</div>
      <div className="player-remaining">
        {remaining > 0
          ? `Faltam ${remaining} pts`
          : "Ultrapassou 200"}
      </div>
    </div>
  )
}