/*
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
    payload: EventPayloadMapping[Key],
) {
    ipcRenderer.send(key, payload);
}

contextBridge.exposeInMainWorld('api', {
    subscribeStatistics: (callback) =>
        ipcRendererOn('statistics', (stats) => {
            callback(stats);
        }),
    getStaticData: () => ipcRendererInvoke('getStaticData'),
    subscribeChangeView: (callback) =>
        ipcRendererOn('changeView', (view) => {
            callback(view);
        }),
    platform: process.platform,
    sendFrameAction: (payload) => {
        ipcRendererSend('sendFrameAction', payload);
    },
} satisfies Window['api']);
*/
