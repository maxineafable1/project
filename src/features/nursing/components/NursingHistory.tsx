import React from 'react'
import { historyText } from '../data/history'

export default function NursingHistory() {
  return (
    <div className='space-y-16'>
      <h2 className='text-4xl text-shadow shadow-black/30 font-semibold text-center uppercase'>Nursing History</h2>
      <p className='text-xl leading-loose bg-black/50 p-8 rounded-lg'>{historyText}</p>
    </div>
  )
}
