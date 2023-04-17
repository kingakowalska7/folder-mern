import { useWorkoutsContext } from "../hooks/useWorkoutsContext"

import formatDistanceToNow from 'date-fns/formatDistanceToNow'
// import { useState } from "react"

const WorkoutDetails = ({ workout }) => {
    const { dispatch } = useWorkoutsContext()
    // const [updateWorkout, setUpdateWorkout] = useState(-1)

const handleClick = async () => {
    const response = await fetch('/api/workouts/' + workout._id, {
        method: 'DELETE'
    })
    const json = await response.json()

    if (response.ok){
     dispatch({type: 'DELETE_WORKOUT', payload: json})
    }
}

// export const editForm() {
//     const [updateWorkout, setUpdateWorkout] = useState()
    
//       function handleTitleChange(e) {
//         setUpdateWorkout({
//           ...workout,
//           {workout.title}: e.target.value,
//         });
//       }
    
//       function handleLoadChange(e) {
//         setUpdateWorkout({
//           ...workout,
//           {workout.load}: e.target.value
//         });
//       }
    
//       function handleRepsChange(e) {
//         setUpdateWorkout({
//           ...workout,
//           {workout.reps}: e.target.value
//         });
//       }

//       return (
//         <>
//           <label>
//             Nazwa ćwiczenia: <b>{workout.title}</b>
//             {' '}
//             <button onClick={handleTitleChange}>
//             </button>
//           </label>
//           <label>
//             First name:
//             <input
//               value={workout.load}
//               onChange={handleLoadChange}
//             />
//           </label>
//           <label>
//             Last name:
//             <input
//               value={workout.reps}
//               onChange={handleRepsChange}
//             />
//           </label>
//         </>
//       );
//     }


const handleSubmit = async () => {

    const response = await fetch('/api/workouts/' + workout._id, {
        method: 'PATCH'
    })
    const json = await response.json()

    if (response.ok){
     dispatch({type: 'UPDATE_WORKOUT', payload: json})
    }


}

return (
    <div className="workout-details">
        <h4>{workout.title}</h4>
        <p><strong>Obciążenie (kg): </strong>{workout.load}</p>
        <p><strong>Powtórzenia: </strong>{workout.reps}</p>
        <p>{formatDistanceToNow(new Date(workout.createdAt), { addSuffix: true })}</p>
        {/* <span onClick={handleClick}>Usuń</span> */}
        <span className="material-symbols-outlined" onClick={handleClick}>delete</span>
        <span className="material-symbols-outlined" onClick={handleSubmit}>edit</span>
    </div>
)
}

export default WorkoutDetails