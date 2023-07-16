"use client"
import React, { useState } from 'react'

interface PostProps {
  title: string;
  tags: string[];
  body: string;
  setTitle?: any;
  setTags?: any;
  setBody?: any;
}

export default function NewPost() {
  const [title, setTitle] = useState<string>("");
  const [tags, setTags] = useState<string[]>([]);
  const [body, setBody] = useState<string>("")

  return (
    <section className='flex gap-4 overflow-y-auto h-full'>
      <div className='bg-white w-4/5 h-full rounded-lg'>
        <div className="h-10 bg-neutral-100 w-full"></div>
        <Create
          title={title}
          setTitle={setTitle}
          tags={tags}
          setTags={setTags}
          body={body}
          setBody={setBody} />
      </div>
      <div className='w-1/5 h-full flex flex-col justify-end gap-3'>
        <button className='px-4 py-[10px] rounded-md border-solid border-[1px] border-neutral-300 bg-white hover:underline'>Save draft</button>
        <button className='px-4 py-[10px] text-white rounded-md bg-blue-600 font-medium hover:underline'>Publish</button>
      </div>
    </section>
  )
}

function Create({ title, tags, body, setTitle, setTags, setBody }: PostProps) {
  return (
    <form className='p-8'>
      <input value={title} onChange={(e) => setTitle(e.target.value)} className='lg:text-5xl font-extrabold placeholder:text-neutral-600 outline-none whitespace-normal w-full' type="text" placeholder='New post title here...' />
      <div className='my-6'>
        <input className='text-lg outline-none' type="text" placeholder='Enter tags' />
      </div>
      <hr />
    </form>
  )
}

export function Preview() {
  return (
    <div>
      Preview
    </div>
  )
}