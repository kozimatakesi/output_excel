import React, { useState } from 'react';
import { Box, Input } from '@chakra-ui/react';

const SearchDir = () => {
  const [dirPath, setDirPath] = useState('');

  const handleInputChangedDirPath = (e) => {
    const inputValue = e.target.value;
    setDirPath(inputValue);
  };

  return (
    <Box>
      <Input
        value={dirPath}
        onChange={(e) => {
          handleInputChangedDirPath(e);
        }}
      />
    </Box>
  );
};

export default SearchDir;
