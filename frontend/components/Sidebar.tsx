'use client'

import { logout } from '@/lib/session'
import { Calendar, ChevronDown, Dumbbell, LayoutDashboard, LogOutIcon, Menu, Search, Weight, X } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { useCallback, useEffect, useRef, useState } from 'react'


import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu"
import { Button } from './ui/button'

const navItems = [
  {
    href: '/dashboard',
    label: 'Dashboard',
    icon: LayoutDashboard,
  },
  {
    href: '/workouts',
    label: 'Workouts',
    icon: Dumbbell,
  },
  {
    href: '/my-weight',
    label: 'My Weight',
    icon: Weight,
  },
]

type Props = {
  username: string
}

export default function Sidebar({
  username,
}: Props) {
  const [sidebar, setSidebar] = useState(false)
  const [isSortDropdown, setIsSortDropdown] = useState(false)

  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const divRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (e.target instanceof HTMLElement && divRef.current && !divRef.current.contains(e.target)) {
        setSidebar(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [sidebar])

  // Get a new searchParams string by merging the current
  // searchParams with a provided key/value pair
  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString())
      params.set(name, value)

      return params.toString()
    },
    [searchParams]
  )

  const sortBy = searchParams.get('sortBy')

  return (
    <>
      <div ref={divRef} className={`p-4 flex flex-col  
          dark:bg-neutral-900 bg-neutral-100 fixed w-xs md:w-sm min-h-dvh
          ${sidebar && 'translate-x-0'} 
          lg:translate-x-0 duration-300 ease-in-out
          top-0 left-0 z-40 overflow-y-auto transition-transform -translate-x-full
      `}>
        <div className="flex justify-between items-center mb-2">
          <Link href='/' className="text-lg font-bold focus-visible:outline-blue-500 focus-visible:outline-2 flex items-center gap-1">
            <Image src={'/icon.png'} className='mx-auto' alt='Liftts logo icon' width={25} height={25} />
            <div className="">
              Liftts
            </div>
          </Link>
          {/* close button hidden in large screen */}
          <button
            onClick={() => setSidebar(prev => !prev)}
            className={`hover:opacity-80 focus-visible:outline-blue-500 focus-visible:outline-2
            transition-opacity cursor-pointer lg:hidden
          `}
          >
            <X />
          </button>
        </div>
        {pathname === '/workouts' && (
          <>
            <div className="mb-4">
              <form
                onSubmit={e => {
                  e.preventDefault()
                  if (inputRef.current && inputRef.current.value)
                    router.push(pathname + '?' + createQueryString('search', inputRef.current.value))
                  else
                    router.push(pathname)
                }}
                className="
            focus-within:border-blue-500 focus-within:outline-blue-500 focus-within:outline
            border border-neutral-300 dark:border-neutral-700
            rounded-md px-4 py-2 inline-flex items-center gap-2 w-full">
                <Search className='size-5' />
                <input
                  ref={inputRef}
                  type="search"
                  placeholder='Search'
                  className='text-sm w-full focus:border-0 focus:outline-0'
                />
              </form>
            </div>
            <div className="font-bold text-sm mb-2">
              Sort by
            </div>
            <button
              onClick={() => setIsSortDropdown(prev => !prev)}
              className={`inline-flex items-center gap-2 py-1.5 px-3 focus-visible:outline-blue-500 focus-visible:outline-2
                ${isSortDropdown ? 'bg-white dark:bg-neutral-700' : 'hover:bg-white dark:hover:bg-neutral-700'} 
                rounded transition-colors w-full text-sm
              `}>
              <Calendar className='size-4' />
              <span>Date</span>
              <ChevronDown className='size-4 ml-auto' />
            </button>
            {isSortDropdown && (
              <div className='w-full translate-y-1 overflow-hidden bg-white dark:bg-neutral-700 rounded *:text-start'>
                <ul className="text-sm">
                  <li
                    onClick={() => {
                      if (sortBy === 'date_desc') return
                      router.push(pathname + '?' + createQueryString('sortBy', 'date_desc'))
                      setIsSortDropdown(false)
                    }}
                    className={`px-4 py-2 transition-colors 
                  ${sortBy === 'date_desc' ? 'bg-neutral-100 dark:bg-neutral-600' : 'hover:bg-neutral-100 dark:hover:bg-neutral-600 cursor-pointer'}
                `}>
                    Newest First
                  </li>
                  <li
                    onClick={() => {
                      if (sortBy === 'date_asc') return
                      router.push(pathname + '?' + createQueryString('sortBy', 'date_asc'))
                      setIsSortDropdown(false)
                    }}
                    className={`px-4 py-2 transition-colors
                  ${sortBy === 'date_asc' ? 'bg-neutral-100 dark:bg-neutral-600' : 'hover:bg-neutral-100 dark:hover:bg-neutral-600 cursor-pointer'}
                `}>
                    Oldest First
                  </li>
                </ul>
              </div>
            )}
          </>
        )}
        <div className="font-bold text-sm my-2">
          Application
        </div>
        {navItems.map(({ href, label, icon: Icon }) => (
          <Link
            key={href}
            href={href}
            onClick={e => {
              if (href === pathname) {
                e.preventDefault()
                return
              }

              setSidebar(false)
            }}
            aria-current={pathname === href ? 'page' : undefined}
            className='inline-flex items-center gap-2 py-1.5 px-3 focus-visible:outline-blue-500 focus-visible:outline-2
          hover:bg-white dark:hover:bg-neutral-700 rounded transition-colors w-full text-sm'
          >
            <Icon className="size-4" />
            {label}
          </Link>
        ))}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className='justify-start mt-auto'>
              {username}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent style={{ width: "var(--radix-popper-anchor-width)" }}>
            {/* <DropdownMenuItem>
              <UserIcon />
              Profile
            </DropdownMenuItem>
            <DropdownMenuSeparator /> */}
            <DropdownMenuItem
              variant="destructive"
              onClick={async () => {
                await logout()
                router.push('/')
              }}
            >
              <LogOutIcon />
              Log out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      {/* hamburger when small screen */}
      <button
        onClick={() => setSidebar(prev => !prev)}
        className={`fixed top-2 left-2 z-50 rounded-sm
        transition-all hover:bg-neutral-100 hover:text-neutral-900 p-1 
        cursor-pointer lg:hidden focus-visible:outline-blue-500 focus-visible:outline-2
        ${sidebar ? '-translate-x-52 duration-150' : 'translate-x-0 duration-400'}
        `}
      >
        <Menu />
      </button>
    </>
  )
}
