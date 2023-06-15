import React from 'react'
import { getServerSession } from "next-auth/next";

import { submitThought } from '@/utils/actions';
import { redirect } from "next/navigation";

const CreateThought = () => {
    const CreateThought = async (formData) => {
        "use server";
        const session = await getServerSession(authOptions);
        try {
            const post = await submitThought({
              thought: formData.get("thought"),
              tags: formData.get("tags"),
              creator: session.user.id,
            });
          } catch (err) {
            console.log(err);
          }
          redirect("/");
    }
  return (
    <section>
        <form action={CreateThought}>
         <div>
         <textarea 
            name='thought' 
            placeholder='Tell us whats on your Mind?'
            id='thought'
            required

            />
         </div>
         <div>
         <textarea 
            name='thought' 
            placeholder='Tell us whats on your Mind?'
            id='tags'
            required

            />
            
         </div>
        <button>Submit</button>
        </form>
    </section>
  )
}

export default CreateThought

