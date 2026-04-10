const { contextBridge, ipcRenderer } = require('electron');

export function ipcRendererInvoke<Key extends keyof EventPayloadMapping>(
    key: Key,
    payload?: EventPayloadMapping[Key],
): Promise<any> {
    return ipcRenderer.invoke(key, payload);
}

export function ipcRendererOn<Key extends keyof EventPayloadMapping>(
    key: Key,
    callback: (payload: EventPayloadMapping[Key]) => void,
) {
    const cb = (_: Electron.IpcRendererEvent, payload: EventPayloadMapping[Key]) =>
        callback(payload);
    ipcRenderer.on(key, cb);
    return () => ipcRenderer.off(key, cb);
}

export function ipcRendererSend<Key extends keyof EventPayloadMapping>(
    key: Key,
    payload?: EventPayloadMapping[Key],
) {
    ipcRenderer.send(key, payload);
}

contextBridge.exposeInMainWorld('api', {
    initScheduler: () => ipcRendererSend('scheduler:init'),
    addSchedulerProcess: (p) => ipcRendererSend('scheduler:add', p),
    startScheduler: () => ipcRendererSend('scheduler:start'),
    stopScheduler: () => ipcRendererSend('scheduler:stop'),
    runSchedulerToEnd: () => ipcRendererSend('scheduler:runToEnd'),
    subscribeScheduler: (cb) => ipcRendererOn('scheduler:update', (state) => cb(state)),
    removeSchedulerProcess: (index) => ipcRendererSend('scheduler:remove', index),
    // pauseScheduler: () => ipcRendererSend('scheduler:pause', undefined),
    setSchedulingAlgorithm: (algorithm) =>
        ipcRendererSend('scheduler:setAlgorithm', algorithm),
    setSchedulingQuantum: (quantum) => ipcRendererSend('scheduler:setQuantum', quantum),
} satisfies Window['api']);
