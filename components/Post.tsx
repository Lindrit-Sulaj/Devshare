"use client"
import React from 'react'
import Link from 'next/link'
import type { Post, User } from '@prisma/client'

export default function Post({ id, title, userId, tags, createdAt, user }: Post & { user: User }) {
  const { firstName, lastName, profilePicture } = user;
  const date = new Date(createdAt).toLocaleString("de-DE").slice(0, 9).split(".")

  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]

  return (
    <div className='bg-neutral-850 rounded-lg my-4 px-6 pb-4 pt-5 text-white border-solid border-[1px] border-neutral-800'>
      <h5 className='font-medium text-neutral-300 hover:underline'>
        <Link href={`/u/${userId}`}>
          {`${firstName} ${lastName}`}
        </Link>
      </h5>
      <h3 className='font-bold text-2xl hover:underline'>
        <Link href={`/p/${id}`}>{title}</Link>
      </h3>
      <div className="flex gap-1 my-2">
        {
          tags.map(tag => (
            <Link className='px-2 py-[2px] hover:bg-neutral-800 transition-all border-solid border-neutral-800 hover:border-neutral-400 border-[1px] rounded-md' key={tag} href={`/t/${tag}`}>
              #{tag}
            </Link>
          ))
        }
      </div>
      <div className='flex justify-between items-center mt-2'>
        <p className='text-sm text-neutral-400 font-medium'>
          {`${months[(Number(date[1])) - 1]} ${date[0]} ${new Date().getFullYear() !== Number(date[2]) ? ", " + date[2] : ""}`}
        </p>
        <div className="flex items-center gap-3">
          <button className='text-sky-300'>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-[26px] h-[26px]">
              <path strokeLinecap="round" strokeLinejoin="round" d="M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 01-2.555-.337A5.972 5.972 0 015.41 20.97a5.969 5.969 0 01-.474-.065 4.48 4.48 0 00.978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25z" />
            </svg>
          </button>
          <button className='text-red-300'>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-[26px] h-[26px]">
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
            </svg>
          </button>
          <button className='text-emerald-300'>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-[26px] h-[26px]">
              <path strokeLinecap="round" strokeLinejoin="round" d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0111.186 0z" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  )
}
