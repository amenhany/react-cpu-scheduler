type Process = {
    arrivalTime: number;
    burstTime: number;
    remainingTime: number;
    priority?: number;
    startTime?: number;
    finishTime?: number;
    // waitingTime: number;
    // turnaroundTime: number;
};

type SchedulingAlgorithm = 'fcfs' | 'sjf' | 'srtf' | 'rr' | 'pr' | 'ppr';
