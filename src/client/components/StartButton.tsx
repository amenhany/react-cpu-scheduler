import { useScheduler } from './SchedulingContext';

export default function StartButton() {
   const { started, start, stop, paused, runToEnd, state, reset } = useScheduler();
   const isFinished = state?.processes.every((p) => p.remainingTime <= 0) ?? false;

   if (isFinished)
      return (
         <button className="button danger" onClick={reset}>
            Reset
         </button>
      );
   return (
      <>
         {started && !paused ? (
            <button className="button info" onClick={stop}>
               Pause
            </button>
         ) : (
            <>
               <button className="button success" onClick={start}>
                  {paused ? 'Resume' : 'Start'}
               </button>
               <button className="button info" onClick={runToEnd}>
                  Run Without Live
               </button>
            </>
         )}
      </>
   );
}
