'use client'

import { useState } from "react"
import Sidebar from "./Sidebar"
import CreateExerciseForm from "./CreateExerciseForm"

export default function Dashboard() {
  const [isCreate, setIsCreate] = useState(false)

  return (
    <>
      <Sidebar setIsCreate={setIsCreate} />
      <div className="p-8 lg:p-12 lg:ml-[24rem] space-y-8 lg:space-y-12 
      ">
        {isCreate && <CreateExerciseForm setIsCreate={setIsCreate} />}
        <div className="border rounded-lg w-full p-4">
          <h2 className='mb-4 text-xl font-bold'>{new Date().toLocaleDateString()}</h2>
          <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-4">
            <div className="bg-neutral-500 p-4 rounded-md">Card text</div>
            <div className="bg-neutral-500 p-4 rounded-md">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Suscipit itaque corporis nostrum corrupti, aut ullam quod ipsum deleniti debitis explicabo molestiae ab repudiandae incidunt neque possimus molestias accusamus asperiores ipsa.

            </div>
            <div className="bg-neutral-500 p-4 rounded-md">Card text</div>
            <div className="bg-neutral-500 p-4 rounded-md">Card text</div>
            <div className="bg-neutral-500 p-4 rounded-md">Card text</div>
            <div className="bg-neutral-500 p-4 rounded-md">Card text</div>
          </div>
        </div>
      </div>
    </>
  )
}
