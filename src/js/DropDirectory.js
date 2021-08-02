import React from 'react';
import { DropArea } from './DropArea'; // コンポーネントのインポート

function DropDirectory() {
  const handleDrop = async (e) => {
    const item = e.dataTransfer.items[0]; // ※1
    const entry = item.webkitGetAsEntry(); // ※2
    if (entry.isFile) {
      const file = await new Promise((resolve) => {
        entry.file((content) => {
          resolve(content);
        });
      });
      console.log('これはファイルです', file);
    } else if (entry.isDirectory) {
      const dir = await new Promise((resolve) => {
        entry.file((direct) => {
          resolve(direct);
        });
      });
      console.log('これはディレクトリです', dir);
    }
  };

  return (
    <DropArea onDrop={handleDrop}>
      <div style={{
        width: 600, height: 300, border: 'solid', borderWidth: 2,
      }}
      >
        ドロップエリア
      </div>
    </DropArea>
  );
}

export { DropDirectory };
