import React from 'react'
import { getOtherUser } from '@/actions/user'
import { getPosts } from '@/actions/posts';

export default async function UserPage({ params }: { params: { userId: string } }) {
  const user = await getOtherUser(params.userId, {
    include: {
      posts: true
    }
  });

  const { firstName, lastName, bio, profilePicture } = user;

  return (
    <section className='mt-[67px] bg-neutral-900 text-white min-h-[calc(100vh-67px)] w-full overflow-x-hidden'>
      <div className="my-8">
        {profilePicture && <img src={profilePicture} alt={`${firstName} ${lastName} devshare profile`} />}
        <h1 className='font-bold text-3xl text-center'>{firstName} {lastName}</h1>
        <p className='text-center mx-auto mt-1 text-neutral-400 text-[17px]'>60 followers - 34 following</p>
        {bio && <p>{bio}</p>}
      </div>
      <pre>
        {JSON.stringify(user, null, 2)}
      </pre>
    </section>
  )
}
