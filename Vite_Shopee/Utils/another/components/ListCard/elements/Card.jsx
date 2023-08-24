import { Box, Card, CardBody, Flex, Stack, Text } from '@chakra-ui/react';
import { LazyLoadBlurImage } from 'dhm/components/Box/BoxImage';
import { BoxTextFlex } from 'dhm/components/Box/BoxText';
import { DrawerContainer } from 'dhm/containers/drawer';
import { useGetValueDropdown } from 'dhm/hooks/useGetValueDropdown';

export function CardItemBasicInfo({ src, onClick = () => {}, callbackAction = () => {}, ...props }) {
  const { employeeId, employeeName, employeeNameKana, picPerson } = props;
  const { getValueDropdown } = useGetValueDropdown();

  const dataRow = props;
  const originData = {
    employeeId: dataRow.employeeId,
    position: dataRow.position,
    employeeName: dataRow.employeeName,
    employeeNameKana: dataRow.employeeNameKana,
    sex: dataRow.sex,
    birthday: dataRow.birthday,
    joiningCompany: dataRow.joiningCompany,
    eduBackground: dataRow.eduBackground,
    retirement: dataRow.retirement,
    formerJob: dataRow.formerJob,
    joiningPathOptional: dataRow.joiningPathOptional,
    joiningPathChargePerson: dataRow.joiningPathChargePerson,
    joiningPathDescription: dataRow.joiningPathDescription,
    joiningCompanyReason: dataRow.joiningCompanyReason,
  };
  return (
    <Card
      direction={{ base: 'column', sm: 'row' }}
      overflow='hidden'
      variant='outline'
      height='130px'
      alignItems='center'
      padding='5px 10px'
      cursor='pointer'
      _hover={{ bg: 'gray.50' }}
      onClick={onClick}
    >
      {picPerson ? (
        <LazyLoadBlurImage src={picPerson} width='100px' height='100px' borderRadius='50%' />
      ) : (
        <Box
          width='100px'
          height='100px'
          borderRadius='50%'
          border='1px solid'
          borderColor='gray.300'
          display='flex'
          justifyContent='center'
          alignItems='center'
          fontSize='15px'
          fontWeight='semibold'
        >
          No Image
        </Box>
      )}
      <Stack width='calc(100% - 120px)'>
        <CardBody>
          <Flex justifyContent='end'>
            <DrawerContainer modeForm='view' originData={originData} callbackAction={callbackAction} />
          </Flex>
          <Flex>
            <Box fontWeight='semibold'>社員ID：</Box>
            <Text>{employeeId}</Text>
          </Flex>
          <Flex>
            <Box width='50px' fontWeight='semibold'>
              氏名：
            </Box>
            <Box maxWidth='calc(90% - 50px)'>
              <BoxTextFlex fontSize='14px' position='relative'>
                {employeeName}
              </BoxTextFlex>
              <BoxTextFlex fontSize='14px' position='relative'>{`(${employeeNameKana})`}</BoxTextFlex>
            </Box>
          </Flex>
          <Flex>
            <Box fontWeight='semibold'>職位：</Box>
            <Text>{getValueDropdown('POSITION', props.position)}</Text>
          </Flex>
        </CardBody>
      </Stack>
    </Card>
  );
}
