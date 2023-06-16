'use client'
import React, { useState, useEffect } from "react";
import { useSession } from "next-auth/react";

import ThoughtCard from './ThoughtCard';

const HomeThoughts = () => {
  const { data: session } = useSession();
  const [allThoughts, setAllThoughts] = useState([]);

  const [upvoteState, setUpvoteState] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [searchedResults, setSearchedResults] = useState([]);
  const [searchTimeout, setSearchTimeout] = useState(false);

  useEffect(() => {
    const fetchThoughts = async () => {
      const response = await fetch(`/api/thought/`);
      const data = await response.json();

      setAllThoughts(data);
    };

    if (session?.user.id) fetchThoughts();
  }, [session?.user.id, upvoteState]);

  const filterThoughts = (searchText) => {
    const regex = new RegExp(searchText, "i");
    return allThoughts.filter(
      (item) => regex.test(item.tag) || regex.test(item.thought)
    );
  };

  const handleSearchChange = (e) => {
    clearTimeout(searchTimeout);
    setSearchText(e.target.value);

    setSearchTimeout(
      setTimeout(() => {
        const searchResult = filterThoughts(e.target.value);
        setSearchedResults(searchResult);
      }, 300)
    );
  };
  return (
    <section className="text-gray-600 body-font px-5 py-24 mx-auto">
      <h2>Home Thoughts</h2>
      <div>
      <form>
        <input
          type="text"
          placeholder="Search for Tag or Thought text"
          value={searchText}
          onChange={handleSearchChange}
          required
          className="search-input"
        ></input>
      </form>

      <div className="flex flex-wrap">
        {searchText
          ? searchedResults.map((singleThought) => (
            <div className="p-4 lg:w-1/3">

              <ThoughtCard
                {...singleThought}
                setUpvoteState={setUpvoteState}
              ></ThoughtCard>
              </div>
            ))
          : allThoughts.map((singleThought) => (
              <div className="p-4 lg:w-1/3">
              <ThoughtCard
                {...singleThought}
                setUpvoteState={setUpvoteState}
              ></ThoughtCard>
              </div>
            ))}
      </div>
      </div>

    </section>
  )
}

export default HomeThoughts