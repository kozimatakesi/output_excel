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

  let lineColor = '#BEE3F8';
  let endColor = '';

  return (
    <Table size="sm">
      <TableCaption>ファイルリスト</TableCaption>
      <Thead>
        <Tr>
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
            dirInfo.map((fileInfo, index) => {
              // パスが前の行と異なっていた場合、色を変更する
              if (index !== 0 && fileInfo.path !== dirInfo[index - 1].path && lineColor === '#BEE3F8') {
                lineColor = '#B2F5EA';
              } else if (index !== 0 && fileInfo.path !== dirInfo[index - 1].path && lineColor === '#B2F5EA') {
                lineColor = '#BEE3F8';
              }
              // 同じファイルパス、尚且つ、開始時間が次の行の開始時間と異なっていた場合、更新時間を赤文字にする
              if (index !== dirInfo.length - 1
                && fileInfo.path === dirInfo[index + 1].path
                && dirInfo[index + 1].start !== fileInfo.start) {
                endColor = 'red';
              } else {
                endColor = '';
              }

              return (
                <Tr key={index} backgroundColor={lineColor}>
                  <Td>{fileInfo.name}</Td>
                  <Td>{fileInfo.size}</Td>
                  <Td>{fileInfo.date}</Td>
                  <Td>{fileInfo.start}</Td>
                  <Td color={endColor}>{fileInfo.end}</Td>
                  <Td>{fileInfo.path}</Td>
                </Tr>
              );
            })
          ) : <Tr />
        }
      </Tbody>
      <Tfoot>
        <Tr>
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
