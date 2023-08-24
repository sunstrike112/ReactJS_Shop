/* eslint-disable react/prop-types */
import { EditOutlined, PlusOutlined } from '@ant-design/icons'
import { yupResolver } from '@hookform/resolvers/yup'
import { Button, notification, Space } from 'antd'
import { FormInput, FormLabel, FormTextArea, FormUploadImage, Text, Title } from 'Components'
import { useCreateWorkSpace, useHistories } from 'Hooks'
import { isEmpty } from 'lodash'
import TableAdmin from 'Modules/template_management/components/TableAdmin'
import React, { useEffect, useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import RoutesName from 'Routes/constant'
import { Divider, Right, Row, Wrapper } from 'Themes/facit'
import { getFileFromS3 } from 'Utils'
import { SelectAdmin } from '../components'
import Schema from './schema'
import { ListAdminsStyled } from './styled'

const DEFAULT_VALUE = {
  workSpaceName: '',
  description: '',
  listAdmins: [],
  startDateWorkspace: ''
}

const CreateWorkspaceScreen = () => {
  const { t } = useTranslation(['workspace'])
  const { isCreating, createWorkspaceAction } = useCreateWorkSpace()
  const history = useHistories()

  const form = useForm({
    defaultValues: DEFAULT_VALUE,
    resolver: yupResolver(Schema(t))
  })

  const {
    handleSubmit,
    clearErrors,
    formState: { errors },
    setValue,
    reset
  } = form

  const [adminsAssigned, setAdminsAssigned] = useState({
    selectedRowKeys: [],
    selectedRows: []
  })
  const [visibleSelectAdmin, setVisibleSelectAdmin] = useState(false)

  useEffect(() => {
    if (adminsAssigned && adminsAssigned.selectedRows) {
      setValue('listAdmins', adminsAssigned.selectedRows)
    }
    if (adminsAssigned.selectedRows.length) {
      clearErrors('listAdmins')
    }
  }, [adminsAssigned])

  useEffect(() => clearErrors(), [t])

  const onSubmit = (formData) => {
    const { workSpaceName, description, imagePath, startDateWorkspace } = formData
    const data = {
      workSpaceName,
      description,
      imagePath: getFileFromS3(imagePath),
      listAdmins: adminsAssigned.selectedRows.map(({ id }) => id),
      startDateWorkspace
    }
    createWorkspaceAction({ data, callback: () => history.push(RoutesName.WORK_SPACE) })
  }

  const handleDeleteAdmin = (id) => {
    if (adminsAssigned.selectedRows.length > 1) {
      const selectedRows = [...adminsAssigned.selectedRows].filter((item) => item.id !== id)
      const selectedRowKeys = [...adminsAssigned.selectedRowKeys].filter((item) => item !== id)
      setAdminsAssigned({ selectedRowKeys, selectedRows })
    } else {
      notification.error({
        message: t('common:error'),
        description: t('message.workspace_at_least_one'),
        duration: 2
      })
    }
  }

  const handleResetData = () => {
    reset()
    setAdminsAssigned({
      selectedRowKeys: [],
      selectedRows: []
    })
  }

  return (
    <Wrapper>
      <Title icon={EditOutlined} title={t('create.title')} />
      <div
        className="form-wrapper"
      >
        <form>
          <FormProvider {...form}>
            <Row>
              <FormLabel
                title={t('workspace_name')}
                description="Required"
              />
              <Right>
                <FormInput name="workSpaceName" />
              </Right>
            </Row>
            <Divider />
            <Row>
              <FormLabel title={t('common:avatar')} description="Optional" />
              <Right>
                <FormUploadImage t={t} name="imagePath" />
                <p>
                  {t('common:require_image_size_and_type', {
                    imgSize: '10MB',
                    imgType: '(jpg, gif, png)'
                  })}
                  <br />
                  {t('common:require_image_resolution', {
                    imgWidth: '300px',
                    imgHeight: '200px'
                  })}
                </p>
              </Right>
            </Row>
            <Divider />
            <Row>
              <FormLabel
                title={t('common:description')}
              />
              <Right>
                <FormTextArea name="description" total={200} rows={4} />
              </Right>
            </Row>
            <Divider />
            <Row>
              <FormLabel
                title={t('created_date')}
                description="Required"
              />
              <Right>
                <FormInput
                  name="startDateWorkspace"
                  maxLength={100}
                />
              </Right>
            </Row>
            <Divider />
            <Row>
              <FormLabel
                title={t('list_admins')}
                description="Required"
              />
              <Right>
                {errors?.listAdmins && (
                  <Text.primary color="error_ant" fontSize="size_14">
                    {errors.listAdmins.message}
                  </Text.primary>
                )}
                <ListAdminsStyled>
                  <TableAdmin adminsAssigned={adminsAssigned} action={handleDeleteAdmin} t={t} />
                </ListAdminsStyled>
                <Space style={{ justifyContent: 'flex-end' }}>
                  <Button
                    type="primary"
                    icon={<PlusOutlined />}
                    size="large"
                    onClick={() => setVisibleSelectAdmin(true)}
                  >
                    <span>{t('common:add')}</span>
                  </Button>
                </Space>
              </Right>
            </Row>
            <Divider />
            <div className="form-action-group">
              <Space>
                <Button htmlType="button" onClick={handleResetData}>{t('common:clear')}</Button>
                <Button
                  type="primary"
                  htmlType="submit"
                  onClick={handleSubmit(onSubmit)}
                  size="large"
                  disabled={!isEmpty(errors)}
                  loading={isCreating}
                  icon={<EditOutlined />}
                >
                  {t('common:create.register')}
                </Button>
              </Space>
            </div>
            {visibleSelectAdmin && (
              <SelectAdmin
                t={t}
                visible={visibleSelectAdmin}
                setVisible={() => setVisibleSelectAdmin(false)}
                setAdminsAssigned={setAdminsAssigned}
                adminsAssigned={adminsAssigned}
              />
            )}
          </FormProvider>
        </form>
      </div>
    </Wrapper>
  )
}

export default CreateWorkspaceScreen
