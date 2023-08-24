import { Flex } from '@chakra-ui/react';
import { ButtonImportOvertime } from 'dhm/components/Button/importOvertime';
import LanguageContext from 'dhm/contexts/TranslateContext';
import { useContext } from 'react';

export function CardImport({ handleSetListFiles = () => {}, keyMain, clearTrick = 0 }) {
  const { tTabs } = useContext(LanguageContext);
  return (
    <>
      <Flex flexDirection='column' gap='10px'>
        <ButtonImportOvertime
          onImport={(data) => handleSetListFiles(keyMain, data)}
          text={tTabs('import_basic_info')}
          prevContent={tTabs('main_data')}
          clearTrick={clearTrick}
        />
      </Flex>
    </>
  );
}
