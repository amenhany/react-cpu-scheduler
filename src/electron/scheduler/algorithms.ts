import { PickNextFn } from '@/types/electron.js';

// const ALGORITHMS: Record<SchedulingAlgorithm, AlgorithmFunc> = {
//     fcfs: () => 0,
//     sjf: () => 0,
//     srtf: () => 0,
//     rr: roundRobin,
//     pr: () => 0,
//     ppr: () => 0,
// };

// algorithms.ts
export const algorithms: Record<SchedulingAlgorithm, PickNextFn> = {
    // Non-preemptive: if current process is still ready, keep it
    fcfs: (queue, { lastPid }) =>
        queue.find((p) => p.pid === lastPid) ?? // stay if still running
        queue.reduce((a, b) => (a.arrivalTime <= b.arrivalTime ? a : b)),

    sjf: (queue, { lastPid }) =>
        queue.find((p) => p.pid === lastPid) ??
        queue.reduce((a, b) => (a.burstTime < b.burstTime ? a : b)),

    pr: (queue, { lastPid }) =>
        queue.find((p) => p.pid === lastPid) ??
        queue.reduce((a, b) => (a.priority! < b.priority! ? a : b)),

    // Preemptive: always re-evaluate, ignore lastPid
    srtf: (queue) => queue.reduce((a, b) => (a.remainingTime < b.remainingTime ? a : b)),

    ppr: (queue) => queue.reduce((a, b) => (a.priority! < b.priority! ? a : b)),

    // Round Robin: stay if quantum not expired, otherwise pick next in circle
    rr: (queue, { lastPid, currentQuantum, quantum }) => {
        const currentInQueue = queue.find((p) => p.pid === lastPid);
        if (currentInQueue && currentQuantum > 0 && currentQuantum < quantum) {
            return currentInQueue;
        }
        // pick next after lastPid in circular order
        const sorted = [...queue].sort((a, b) => a.pid - b.pid);
        const afterCurrent = sorted.filter((p) => lastPid === null || p.pid > lastPid);
        return afterCurrent[0] ?? sorted[0];
    },
};

// export function getAlgorithm(algo: SchedulingAlgorithm) {
//     return ALGORITHMS[algo];
// }
