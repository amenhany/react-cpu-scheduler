import React, { createContext, useContext, useState } from 'react';

type SchedulingContextType = {
   processes: Process[];
   addProcess: (p: Process) => void;
   removeProcess: (i: number) => void;
   algorithm: SchedulingAlgorithm;
   setAlgorithm: React.Dispatch<React.SetStateAction<SchedulingAlgorithm>>;
   quantum: number;
   setQuantum: React.Dispatch<React.SetStateAction<number>>;
   started: boolean;
   setStarted: React.Dispatch<React.SetStateAction<boolean>>;
};

const SchedulingContext = createContext<SchedulingContextType>({
   processes: [],
   addProcess: () => {},
   removeProcess: () => {},
   algorithm: 'fcfs',
   setAlgorithm: () => {},
   quantum: 1,
   setQuantum: () => {},
   started: false,
   setStarted: () => {},
});

export const useScheduler = () => useContext(SchedulingContext);

export const SchedulingProvider: React.FC<{ children: React.ReactNode }> = ({
   children,
}) => {
   const [started, setStarted] = useState(false);
   const [processes, setProcesses] = useState<Process[]>([]);
   const [algorithm, setAlgorithm] = useState<SchedulingAlgorithm>('fcfs');
   const [quantum, setQuantum] = useState(1);

   function addProcess(p: Process) {
      setProcesses((prev) => [...prev, p]);
   }

   function removeProcess(i: number) {
      setProcesses((prev) => prev.filter((_, idx) => idx !== i));
   }

   return (
      <SchedulingContext.Provider
         value={{
            processes,
            addProcess,
            removeProcess,

            algorithm,
            setAlgorithm,
            quantum,
            setQuantum,

            started,
            setStarted,
         }}
      >
         {children}
      </SchedulingContext.Provider>
   );
};
