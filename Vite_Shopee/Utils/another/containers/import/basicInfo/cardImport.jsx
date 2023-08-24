import { Flex } from '@chakra-ui/react';
import { ButtonImportVer2 } from 'dhm/components/Button/importButtonVer2';
import { WrapperSubForm } from 'dhm/components/Form/WrapperSubForm';
import LanguageContext from 'dhm/contexts/TranslateContext';
import { useContext } from 'react';

export function CardImport({ title, handleSetListFiles = () => {}, keyMain, keyHistory, clearTrick = 0, ...props }) {
  const { tTabs } = useContext(LanguageContext);
  return (
    <>
      <WrapperSubForm title={title} {...props}>
        <Flex flexDirection='column' gap='10px'>
          <ButtonImportVer2
            onImport={(data) => handleSetListFiles(keyMain, data)}
            text={tTabs('import_basic_info')}
            prevContent={tTabs('main_data')}
            nameFile={keyMain}
            clearTrick={clearTrick}
          />
          <ButtonImportVer2
            onImport={(data) => handleSetListFiles(keyHistory, data)}
            text={tTabs('import_basic_info')}
            prevContent={tTabs('history_data')}
            nameFile={keyHistory}
            clearTrick={clearTrick}
          />
        </Flex>
      </WrapperSubForm>
    </>
  );
}
