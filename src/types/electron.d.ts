/*
type Statistics = {
    cpuUsage: number;
    ramUsage: number;
    storageUsage: number;
};

type StaticData = {
    totalStorage: number;
    cpuModel: string;
    totalMemoryGB: number;
};

type View = 'CPU' | 'RAM' | 'STORAGE';

type FrameWindowAction = 'CLOSE' | 'MAXIMIZE' | 'MINIMIZE';

type EventPayloadMapping = {
    statistics: Statistics;
    getStaticData: StaticData;
    changeView: View;
    sendFrameAction: FrameWindowAction;
};

interface Window {
    api: {
        subscribeStatistics: (callback: (statistics: Statistics) => void) => () => void;
        getStaticData: () => Promise<StaticData>;
        subscribeChangeView: (callback: (view: View) => void) => () => void;
        platform: NodeJS.Platform;
        sendFrameAction: (payload: FrameWindowAction) => void;
    };
}
*/

export type SchedulerAddPayload = Process;

type SchedulerContext = {
    lastPid: number | null;
    currentQuantum: number;
    quantum: number;
};

type PickNextFn = (queue: ProcessWithId[], ctx: SchedulerContext) => ProcessWithId | null;

declare global {
    interface EventPayloadMapping {
        'scheduler:init': SchedulerInitPayload;
        'scheduler:add': SchedulerAddPayload;
        'scheduler:start': void;
        'scheduler:stop': void;
        'scheduler:runToEnd': void;
        'scheduler:update': SchedulerState;
        'scheduler:remove': number;
        // 'scheduler:pause': void;
        'scheduler:setQuantum': number;
        'scheduler:setAlgorithm': SchedulingAlgorithm;
    }

    interface Window {
        api: {
            initScheduler: () => void;
            addSchedulerProcess: (p: Process) => void;
            startScheduler: () => void;
            stopScheduler: () => void;
            runSchedulerToEnd: () => void;
            subscribeScheduler: (cb: (state: SchedulerState) => void) => () => void;
            removeSchedulerProcess: (index: number) => void;
            // pauseScheduler: () => void;
            setSchedulingAlgorithm: (payload: SchedulingAlgorithm) => void;
            setSchedulingQuantum: (payload: number) => void;
        };
    }
}
