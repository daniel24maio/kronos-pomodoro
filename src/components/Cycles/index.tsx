import styles from './styles.module.css'
import { useTaskContext } from '../../contexts/TaskContext/useTaskContext';
import { getNextCycle } from '../Utils/getNextCycle';
import { getNextCycleType } from '../Utils/getNextCyclesType';

export function Cycles() {

    const {state} = useTaskContext();

    const cyclesSteps = Array.from({ length: state.currentCycle });

    const cycleDescriptionMap = {
        workTime: 'Focus time!',
        shortBreakTime: 'Water time!',
        longBreakTime: 'Coffe time!',
    }
    return (
        <div className={styles.cycles}>
            <span>Ciclos:</span>

            <div className={styles.cycleDots}>
                {cyclesSteps.map((_, index) => {
                    const nextCycle = getNextCycle(index);
                    const nextCycleType =  getNextCycleType(nextCycle);
                    return (
                    <span 
                        key={nextCycle}
                        className={`${styles.cycleDot} ${styles[nextCycleType]}`}
                        aria-label={`Indicador de ciclo de ${cycleDescriptionMap[nextCycleType]}`}
                        title={`Indicador de ciclo de ${cycleDescriptionMap[nextCycleType]}`}
                    ></span>);
                    })}
            </div>
        </div>
    );
}