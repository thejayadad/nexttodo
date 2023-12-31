  'use client'
  
import Button from '@/components/Button';
import HomeThoughts from '@/components/HomeThoughts';
  import Thought from '@/components/HomeThoughts'
  import { useSession } from "next-auth/react";


  export default function Home() {
    const { data: session } = useSession();

    return (
    <main className='cursor-pointer container mx-auto'>
      <h2>Main Home Screen</h2>
      <div>
        <h3>Whats Up?</h3>
        {
          session?.user.id ? (
            <>
            <HomeThoughts />
      

            </>
          
          ) : (
            <>
            <div>
              <span>Sign In - Show a Teaser</span>
            </div>
            
            </>
          )
        }
      </div>
    </main>
    )
  }
