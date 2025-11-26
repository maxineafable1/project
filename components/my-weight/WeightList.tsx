'use client'

import { Minus, Plus } from 'lucide-react'
import React, { useState } from 'react'
import NewWeightForm from './NewWeightForm'

type Props = {
  sessId: string
}

export default function WeightList({
  sessId,
}: Props) {
  const [newWeight, setNewWeight] = useState(false)

  return (
    <div className="p-8 lg:p-12 lg:ml-[24rem] space-y-8 lg:space-y-12 flex flex-col">
      {newWeight && (
        <button
          onClick={() => setNewWeight(prev => !prev)}
          className="inline-flex items-center gap-2 text-sm text-white cursor-pointer focus-visible:outline-white focus-visible:outline-2
          bg-blue-500 hover:bg-blue-600 transition-colors px-4 py-2 rounded font-bold self-end
          "
        >
          {newWeight ? <Minus className="size-4" /> : <Plus className="size-4" />}
          {newWeight ? 'Cancel' : 'Add weight'}
        </button>
      )}
      {newWeight && (
        <NewWeightForm sessId={sessId} setNewWeight={setNewWeight} />
      )}
      {!newWeight && (
        <div className="max-w-md mx-auto text-center space-y-4">
          <div className="text-3xl font-bold">Start tracking your bodyweight progress from day one.</div>
          {/* <div className="text-sm mx-auto">Click <span className="font-bold">New Exercise</span> to start tracking your workouts.</div> */}
          <button
            onClick={() => setNewWeight(prev => !prev)}
            className="mt-2 inline-flex items-center gap-2 text-sm text-white cursor-pointer focus-visible:outline-white focus-visible:outline-2
          bg-blue-500 hover:bg-blue-600 transition-colors px-4 py-2 rounded font-bold self-end
          "
          >
            <Plus className="size-4" /> Add weight
          </button>
        </div>
      )}
    </div>
  )
}
