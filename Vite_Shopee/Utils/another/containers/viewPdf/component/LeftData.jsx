import { AddIcon } from '@chakra-ui/icons';
import { Flex, Box, Text, Button } from '@chakra-ui/react';
import LanguageContext from 'dhm/contexts/TranslateContext';
import { ServiceFileUpload } from 'dhm/store/fileUpload/services';
import { useContext, useEffect, useState } from 'react';

export function LeftData({ title, data, updateUrlPdf }) {
  const { tViewPdf } = useContext(LanguageContext);
  const { urlFile, listFileVersion, getAllFileVersionAction, getPublicAccessUrlFileAction } = ServiceFileUpload();
  const [localData, setLocalData] = useState([]);
  const [index, setIndex] = useState(0);
  const [jIndex, setJIndex] = useState(null);

  useEffect(() => {
    setLocalData(data);
  }, [data]);

  useEffect(() => {
    setLocalData((prevVersions) => {
      const updatedVersions = [...prevVersions];
      updatedVersions[index] = { ...updatedVersions[index], fileVersions: listFileVersion };
      return updatedVersions;
    });
  }, [listFileVersion]);

  useEffect(() => {
    updateUrlPdf(urlFile);
  }, [urlFile]);

  const handleGetUrl = ({ employeeId, fileName, versionId }, jdx) => {
    setJIndex(jdx);
    getPublicAccessUrlFileAction({ employeeId, fileName, version: versionId });
  };

  const handleAllVersionFile = (file, idx) => {
    setIndex(idx);
    getAllFileVersionAction({ employeeId: file.employeeId, fileName: file.fileName });
  };

  const getVersionNumber = (list, i) => list.length - i;
  return (
    <Flex flexDirection='column' p={3}>
      <Text borderBottom='1px solid #646464' pb={3}>
        {title}
      </Text>
      <Box mt={2}>
        {localData?.map((item, idx) => (
          <Flex key={idx} flexDirection='column'>
            <Button
              display='flex'
              justifyContent='space-between'
              bg='#E7E7E7'
              mb='8px'
              px={5}
              cursor='pointer'
              rightIcon={<AddIcon />}
              onClick={() => handleAllVersionFile(item, idx)}
            >
              {item?.fileName}
            </Button>
            <Box ml={8} mb={2}>
              {item?.fileVersions &&
                item?.fileVersions.map((jtem, jdx) => (
                  <Text
                    key={jdx}
                    cursor='pointer'
                    onClick={() => handleGetUrl(jtem, jdx)}
                    bg={jIndex === jdx ? 'white' : null}
                  >
                    リーバージョン #{getVersionNumber(item?.fileVersions, jdx)}
                    {jdx === 0 ? ` (${tViewPdf('current')})` : null}
                  </Text>
                ))}
            </Box>
          </Flex>
        ))}
      </Box>
    </Flex>
  );
}
