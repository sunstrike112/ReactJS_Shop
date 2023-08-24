/* eslint-disable import/no-unresolved */
/* eslint-disable import/extensions */
/* eslint-disable react/prop-types */
import { EditOutlined } from '@ant-design/icons'
import { yupResolver } from '@hookform/resolvers/yup'
import { Button, Checkbox, Space } from 'antd'
import { checkOverSizeAPI, deleteTalkBoardFileAPI } from 'APIs'
import
{
  FormCheckboxTree, FormInput,
  FormLabel,
  FormRadio, FormTagInput, FormTextArea, FormUploadFileTalkBoard, ModalNonForm,
  Text, Title
} from 'Components'
import
{
  SHARING_RANGE_TALKBOARD
} from 'Constants/course'
import { useCommunityManagement } from 'Hooks'
import { findIndex, isEmpty, uniq } from 'lodash'
import React, { useEffect, useMemo, useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { useParams } from 'react-router-dom'
import { Divider, Right, Row, Wrapper } from 'Themes/facit'
import { COLLAPSE_GROUP_ICON, EXPAND_GROUP_ICON } from '../../../Assets'
import { removeFromArray } from '../../../Utils'
import Schema from './schema'
import { WrapperChildrenGroup, WrapperParentGroup } from './styled'

export const STATUS_OPTIONS = [
  { value: 1, label: 'common:enable' },
  { value: 0, label: 'common:disabled' }
]

const DEFAULT_VALUE = {
  title: '',
  description: '',
  lstAttributeId: [],
  lstDepartmentId: [],
  lstTag: [],
  isAll: false,
  enabled: 1,
  files: []
}

const EditTalkBoardScreen = () => {
  const { t } = useTranslation(['communityManagement'])
  const { talkBoardId } = useParams()

  const {
    getAttributeAction,
    getTalkBoardDetailAction,
    getGroupAction,
    getTagAction,
    listTag,
    listGroup,
    listAttribute,
    isSubmitting,
    talkBoardDetail,
    updateTalkBoardAction
  } = useCommunityManagement()

  const form = useForm({
    resolver: yupResolver(Schema(t)),
    defaultValues: DEFAULT_VALUE
  })

  const [visibleErrorSize, setVisibleErrorSize] = useState(false)
  const [expandGroupState, setExpandGroupState] = useState([])

  const { dataTalkboard } = talkBoardDetail

  const {
    handleSubmit,
    clearErrors,
    formState: { errors },
    watch,
    setValue,
    setError
  } = form

  const [isAll, lstDepartmentId, lstAttributeId, lstTag, isCheckGroupAndAttribute] = watch(['isAll', 'lstDepartmentId', 'lstAttributeId', 'lstTag', 'isCheckGroupAndAttribute'])

  useEffect(() => {
    getTalkBoardDetailAction({ talkBoardId })
    getAttributeAction()
    getGroupAction()
    getTagAction()
  }, [])

  const setInitData = () => {
    setValue('files', dataTalkboard.lstTalkBoardFile.map((item) => ({
      ...item,
      id: item.id,
      name: item.fileName,
      size: +item.fileSize,
      type: item.fileType,
      uid: item.id,
      urlS3: item.link
    })))
    setValue('title', dataTalkboard.title)
    setValue('enabled', dataTalkboard.enabled)
    setValue('description', dataTalkboard.description)
    setValue('isAll', (dataTalkboard.lstAttribute.length === 0 && dataTalkboard.lstDepartment.length === 0))
    setValue('lstTag', dataTalkboard.lstTag.map((tag) => tag.name))
    setValue('lstDepartmentId', dataTalkboard.lstDepartment.map((item) => item.id))
    setValue('lstAttributeId', dataTalkboard.lstAttribute.map((item) => item.id))
  }

  useEffect(() => {
    if (dataTalkboard?.id) {
      setInitData()
    }
  }, [dataTalkboard])

  const listGroupOption = useMemo(() => listGroup.data.map((item) => ({ ...item, disabled: !item.joined, isExpand: false })), [listGroup])
  const listTagOption = useMemo(() => listTag.data.map((item) => ({ ...item, value: item.name, key: item.id })), [listTag])

  const onSubmit = async (formData) => {
    const { title, description, enabled, files } = formData
    const data = {
      title,
      description,
      lstTag,
      enabled,
      lstAttributeId: isAll ? [] : lstAttributeId,
      lstDepartmentId: isAll ? [] : lstDepartmentId
    }

    const filesInit = dataTalkboard.lstTalkBoardFile

    const filesDelete = filesInit.filter((fileInit) => files.findIndex((file) => fileInit.id === file.id) === -1)
    const filesUpload = files.filter((file) => filesInit.findIndex((fileInit) => fileInit.id === file.id) === -1)

    if (filesDelete.length) {
      await deleteTalkBoardFileAPI({ data: filesDelete.map((file) => file.id) })
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
        talkBoardId
      })
    }
  }

  useEffect(() => {
    if ((lstDepartmentId.length === 0) && (lstAttributeId.length === 0) && isCheckGroupAndAttribute) {
      setError('lstAttributeId', { type: 'required', message: t('group_or_attribute_required') })
    }
    if ((!!lstDepartmentId && lstDepartmentId.length > 0) || (!!lstAttributeId && lstAttributeId.length > 0)) clearErrors('lstAttributeId')
  }, [lstDepartmentId, lstAttributeId])

  useEffect(() => {
    if (isAll) {
      clearErrors('lstAttributeId')
    }
  }, [isAll])

  const onError = (error) => {
    if (error) setValue('isCheckGroupAndAttribute', true)
  }

  useEffect(() => {
    if (isAll) {
      clearErrors(['lstAttributeId', 'lstDepartmentId'])
    }
  }, [isAll])

  const allKeysAttribute = listAttribute.data.map((item) => item.key)
  const onCheckAttributeTree = (checkedKeysValue) => {
    setValue('lstAttributeId', checkedKeysValue)
  }
  const onChangeAttributeTree = () => {
    if (lstAttributeId.length === allKeysAttribute.length) {
      setValue('lstAttributeId', [])
      if ((lstDepartmentId.length === 0) && (lstAttributeId.length === 0) && isCheckGroupAndAttribute) {
        setError('lstAttributeId', { type: 'required', message: 'talk_board.error_message.group_or_attribute_required' })
      }
      if (listAttribute.data.length === 0) {
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
    <Wrapper>
      <Title icon={EditOutlined} title={t('edit_talk_board')} />
      <div className="form-wrapper">
        <form>
          <FormProvider {...form}>
            <Row>
              <FormLabel
                title={t('title')}
                description="Required"
              />
              <Right>
                <FormInput
                  t={t}
                  name="title"
                  maxLength={100}
                />
              </Right>
            </Row>
            <Divider />
            <Row>
              <FormLabel
                title={t('description')}
                description="Required"
              />
              <Right>
                <FormTextArea
                  t={t}
                  name="description"
                  total={2000}
                  rows={4}
                />
              </Right>
            </Row>
            <Divider />
            <Row>
              <FormLabel
                title={t('tag')}
                description="Optional"
              />
              <Right>
                <FormTagInput
                  name="lstTag"
                  maxLength={50}
                  listOption={listTagOption}
                />
              </Right>
            </Row>
            <Divider />
            <Row>
              <FormLabel
                title={t('attachment')}
                description="Optional"
              />
              <Right>
                <FormUploadFileTalkBoard
                  name="files"
                />
              </Right>
            </Row>
            <Divider />
            <Row>
              <FormLabel
                title={t('sharing_range')}
                description="Required"
              />
              <Right>
                <FormRadio
                  t={t}
                  name="isAll"
                  options={SHARING_RANGE_TALKBOARD}
                />
              </Right>
            </Row>
            {!isAll
            && (
            <>
              <Divider />
              <Row>
                <FormLabel
                  title={t('group')}
                />
                <Right>
                  {listGroupOption.map((group) => (
                    <>
                      <WrapperParentGroup>
                        {group.children.length !== 0
                            && (
                            <Button onClick={() => handleExpandGroup(group.key)}>
                              {expandGroupState[findIndex(expandGroupState, { key: group.key })]?.isExpand
                                ? <COLLAPSE_GROUP_ICON /> : <EXPAND_GROUP_ICON />}
                            </Button>
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
                </Right>
              </Row>
              <Divider />
              <Row>
                <FormLabel
                  title={t('attribute')}
                />
                <Right>
                  <FormCheckboxTree
                    t={t}
                    name="lstAttributeId"
                    listOption={listAttribute.data}
                    onChange={onCheckAttributeTree}
                    listId={lstAttributeId}
                    onChangeTree={onChangeAttributeTree}
                    allKeysGroup={allKeysAttribute}
                    isHiddenSelectAll={listAttribute.data.length > 0}
                  />
                </Right>
              </Row>
            </>
            )}
            <Divider />
            <Row>
              <FormLabel
                title={t('common:status')}
                description="Required"
              />
              <Right>
                <FormRadio
                  t={t}
                  name="enabled"
                  options={STATUS_OPTIONS}
                />
              </Right>
            </Row>
            <Divider />
            <div className="form-action-group">
              <Space>
                <Button
                  type="primary"
                  htmlType="submit"
                  onClick={handleSubmit(onSubmit, onError)}
                  size="large"
                  disabled={!isEmpty(errors)}
                  loading={isSubmitting}
                  icon={<EditOutlined />}
                >
                  {t('common:change')}
                </Button>
              </Space>
            </div>
          </FormProvider>
        </form>
      </div>
      {/* Modal warning exceeded limit */}
      <ModalNonForm
        size="small"
        visible={visibleErrorSize}
        cancel={false}
        onSubmit={() => setVisibleErrorSize(false)}
        onCancel={() => setVisibleErrorSize(false)}
        onSubmitText={t('common:agree')}
      >
        <Text.primary
          fontSize="size_16"
          style={{ textAlign: 'center' }}
        >
          {t('upload_file:talk_board.upload_exceed_limit')}
        </Text.primary>
      </ModalNonForm>
    </Wrapper>
  )
}

export default EditTalkBoardScreen
