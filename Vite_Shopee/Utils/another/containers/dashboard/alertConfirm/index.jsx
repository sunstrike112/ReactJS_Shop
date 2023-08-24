import { QuestionIcon } from '@chakra-ui/icons';
import { Box, Button, Flex, IconButton, Img, Text, useDisclosure } from '@chakra-ui/react';
import { DHMAssets } from 'dhm/assets/index';
import { DHMBox } from 'dhm/components/Box';
import { DHMButton } from 'dhm/components/Button';
import { CloseButton } from 'dhm/components/Button/closeButton';
import DHMModal from 'dhm/components/Modal';
import { AppContext } from 'dhm/contexts/AppContext';
import LanguageContext, { currentLanguage } from 'dhm/contexts/TranslateContext';
import { ServiceDashboardAlertConfirm } from 'dhm/store/alertConfirm/services';
import { ServicesOverviewInfo } from 'dhm/store/overviewInfo/services';
import { CODE_ID, MODE_COLOR } from 'dhm/utils/constants/select';
import { BORDERS, COLORS } from 'dhm/utils/constants/style';
import debounce from 'lodash/debounce';
import pick from 'lodash/pick';
import { useCallback, useContext, useEffect, useState } from 'react';
import ReactSelect from 'react-select';
import NoData from './NoData';
import TagLabel from './TagLabel';
import { FlexCard, FlexRadio, FlexRadioGroup, FlexRow, FlexTagList, WrapperFlex } from './styled';

export function AlertConfirmation() {
  const { BoxTotal } = DHMBox;
  const { heightApp } = useContext(AppContext);
  const { listEsMngPred, getEsMngPredAction, loadingListEsMangerDashboard } = ServicesOverviewInfo();
  const {
    dashboardAlertConfirmData: data,
    getDashboardAlertConfirmAction,
    updateColorDashboardAlertConfirmationAction,
    clearDashboardAlertConfirmAction,
  } = ServiceDashboardAlertConfirm();
  const { tForm, tAlertConfirm } = useContext(LanguageContext);
  const [searchListEsManager, setSearchListEsManager] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [listEsManagerPred, setListEsManagerPred] = useState(
    [...listEsMngPred.data]?.map((item) => ({
      value: item.userCode,
      label: item.esMngPred,
    })),
  );
  const [listArrayPayload, setListArrayPayload] = useState([]);

  useEffect(() => {
    if (data.total !== 0)
      setListArrayPayload(
        [
          ...data.promotion.map((item) => ({ ...item, codeListId: CODE_ID.PROMOTION })),
          ...data.t_risk.map((item) => ({ ...item, codeListId: CODE_ID.T_RISK })),
          ...data.esStatus.map((item) => ({ ...item, codeListId: CODE_ID.ES_STATUS })),
          ...data.recOfPerson.map((item) => ({ ...item, codeListId: CODE_ID.RECOGNIZE_PERSON })),
        ].map((item) => ({
          ...item,
          codeListId: item.codeListId,
          codeValue: item.code_value,
          backgroundColor: item.background_color,
          textColor: item.text_color,
        })),
      );
  }, [data]);

  useEffect(() => {
    getEsMngPredAction({
      params: {
        deleteFlg: 0,
        isHistory: false,
        sortType: 'desc',
        isAll: true,
      },
    });
    clearDashboardAlertConfirmAction();
  }, []);

  useEffect(() => {
    setListEsManagerPred(
      [...listEsMngPred.data]?.map((item) => ({
        value: item.userCode,
        label: item.esMngPred,
      })),
    );
  }, [listEsMngPred]);

  const handleGetListEsMngPred = useCallback(
    debounce(() => {
      getEsMngPredAction({
        params: {
          deleteFlg: 0,
          isHistory: false,
          sortType: 'desc',
          isAll: true,
        },
      });
    }, 500),
    [],
  );

  const handleSearchListEsManager = (listArraySelected) => {
    setSearchListEsManager(listArraySelected);
    if (listArraySelected.length === 0) clearDashboardAlertConfirmAction();
  };

  const onSubmit = debounce(() => {
    getDashboardAlertConfirmAction(searchListEsManager.map((item) => item.value));
  }, 500);

  const handleEditColor = (item, type, color) => {
    const currentElement = listArrayPayload.find(
      (element) => element.code_value === item.code_value && element.codeListId === type,
    );
    const currentElementIndex = listArrayPayload.indexOf(currentElement);
    const replaceElement = { ...currentElement, textColor: color };
    const arrayAfter = [...listArrayPayload];
    arrayAfter[currentElementIndex] = replaceElement;
    setListArrayPayload(arrayAfter);
  };

  const handelUpdateColorDashboardAlertConfirm = () => {
    updateColorDashboardAlertConfirmationAction({
      data: listArrayPayload.map((item) =>
        pick({ ...item, backgroundColor: 'white', textColor: item.textColor ? item.textColor : MODE_COLOR.GRAY }, [
          'codeListId',
          'codeValue',
          'backgroundColor',
          'textColor',
        ]),
      ),
      onSuccess: () => getDashboardAlertConfirmAction(searchListEsManager.map((item) => item.value)),
    });
  };

  const listArrayEditLocal = {
    promotion: listArrayPayload.filter((item) => item.codeListId === CODE_ID.PROMOTION),
    t_risk: listArrayPayload.filter((item) => item.codeListId === CODE_ID.T_RISK),
    esStatus: listArrayPayload.filter((item) => item.codeListId === CODE_ID.ES_STATUS),
    recOfPerson: listArrayPayload.filter((item) => item.codeListId === CODE_ID.RECOGNIZE_PERSON),
  };

  const handleCancel = () => {
    onClose();
    setIsEditing(!isEditing);
  };

  const handleUpdateColor = () => {
    handelUpdateColorDashboardAlertConfirm();
    setIsEditing(!isEditing);
    onClose();
  };

  return (
    <WrapperFlex flexDirection='column' gap='20px'>
      <Flex flexDirection='column' gap='20px' height={`calc(${heightApp} - 200px)`} overflow='auto'>
        <Flex alignItems='center' position='relative'>
          {!isEditing && data.total !== 0 && (
            <IconButton
              position='absolute'
              right='10px'
              top='10px'
              icon={<Img src={DHMAssets.ICON_EDIT_BLACK} />}
              onClick={() => setIsEditing(!isEditing)}
              background='transparent'
              size='md'
            />
          )}
          <Box mr='20px' fontWeight='500'>
            {tAlertConfirm('charge_es')}
          </Box>
          <Box width='500px' mr='20px'>
            <ReactSelect
              isMulti
              name='colors'
              value={searchListEsManager}
              options={listEsManagerPred}
              placeholder=''
              className='multi-select'
              classNamePrefix='multi-select-react'
              onChange={(listArraySelected) => handleSearchListEsManager(listArraySelected)}
              onInputChange={() => handleGetListEsMngPred()}
              noOptionsMessage={() => tForm('noData')}
              loadingMessage={() => tForm('loading')}
              isDisabled={isEditing}
              isLoading={loadingListEsMangerDashboard}
            />
          </Box>
          <Box width='80px'>
            <Button
              borderRadius='none'
              height='36px'
              fontSize='14px'
              background={COLORS.gray_600}
              color={COLORS.white_primary}
              onClick={() => onSubmit()}
              isDisabled={searchListEsManager.length === 0 || isEditing}
            >
              {tAlertConfirm('search')}
            </Button>
          </Box>
        </Flex>
        <Flex>
          <Box mr='10px' fontWeight='500'>
            {tAlertConfirm('number_in_charge')} :
          </Box>
          <Box>{data.total} 人</Box>
        </Flex>
        {data.total === 0 ? (
          <NoData tAlertConfirm={tAlertConfirm} />
        ) : (
          <>
            <FlexRow pt='10px'>
              <TagLabel text={tAlertConfirm('promotion')} />
              {isEditing ? (
                <FlexTagList>
                  {listArrayEditLocal.promotion.map((item, index) => (
                    <FlexCard
                      key={index}
                      color={item.textColor === MODE_COLOR.RED && COLORS.red_card}
                      fontWeight={item.textColor === MODE_COLOR.RED && '700'}
                    >
                      <FlexRadioGroup>
                        <FlexRadio
                          bg={COLORS.gray_700}
                          border={item.textColor === MODE_COLOR.GRAY && BORDERS.border_3(COLORS.blue_radio)}
                          onClick={() => handleEditColor(item, CODE_ID.PROMOTION, MODE_COLOR.GRAY)}
                        />
                        <FlexRadio
                          bg={COLORS.red_danger}
                          border={item.textColor === MODE_COLOR.RED && BORDERS.border_3(COLORS.blue_radio)}
                          onClick={() => handleEditColor(item, CODE_ID.PROMOTION, MODE_COLOR.RED)}
                        />
                      </FlexRadioGroup>
                      <Box>{item.name.charAt(0)}</Box>
                      <BoxTotal data={item.total} />
                    </FlexCard>
                  ))}
                </FlexTagList>
              ) : (
                <FlexTagList>
                  {data.promotion.map((item, index) => (
                    <FlexCard
                      key={index}
                      color={item.text_color === MODE_COLOR.RED && COLORS.red_card}
                      fontWeight={item.text_color === MODE_COLOR.RED && '700'}
                    >
                      <Box>{item.name.charAt(0)}</Box>
                      <BoxTotal data={item.total} />
                    </FlexCard>
                  ))}
                </FlexTagList>
              )}
            </FlexRow>

            <FlexRow>
              <TagLabel text={tAlertConfirm('status_option')} />
              <Flex>
                <FlexCard>
                  <Box>{tAlertConfirm('blue')}</Box>
                  <BoxTotal data={data.status.blue} />
                </FlexCard>
                <FlexCard>
                  <Box>{tAlertConfirm('yellow')}</Box>
                  <BoxTotal data={data.status.yellow} />
                </FlexCard>
                <FlexCard color={COLORS.red_card} fontWeight='700'>
                  <Box>{tAlertConfirm('red')}</Box>
                  <BoxTotal data={data.status.red} />
                </FlexCard>
              </Flex>
            </FlexRow>

            <FlexRow>
              <TagLabel text={tAlertConfirm('action_flag')} />
              <Flex>
                <FlexCard>
                  <Box>{tAlertConfirm('before_deadline')}</Box>
                  <BoxTotal data={data.requiredFlag.before_deadline} />
                </FlexCard>
                <FlexCard color={COLORS.red_card} fontWeight='700'>
                  <Box>{tAlertConfirm('date_exceeded')}</Box>
                  <BoxTotal data={data.requiredFlag.date_exceeded} />
                </FlexCard>
              </Flex>
            </FlexRow>

            <FlexRow>
              <TagLabel text={tAlertConfirm('t_risk')} />
              {isEditing ? (
                <FlexTagList>
                  {listArrayEditLocal.t_risk.map((item, index) => (
                    <FlexCard
                      key={index}
                      color={item.textColor === MODE_COLOR.RED && COLORS.red_card}
                      fontWeight={item.textColor === MODE_COLOR.RED && '700'}
                    >
                      <FlexRadioGroup>
                        <FlexRadio
                          bg={COLORS.gray_700}
                          border={item.textColor === MODE_COLOR.GRAY && BORDERS.border_3(COLORS.blue_radio)}
                          onClick={() => handleEditColor(item, CODE_ID.T_RISK, MODE_COLOR.GRAY)}
                        />
                        <FlexRadio
                          bg={COLORS.red_danger}
                          border={item.textColor === MODE_COLOR.RED && BORDERS.border_3(COLORS.blue_radio)}
                          onClick={() => handleEditColor(item, CODE_ID.T_RISK, MODE_COLOR.RED)}
                        />
                      </FlexRadioGroup>
                      <Box>{currentLanguage('jp') ? item.name : item.name_en}</Box>
                      <BoxTotal data={item.total} />
                    </FlexCard>
                  ))}
                </FlexTagList>
              ) : (
                <FlexTagList>
                  {data.t_risk.map((item, index) => (
                    <FlexCard
                      key={index}
                      color={item.text_color === MODE_COLOR.RED && COLORS.red_card}
                      fontWeight={item.text_color === MODE_COLOR.RED && '700'}
                    >
                      <Box>{currentLanguage('jp') ? item.name : item.name_en}</Box>
                      <BoxTotal data={item.total} />
                    </FlexCard>
                  ))}
                </FlexTagList>
              )}
            </FlexRow>

            <FlexRow>
              <TagLabel text={tAlertConfirm('each_flag')} />
              <FlexTagList>
                <FlexCard>
                  <Box>{tAlertConfirm('pinasa')}</Box>
                  <BoxTotal data={data.eachFlg.pinasa} />
                </FlexCard>
                <FlexCard>
                  <Box>{tAlertConfirm('overtime')}</Box>
                  <BoxTotal data={data.eachFlg.overtime} />
                </FlexCard>
                <FlexCard>
                  <Box>{tAlertConfirm('onLeave')}</Box>
                  <BoxTotal data={data.eachFlg.onLeave} />
                </FlexCard>
                <FlexCard>
                  <Box>{tAlertConfirm('maternityLeave')}</Box>
                  <BoxTotal data={data.eachFlg.maternityLeave} />
                </FlexCard>
                <FlexCard color={COLORS.red_card} fontWeight='700'>
                  <Box>{tAlertConfirm('notInOperation')}</Box>
                  <BoxTotal data={data.eachFlg.notInOperation} />
                </FlexCard>
              </FlexTagList>
            </FlexRow>

            <FlexRow>
              <TagLabel text={tAlertConfirm('es_status')} />
              {isEditing ? (
                <FlexTagList>
                  {listArrayEditLocal.esStatus.map((item, index) => (
                    <FlexCard
                      key={index}
                      color={item.textColor === MODE_COLOR.RED && COLORS.red_card}
                      fontWeight={item.textColor === MODE_COLOR.RED && '700'}
                    >
                      <FlexRadioGroup>
                        <FlexRadio
                          bg={COLORS.gray_700}
                          border={item.textColor === MODE_COLOR.GRAY && BORDERS.border_3(COLORS.blue_radio)}
                          onClick={() => handleEditColor(item, CODE_ID.ES_STATUS, MODE_COLOR.GRAY)}
                        />
                        <FlexRadio
                          bg={COLORS.red_danger}
                          border={item.textColor === MODE_COLOR.RED && BORDERS.border_3(COLORS.blue_radio)}
                          onClick={() => handleEditColor(item, CODE_ID.ES_STATUS, MODE_COLOR.RED)}
                        />
                      </FlexRadioGroup>
                      <Box>{currentLanguage('jp') ? item.name : item.name_en}</Box>
                      <BoxTotal data={item.total} />
                    </FlexCard>
                  ))}
                </FlexTagList>
              ) : (
                <FlexTagList>
                  {data.esStatus.map((item, index) => (
                    <FlexCard
                      key={index}
                      color={item.text_color === MODE_COLOR.RED && COLORS.red_card}
                      fontWeight={item.text_color === MODE_COLOR.RED && '700'}
                    >
                      <Box>{currentLanguage('jp') ? item.name : item.name_en}</Box>
                      <BoxTotal data={item.total} />
                    </FlexCard>
                  ))}
                </FlexTagList>
              )}
            </FlexRow>

            <FlexRow>
              <TagLabel text={tAlertConfirm('recognition_person')} />
              {isEditing ? (
                <FlexTagList>
                  {listArrayEditLocal.recOfPerson.map((item, index) => (
                    <FlexCard
                      key={index}
                      color={item.textColor === MODE_COLOR.RED && COLORS.red_card}
                      fontWeight={item.textColor === MODE_COLOR.RED && '700'}
                    >
                      <FlexRadioGroup>
                        <FlexRadio
                          bg={COLORS.gray_700}
                          border={item.textColor === MODE_COLOR.GRAY && BORDERS.border_3(COLORS.blue_radio)}
                          onClick={() => handleEditColor(item, CODE_ID.RECOGNIZE_PERSON, MODE_COLOR.GRAY)}
                        />
                        <FlexRadio
                          bg={COLORS.red_danger}
                          border={item.textColor === MODE_COLOR.RED && BORDERS.border_3(COLORS.blue_radio)}
                          onClick={() => handleEditColor(item, CODE_ID.RECOGNIZE_PERSON, MODE_COLOR.RED)}
                        />
                      </FlexRadioGroup>
                      <Box>{currentLanguage('jp') ? item.name : item.name_en}</Box>
                      <BoxTotal data={item.total} />
                    </FlexCard>
                  ))}
                </FlexTagList>
              ) : (
                <FlexTagList>
                  {data.recOfPerson.map((item, index) => (
                    <FlexCard
                      key={index}
                      color={item.text_color === MODE_COLOR.RED && COLORS.red_card}
                      fontWeight={item.text_color === MODE_COLOR.RED && '700'}
                    >
                      <Box>{currentLanguage('jp') ? item.name : item.name_en}</Box>
                      <BoxTotal data={item.total} />
                    </FlexCard>
                  ))}
                </FlexTagList>
              )}
            </FlexRow>

            <FlexRow>
              <TagLabel text={tAlertConfirm('no_interview')} />
              <FlexTagList>
                <FlexCard>
                  <Box>{tAlertConfirm('moreThan1Month')}</Box>
                  <BoxTotal data={data.interviewNotConducted.moreThan1Month} />
                </FlexCard>
                <FlexCard>
                  <Box>{tAlertConfirm('moreThan2Month')}</Box>
                  <BoxTotal data={data.interviewNotConducted.moreThan2Month} />
                </FlexCard>
                <FlexCard>
                  <Box>{tAlertConfirm('moreThan3Month')}</Box>
                  <BoxTotal data={data.interviewNotConducted.moreThan3Month} />
                </FlexCard>
                <FlexCard color={COLORS.red_card} fontWeight='700'>
                  <Box>{tAlertConfirm('moreThan4Month')}</Box>
                  <BoxTotal data={data.interviewNotConducted.moreThan4Month} />
                </FlexCard>
              </FlexTagList>
            </FlexRow>
          </>
        )}
      </Flex>
      {isEditing && (
        <Flex gap='10px' justify='end' mt='20px'>
          <CloseButton handleClose={() => handleCancel()} />
          <DHMButton text={tForm('update')} type='button' onClick={() => onOpen()} />
          <DHMModal
            title={tForm('confirm')}
            prevIcon={<QuestionIcon mr='5px' />}
            isOpen={isOpen}
            onCancel={onClose}
            titleProps={{ textAlign: 'center' }}
            typeHeader='delete'
            content={() => (
              <>
                <Text>{tForm('confirm_content')}</Text>
                <Flex mt={5} gap='10px' justifyContent='end'>
                  <DHMButton onClick={onClose} text={tForm('cancel')} buttonType='cancel' />
                  <DHMButton
                    onClick={() => handleUpdateColor()}
                    text={tForm('confirm')}
                    buttonType='yesDelete'
                    autoFocus
                  />
                </Flex>
              </>
            )}
          />
        </Flex>
      )}
    </WrapperFlex>
  );
}
