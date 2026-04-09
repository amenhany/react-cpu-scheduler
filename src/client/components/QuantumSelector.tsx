import '@/styles/quantum.css';
import { useScheduler } from './SchedulingContext';
import type { ChangeEvent } from 'react';

export default function QuantumSelector() {
   const { quantum, setQuantum, started } = useScheduler();

   return (
      <div className="quantumRow">
         <span className="quantumLabel">Quantum</span>
         <input
            className="quantumInput"
            type="number"
            min={1}
            value={quantum ?? 2}
            disabled={started}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
               setQuantum(Number(e.target.value))
            }
         />
         <span className="quantumSuffix">units</span>
      </div>
   );
}
