"use client"
import React, { useEffect, useState, KeyboardEvent, FormEvent } from 'react'
import Link from 'next/link';
import { ReactMarkdown } from 'react-markdown/lib/react-markdown';

import { createPost } from '@/actions/posts';

interface PostProps {
  title: string;
  tags: string[];
  body: string;
  setTitle?: any;
  setTags?: any;
  setBody?: any;
}

export default function NewPost() {
  const [tab, setTab] = useState<"edit" | "preview">("edit")
  const [title, setTitle] = useState<string>("");
  const [tags, setTags] = useState<string[]>([]);
  const [body, setBody] = useState<string>("")

  async function handlePublish() {
    const res = await createPost({
      title,
      tags,
      body
    });

    console.log(res);
  }

  return (
    <section className='flex flex-col lg:flex-row gap-4 overflow-y-auto h-full'>
      <div className='bg-white w-full lg:w-4/5 grow h-full rounded-lg'>
        <div className="bg-neutral-100 w-full flex justify-end gap-2 py-2">
          <button className={`px-2 rounded-md py-2 ${tab === "edit" && "bg-white border-solid border-[1px] border-neutral-200"}`} onClick={() => setTab("edit")}>Edit</button>
          <button className={`px-2 rounded-md py-2 ${tab === "preview" && "bg-white border-solid border-[1px] border-neutral-200"}`} onClick={() => setTab("preview")}>Preview</button>
        </div>
        {tab === "edit" ? (
          <Create
            title={title}
            setTitle={setTitle}
            tags={tags}
            setTags={setTags}
            body={body}
            setBody={setBody} />
        ) : (
          <Preview
            title={title}
            tags={tags}
            body={body}
          />
        )}
      </div>
      <div className='w-full lg:w-1/5 h-full flex flex-col justify-end gap-3'>
        <button className='px-4 py-[10px] rounded-md border-solid border-[1px] border-neutral-300 bg-white hover:underline'>Save draft</button>
        <button onClick={handlePublish} className='px-4 py-[10px] text-white rounded-md bg-blue-600 font-medium hover:underline'>Publish</button>
      </div>
    </section>
  )
}

function Create({ title, tags, body, setTitle, setTags, setBody }: PostProps) {
  const [newTag, setNewTag] = useState<string>("");

  const removeTag = (tag: string) => {
    const newTags = tags.filter(elem => elem !== tag);
    setTags(newTags)
  }

  const handleTag = (e: KeyboardEvent) => {
    if (e.key !== "Enter" || tags.includes(newTag) || newTag.split(" ").length !== 1) return;

    setTags([...tags, newTag]);
    setNewTag("");
  }

  return (
    <div className='p-8'>
      <input value={title} onChange={(e) => setTitle(e.target.value)} className='text-3xl lg:text-5xl font-extrabold placeholder:text-neutral-600 outline-none whitespace-normal w-full' type="text" placeholder='New post title here...' />
      <div className='mt-4 mb-4 flex items-center flex-wrap gap-2'>
        {tags.map((tag) => (
          <div key={tag} className='flex items-center bg-neutral-50 border-solid border-[1px] border-neutral-200 px-3 py-1 gap-1 rounded-full'>
            <Link href="#">#{tag}</Link>
            <button type="button" onClick={() => { removeTag(tag) }} aria-label={`Remove ${tag}`}>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        ))}
        {tags.length <= 3 && <input value={newTag} onChange={e => setNewTag(e.target.value)} className='outline-none' onKeyDown={handleTag} type="text" placeholder={tags.length === 0 ? "Enter up to 4 tags" : "Add tag"} />}
      </div>
      <hr />
      <textarea value={body} onChange={(e) => setBody(e.target.value)} className='w-full h-full outline-none py-6 text-lg' name="body" id="body" placeholder='Enter body here...' cols={30} rows={10}></textarea>
    </div>
  )
}

export function Preview({ title, body, tags }: PostProps) {
  return (
    <div className='px-4 py-6'>
      <h1 className='text-3xl mb-3 lg:text-5xl font-extrabold placeholder:text-neutral-600 outline-none whitespace-normal w-full'>{title}</h1>
      <div className="tags flex gap-2">
        {tags.map((tag) => (
          <div key={tag} className='flex items-center bg-neutral-50 border-solid border-[1px] border-neutral-200 px-3 py-1 gap-1 rounded-full'>
            <Link href="#">#{tag}</Link>
          </div>
        ))}
      </div>
      <div className='markdown'>
        <ReactMarkdown components={{
          h1({ children }) {
            return <h1 className='text-2xl lg:text-3xl font-bold'>{children}</h1>
          },
          h2({ children }) {
            return <h2 className='text-xl lg:text-2xl font-bold'>{children}</h2>
          },
          h3({ children }) {
            return <h3 className='text-lg lg:text-xl font-bold'>{children}</h3>
          },
          h4({ children }) {
            return <h4 className='text-[17px] lg:text-lg font-semibold'>{children}</h4>
          },
          code({ children }) {
            return <code className='bg-neutral-100 rounded-md px-2 py-[2px]'>{children}</code>
          },
          ul({ children }) {
            return <ul className='list-circle list-inside px-4'>{children}</ul>
          },
          li({ children }) {
            return <li className='list-disc'>{children}</li>
          },
        }}>
          {body}
        </ReactMarkdown>
      </div>
    </div>
  )
}