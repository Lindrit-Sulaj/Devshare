import React from 'react'
import { getOtherUser } from '@/actions/user'
import { getPosts } from '@/actions/posts';
import { Post } from '@/components';

export default async function UserPage({ params }: { params: { userId: string } }) {
  const user = await getOtherUser(params.userId);

  const { firstName, lastName, bio, profilePicture } = user;

  return (
    <section className='mt-[67px] bg-neutral-900 text-white min-h-[calc(100vh-67px)] w-full overflow-x-hidden px-6'>
      <div className="my-8">
        {profilePicture && <img src={profilePicture} alt={`${firstName} ${lastName} devshare profile`} />}
        <h1 className='font-bold text-3xl text-center'>{firstName} {lastName}</h1>
        {bio && <p>{bio}</p>}
      </div>
      <section className='max-w-screen-lg mx-auto'>
        {
          user.posts.map(post => (
            <Post {...post} key={post.id} user={user} />
          ))
        }
      </section>
    </section>
  )
}
