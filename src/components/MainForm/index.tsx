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

export function MainForm() {
    const { state, dispatch } = useTaskContext();
    const taksNameInput = useRef<HTMLInputElement>(null);

    const nextCycle = getNextCycle(state.currentCycle);
    const nextCycleType = getNextCycleType(nextCycle);

    const tipsForWhenActiveTask = {
        workTime: <span>Foque por {state.config.workTime} minutos</span>,
        shortBreakTime: <span>Descanse por {state.config.shortBreakTime} minutos</span>,
        longBreakTime: <span>Pausa longa {state.config.longBreakTime} minutos</span>,
    };

     const tipsForNoActiveTask = {
        workTime: <span>Próximo ciclo é de {state.config.workTime} minutos</span>,
        shortBreakTime: <span>Próximo ciclo é de {state.config.shortBreakTime} minutos</span>,
        longBreakTime: <span>Próximo ciclo é descanso longo com {state.config.longBreakTime} minutos</span>,
    };


    function handleCreateNewTask(event: React.FormEvent<HTMLFormElement>) {

        event.preventDefault();

        if (taksNameInput.current === null) return;

        const taksName = taksNameInput.current.value.trim();

        if (!taksName) {
            alert('Digite o nome da tarefa');
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
    }

    function handleInterruptTask() {
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
                {!!state.activeTask && tipsForWhenActiveTask[state.activeTask.type]}
                {!state.activeTask && tipsForNoActiveTask[nextCycleType]}
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