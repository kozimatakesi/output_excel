/* eslint-disable no-undef */
import React, { useState, useEffect } from 'react';
import {
  Box, Container, Input, Button, Text,
} from '@chakra-ui/react';
import { DropArea } from './DropArea';
import FilesList from './FilesList';

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
      setDirOrFile('dir');
    });
  }, []);

  return (
    <Container maxW="container.xl">
      <Box>
        <Button onClick={() => {
          api.filesApi.searchDirPath();
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
            <Box>
              <Button
                onClick={() => {
                  api.filesApi.createExcelFile(dirPath);
                }}
              >
                EXCELファイル出力
              </Button>
              <Button
                onClick={() => {
                  api.filesApi.displayFilesList(dirPath);
                }}
              >
                ファイルリスト表示
              </Button>
            </Box>
          ) : <Text>ディレクトリを指定してください</Text>

      }
      <FilesList />
    </Container>
  );
};

export default SearchDir;
