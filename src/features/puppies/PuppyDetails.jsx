import { useDeletePuppyMutation, useGetPuppyQuery } from "./puppySlice";

/**
 * @component
 * Shows comprehensive information about the selected puppy, if there is one.
 * Also provides a button for users to remove the selected puppy from the roster.
 */
export default function PuppyDetails({ selectedPuppyId, setSelectedPuppyId }) {
  // TODO: Grab data from the `getPuppy` query
  const { data: player, error, isLoading} = useGetPuppyQuery(selectedPuppyId, {
    skip: !selectedPuppyId,
  });
  
  // TODO: Use the `deletePuppy` mutation to remove a puppy when the button is clicked
  
  const [deletePuppy] = useDeletePuppyMutation();
  
  async function removePuppy(id) {
    try {
      await deletePuppy(id);
      setSelectedPuppyId(null);      
    } catch (error) {
      console.error('couldnt delete player', error);
    }
  }
  
  // There are 3 possibilities:
  let $details;
  // 1. A puppy has not yet been selected.
  if (!selectedPuppyId) {
    $details = <p>Please select a puppy to see more details.</p>;
  }
  //  2. A puppy has been selected, but results have not yet returned from the API.
  else if (isLoading) {
    $details = <p>Loading puppy information...</p>;
  }
  // 3. Information about the selected puppy has returned from the API.
  else {
    const puppy = player.player;
    $details = (
      <>
        <h3>
          {puppy.name} #{puppy.id}
        </h3>
        <p>{puppy.breed}</p>
        <p>Team {puppy.team?.name ?? "Unassigned"}</p>
        <button onClick={() => removePuppy(puppy.id)}>
          Remove from roster
        </button>
        <figure>
          <img src={puppy.imageUrl} alt={puppy.name} />
        </figure>
      </>
    );
  }

  return (
    <aside>
      <h2>Selected Puppy</h2>
      {$details}
    </aside>
  );
}
