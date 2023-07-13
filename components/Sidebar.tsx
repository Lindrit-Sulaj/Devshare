'use client'
import React, { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

import useMediaQuery from '@/utils/useMediaQuery'

interface SidebarItem { href: string, label: string, icon: string }

const sidebarItems: SidebarItem[] = [
  {
    href: '/',
    label: 'Home',
    icon: 'home'
  },
  {
    href: '/search',
    label: 'Search',
    icon: 'search'
  },
  {
    href: '/create',
    label: 'Create',
    icon: 'create'
  },
  {
    href: '/settings',
    label: 'Settings',
    icon: 'settings'
  },
  {
    href: '/profile',
    label: 'Profile',
    icon: 'account_circle'
  }
]

export default function Sidebar() {
  const breakpoint = useMediaQuery();
  const [navOpened, setNavOpened] = useState<boolean>(false)

  return (
    <>
      <nav className='flex justify-between items-center lg:hidden h-[65px] px-5'>
        <h2 className='flex items-center gap-1 font-bold text-lg'>
          <span className="material-symbols-outlined text-orange-600">terminal</span>
          devshare
        </h2>

        <button onClick={() => setNavOpened(!navOpened)}>
          <span className="material-symbols-outlined">menu</span>
        </button>

        {navOpened && ["sm", "md"].includes(breakpoint) && (
          <div className='fixed top-[65px] left-0 bg-white py-10 w-full'>
            <ul className='flex flex-col items-center gap-3'>
              {sidebarItems.map(item => (
                <SidebarItem key={item.label} {...item} />
              ))}
              <li>
                <button className='bg-orange-600 transition-all px-3 hover:bg-orange-500  py-[10px] text-white flex gap-2 justify-center rounded-md'>
                  <span className="material-symbols-outlined">logout</span>
                  <span>Sign out</span>
                </button>
              </li>
            </ul>
          </div>
        )}
      </nav>
      <aside className='hidden h-screen lg:flex flex-col justify-between px-4 py-4'>
        <h2 className='flex items-center gap-1 font-bold text-xl'>
          <span className="material-symbols-outlined text-orange-600">terminal</span>
          devshare
        </h2>
        <ul>
          {sidebarItems.map(item => (
            <SidebarItem key={item.label} {...item} />
          ))}
        </ul>
        <button className='bg-orange-600 transition-all hover:bg-orange-500  py-[10px] text-white flex gap-2 justify-center rounded-md'>
          <span className="material-symbols-outlined">logout</span>
          <span>Sign out</span>
        </button>
      </aside>
    </>
  )
}

function SidebarItem({ href, label, icon }: SidebarItem) {
  const path = usePathname();

  return (
    <li className={`${path === href ? "text-black font-medium bg-neutral-100 rounded-md" : "text-neutral-700"} flex gap-2 py-2 px-2 items-center lg:my-4 text-[17px] lg:w-[150px] xl:w-[170px]`}>
      <span className="material-symbols-outlined">{icon}</span>
      <Link href={href}>{label}</Link>
    </li>
  )
}