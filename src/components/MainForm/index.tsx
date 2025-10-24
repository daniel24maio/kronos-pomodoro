import { PlayCircleIcon, StopCircleIcon } from "lucide-react";
import { Cycles } from "../Cycles";
import { DefaultButton } from "../DefaultButton";
import { DefaultInput } from "../DefaultInput";
import { useRef } from "react";
import type { TaskModel } from "../../models/TaskModel";
import { useTaskContext } from "../../contexts/TaskContext/useTaskContext";
import { getNextCycle } from "../Utils/getNextCycle";
import { getNextCycleType } from "../Utils/getNextCyclesType";
import { TaskActionTypes } from "../../contexts/TaskContext/taskActions";
import { Tips } from "../Tips";
import { toastMessage } from "../../adapters/toastMessage";

export function MainForm() {
    const { state, dispatch } = useTaskContext();
    const taksNameInput = useRef<HTMLInputElement>(null);

    const nextCycle = getNextCycle(state.currentCycle);
    const nextCycleType = getNextCycleType(nextCycle);

    function handleCreateNewTask(event: React.FormEvent<HTMLFormElement>) {

        event.preventDefault();
        toastMessage.dismiss();

        if (taksNameInput.current === null) return;

        const taksName = taksNameInput.current.value.trim();

        if (!taksName) {
            toastMessage.warning('Digite o nome da tarefa');
            return;
        }

        const newTask: TaskModel = {
            id: Date.now().toString(),
            name: taksName,
            startDate: Date.now(),
            completeDate: null,
            interruptDate: null,
            duration: state.config[nextCycleType],
            type: nextCycleType,
        };      

        dispatch ({type: TaskActionTypes.START_TASK, payload: newTask});  
        
        toastMessage.success('Tarefa iniciada!');
    }  
    
    function handleInterruptTask() {
        toastMessage.dismiss();
        toastMessage.error('Tarefa interrompida');
        dispatch ({type: TaskActionTypes.INTERRUPT_TASK}); 
    }

    return (
        <form onSubmit={handleCreateNewTask} className='form' action=''>
            <div className='formRow'>
                <DefaultInput
                    id='meuInput'
                    labelText='Task'
                    type='text'
                    placeholder='Digite sua tarefa'
                    ref={taksNameInput}
                    disabled={!!state.activeTask}
                />
            </div>

            <div className='formRow'>
               <Tips />
            </div>

            {state.currentCycle > 0 && (
                <div className='formRow'>
                    <Cycles />
                </div>
            )}

            <div className='formRow'>
                {!state.activeTask ? (
                    <DefaultButton
                        aria-label='Iniciar nova Tarefa'
                        title='Iniciar nova Tarefa'
                        type='submit'
                        icon={<PlayCircleIcon />}
                        key='form_button'
                    />
                ) : (
                    <DefaultButton
                        aria-label='Interromper tarefa atual'
                        title='Interromper tarefa atual'
                        type='button'
                        color='red'
                        icon={<StopCircleIcon />}
                        onClick={handleInterruptTask}
                        key='button_iterrupt'
                    />
                )}
            </div>
        </form>
    );
}