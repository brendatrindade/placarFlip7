import { useState } from "react"
import type { Round } from "../types"
import { PencilSquareIcon, TrashIcon, CheckCircleIcon } from "@heroicons/react/24/outline"

interface Props {
  rounds: Round[]
  playersNames: string[]
  removeRound: (index: number) => void
  updateRound: (index: number, newRound: Round) => void
}

export default function History({
  rounds,
  playersNames,
  removeRound,
  updateRound
}: Props) {

  const [editingIndex, setEditingIndex] = useState<number | null>(null)
  const [editingValues, setEditingValues] = useState<Round>([])

  function startEdit(index: number) {
    setEditingIndex(index)
    setEditingValues([...rounds[index]])
  }

  function saveEdit(index: number) {
    updateRound(index, editingValues)
    setEditingIndex(null)
  }

  const reversedRounds = [...rounds].reverse()

  return (
    <>
      <div className="history">
        {reversedRounds.map((round, reversedIndex) => {
          const realIndex = rounds.length - 1 - reversedIndex
          const isEditing = editingIndex === realIndex

          return (
            <div className="round-card" key={realIndex}>
              <div className="round-header">
                Rodada {realIndex + 1}
              </div>

              {playersNames.map((name, i) => (
                <div className="round-row" key={i}>
                  <span className="round-player">{name}</span>

                  {isEditing ? (
                    <input
                      type="number"
                      value={editingValues[i]}
                      onChange={(e) => {
                        const updated = [...editingValues]
                        updated[i] = parseInt(e.target.value) || 0
                        setEditingValues(updated)
                      }}
                    />
                  ) : (
                    <span className="round-score">{round[i]}</span>
                  )}
                </div>
              ))}

              <div className="round-actions">
                {isEditing ? (
                  <button
                    className="icon-btn success"
                    onClick={() => saveEdit(realIndex)}
                  >
                    <CheckCircleIcon className="icon" />
                  </button>
                ) : (
                  <>
                    <button
                      className="icon-btn"
                      onClick={() => startEdit(realIndex)}
                    >
                      <PencilSquareIcon className="icon" />
                    </button>
                    <button
                      className="icon-btn danger"
                      onClick={() => removeRound(realIndex)}
                    >
                      <TrashIcon className="icon" />
                    </button>
                  </>
                )}
              </div>
            </div>
          )
        })}
      </div>
    </>
  )
}