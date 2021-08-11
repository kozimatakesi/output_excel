import React, { useState, useEffect } from 'react';
import {
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
} from '@chakra-ui/react';

const FilesList = () => {
  const [dirInfo, setDirInfo] = useState('');
  useEffect(() => {
    api.on('dirInfo', (_, arg) => {
      setDirInfo(arg);
    });
  }, []);

  return (
    <Table size="sm">
      <TableCaption>ファイルリスト</TableCaption>
      <Thead>
        <Tr>
          <Th>フォルダ</Th>
          <Th>ファイル名</Th>
          <Th>ファイルサイズ</Th>
          <Th>更新日</Th>
          <Th>開始時間</Th>
          <Th>終了時間</Th>
          <Th>ファイルパス</Th>
        </Tr>
      </Thead>
      <Tbody>
        {
        dirInfo
          ? (
            dirInfo.map((element, index) => (
              <Tr key={index}>
                <Td>{element.directory}</Td>
                <Td>{element.name}</Td>
                <Td>{element.size}</Td>
                <Td>{element.date}</Td>
                <Td>{element.start}</Td>
                <Td>{element.end}</Td>
                <Td>{element.path}</Td>
              </Tr>
            ))) : <Tr />
        }
      </Tbody>
      <Tfoot>
        <Tr>
          <Th>フォルダ</Th>
          <Th>ファイル名</Th>
          <Th>ファイルサイズ</Th>
          <Th>更新日</Th>
          <Th>開始時間</Th>
          <Th>終了時間</Th>
          <Th>ファイルパス</Th>
        </Tr>
      </Tfoot>
    </Table>
  );
};
export default FilesList;
