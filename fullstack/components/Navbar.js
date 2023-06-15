'use client'

import React, { useState, useEffect } from "react";
import Link from 'next/link'
import Image from "next/image";
import { signIn, signOut, useSession, getProviders } from "next-auth/react";



const Navbar = () => {
    const { data: session } = useSession();
    const [providers, setProviders] = useState(null);
  
    useEffect(() => {
      const setupProviders = async () => {
        const response = await getProviders();
        setProviders(response);
      };
      setupProviders();
    }, []);
  
  return (
    <header className='flex justify-around'>
        <nav>
            <Link href={'/'}>Thought Spot</Link>
        </nav>
        {
            session?.user ? (
                <>
            <div>
            <Link 
            
            href={'/create-thought'}>
                Create Post
            </Link>
            <Image
                src={session?.user.image}
                width={"37"}
                height={"37"}
                className="rounded-full"
                alt="Profile Picture"
              />
            <Link
            href={`/profile/${session?.user.id}`}
            >
            Profile
            </Link>
            <button onClick={signOut}>
                Logout
            </button>
            </div>
                
                </>

            ) : (
                <>
                 {providers &&
            Object.values(providers).map((provider) => (
              <button
                key={provider.name}
                onClick={() => signIn(providers.id)}
              >
                Sign In
              </button>
            ))}

                </>
            )
        }
        
    
     
    </header>
  )
}

export default Navbar