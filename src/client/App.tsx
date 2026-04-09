import ProcessTable from './components/ProcessTable';
import SchedulerConfig from './components/SchedulerConfig';
import { SchedulingProvider } from './components/SchedulingContext';
import StartButton from './components/StartButton';

export default function App() {
   return (
      <main>
         <SchedulingProvider>
            <SchedulerConfig />
            <ProcessTable />
            <StartButton />
         </SchedulingProvider>
      </main>
   );
}
