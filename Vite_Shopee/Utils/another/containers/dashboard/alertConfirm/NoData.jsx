import { Flex, Img } from '@chakra-ui/react';
import { DHMAssets } from 'dhm/assets/index';
import TagLabel from './TagLabel';

export default function NoData({ tAlertConfirm }) {
  return (
    <Flex alignItems='center'>
      <Flex flexDirection='column' gap='15px'>
        <TagLabel text={tAlertConfirm('promotion')} />
        <TagLabel text={tAlertConfirm('status_option')} />
        <TagLabel text={tAlertConfirm('action_flag')} />
        <TagLabel text={tAlertConfirm('t_risk')} />
        <TagLabel text={tAlertConfirm('each_flag')} />
        <TagLabel text={tAlertConfirm('es_status')} />
        <TagLabel text={tAlertConfirm('recognition_person')} />
        <TagLabel text={tAlertConfirm('no_interview')} />
      </Flex>
      <Img width='600px' height='600px' margin='auto' src={DHMAssets.NoDataTable} alt='' />
    </Flex>
  );
}
