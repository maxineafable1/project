import { deleteExercise } from '@/actions/exercise-actions'
import { LoaderCircle } from 'lucide-react'
import React, { RefObject, useEffect, useRef, useState } from 'react'

type Props = {
  deleteBtnRef: RefObject<HTMLButtonElement | null>
  exerciseId: number
}

export default function DeleteConfirmModal({
  deleteBtnRef,
  exerciseId,
}: Props) {
  const [isDeleteLoading, setDeleteLoading] = useState(false)

  const cancelBtnRef = useRef<HTMLButtonElement | null>(null)
  const dialogRef = useRef<HTMLDialogElement | null>(null)

  async function handleExerciseDelete(exerciseId: number) {
    setDeleteLoading(true)
    const res = await deleteExercise(exerciseId)
    if (res?.error)
      console.log(res.error)
    else
      setDeleteLoading(false)
  }

  useEffect(() => {
    const deleteBtn = deleteBtnRef.current
    const modal = dialogRef.current
    const cancelBtn = cancelBtnRef.current

    function showModal() {
      if (modal)
        modal.showModal()
    }

    function closeModal() {
      if (modal)
        modal.close()
    }

    deleteBtn?.addEventListener('click', showModal)
    cancelBtn?.addEventListener('click', closeModal)

    return () => {
      deleteBtn?.removeEventListener('click', showModal);
      cancelBtn?.removeEventListener('click', closeModal);
    };
  }, [deleteBtnRef.current])

  return (
    <dialog
      ref={dialogRef}
      className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
          backdrop:bg-black backdrop:opacity-80 dark:bg-neutral-800 dark:text-white
          rounded-lg shadow p-6 max-w-sm w-full
        ">
      <div className="text-lg font-bold mb-1">Are you sure?</div>
      <p className="text-sm">This will permanently delete this exercise.</p>
      <div className="flex items-center justify-end gap-2 mt-4 ">
        <button
          ref={cancelBtnRef}
          className="px-4 py-1.5 rounded-lg border border-neutral-300 not-dark:hover:bg-neutral-100 
            focus-visible:outline-blue-500 focus-visible:outline focus-visible:border-blue-500
              dark:border-neutral-700 dark:hover:border-neutral-500 transition-colors "
        >
          Cancel
        </button>
        <form method="dialog">
          <button
            onClick={() => handleExerciseDelete(exerciseId)}
            disabled={isDeleteLoading}
            className="px-4 py-1.5 rounded-lg bg-red-500 hover:bg-red-600 
                focus-visible:outline-blue-500 focus-visible:outline-2
                transition-colors text-white inline-flex items-center gap-1">
            {isDeleteLoading ? <>
              <LoaderCircle className="size-4 animate-spin" />
              Deleting...
            </>
              : 'Delete'}
          </button>
        </form>
      </div>
    </dialog>
  )
}
