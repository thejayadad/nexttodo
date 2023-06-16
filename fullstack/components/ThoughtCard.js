import React from 'react'
import { useSession } from "next-auth/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretUp } from "@fortawesome/free-solid-svg-icons";



const ThoughtCard = ({



  thought,
  tags,
  _id,
  upvotes,
  creator,
  setUpvoteState,
}) => {
  const { data: session } = useSession();
  const handleUpVote = async () => {
    try {
      const response = await fetch(`/api/thought/${_id}`, {
        method: "PATCH",
        body: JSON.stringify({
          userId: session?.user.id,
        }),
      });
      setUpvoteState((prev) => !prev);
    } catch (err) {
      console.log(err);
    }
  };

  const handleDelete = async () => {
    try {
      const response = await fetch(`/api/thought/${_id}`, {
        method: "DELETE",
      });
      setUpvoteState((prev) => !prev);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
    <div>
      <h2>{thought}</h2>
      <p>{tags}</p>
      {session?.user.id === creator && (
          <button className="delete-btn" onClick={handleDelete}>
            Delete
          </button>
        )}
    </div>
    <button className="flex flex-col items-center" onClick={handleUpVote}>
        {upvotes.includes(session?.user.id) ? (
          <FontAwesomeIcon
            icon={faCaretUp}
            size="2xl"
            className="upvoted"
          ></FontAwesomeIcon>
        ) : (
          <FontAwesomeIcon
            icon={faCaretUp}
            size="2xl"
            className="not-upvoted"
          ></FontAwesomeIcon>
        )}
        {upvotes.length}
      </button>
    </div>
  )
}

export default ThoughtCard