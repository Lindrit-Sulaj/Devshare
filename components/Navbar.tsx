"use client"
import React, { useEffect, useState } from 'react'
import { useSession } from 'next-auth/react'
import useMediaQuery from '@/utils/useMediaQuery';
import { useLoginModal } from './ClientContext';
import Link from 'next/link';
import { signOut } from 'next-auth/react';

export default function Navbar() {
  const loginModal = useLoginModal();
  const { data, status } = useSession();
  const breakpoint = useMediaQuery();
  const [opened, setOpened] = useState(false);

  useEffect(() => {
    console.log(status);
  }, [status])

  if (["md", "sm"].includes(breakpoint)) {
    return (
      <nav className="fixed top-0 w-full h-[67px] bg-white px-5 border-solid border-b-[1px] border-b-neutral-200 flex items-center justify-between">
        <h2 className='font-bold flex items-center gap-2 bg-black text-white px-3 rounded-md py-[6px] text-lg'>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 7.5l3 2.25-3 2.25m4.5 0h3m-9 8.25h13.5A2.25 2.25 0 0021 18V6a2.25 2.25 0 00-2.25-2.25H5.25A2.25 2.25 0 003 6v12a2.25 2.25 0 002.25 2.25z" />
          </svg>
          <span>devshare</span>
        </h2>
        <button onClick={() => setOpened(!opened)}>
          {!opened ? (
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          )}
        </button>

        {opened && (
          <div className='fixed top-[67px] left-0 bg-white py-6 w-full px-5'>
            <Searchbar />
            {status === "unauthenticated" && (
              <div className='flex gap-2 my-3'>
                <button onClick={loginModal.onOpen} className='w-1/2 border-solid border-[1px] py-2 border-neutral-300 rounded-md hover:underline'>Log in</button>
                <button className="w-1/2 bg-blue-500 text-white rounded-md hover:bg-blue-600 hover:underline">Create account</button>
              </div>
            )}
            {status === "authenticated" && (
              <div className='flex flex-col justify-center mt-4'>
                <Link href="/profile" className='flex justify-center items-center gap-2'>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.6} stroke="currentColor" className="w-7 h-7">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <span className='text-lg'>Profile</span>
                </Link>
                <Link href="/new" className='text-blue-600 font-medium border-solid border-[1px] border-blue-600 px-3 py-[7px] rounded-md hover:underline hover:text-white hover:bg-blue-600 mx-auto block my-2'>
                  Create Post
                </Link>
                <button onClick={() => signOut()} className="mx-auto px-6 bg-blue-500 text-white rounded-md hover:bg-blue-600 hover:underline py-[6px] mt-3">
                  Log out
                </button>
              </div>
            )}
          </div>
        )}
      </nav>
    )
  }

  return (
    <nav className="fixed top-0 w-full h-[67px] bg-white px-5 border-solid border-b-[1px] border-b-neutral-200">
      <div className='max-w-screen-xl flex items-center h-full justify-between mx-auto'>
        <div className="flex gap-2">
          <h2 className='font-bold flex items-center gap-2 bg-black text-white px-3 rounded-md py-[6px] text-lg'>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 7.5l3 2.25-3 2.25m4.5 0h3m-9 8.25h13.5A2.25 2.25 0 0021 18V6a2.25 2.25 0 00-2.25-2.25H5.25A2.25 2.25 0 003 6v12a2.25 2.25 0 002.25 2.25z" />
            </svg>
            <span>devshare</span>
          </h2>
          <Searchbar />
        </div>
        <div className='flex gap-2'>
          {status === "unauthenticated" && (
            <>
              <button onClick={loginModal.onOpen} className='border-solid border-[1px] py-[6px] px-3 border-neutral-400 rounded-md hover:underline'>
                Log in
              </button>
              <button className='bg-blue-500 text-white px-3 rounded-md hover:bg-blue-600 hover:underline'>
                Create account
              </button>
            </>
          )}
          {status === "authenticated" && (
            <div className='flex items-center gap-3'>
              <Link href="/new" className='text-blue-600 font-medium border-solid border-[1px] border-blue-600 px-3 py-[7px] rounded-md hover:underline hover:text-white hover:bg-blue-600'>
                Create Post
              </Link>
              <Link href="/profile">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.4} stroke="currentColor" className="w-7 h-7">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </Link>
              <button onClick={() => signOut()}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9" />
                </svg>
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  )
}

function Searchbar() {
  return (
    <form className='border-solid border-[1px] border-neutral-300 pl-3 flex items-center rounded-md py-2 lg:py-0'>
      <input className='outline-none grow w-[350px] max-w-full' type="text" placeholder='Search for anything' />
      <button className='px-2 hover:bg-blue-100 transition-all h-full'>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.9} stroke="currentColor" className="w-6 h-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
        </svg>
      </button>
    </form>
  )
}