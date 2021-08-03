import React, { useState, useEffect } from 'react';
import {
  Box, Container, Input, Button, Text,
} from '@chakra-ui/react';
import { DropArea } from './DropArea';

const SearchDir = () => {
  const [dirPath, setDirPath] = useState('ディレクトリをここにドロップ');
  const [dirOrFile, setDirOrFile] = useState('');

  // ドラッグしたディレクトリのパスを入力欄にいれる
  const handleDrop = async (e) => {
    const item = e.dataTransfer.items[0]; // DataTransferItemオブジェクトとして取得
    const entry = item.webkitGetAsEntry(); // DataTransferItemオブジェクトをEntryオブジェクトに変換する
    if (entry.isDirectory) {
      setDirPath(e.dataTransfer.files[0].path);
      setDirOrFile('dir');
    }
  };

  useEffect(() => {
    api.on('dirPath', (_, arg) => {
      setDirPath(arg);
    });
  }, []);

  return (
    <Container>
      <Box>
        <Button onClick={() => {
          api.filesApi.searchDirPath();
          setDirOrFile('dir');
        }}
        >
          ディレクトリ検索
        </Button>
        <DropArea onDrop={handleDrop}>
          <Input
            value={dirPath}
            readOnly
          />
        </DropArea>

      </Box>

      {
        dirOrFile === 'dir'
          ? (
            <Button
              onClick={() => {
                api.filesApi.createExcelFile(dirPath);
              }}
            >
              EXCELファイル出力
            </Button>
          ) : <Text>ディレクトリを指定してください</Text>

      }
    </Container>
  );
};

export default SearchDir;
