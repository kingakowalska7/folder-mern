import { useState } from "react";
import { useWorkoutsContext } from "../hooks/useWorkoutsContext";

import formatDistanceToNow from "date-fns/formatDistanceToNow";
//  import { useState } from "react"

const WorkoutDetails = ({ workout }) => {
  const { dispatch } = useWorkoutsContext();
  const [isEditable, setIsEditable] = useState(false);

  const [formData, setFormData] = useState({
    reps: workout.reps,
    load: workout.load,
    title: workout.title,
  });

  const handleInputChange = (e) => {
    console.log();
    const target = e.target;
    const name = target.name;

    setFormData({
      ...formData,
      [name]: target.value,
    });
  };

  const handleClick = async () => {
    const response = await fetch(
      "http://localhost:8000/api/workouts/" + workout._id,
      {
        method: "DELETE",
      }
    );
    const json = await response.json();

    if (response.ok) {
      dispatch({ type: "DELETE_WORKOUT", payload: json });
    }
  };

  const handleSubmit = async () => {
    const response = await fetch(
      "http://localhost:8000/api/workouts/" + workout._id,
      {
        method: "PATCH",
        body: JSON.stringify(formData),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const json = await response.json();

    if (response.ok) {
      setIsEditable(false);
      dispatch({ type: "UPDATE_WORKOUT", payload: json });
    }
  };

  return (
    <div className="workout-details">

     {isEditable ? (
        <input
          value={formData.title}
          name="title"
          placeholder="tytuł"
          onChange={handleInputChange}
        />
      ) : (
      <h4>{workout.title}</h4>
      )}



      {isEditable ? (
        <input
          value={formData.load}
          name="load"
          placeholder="obciążenie"
          onChange={handleInputChange}
        />
      ) : (
      <p>
        <strong>Obciążenie (kg): </strong>
        {workout.load}
      </p>
       )}



      {isEditable ? (
        <input
          value={formData.reps}
          name="reps"
          placeholder="powtórzenia"
          onChange={handleInputChange}
        />
      ) : (
        <p>
          <strong>Powtórzenia: </strong>
          {workout.reps}
        </p>
      )}


      <p>
        {formatDistanceToNow(new Date(workout.createdAt), { addSuffix: true })}
      </p>

      {/* <span onClick={handleClick}>Usuń</span> */}
      <span className="material-symbols-outlined" onClick={handleClick}>
        delete
      </span>
      {isEditable ? (
        <span className="material-symbols-outlined" onClick={handleSubmit}>
        done
        </span>
      ) : (
        <span
          className="material-symbols-outlined"
          onClick={() => setIsEditable(true)}
        >
        edit
        </span>
      )}
    </div>
  );
};

export default WorkoutDetails;
