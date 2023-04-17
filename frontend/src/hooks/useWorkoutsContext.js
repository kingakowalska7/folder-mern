import { WorkoutsContext } from "../context/WorkoutContext";
import { useContext } from "react";


export const useWorkoutsContext = ()  => {
    const context = useContext(WorkoutsContext)

    if(!context) {
        throw Error('useWorkoutsContext musi być użyty wewnątrz WorkoutsContextProvider')
    }

    return context
}
