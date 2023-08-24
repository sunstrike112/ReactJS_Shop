import { Box, Flex, Button } from '@chakra-ui/react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { ServiceFileUpload } from 'dhm/store/fileUpload/services';
import { FILE_UPLOAD_JP } from 'dhm/utils/constants/type';
import LanguageContext from 'dhm/contexts/TranslateContext';
import { ROUTES } from 'dhm/utils/constants/routes';

import { useContext, useEffect, useState } from 'react';
import { ChevronLeftIcon } from '@chakra-ui/icons';
import { LeftData } from './component/LeftData';
import { PdfView } from './component/PdfView';

export function ViewPdf() {
  const { tViewPdf } = useContext(LanguageContext);
  const navigate = useNavigate();

  const { listAllFile, getListAllFileAction } = ServiceFileUpload();
  const [listData, setListData] = useState(null);
  const [pdfUrl, setPdfUrl] = useState(null);
  const location = useLocation();
  const { employeeId } = useParams();
  const pathname = location?.pathname;
  const pathSegments = pathname.split('/');
  const nonEmptySegments = pathSegments.filter((segment) => segment.trim() !== '');
  const lastItemInPath = nonEmptySegments[nonEmptySegments.length - 1];

  useEffect(() => {
    setPdfUrl(null);
    getListAllFileAction();
  }, []);
  useEffect(() => {
    setListData({
      employeePic: listAllFile.filter(
        (item) => item.fileName.startsWith(FILE_UPLOAD_JP.EMPLOYEE_PIC) && item.fileName.includes(employeeId),
      ),
      resume: listAllFile.filter(
        (item) => item.fileName.startsWith(FILE_UPLOAD_JP.RESUME) && item.fileName.includes(employeeId),
      ),
      workHistory: listAllFile.filter(
        (item) => item.fileName.startsWith(FILE_UPLOAD_JP.WORK_HISTORY) && item.fileName.includes(employeeId),
      ),
    });
  }, [listAllFile]);

  const handleUpdateUrlPdf = (e) => {
    setPdfUrl(e);
  };

  return (
    <Box m={5}>
      <Button
        leftIcon={<ChevronLeftIcon />}
        variant='unstyled'
        mb={5}
        onClick={() => navigate(`${ROUTES.summary}/${employeeId}`)}
      >
        {tViewPdf('back')}
      </Button>
      <Flex>
        <Box flex='1' bg='#F5F5F7' mr={3}>
          {lastItemInPath && (
            <LeftData
              title={tViewPdf(lastItemInPath)}
              data={listData ? listData[lastItemInPath] : []}
              updateUrlPdf={handleUpdateUrlPdf}
            />
          )}
        </Box>
        <Box flex='3' bg='#F5F5F7'>
          <PdfView pdfUrl={pdfUrl} />
        </Box>
      </Flex>
    </Box>
  );
}
