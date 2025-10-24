import { formatSecondsToMinutes } from "../../components/Utils/formatSecondsToMinutes";
import { getNextCycle } from "../../components/Utils/getNextCycle";
import type { TaskStateModel } from "../../models/TaskStateModel";
import { TaskActionTypes, type TaskActionModel } from "./taskActions";

export function taskReducer(state: TaskStateModel, action: TaskActionModel): TaskStateModel
{
    switch(action.type){
        case TaskActionTypes.START_TASK:{

            const newTask = action.payload;
            const nextCycle = getNextCycle(state.currentCycle);                
            const secondsRemaining = newTask.duration * 60;
        
            return {
                ...state,
                activeTask: newTask,
                currentCycle: nextCycle,
                secondsRemaining,
                formattedSecondsRemaining: formatSecondsToMinutes(secondsRemaining),
                tasks: [...state.tasks, newTask],
            };
        }
        case TaskActionTypes.INTERRUPT_TASK:{
         //   const nextCycleType = getNextCycleType(nextCycle);
            return{
                ...state,
                activeTask: null,
                secondsRemaining: 0,
                formattedSecondsRemaining: '00:00',
                tasks: state.tasks.map( task => {
                    if (state.activeTask && state.activeTask.id === task.id){
                        return { ...task, interrupDate: Date.now()};
                    }
                    return task;
                }),
            };
        }
        case TaskActionTypes.COMPLETE_TASK:{
         //   const nextCycleType = getNextCycleType(nextCycle);
            return{
                ...state,
                activeTask: null,
                secondsRemaining: 0,
                formattedSecondsRemaining: '00:00',
                tasks: state.tasks.map( task => {
                    if (state.activeTask && state.activeTask.id === task.id){
                        return { ...task, completeDate: Date.now()};
                    }
                    return task;
                }),
            };
        }
        case TaskActionTypes.RESET_STATE:{
            return state;
        }
        case TaskActionTypes.COUNT_DOWN:{
            return {
                ...state,
                secondsRemaining: action.payload.secondsRemaining,
                formattedSecondsRemaining: formatSecondsToMinutes(
                    action.payload.secondsRemaining,
                ),
            };
        }
    }
    return state;
}