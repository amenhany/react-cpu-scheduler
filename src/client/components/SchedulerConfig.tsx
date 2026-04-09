import AlgorithmSelector from './AlgorithmSelector';
import QuantumSelector from './QuantumSelector';
import { useScheduler } from './SchedulingContext';

export default function SchedulerConfig() {
   const { algorithm } = useScheduler();

   return (
      <div className="panel">
         <div className="panel__header">
            <span className="panel__title">Configuration</span>
         </div>
         <div className="panel__body">
            <AlgorithmSelector />
            {algorithm === 'rr' && <QuantumSelector />}
         </div>
      </div>
   );
}
