  'use client'
  
  import Thought from '@/components/Thought'
  import { useSession } from "next-auth/react";


  export default function Home() {
    const { data: session } = useSession();

    return (
    <main>
      <h2>Main Home Screen</h2>
      <div>
        <h3>Whats Up?</h3>
        {
          session?.user.id ? (
    
            <Thought />
          
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
