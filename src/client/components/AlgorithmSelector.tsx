import { useScheduler } from './SchedulingContext';
import '@/styles/select.css';

const ALGORITHMS: Record<SchedulingAlgorithm, string> = {
   fcfs: 'FCFS',
   sjf: 'SJF',
   srtf: 'Preemptive SJF',
   rr: 'Round Robin',
   pr: 'Priority',
   ppr: 'Preemptive Priority',
};

export default function AlgorithmSelector() {
   const { algorithm, setAlgorithm, started } = useScheduler();
   return (
      <div className="algo-sel">
         <label htmlFor="algorithm">Algorithm</label>
         <div className="selectWrapper">
            <select
               name="algorithm"
               id="algorithm"
               value={algorithm}
               disabled={started}
               onChange={(evt) => setAlgorithm(evt.target.value as SchedulingAlgorithm)}
            >
               {Object.entries(ALGORITHMS).map(([key, display]) => (
                  <option key={key} value={key}>
                     {display}
                  </option>
               ))}
            </select>
         </div>
      </div>
   );
}
