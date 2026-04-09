import { useScheduler } from './SchedulingContext';

export default function StartButton() {
   const { started, setStarted } = useScheduler();

   if (started) return <></>;
   return (
      <button className="start-button" onClick={() => setStarted(true)}>
         Start
      </button>
   );
}
