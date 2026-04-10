import { SchedulerContext } from '@/types/electron.js';
import { algorithms } from './algorithms.js';

export class Scheduler {
    private processes: ProcessWithId[] = [];
    private timeline: { pid: number; from: number; to: number }[] = [];
    private currentTime = 0;
    private timer: NodeJS.Timeout | null = null;
    private lastPid: number | null = null;
    private quantum: number = 1;
    private algorithm: SchedulingAlgorithm = 'fcfs';
    private currentQuantum = 0;

    constructor(private onUpdate: (state: SchedulerState) => void) {}

    addProcess(p: Process) {
        const pid = this.processes.length;
        this.processes.push({ ...p, pid });
        this.emitUpdate();
    }

    removeProcess(index: number) {
        this.processes.splice(index, 1);
        this.processes.forEach((p, i) => (p.pid = i));
        this.emitUpdate();
    }

    setAlgorithm(algorithm: SchedulingAlgorithm) {
        this.algorithm = algorithm;
    }

    setQuantum(q: number) {
        this.quantum = q;
    }

    startLive() {
        if (this.timer) return;
        this.timer = setInterval(() => this.tick(), 1000);
    }

    stopLive() {
        if (!this.timer) return;
        clearInterval(this.timer);
        this.timer = null;
    }

    tick() {
        const ready = this.processes.filter(
            (p) => p.arrivalTime <= this.currentTime && p.remainingTime > 0,
        );

        if (ready.length === 0) {
            if (this.processes.some((p) => p.remainingTime > 0)) {
                this.currentTime++; // idle tick - processes not arrived yet
            } else {
                this.stopLive(); // all done
            }
            this.emitUpdate();
            return;
        }

        const ctx: SchedulerContext = {
            lastPid: this.lastPid,
            currentQuantum: this.currentQuantum,
            quantum: this.quantum,
        };

        const proc = algorithms[this.algorithm](ready, ctx);
        if (!proc) {
            this.currentTime++;
            this.emitUpdate();
            return;
        }

        proc.remainingTime--;
        this.pushTimeline(proc);

        if (proc.remainingTime === 0) {
            proc.finishTime = this.currentTime + 1;
        }

        // quantum tracking (only meaningful for RR, harmless for others)
        this.currentQuantum = proc.pid === this.lastPid ? this.currentQuantum + 1 : 1;
        if (this.currentQuantum >= this.quantum || proc.remainingTime === 0) {
            this.currentQuantum = 0;
        }

        this.lastPid = proc.pid;
        this.currentTime++;
        this.emitUpdate();
    }

    private pushTimeline(proc: ProcessWithId) {
        const last = this.timeline.at(-1);

        if (last && last.pid === proc.pid) {
            last.to++;
        } else {
            this.timeline.push({
                pid: proc.pid,
                from: this.currentTime,
                to: this.currentTime + 1,
            });
        }
    }

    runToCompletion() {
        while (this.processes.some((p) => p.remainingTime > 0)) {
            this.tick();
        }
    }

    getState() {
        const waitingTimes = this.processes.map(
            (p) => p.finishTime! - p.arrivalTime - p.burstTime,
        );
        const turnaroundTimes = this.processes.map((p) => p.finishTime! - p.arrivalTime);

        const avgWait = waitingTimes.reduce((a, b) => a + b, 0) / waitingTimes.length;
        const avgTurn =
            turnaroundTimes.reduce((a, b) => a + b, 0) / turnaroundTimes.length;

        return {
            processes: this.processes,
            timeline: this.timeline,
            currentTime: this.currentTime,
            avgWait,
            avgTurn,
        };
    }
    private emitUpdate() {
        this.onUpdate(this.getState());
    }
}
