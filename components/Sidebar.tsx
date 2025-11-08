'use client'

import { authClient } from '@/lib/auth-client'
import { Bolt, Menu, Search, User, X } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'

export default function Sidebar() {
  const [sidebar, setSidebar] = useState(false)

  const {
    data: session,
  } = authClient.useSession()

  const router = useRouter()

  const divRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (e.target instanceof HTMLElement && divRef.current && !divRef.current.contains(e.target)) {
        setSidebar(prev => prev = false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [sidebar])

  return (
    <>
      <div ref={divRef} className={`p-4 flex flex-col  
          dark:bg-neutral-900 bg-slate-100 fixed w-sm min-h-dvh
          ${sidebar && 'translate-x-0'} 
          lg:translate-x-0 duration-300 ease-in-out
          top-0 left-0 z-40 overflow-y-auto transition-transform -translate-x-full
      `}>
        <div className="flex justify-between items-center mb-2">
          <Link href='/' className="text-lg font-bold">App Name</Link>
          {/* close button hidden in large screen */}
          <button
            onClick={() => setSidebar(prev => !prev)}
            className={`text-neutral-200 hover:text-neutral-50
            transition-colors cursor-pointer lg:hidden
          `}
          >
            <X />
          </button>
        </div>
        <div className="mb-4">
          <div className="
            focus-within:border-blue-500
            border border-slate-300 rounded-md px-4 py-2 inline-flex items-center gap-2 w-full">
            <Search className='size-5' />
            <input
              type="search"
              placeholder='Search'
              className='text-sm w-full focus:border-0 focus:outline-0'
            />
          </div>
        </div>
        {/* <button
          onClick={() => setIsCreate(prev => !prev)}
          className={`px-8 py-2 bg-neutral-900 text-neutral-100 rounded-md w-full 
            dark:bg-neutral-100 dark:text-neutral-900 text-sm cursor-pointer
            hover:bg-neutral-800 dark:hover:bg-neutral-200 transition-colors
          `}
        >
          Add a workout
        </button> */}
        <div className="font-bold text-sm mb-2">
          Main Menu
        </div>
        <div className="flex items-center gap-2 py-1.5 px-3
          hover:bg-slate-300 rounded transition-colors
        ">
          <User className='size-5' />
          <h2>User Name</h2>
        </div>
        <div className="flex items-center gap-2 py-1.5 px-3
          hover:bg-slate-300 rounded transition-colors
        ">
          <Bolt className='size-5' />
          <h2>Settings</h2>
        </div>
        {session && (
          <button
            onClick={async () => {
              await authClient.signOut({
                fetchOptions: {
                  onSuccess: () => {
                    router.push("/");
                  },
                },
              });
            }}
            className='px-8 py-2 rounded-md w-full text-sm cursor-pointer mt-auto 
            bg-slate-500 hover:bg-slate-600 text-white transition-colors 
            '
          >
            Sign out
          </button>
        )}
      </div>
      {/* hamburger when small screen */}
      <button
        onClick={() => setSidebar(prev => !prev)}
        className={`fixed top-2 left-2 z-50 rounded-sm
        transition-all hover:bg-neutral-100 hover:text-neutral-900 p-1 
        cursor-pointer lg:hidden 
        ${sidebar ? '-translate-x-52 duration-150' : 'translate-x-0 duration-400'}
        `}
      >
        <Menu />
      </button>
    </>
  )
}
