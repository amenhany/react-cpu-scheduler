import { app, BrowserWindow, Menu } from 'electron';

import path from 'path';
import { isDev } from './util.js';
import { getPreloadPath } from './pathResolver.js';
import { createMenu } from './menu.js';

import { ipcMainOn, ipcWebContentsSend } from './util.js';
import { Scheduler } from './scheduler/Scheduler.js';

app.on('ready', () => {
    const mainWindow = new BrowserWindow({
        fullscreenable: true,
        minWidth: 800,
        minHeight: 500,
        webPreferences: {
            preload: getPreloadPath(),
            contextIsolation: true,
            sandbox: false,
        },
    });

    let scheduler: Scheduler | null = null;

    ipcMainOn('scheduler:init', () => {
        scheduler = new Scheduler((state) => {
            ipcWebContentsSend('scheduler:update', mainWindow.webContents, state);
        });
    });

    ipcMainOn('scheduler:add', (process) => {
        scheduler?.addProcess(process);
    });

    ipcMainOn('scheduler:start', () => {
        scheduler?.startLive();
    });

    ipcMainOn('scheduler:stop', () => {
        scheduler?.stopLive();
    });

    ipcMainOn('scheduler:runToEnd', () => {
        scheduler?.runToCompletion();
    });

    ipcMainOn('scheduler:remove', (index: number) => {
        scheduler?.removeProcess(index);
    });

    ipcMainOn('scheduler:setAlgorithm', (algorithm) => {
        scheduler?.setAlgorithm(algorithm);
    });

    ipcMainOn('scheduler:setQuantum', (q) => {
        scheduler?.setQuantum(q);
    });

    if (process.platform === 'darwin') {
        createMenu();
    } else {
        Menu.setApplicationMenu(null);
    }

    if (isDev()) {
        mainWindow.loadURL('http://localhost:5123');
    } else {
        mainWindow.loadFile(path.join(app.getAppPath(), '/dist-react/index.html'));
    }
});
