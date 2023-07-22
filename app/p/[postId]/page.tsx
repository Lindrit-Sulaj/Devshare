import React from 'react'
import { getPost } from '@/actions/posts'

export default async function PostPage({ params }: { params: { postId: string } }) {
  const post = await getPost(params.postId)

  return (
    <main className='mt-[67px]'>
      <pre>
        {JSON.stringify(post, null, 2)}
      </pre>
    </main>
  )
}
