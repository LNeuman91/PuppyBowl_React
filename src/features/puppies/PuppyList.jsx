import { useState } from "react";
import { useGetPuppiesQuery } from "./puppySlice";

/**
 * @component
 * Shows a list of puppies in the roster.
 * Users can select a puppy to see more information about it.
 */
export default function PuppyList({ setSelectedPuppyId }) {
  // Fetch puppies data from the API
  const { data: players = [], isLoading, error } = useGetPuppiesQuery();
  const puppies = players.players || []; // Fallback to empty array if no players

  // State for search term
  const [searchTerm, setSearchTerm] = useState("");

  // Filtered puppies list based on search term
  const filteredPuppies = puppies.filter((p) =>
    p.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (isLoading) {
    return <p>...currentlyLoading</p>;
  }
  if (error) {
    return <p>Error loading puppies: {error.message}</p>;
  }

  return (
    <article>
      <h2>Roster</h2>
      {/* Search bar */}
      <input
        type="text"
        placeholder="Search puppies by name"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <ul className="puppies">
        {filteredPuppies.length > 0 ? (
          filteredPuppies.map((p) => (
            <li key={p.id}>
              <h3>
                {p.name} #{p.id}
              </h3>
              <p>{p.breed}</p>
              <figure>
                <img src={p.imageUrl} alt={p.name} />
              </figure>
              <button onClick={() => setSelectedPuppyId(p.id)}>
                See details
              </button>
            </li>
          ))
        ) : (
          <li>No puppies match your search.</li>
        )}
      </ul>
    </article>
  );
}
