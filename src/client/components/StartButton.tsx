import { useScheduler } from './SchedulingContext';

export default function StartButton() {
   const { started, start, stop, paused, runToEnd, isFinished, reset } = useScheduler();

   if (isFinished)
      return (
         <button className="button danger" onClick={reset}>
            Reset
         </button>
      );
   return (
      <>
         {started && !paused ? (
            <button className="button info button-wrapper" onClick={stop}>
               Pause
            </button>
         ) : (
            <div className="flex col button-wrapper">
               <button className="button success" onClick={start}>
                  {paused ? 'Resume' : 'Simulate'}
               </button>
               <button className="button info" onClick={runToEnd}>
                  Static Run
               </button>
            </div>
         )}
      </>
   );
}
