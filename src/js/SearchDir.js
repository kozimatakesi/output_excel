import React, { useCallback, useState } from 'react';
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
    const firstElement = acceptedFiles[0].path.split('/');
    const lastElement = acceptedFiles[acceptedFiles.length - 1].path.split('/');
    const array = [];
    for (let i = 0; i < firstElement.length; i++) {
      if (firstElement[i] === lastElement[i]) {
        array.push(firstElement[i]);
      }
    }
    const dragPath = array.join('/');
    setDirPath(dragPath);
  });

  const { getRootProps, isDragActive } = useDropzone({ onDrop });

  return (
    <Container>
      <Box {...getRootProps()}>
        {
        isDragActive
          ? <Text>フォルダがドラッグされています</Text>
          : <Text>フォルダをドラッグしてください</Text>
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
          ? <Button>EXCEL出力</Button> : <Text>ディレクトリが指定されていません</Text>
      }
    </Container>
  );
};

export default SearchDir;
