/* eslint-disable no-unused-vars */
import { yupResolver } from '@hookform/resolvers/yup'
import { Button, Checkbox, Col, Row, Space, Spin, Empty } from 'antd'
import { uniq, findIndex } from 'lodash'
import React, { useEffect, useMemo, useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { useParams } from 'react-router-dom'
import { checkOverSizeAPI, deleteTalkBoardFileAPI } from '../../../apis'
import { BACK_ICON, COLLAPSE_GROUP_ICON, EXPAND_GROUP_ICON } from '../../../assets'
import { Modal } from '../../../components'
import {
  FormCheckboxTree, FormInput, FormRadio, FormTagInput, FormTextArea,
  FormUploadFile
} from '../../../components/form'
import { STATUS } from '../../../constants'
import { useHistories, useLoadingPortal, useTalkBoard } from '../../../hooks'
import { flatKeys, removeFromArray } from '../../../utils'
import HomeLayout from '../../layouts/home'
import editTalkboardSchema from './schema'
import { Container, Wrapper, WrapperParentGroup, WrapperChildrenGroup } from './styled'

const EditTalkBoardScreen = () => {
  const {
    listTag,
    listGroup,
    listAttribute,
    loadTagAction,
    loadGroupAction,
    loadAttributeAction,
    updateTalkBoardAction,
    loadTalkBoardUpdateAction,
    dataTalkBoardUpdate,
    isLoadingTalkBoard
  } = useTalkBoard()

  const { loadingPortalRequestAction, loadingPortalStopAction } = useLoadingPortal()

  const history = useHistories()
  const { talkBoardId } = useParams()
  const { t } = useTranslation()
  const [visibleErrorSize, setVisibleErrorSize] = useState(false)
  const [visibleCreateSuccess, setVisibleCreateSuccess] = useState(false)
  const [expandGroupState, setExpandGroupState] = useState([])

  useEffect(() => {
    loadTagAction()
    loadGroupAction()
    loadAttributeAction()
    loadTalkBoardUpdateAction({ talkBoardId })
  }, [])

  const form = useForm({
    resolver: yupResolver(editTalkboardSchema()),
    defaultValues: {
      title: '',
      description: '',
      lstAttributeId: [],
      lstDepartmentId: [],
      lstTag: [],
      files: []
    }
  })

  const { handleSubmit, setValue, watch, clearErrors, setError, formState: { errors } } = form

  const [isChooseAll, lstDepartmentId, lstAttributeId, isCheckGroupAndAttribute, lstTag] = watch(['isChooseAll', 'lstDepartmentId', 'lstAttributeId', 'isCheckGroupAndAttribute', 'lstTag'])

  const setInitData = () => {
    setValue('files', dataTalkBoardUpdate.lstFile.map((item) => ({
      ...item,
      id: item.id,
      name: item.fileName,
      size: +item.fileSize,
      type: item.fileType,
      uid: item.id,
      urlS3: item.link
    })))
    setValue('title', dataTalkBoardUpdate.title)
    setValue('description', dataTalkBoardUpdate.description)
    setValue('isChooseAll', !(dataTalkBoardUpdate.listAttributes.length === 0 && dataTalkBoardUpdate.lstDepartments.length === 0))
    setValue('lstTag', dataTalkBoardUpdate.lstTag.map((tag) => tag.tagName))
    setValue('lstAttributeId', flatKeys(dataTalkBoardUpdate.listAttributes, 'key'))
    setValue('lstDepartmentId', flatKeys(dataTalkBoardUpdate.lstDepartments, 'departmentId'))
  }

  useEffect(() => {
    if (dataTalkBoardUpdate.id) {
      setInitData()
    }
  }, [dataTalkBoardUpdate])

  const listGroupOption = useMemo(() => listGroup.map((item) => ({ ...item, disabled: !item.joined })), [listGroup])
  const listTagOption = useMemo(() => listTag.map((item) => ({ ...item, value: item.name, key: item.id })), [listTag])

  useEffect(() => {
    if ((lstDepartmentId.length === 0) && (lstAttributeId.length === 0) && isCheckGroupAndAttribute) {
      setError('lstAttributeId', { type: 'required', message: 'talk_board.error_message.group_or_attribute_required' })
    }
    if ((!!lstDepartmentId && lstDepartmentId.length > 0) || (!!lstAttributeId && lstAttributeId.length > 0)) {
      clearErrors('lstAttributeId')
    }
  }, [lstDepartmentId, lstAttributeId])

  const onError = (error) => {
    if (error) setValue('isCheckGroupAndAttribute', true)
  }

  const onSubmit = async (formData) => {
    loadingPortalRequestAction()
    const { title, description, files } = formData
    const data = {
      title,
      description,
      lstTag: (lstTag.map((tag) => tag.trim())).filter((item) => item.length !== 0),
      lstAttributeId: isChooseAll ? lstAttributeId : [],
      lstDepartmentId: isChooseAll ? lstDepartmentId : []
    }

    const filesInit = dataTalkBoardUpdate.lstFile

    const filesDelete = filesInit.filter((fileInit) => files.findIndex((file) => fileInit.id === file.id) === -1)
    const filesUpload = files.filter((file) => filesInit.findIndex((fileInit) => fileInit.id === file.id) === -1)

    if (filesDelete.length) {
      await deleteTalkBoardFileAPI({ data: { ids: filesDelete.map((file) => file.id) } })
    }

    const totalSize = filesUpload.reduce((total, file) => total + file.size, 0)
    const response = await checkOverSizeAPI({ totalSize })
    const isOverSize = response.data

    if (isOverSize) {
      setVisibleErrorSize(true)
    } else {
      updateTalkBoardAction({
        data,
        files: filesUpload,
        talkBoardId,
        createSuccess: () => loadingPortalStopAction(false),
        uploadSuccess: () => setVisibleCreateSuccess(true)
      })
    }
  }

  useEffect(() => {
    if (!isChooseAll) {
      clearErrors('lstAttributeId')
    }
  }, [isChooseAll])

  const allKeysAttribute = listAttribute.map((item) => item.key)
  const onCheckAttributeTree = (checkedKeysValue) => {
    setValue('lstAttributeId', checkedKeysValue)
  }
  const onChangeAttributeTree = () => {
    if (lstAttributeId.length === allKeysAttribute.length) {
      setValue('lstAttributeId', [])
      if ((lstDepartmentId.length === 0) && (lstAttributeId.length === 0) && isCheckGroupAndAttribute) {
        setError('lstAttributeId', { type: 'required', message: 'talk_board.error_message.group_or_attribute_required' })
      }
      if (listAttribute.length === 0) {
        clearErrors('lstAttributeId')
      }
    } else {
      setValue('lstAttributeId', allKeysAttribute)
      clearErrors('lstAttributeId')
    }
  }

  const handleCheckboxParent = (event) => {
    const { value, checked } = event.target
    const childrenKeys = value.children.map((element) => element.key)
    if (checked) {
      setValue('lstDepartmentId', uniq((lstDepartmentId.concat(value.key)).concat(childrenKeys)))
    } else {
      setValue('lstDepartmentId', removeFromArray(lstDepartmentId.filter((item) => item !== value.key), childrenKeys))
    }
  }

  const handleCheckboxChildren = (event) => {
    const { value, checked } = event.target
    if (checked) {
      setValue('lstDepartmentId', uniq(lstDepartmentId.concat(value.key)))
    } else {
      setValue('lstDepartmentId', lstDepartmentId.filter((item) => item !== value.key))
    }
  }

  useEffect(() => {
    setExpandGroupState(listGroupOption.filter((item) => item.children.length !== 0).map((group) => ({ key: group.key, isExpand: group.isExpand })))
  }, [listGroupOption])

  const handleExpandGroup = (key) => {
    const index = findIndex(expandGroupState, { key })
    setExpandGroupState(expandGroupState.map((state) => {
      if (state.key === key) { return { key: expandGroupState[index].key, isExpand: !expandGroupState[index].isExpand } }
      return state
    }))
  }

  return (
    <HomeLayout>
      <Container>
        <Wrapper>
          <button
            className="btn-back"
            onClick={() => history.push('/talk-board')}
          >
            <BACK_ICON />
          </button>
          <Spin spinning={isLoadingTalkBoard}>
            <div className="talk-board-form">
              <div className="title">{t('talk_board.edit_talk_board')}</div>
              <hr />
              <FormProvider {...form}>
                <FormInput
                  t={t}
                  name="title"
                  label={t('talk_board.talk_theme')}
                  isRequired
                  maxLength={100}
                  wrapperProps={{
                    colon: false,
                    labelCol: { span: 8 },
                    wrapperCol: { span: 16 },
                    labelAlign: 'left'
                  }}
                />
                <FormTextArea
                  t={t}
                  name="description"
                  label={t('talk_board.theme_overview')}
                  isRequired
                  maxLength={2000}
                  total={2000}
                  rows={5}
                  wrapperProps={{
                    colon: false,
                    labelCol: { span: 8 },
                    wrapperCol: { span: 16 },
                    labelAlign: 'left'
                  }}
                />

                <Row className="group-tag">
                  <Col span={8}>{t('talk_board.tag')}</Col>
                  <Col span={16}>
                    <FormTagInput
                      name="lstTag"
                      maxLength={50}
                      listOption={listTagOption}
                    />
                  </Col>
                </Row>

                <Row className="uploadfile-tree">
                  <Col span={8}>{t('talk_board.attachment')}</Col>
                  <Col span={16}>
                    <FormUploadFile name="files" />
                  </Col>
                </Row>

                <Row className="group-tree">
                  <Col span={8}>{t('talk_board.sharing_range')}
                    <span style={{ color: 'red' }}>
                      &nbsp;*
                    </span>
                  </Col>
                  <Col span={16}>
                    <FormRadio
                      t={t}
                      name="isChooseAll"
                      options={STATUS}
                    />
                  </Col>
                  {isChooseAll
                && (
                <>
                  <Col span={8}>{t('talk_board.group')}</Col>
                  <Col span={16} className="checkbox-group-tree">
                    {listGroupOption.map((group) => (
                      <>
                        <WrapperParentGroup>
                          {group.children.length !== 0
                            && (
                            <button onClick={() => handleExpandGroup(group.key)}>
                              {expandGroupState[findIndex(expandGroupState, { key: group.key })]?.isExpand
                                ? <COLLAPSE_GROUP_ICON /> : <EXPAND_GROUP_ICON />}
                            </button>
                            )}
                          <Checkbox
                            disabled={!group.joined}
                            value={{
                              key: group.key,
                              isParent: group.children.length !== 0,
                              children: group.children
                            }}
                            checked={lstDepartmentId.includes(group.key)}
                            onChange={handleCheckboxParent}
                          >
                            {group.title}
                          </Checkbox>
                        </WrapperParentGroup>

                        <WrapperChildrenGroup>
                          {expandGroupState.map((state) => state.key).includes(group.key)
                            && expandGroupState[findIndex(expandGroupState, { key: group.key })]?.isExpand
                            && group.children.map((childrenGroup) => (
                              <Checkbox
                                className="checkbox-child-group"
                                onChange={handleCheckboxChildren}
                                checked={lstDepartmentId.includes(childrenGroup.key)}
                                value={{
                                  key: childrenGroup.key,
                                  isParent: false
                                }}
                              >
                                {childrenGroup.title}
                              </Checkbox>
                            ))}
                        </WrapperChildrenGroup>
                      </>
                    ))}
                  </Col>
                </>
                )}
                </Row>

                <Row className="attribute-tree">
                  {isChooseAll
                  && (
                  <>
                    <Col span={8}>{t('talk_board.attribute')}</Col>
                    <Col span={16}>
                      <FormCheckboxTree
                        t={t}
                        name="lstAttributeId"
                        listOption={listAttribute}
                        onChange={onCheckAttributeTree}
                        listId={lstAttributeId}
                        onChangeTree={onChangeAttributeTree}
                        allKeysGroup={allKeysAttribute}
                        isHiddenSelectAll={listAttribute.length > 0}
                      />
                    </Col>
                  </>
                  )}
                </Row>
                <div className="form-action-group">
                  <Space>
                    <Button
                      type="primary"
                      htmlType="submit"
                      className="btn-post"
                      onClick={handleSubmit(onSubmit, onError)}
                      disabled={Object.keys(errors).length}
                    >
                      {t('talk_board.post')}
                    </Button>
                    <Button
                      htmlType="button"
                      className="btn-cancel"
                      onClick={() => history.push('/talk-board')}
                    >
                      {t('talk_board.cancel')}
                    </Button>
                  </Space>
                </div>
              </FormProvider>
            </div>
          </Spin>
        </Wrapper>
        <Modal
          isModalVisible={visibleErrorSize}
          setIsModalVisible={setVisibleErrorSize}
          isCancel={false}
          description={t('talk_board.upload_exceed_limit')}
          okText={t('common.yes')}
          borderRadiusButton={6}
        />
        <Modal
          isModalVisible={visibleCreateSuccess}
          setIsModalVisible={setVisibleCreateSuccess}
          isCancel={false}
          description={t('talk_board.edit_talkboard_confirm')}
          okText={t('common.yes')}
          onOk={() => history.push('/talk-board')}
          borderRadiusButton={6}
        />
      </Container>
    </HomeLayout>
  )
}

export default EditTalkBoardScreen
