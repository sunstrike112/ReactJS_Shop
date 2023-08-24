import { Box, Flex, useDisclosure } from '@chakra-ui/react';
import { DHMButton } from 'dhm/components/Button';
import { ConfirmModal } from 'dhm/components/Modal/elements/confirmModal';
import LanguageContext from 'dhm/contexts/TranslateContext';
import { ServiceWorkflow } from 'dhm/store/workflow/services';
import { WF_STATUS } from 'dhm/utils/constants/select';
import { STATUS } from 'dhm/utils/constants/type';
import { useContext, useEffect, useState } from 'react';

export function LayoutModeWorkflow({ dataProcess, childrenContent = () => null }) {
  const {
    detailProcess,
    getDetailProcessAction,
    updateProcessAction,
    getProcessListIncompleteAction,
    getProcessListCompletedAction,
    waitingDetail,
  } = ServiceWorkflow();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { isOpen: isOpenDenial, onOpen: onOpenDenial, onClose: onCloseDenial } = useDisclosure();
  const { tWorkflow } = useContext(LanguageContext);
  const [isEditing, setIsEditing] = useState(false);
  const [paramsChildren, setParamsChildren] = useState({});
  const [isActiveForm, setIsActiveForm] = useState(false);
  useEffect(() => {
    getDetailProcessAction(dataProcess.matterNo);
  }, []);
  const handleSubmitProcess = (type, onCloseModal) => {
    const { statusMatter, processMatter, payloadParams, pagination, paginationCompleted } = dataProcess;
    const payload = {
      data: {
        matterNos: [dataProcess.matterNo],
        wfStatusId: type,
        processComment: null,
        // interviewLog: dataPayload,
        ...paramsChildren,
      },
      onSuccess: () => {
        if (processMatter)
          getProcessListIncompleteAction({
            params: {
              ...payloadParams.params,
              page: 1,
              limit: pagination.limit,
              applicant: true,
            },
          });
        else
          getProcessListCompletedAction({
            params: {
              ...payloadParams.params,
              page: 1,
              limit: paginationCompleted.limit,
              approverRequest: statusMatter === STATUS.DONE,
            },
          });
        onCloseModal();
      },
    };
    updateProcessAction(payload);
  };
  return (
    <Box position='relative'>
      {!isEditing && (
        <Flex my='15px'>
          {dataProcess.isShowButton.edit && (
            <DHMButton onClick={() => setIsEditing((prev) => !prev)}>{tWorkflow('edit')}</DHMButton>
          )}
        </Flex>
      )}
      <Box>
        {!waitingDetail &&
          childrenContent({ setParamsChildren, setIsActiveForm, isEditing, detailProcess, isActiveForm })}
      </Box>

      <Flex mt={10} gap='10px' justifyContent='end'>
        <>
          {isEditing && (
            <button type='button' onClick={() => setIsEditing(false)}>
              Cancel
            </button>
          )}
          {dataProcess.isShowButton.approved && (
            <DHMButton onClick={() => isActiveForm && onOpen()}>{tWorkflow('approval')}</DHMButton>
          )}
          {dataProcess.isShowButton.reject && (
            <DHMButton onClick={() => isActiveForm && onOpenDenial()} buttonType='denial'>
              {tWorkflow('denial')}
            </DHMButton>
          )}
        </>
        <ConfirmModal
          isOpen={isOpen}
          onConfirm={() => handleSubmitProcess(WF_STATUS.APPROVAL, onClose)}
          onCancel={onClose}
          type='update'
        />
        <ConfirmModal
          isOpen={isOpenDenial}
          onConfirm={() => handleSubmitProcess(WF_STATUS.DENIAL, onCloseDenial)}
          onCancel={onCloseDenial}
          type='update'
        />
      </Flex>
    </Box>
  );
}
