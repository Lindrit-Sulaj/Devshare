import React from 'react';
import { NewPost } from '@/components';

export default function NewPostPage() {
  return (
    <main className='mt-[67px] px-5 w-full min-h-[calc(100vh-67px)] bg-neutral-900'>
      <div className='w-full max-w-screen-xl mx-auto py-4 h-full'>
        <NewPost />
      </div>
    </main>
  )
}
