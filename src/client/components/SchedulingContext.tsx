import React, { createContext, useContext, useEffect, useState } from 'react';

type SchedulingContextType = {
   state: SchedulerState | null;

   // local UI state
   algorithm: SchedulingAlgorithm;
   setAlgorithm: React.Dispatch<React.SetStateAction<SchedulingAlgorithm>>;
   quantum: number;
   setQuantum: React.Dispatch<React.SetStateAction<number>>;
   started: boolean;
   paused: boolean;
   isFinished: boolean;

   // scheduler controls
   start: () => void;
   stop: () => void;
   reset: () => void;
   runToEnd: () => void;

   addProcess: (p: Process) => void;
   removeProcess: (i: number) => void;
};

const SchedulingContext = createContext<SchedulingContextType>({
   state: null,

   algorithm: 'fcfs',
   setAlgorithm: () => {},
   quantum: 1,
   setQuantum: () => {},
   started: false,
   paused: false,
   isFinished: false,

   start: () => {},
   stop: () => {},
   reset: () => {},
   runToEnd: () => {},

   addProcess: () => {},
   removeProcess: () => {},
});

export const useScheduler = () => useContext(SchedulingContext);

export const SchedulingProvider: React.FC<{ children: React.ReactNode }> = ({
   children,
}) => {
   const [state, setState] = useState<SchedulerState | null>(null);

   // UI state
   const [algorithm, setAlgorithm] = useState<SchedulingAlgorithm>('fcfs');
   const [quantum, setQuantum] = useState(1);
   const [started, setStarted] = useState(false);
   const [paused, setPaused] = useState(false);

   const isFinished = state?.processes.every((p) => p.remainingTime <= 0) ?? false;

   useEffect(() => {
      window.api.initScheduler();
      return window.api.subscribeScheduler(setState);
   }, []);

   useEffect(() => {
      window.api.setSchedulingAlgorithm(algorithm);
   }, [algorithm]);

   useEffect(() => {
      window.api.setSchedulingQuantum(quantum);
   }, [quantum]);

   useEffect(() => {
      if (isFinished) setPaused(true);
   }, [isFinished]);

   const start = () => {
      setStarted(true);
      setPaused(false);
      window.api.startScheduler();
   };

   const runToEnd = () => {
      setStarted(true);
      setPaused(false);
      window.api.runSchedulerToEnd();
   };

   const stop = () => {
      setPaused(true);
      window.api.stopScheduler();
   };

   const reset = () => {
      setStarted(false);
      setPaused(false);
      window.api.initScheduler();
      setState(null);
      setAlgorithm('fcfs');
      setQuantum(1);
      return window.api.subscribeScheduler(setState);
   };

   return (
      <SchedulingContext.Provider
         value={{
            state,
            algorithm,
            setAlgorithm,
            quantum,
            setQuantum,
            started,
            paused,
            isFinished,

            start,
            stop,
            reset,
            runToEnd,

            addProcess: window.api.addSchedulerProcess,
            removeProcess: window.api.removeSchedulerProcess,
         }}
      >
         {children}
      </SchedulingContext.Provider>
   );
};
