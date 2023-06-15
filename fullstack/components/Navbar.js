import React from 'react'
import Link from 'next/link'

const Navbar = () => {
  return (
    <header className='flex justify-around'>
        <nav>
            <Link href={'/'}>Thought Spot</Link>
        </nav>
        <div>
            <Link href={'/create-thought'}>
                Create Post
            </Link>
        </div>
    </header>
  )
}

export default Navbar