import { app, BrowserWindow, Menu } from 'electron';

import path from 'path';
import { isDev } from './util.js';
import { getPreloadPath } from './pathResolver.js';
import { createMenu } from './menu.js';

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
