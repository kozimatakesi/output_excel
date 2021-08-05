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
    width: 600,
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

// Excelファイルを出力する
ipcMain.on('createExcelFile', (_, dirPath) => {
  let forExcel = [
    [
      'フォルダ名',
      'ファイル名',
      'ファイルサイズ',
      '更新日',
      '更新時間',
      'ファイルパス',
    ],
  ];
  (async () => {
    await getAllFiles(dirPath);
    for (const file of AllFiles) {
      if (file.name !== '.DS_Store') {
        forExcel.push([
          file.dir,
          file.name,
          `${(file.size / 1000000).toFixed(2)}Mbyte`,
          file.date,
          file.time,
          file.path,
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
      body: `${dirPath}/${path.basename(dirPath)}.xlsを作成しました`,
    }).show();
  })();
  forExcel = [];
  AllFiles = [];
});

app.whenReady().then(createWindow);
