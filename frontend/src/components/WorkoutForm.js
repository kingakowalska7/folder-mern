import { useState } from "react"
import { useWorkoutsContext } from "../hooks/useWorkoutsContext"

const WorkoutForm = () => {
const { dispatch } = useWorkoutsContext()
const [title, setTitle] = useState('')
const [load, setLoad] = useState('')
const [reps, setReps] = useState('')
const [error, setError] = useState(null)
const [emptyFields, setEmptyFields] = useState([])

const handleSubmit = async (e) => {
    e.preventDefault()

    const workout = {title, load, reps}

    const response = await fetch('http://localhost:8000/api/workouts', {
        method: 'POST',
        body: JSON.stringify(workout),
        headers: {
            'Content-Type': 'application/json'
        }
    })
    const json = await response.json()

    if(!response.ok) {
    setError(json.error)
    setEmptyFields(json.emptyFields)
    }
    if(response.ok) {
        setTitle('')
        setLoad('')
        setReps('')
        setError(null)
        setEmptyFields([])
        console.log('Dodane nowe ćwiczenie', json)
        dispatch({type: 'CREATE_WORKOUT', payload: json})
        }
}

    return (
<form className="create" onSubmit={handleSubmit}>
<h3>Dodaj nowe ćwiczenie</h3>

<label>Nazwa ćwiczenia:</label>
<input
type="text"
onChange={(e) => setTitle(e.target.value)}
value={title}
className={emptyFields.includes('title') ? 'error': ''}
/>

<label>Obciążenie (w kg):</label>
<input
type="number"
onChange={(e) => setLoad(e.target.value)}
value={load}
className={emptyFields.includes('load') ? 'error': ''}
/>

<label>Ilość powtórzeń:</label>
<input
type="number"
onChange={(e) => setReps(e.target.value)}
value={reps}
className={emptyFields.includes('reps') ? 'error': ''}
/>

<button>Dodaj</button>
{error && <div className="error">{error}</div>}
</form>

 )
}

export default WorkoutForm