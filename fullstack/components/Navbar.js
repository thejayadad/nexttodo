'use client'

import React, { useState, useEffect } from "react";
import Link from 'next/link'
import Image from "next/image";
import { signIn, signOut, useSession, getProviders } from "next-auth/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";



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
    <header className='cursor-pointer container mx-auto px-5 flex justify-between bg-white dark:bg-gray-800 py-4 items-center z-50 shadow'>
         <div >
            <Link href={'/'}>Thought Spot</Link>
        </div>
        <nav className="transition-all duration-300 bg-primary lg:bg-transparent flex lg:w-auto lg:flex-row justify-center  flex gap-x-9 items-center">
          <ul className="z-50 gap-y-5 items-center flex gap-x-5 flex flex lg:flex-row font-semibold gap-x-2">
        {
            session?.user ? (
                <>
          
              <li>
              <Link 
            
            href={'/create-thought'}>
                Create Post
                </Link>
              </li>
              <li>
              <Image
                src={session?.user.image}
                width={"37"}
                height={"37"}
                className="rounded-full"
                alt="Profile Picture"
              />
              </li>
     
          <li>
          <Link
            href={`/profile/${session?.user.id}`}
            >
            Profile
            </Link>
          </li>
          <li>
          <button onClick={signOut}>
                Logout
            </button>
          </li>
                
                </>

            ) : (
                <>
                 {providers &&
            Object.values(providers).map((provider) => (
            <li>
                <button
                key={provider.name}
                onClick={() => signIn(providers.id)}
              >
                Sign In
              </button>
            </li>
            ))}

                </>
            )
        }
        </ul>
    </nav>
    </header>
  )
}

export default Navbar