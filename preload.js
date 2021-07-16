const { ipcRenderer, contextBridge } = require('electron');

contextBridge.exposeInMainWorld('api', {
  notificationApi: {
    sendNotification(message) {
      ipcRenderer.send('notify', message);
    },
  },
  batteryApi: {

  },
  filesApi: {
    createExcelFile(dirPath) {
      ipcRenderer.send('createExcelFile', dirPath);
    },
    searchDirPath() {
      ipcRenderer.send('searchDirPath');
    },
  },
  on: (channel, callback) => {
    ipcRenderer.on(channel, (event, arg) => callback(event, arg));
  },
});
