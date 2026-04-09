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
