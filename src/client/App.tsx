import ProcessTable from './components/ProcessTable';
import SchedulerConfig from './components/SchedulerConfig';
import { SchedulingProvider } from './components/SchedulingContext';
import StartButton from './components/StartButton';
import GanttChart from './components/GanttChart';

export default function App() {
   return (
      <main>
         <SchedulingProvider>
            <SchedulerConfig />
            <ProcessTable />
            <StartButton />
            <GanttChart />
         </SchedulingProvider>
      </main>
   );
}
