import { useState } from "react"
import type { Player } from "../types"
import { PencilSquareIcon, TrashIcon, CheckCircleIcon, PlayIcon } from "@heroicons/react/24/outline"


interface Props {
  players: Player[]
  setPlayers: React.Dispatch<React.SetStateAction<Player[]>>
  startGame: () => void
}

export default function Setup({ players, setPlayers, startGame }: Props) {
  const [name, setName] = useState("")
  const [editingIndex, setEditingIndex] = useState<number | null>(null)
  const [editingName, setEditingName] = useState("")

  function addPlayer() {
    if (!name.trim()) return
    setPlayers([...players, { name: name.trim(), score: 0 }])
    setName("")
  }

  function removePlayer(index: number) {
    setPlayers(players.filter((_, i) => i !== index))
  }

  function startEdit(index: number) {
    setEditingIndex(index)
    setEditingName(players[index].name)
  }

  function saveEdit(index: number) {
    const updated = players.map((p, i) =>
      i === index ? { ...p, name: editingName } : p
    )
    setPlayers(updated)
    setEditingIndex(null)
  }

  return (
    <>
      <input
        className="register-input"
        type="text"
        placeholder="Cadastrar jogador: "
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <button
        className="icon-btn success"
        onClick={addPlayer}
      >
        <CheckCircleIcon className="icon" />
      </button>

      <table className="table-players">
          {players.map((p, i) => (
            <tr key={i}>
              <td className="td-name">{p.name}</td>
              <td>
                {editingIndex === i ? (
                  <>
                    <input
                      className="edit-input"
                      type="text"
                      value={editingName}
                      onChange={(e) => setEditingName(e.target.value)}
                    />
                    <button
                      className="icon-btn success"
                      onClick={() => saveEdit(i)}
                    >
                      <CheckCircleIcon className="icon" />
                    </button>
                  </>
                  ) : (
                  <>
                    <button
                      className="icon-btn"
                      onClick={() => startEdit(i)}
                    >
                      <PencilSquareIcon className="icon" />
                    </button>
                    <button
                      className="icon-btn danger"
                      onClick={() => removePlayer(i)}
                    >
                      <TrashIcon className="icon" />
                    </button>
                  </>
                )}
              </td>
            </tr>
          ))}
      </table>

      <div>
          <button className="btn-primary" onClick={startGame}>
            <PlayIcon className="btn-icon" />Iniciar Jogo</button>
      </div>

    </>
  )
}