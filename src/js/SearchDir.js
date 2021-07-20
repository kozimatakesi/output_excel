import React, { useCallback, useState, useEffect } from 'react';
import {
  Box, Container, Input, Text, Button,
} from '@chakra-ui/react';
import { useDropzone } from 'react-dropzone';

const SearchDir = () => {
  const [dirPath, setDirPath] = useState('');

  const handleInputChangedDirPath = (e) => {
    const inputValue = e.target.value;
    setDirPath(inputValue);
  };

  // ドラッグしたディレクトリのパスを入力欄にいれる
  const onDrop = useCallback((acceptedFiles) => {
    console.log('acceptedFiles:', acceptedFiles[0].path);
    const firstElement = acceptedFiles[0].path.split('');
    console.log(firstElement);
    const lastElement = acceptedFiles[acceptedFiles.length - 1].path.split('');
    console.log(lastElement);
    const array = [];
    for (let i = 0; i < firstElement.length; i++) {
      if (firstElement[i] === lastElement[i]) {
        array.push(firstElement[i]);
      }
    }
    const dragPath = array.join("");
    console.log(dragPath);
    setDirPath(dragPath);
  });

  const { getRootProps, isDragActive } = useDropzone({ onDrop });

  useEffect(() => {
    api.on('dirPath', (_, arg) => {
      setDirPath(arg);
    });
  }, []);

  return (
    <Container>
      <Box {...getRootProps()}>
        {
        isDragActive
          ? <Text>ドラッグされています</Text>
          : (
            <Button onClick={() => {
              api.filesApi.searchDirPath();
            }}
            >
              ディレクトリ検索
            </Button>
          )
        }
        <Input
          value={dirPath}
          onChange={(e) => {
            handleInputChangedDirPath(e);
          }}
        />

      </Box>
      {
        !dirPath.includes('.') && dirPath !== ''
          ? (
            <Button
              onClick={() => {
                api.filesApi.createExcelFile(dirPath);
              }}
            >
              EXCEL出力
            </Button>
          ) : <Text>ディレクトリが指定されていません</Text>
      }
    </Container>
  );
};

export default SearchDir;
