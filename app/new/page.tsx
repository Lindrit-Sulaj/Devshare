import React from 'react';
import { ReactMarkdown } from 'react-markdown/lib/react-markdown';
import remarkGfm from 'remark-gfm';
import { NewPost } from '@/components';

const markdown = `A paragraph with *emphasis* and **strong importance**.

> A block quote with ~strikethrough~ and a URL: https://reactjs.org.

* Lists
* [ ] todo
* [x] done

A table:

| a | b |
| - | - |
`

export default function NewPostPage() {
  return (
    <main className='mt-[67px] px-5 w-full min-h-[calc(100vh-67px)] bg-neutral-100'>
      <div className='w-full max-w-screen-xl mx-auto py-4 h-full'>
        <NewPost />
      </div>
    </main>
  )
}
