import {
  Box,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  IconButton,
  Img,
  useDisclosure,
} from '@chakra-ui/react';
import { DHMAssets } from 'dhm/assets/index';
import { CreateFormInterviewlog } from 'dhm/containers/interviewLog/CreateFormInterviewlog';
import { EditFormInterviewlog } from 'dhm/containers/interviewLog/EditFormInterviewlog';
import { TablePreferenceInterviewLog } from 'dhm/containers/interviewLog/TablePreferenceInterviewLog';
import { CRUDFormOverview } from 'dhm/containers/overview/CRUDForm';
import { CRUDFormPolicyProgress } from 'dhm/containers/policyProgress/CRUDForm';
import { CreateFormProjectInfo } from 'dhm/containers/projectInfo/CreateFormProjectInfo';
import { EditFormProjectInfo } from 'dhm/containers/projectInfo/EditFormProjectInfo';
import { TablePreferenceProjectInfo } from 'dhm/containers/projectInfo/TablePreferenceProjectInfo';
import { AbilityContext } from 'dhm/contexts/AbilityContext';
import LanguageContext from 'dhm/contexts/TranslateContext';
import { ROUTES } from 'dhm/utils/constants/routes';
import { COLORS } from 'dhm/utils/constants/style';
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { CRUDForm } from '../basicInfo/BasicInfoReg/CRUDForm';
import { CRUDForm as CRUDFormEmployeeSuccess } from '../employeeSuccess/CRUDForm';
// import { WorkflowInterviewLog } from '../workFlow/processList/workflowForm/interviewLog/WorkflowInterviewLog';
import { LayoutModeWorkflow } from '../workFlow/processList/LayoutModeWorkflow';

export function DrawerContainer({
  modeForm,
  originData = {},
  dataProcess = {},
  callbackAction = () => {},
  modePage = 'basicInfo',
  type = 'default',
}) {
  const { ID_KEY, PermissionWrapper } = useContext(AbilityContext);
  const { tOverviewInfo, tPolicyProgress, tInterviewLog, tProjectInfo } = useContext(LanguageContext);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { isOpen: isOpenPreference, onOpen: onOpenPreference, onClose: onClosePreference } = useDisclosure();
  // const { isOpen: isOpenWorkflow, onOpen: onOpenWorkflow, onClose: onCloseWorkflow } = useDisclosure();
  const navigate = useNavigate();
  const chooseButton = {
    create: <div />,
    edit: <Img src={DHMAssets.ICON_EDIT_BLACK} onClick={onOpen} cursor='pointer' />,
    workflow: <Img src={DHMAssets.ICON_DETAIL} onClick={onOpen} cursor='pointer' />,
    view: (
      <Box
        position='absolute'
        top='0'
        left='0'
        width='100%'
        height='100%'
        onClick={() => navigate(`${ROUTES.summary}/${originData.employeeId}`)}
      />
    ),
    summary: (
      <IconButton
        icon={<Img src={DHMAssets.ICON_EDIT} />}
        onClick={onOpen}
        background='transparent'
        size='sm'
        _hover={{
          bg: 'none',
        }}
      />
    ),
    summaryView: (
      <IconButton
        icon={<i className='fa-solid fa-eye' />}
        onClick={onOpen}
        background='transparent'
        size='sm'
        _hover={{
          bg: 'none',
        }}
      />
    ),
    overview: (
      <IconButton icon={<Img src={DHMAssets.ICON_EDIT_BLACK} />} onClick={onOpen} background='transparent' size='sm' />
    ),
    projectInfo: (
      <>
        <PermissionWrapper path={ID_KEY[10]} haveNoti={false}>
          <IconButton icon={<Img src={DHMAssets.ICON_CREATE} />} onClick={onOpen} background='transparent' size='sm' />
        </PermissionWrapper>
        <PermissionWrapper path={ID_KEY[11]} haveNoti={false}>
          <IconButton
            icon={<Img src={DHMAssets.ICON_HISTORY_WHITE} />}
            onClick={onOpenPreference}
            background='transparent'
            size='sm'
          />
        </PermissionWrapper>
      </>
    ),
    interviewLog: (
      <>
        <PermissionWrapper path={ID_KEY[12]} haveNoti={false}>
          <IconButton icon={<Img src={DHMAssets.ICON_CREATE} />} onClick={onOpen} background='transparent' size='sm' />
        </PermissionWrapper>
        <PermissionWrapper path={ID_KEY[13]} haveNoti={false}>
          <IconButton
            icon={<Img src={DHMAssets.ICON_HISTORY_WHITE} />}
            onClick={onOpenPreference}
            background='transparent'
            size='sm'
          />
        </PermissionWrapper>
      </>
    ),
  };
  const propsCRUDFormBasicInfo = {
    callbackAction,
    modeForm,
    onClose,
    originData,
  };
  const propsCRUDFormEmployeeSuccess = {
    callbackAction,
    modeForm,
    onClose,
    originData,
  };
  const propsCRUDFormOverviewInfo = {
    callbackAction,
    modeForm,
    onClose,
    originData,
  };
  const propsCRUDFormPolicyProgress = {
    callbackAction,
    modeForm,
    onClose,
    originData,
  };
  const propsCRUDFormProjectInfo = {
    callbackAction,
    modeForm,
    onClose,
    originData,
  };
  const propsPreferenceProjectInfo = {
    onOpen: onOpenPreference,
    isOpen: isOpenPreference,
    onClose: onClosePreference,
    originData,
  };
  const propsCRUDFormInterviewLog = {
    callbackAction,
    modeForm,
    onClose,
    originData,
  };
  const propsPreferenceInterviewLog = {
    onOpen: onOpenPreference,
    isOpen: isOpenPreference,
    onClose: onClosePreference,
    originData,
  };
  // const propsWorkflowInterviewLog = {
  //   onOpen: onOpenWorkflow,
  //   isOpen: isOpenWorkflow,
  //   onClose: onCloseWorkflow,
  //   dataProcess,
  //   originData,
  // };
  const listTab = {
    overview: {
      id: 1,
      name: tOverviewInfo('overviewInfo'),
      content: <CRUDFormOverview {...propsCRUDFormOverviewInfo} />,
      workflow: (
        <LayoutModeWorkflow
          dataProcess={dataProcess}
          childrenContent={({ setParamsChildren, setIsActiveForm, isEditing, detailProcess, isActiveForm }) => (
            <CRUDFormOverview
              setParamsChildren={setParamsChildren}
              setIsActiveForm={setIsActiveForm}
              isEditing={isEditing}
              modeFeature='workflow'
              {...propsCRUDFormOverviewInfo}
              originData={detailProcess?.update}
              isActiveForm={isActiveForm}
            />
          )}
        />
      ),
    },
    basicInfo: {
      id: 2,
      name: '基本Info',
      content: <CRUDForm {...propsCRUDFormBasicInfo} />,
      workflow: (
        <LayoutModeWorkflow
          dataProcess={dataProcess}
          childrenContent={({ setParamsChildren, setIsActiveForm, isEditing, detailProcess, isActiveForm }) => (
            <CRUDForm
              setParamsChildren={setParamsChildren}
              setIsActiveForm={setIsActiveForm}
              isEditing={isEditing}
              modeFeature='workflow'
              {...propsCRUDFormBasicInfo}
              originData={{
                data: detailProcess?.update?.basicInfoDto || {},
                dataSub: detailProcess?.update?.basicInfoSubDto || {},
              }}
              isActiveForm={isActiveForm}
            />
          )}
        />
      ),
    },
    policyProgress: {
      id: 3,
      name: tPolicyProgress('policyProgress'),
      content: <CRUDFormPolicyProgress {...propsCRUDFormPolicyProgress} />,
      workflow: (
        <LayoutModeWorkflow
          dataProcess={dataProcess}
          childrenContent={({ setParamsChildren, setIsActiveForm, isEditing, detailProcess, isActiveForm }) => (
            <CRUDFormPolicyProgress
              setParamsChildren={setParamsChildren}
              setIsActiveForm={setIsActiveForm}
              isEditing={isEditing}
              modeFeature='workflow'
              {...propsCRUDFormPolicyProgress}
              originData={detailProcess?.update}
              isActiveForm={isActiveForm}
            />
          )}
        />
      ),
    },
    employeeSuccess: {
      id: 4,
      name: 'Employee Success軸',
      content: <CRUDFormEmployeeSuccess {...propsCRUDFormEmployeeSuccess} />,
      workflow: (
        <LayoutModeWorkflow
          dataProcess={dataProcess}
          childrenContent={({ setParamsChildren, setIsActiveForm, isEditing, detailProcess, isActiveForm }) => (
            <CRUDFormEmployeeSuccess
              setParamsChildren={setParamsChildren}
              setIsActiveForm={setIsActiveForm}
              isEditing={isEditing}
              modeFeature='workflow'
              {...propsCRUDFormEmployeeSuccess}
              originData={detailProcess?.update}
              isActiveForm={isActiveForm}
            />
          )}
        />
      ),
    },
    projectInfo: {
      id: 5,
      name: tProjectInfo('projectInfo'),
      content: <CreateFormProjectInfo {...propsCRUDFormProjectInfo} />,
      editContent: <EditFormProjectInfo {...propsCRUDFormProjectInfo} />,
      preference: <TablePreferenceProjectInfo {...propsPreferenceProjectInfo} />,
      workflow: (
        <LayoutModeWorkflow
          dataProcess={dataProcess}
          childrenContent={({ setParamsChildren, setIsActiveForm, isEditing, detailProcess, isActiveForm }) => (
            <EditFormProjectInfo
              setParamsChildren={setParamsChildren}
              setIsActiveForm={setIsActiveForm}
              isEditing={isEditing}
              modeFeature='workflow'
              {...propsCRUDFormProjectInfo}
              originData={detailProcess?.update}
              isActiveForm={isActiveForm}
            />
          )}
        />
      ),
    },
    interviewLog: {
      id: 6,
      name: tInterviewLog('interviewLog'),
      content: <CreateFormInterviewlog {...propsCRUDFormInterviewLog} />,
      editContent: <EditFormInterviewlog {...propsCRUDFormInterviewLog} />,
      preference: <TablePreferenceInterviewLog {...propsPreferenceInterviewLog} />,
      // workflow: <WorkflowInterviewLog {...propsWorkflowInterviewLog} />,
      workflow: (
        <LayoutModeWorkflow
          dataProcess={dataProcess}
          childrenContent={({ setParamsChildren, setIsActiveForm, isEditing, detailProcess, isActiveForm }) => (
            <EditFormInterviewlog
              setParamsChildren={setParamsChildren}
              setIsActiveForm={setIsActiveForm}
              isEditing={isEditing}
              modeFeature='workflow'
              {...propsCRUDFormInterviewLog}
              originData={detailProcess?.update}
              isActiveForm={isActiveForm}
            />
          )}
        />
      ),
    },
  };
  return (
    <>
      {type === 'edit' ? <>{chooseButton[type]}</> : chooseButton[modeForm]}
      {['projectInfo', 'interviewLog'].includes(modePage) && listTab[modePage].preference}
      <Drawer
        isOpen={isOpen}
        placement={type === 'edit' ? 'top' : 'right'}
        variant={type === 'edit' ? 'primary' : ''}
        onClose={onClose}
        id='basic_info'
        closeOnOverlayClick={false}
      >
        <DrawerOverlay />
        <DrawerContent position='relative'>
          {type === 'edit' ? (
            <DrawerCloseButton
              position='absolute'
              top='18px'
              right='15px'
              color={COLORS.black_primary}
              bg={COLORS.white}
              width='25px'
              height='25px'
              size='sm'
            />
          ) : (
            <DrawerCloseButton
              position='absolute'
              top='18px'
              left='-15px'
              color={COLORS.black_primary}
              bg={COLORS.white}
              borderRadius='50%'
              width='25px'
              height='25px'
              size='sm'
            />
          )}
          <DrawerHeader color={COLORS.white} bg={COLORS.brand_1}>
            {listTab[modePage].name}
          </DrawerHeader>
          {modeForm === 'workflow' ? (
            <DrawerBody>{type === 'edit' ? listTab[modePage].editContent : listTab[modePage].workflow}</DrawerBody>
          ) : (
            <DrawerBody>{type === 'edit' ? listTab[modePage].editContent : listTab[modePage].content}</DrawerBody>
          )}
        </DrawerContent>
      </Drawer>
    </>
  );
}
