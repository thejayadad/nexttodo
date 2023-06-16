'use client'

import React, { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import ThoughtCard from "@/components/ThoughtCard";


const ProfilePage = ({ params }) => {
const { data: session } = useSession();
const [userThought, setUserThought] = useState([]);



useEffect(() => {
    const fetchThoughts = async () => {
      const response = await fetch(`/api/user/${params.id}`);
      const data = await response.json();

      setUserThought(data);
    };

    if (session?.user.id) fetchThoughts();
  }, [session?.user.id, upvoteState]);


  return (
    <section>
        <h2>Profile Page</h2>
        <div>
        {userThought.length < 1 ? (
          <h3>
            No THoughts
          </h3>
        ) : (
          userThought.map((singleUserThought) => (
            <ThoughtCard {...singleUserThought} setUpvoteState={setUpvoteState} />
          ))
        )}
        </div>
    </section>
  )
}

export default ProfilePage