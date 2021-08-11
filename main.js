/* eslint-disable no-restricted-syntax */
const {
  BrowserWindow, app, ipcMain, Notification, dialog,
} = require('electron');
const path = require('path');
const fs = require('fs').promises;
const xlsx = require('xlsx');

const xutil = xlsx.utils;

const isDev = !app.isPackaged;

function createWindow() {
  const win = new BrowserWindow({
    width: 1200,
    height: 400,
    backgroundColor: 'white',
    webPreferences: {
      nodeIntegration: false,
      worldSafeExecuteJavaScript: true,
      contextIsolation: true,
      preload: path.join(__dirname, 'preload.js'),
    },
  });
  // デベロッパーツールを表示させる、ビルド時は削除
  // win.webContents.openDevTools();
  //
  win.loadFile('index.html');
}

if (isDev) {
  require('electron-reload')(__dirname, {
    electron: path.join(__dirname, 'node_modules', '.bin', 'electron'),
  });
}
// お知らせを表示する
ipcMain.on('notify', (_, message) => {
  new Notification({ title: 'Notifiation', body: message }).show();
});

// ダイアログでフォルダを検索する
ipcMain.on('searchDirPath', async (event) => {
  const dirInfo = await dialog.showOpenDialog({
    properties: ['openDirectory'],
    title: 'title',
  });
  const dirPath = dirInfo.filePaths[0];
  if (dirPath) {
    event.reply('dirPath', dirPath);
  }
});

// 対象ディレクトリ内のファイル全てを配列に格納し時間でソートしたものを返す関数
const getFilePathSortList = async (dir) => {
  const fileList = [];
  const files = await fs.readdir(dir);
  for (const file of files) {
    const filePath = `${dir}/${file}`;
    const stats = await fs.stat(filePath);
    const { mtime } = stats;
    fileList.push({
      filePath,
      mtime,
      stats,
    });
  }
  return fileList
    .sort((a, b) => a.mtime - b.mtime);
};

let AllFiles = [];

// 対象ディレクトリ内の全てのファイルを取得する関数
const getAllFiles = async (directoryPath) => {
  const dirName = path.basename(directoryPath);
  const innerDirFilesSorted = await getFilePathSortList(directoryPath);
  const dirOnly = innerDirFilesSorted.filter((file) => file.stats.isDirectory());
  for (const file of innerDirFilesSorted) {
    if (file.stats.isFile()) {
      AllFiles.push({
        path: directoryPath,
        dir: dirName,
        name: path.basename(file.filePath),
        size: file.stats.size,
        date: file.stats.mtime.toLocaleDateString('ja-JP', { timeZone: 'Asia/Tokyo' }),
        time: file.stats.mtime.toLocaleTimeString('ja-JP', { timeZone: 'Asia/Tokyo' }),
      });
    }
  }

  // 対象ディレクトリ内にディレクトリがなかった時は終了
  if (dirOnly.length === 0) {
    return;
  }
  for (const dir of dirOnly) {
    const newDirPath = `${directoryPath}/${path.basename(dir.filePath)}`;
    await getAllFiles(newDirPath);
  }
};

// FilesListを表示する
ipcMain.on('displayFilesList', (event, dirPath) => {
  (async () => {
    const forDisplay = [];
    await getAllFiles(dirPath);
    for (const file of AllFiles) {
      if (file.name !== '.DS_Store') {
        const checkTime = file.name.match(/_\d{6}\D/);
        let startTime = '';
        if (checkTime) {
          const time = checkTime[0].slice(1).slice(0, -1);
          const hour = time.slice(0, 2);
          const min = time.slice(2, 4);
          const sec = time.slice(4);
          startTime = `${hour}:${min}:${sec}`;
        }
        forDisplay.push({
          directory: file.dir,
          name: file.name,
          size: `${(file.size / 1000000).toFixed(2)}Mbyte`,
          date: file.date,
          start: startTime,
          end: file.time,
          path: file.path.replace(dirPath, ''),
        });
      }
    }
    event.reply('dirInfo', forDisplay);
    AllFiles = [];
  })();
});

// Excelファイルを出力する
ipcMain.on('createExcelFile', (_, dirPath) => {
  const forExcel = [
    [
      'フォルダ名',
      'ファイル名',
      'ファイルサイズ',
      '更新日',
      '開始時間',
      '更新時間',
    ],
  ];
  let fileDir = dirPath;
  (async () => {
    await getAllFiles(dirPath);
    for (const file of AllFiles) {
      if (file.name !== '.DS_Store') {
        const checkTime = file.name.match(/_\d{6}\D/);
        let startTime = '';
        if (checkTime) {
          const time = checkTime[0].slice(1).slice(0, -1);
          const hour = time.slice(0, 2);
          const min = time.slice(2, 4);
          const sec = time.slice(4);
          startTime = `${hour}:${min}:${sec}`;
        }

        if (forExcel.length === 1) {
          forExcel.push([file.path]);
        } else if (fileDir !== file.dir) {
          forExcel.push([], [file.path]);
        }

        fileDir = file.dir;

        forExcel.push([
          file.dir,
          file.name,
          `${(file.size / 1000000).toFixed(2)}Mbyte`,
          file.date,
          startTime,
          file.time,
        ]);
      }
    }
    const wb = xutil.book_new();
    const ws = xutil.aoa_to_sheet(forExcel);
    const wsName = path.basename(dirPath);
    xutil.book_append_sheet(wb, ws, wsName);
    xlsx.writeFile(wb, `${dirPath}/${path.basename(dirPath)}.xls`);
    new Notification({
      title: '完了',
      body: 'EXCELファイルを作成しました',
    }).show();
  })();
});

app.whenReady().then(createWindow);
