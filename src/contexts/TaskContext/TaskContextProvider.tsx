import { useEffect, useReducer } from "react";
import { initialTaskState } from "./initialTaskState";
import { TaskContext } from "./TaskContext";
import { taskReducer } from "./taksReducer";
import { TimerWorkerManage } from "../../workers/TimerWorkerManager";


type TaskContextProviderProps = {
    children: React.ReactNode;
};

export function TaskContextProvider({ children }: TaskContextProviderProps) {

    const [state, dispatch] = useReducer(taskReducer, initialTaskState);

    const worker = TimerWorkerManage.getInstance();

    worker.onmessage(e => {
        const = countDownSeconds = e.data;

        if(countDownSeconds <= 0){
            worker.terminate();
        }
    } )

    useEffect(() => {
        if(!state.activeTask){
            worker.terminate();
        }

        worker.postMessage(state);

    }, [worker, state]);

    return (
        <TaskContext.Provider value={{ state, dispatch }}>
            {children}
        </TaskContext.Provider>
    );
};
