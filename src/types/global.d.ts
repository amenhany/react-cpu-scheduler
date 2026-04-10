type Process = {
    arrivalTime: number;
    burstTime: number;
    remainingTime: number;
    priority?: number;
    finishTime?: number;
    // remainingQuantum?: number;
    // waitingTime?: number;
    // turnaroundTime?: number;
};

type ProcessWithId = Process & {
    pid: number;
};

type SchedulingAlgorithm = 'fcfs' | 'sjf' | 'srtf' | 'rr' | 'pr' | 'ppr';

type AlgorithmFunc = (
    processes: ProcessWithId[],
    currentTime: number,
    // quantum: number,
    lastProcessId?: number,
    // currentQuantumTime: number,
) => number;

type SchedulerState = {
    processes: ProcessWithId[];
    timeline: { pid: number; from: number; to: number }[];
    currentTime: number;
    avgWait: number;
    avgTurn: number;
};
