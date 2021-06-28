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

  const onDrop = useCallback((acceptedFiles) => {
    console.log(acceptedFiles);
    setDirPath(acceptedFiles[0].path);
  });

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <Container>
      <Box {...getRootProps()}>
        <Input
          value={dirPath}
          onChange={(e) => {
            handleInputChangedDirPath(e);
          }}
        />
        {
        isDragActive
          ? <Text>フォルダがドラッグされています</Text>
          : <Text>フォルダをドラッグしてください</Text>
      }

      </Box>
      {
        !dirPath.includes('.') && dirPath !== ''
          ? <Button>EXCEL出力</Button> : ''
      }
    </Container>
  );
};

export default SearchDir;
