'use client'

import { logout } from '@/lib/session'
import { Dumbbell, LayoutDashboard, LogOutIcon, Menu, Weight, X } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'

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

  const router = useRouter()
  const pathname = usePathname()

  const divRef = useRef<HTMLDivElement>(null)

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
