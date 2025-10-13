import { useTaskContext } from "../../contexts/TaskContext/useTaskContext";
import { getNextCycle } from "../Utils/getNextCycle";
import { getNextCycleType } from "../Utils/getNextCyclesType";

export function Tips() {

    const { state } = useTaskContext();
    const nextCycle = getNextCycle(state.currentCycle);
    const nextCycleType = getNextCycleType(nextCycle);

    const tipsForWhenActiveTask = {
        workTime: <span>Foque por {state.config.workTime} minutos</span>,
        shortBreakTime: <span>Descanse por {state.config.shortBreakTime} minutos</span>,
        longBreakTime: <span>Pausa longa {state.config.longBreakTime} minutos</span>,
    };

    const tipsForNoActiveTask = {
        workTime: <span>Próximo ciclo é de <b>{state.config.workTime} minutos</b></span>,
        shortBreakTime: <span>Próximo ciclo é de <b>{state.config.shortBreakTime} minutos</b></span>,
        longBreakTime: <span>Próximo ciclo é descanso longo com <b>{state.config.longBreakTime} minutos</b></span>,
    };


    return (
        <>
            {!!state.activeTask && tipsForWhenActiveTask[state.activeTask.type]}
            {!state.activeTask && tipsForNoActiveTask[nextCycleType]}
        </>
    )
}