/* eslint-disable no-useless-escape */
import React, { useState, useMemo, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { Button, Space, Popconfirm, notification, Spin } from 'antd'
import { omit } from 'lodash'
import { DownloadOutlined, CloudUploadOutlined, QuestionCircleOutlined } from '@ant-design/icons'
import { formatCSVToUTF8WsVirtualAPI } from 'APIs'
import { Title, Table } from 'Components'
import { DOWNLOAD_CSV } from 'Constants'
import { downloadOctetFile, mappingFileNameWithRole } from 'Utils'
import { useRegisterWorkspaceVirtualByCsv, useRoles } from 'Hooks'
import END_POINT from 'APIs/constants'
import { userClassificationOptions, USER_ROLE_CSV } from '../../constant'

import { Wrapper } from './styled'
import FormUploadDD from './FormUpload'
import GuiderModal from './GuiderModal'
import tableColumns from './columns'
import userSchema from './schema'

export const STATUS_CSV = {
  PENDING: 'PENDING',
  FAILED: 'FAILED',
  REGISTERED: 'REGISTERED',
  UPDATED: 'UPDATED'
}

const paginationInitial = {
  limit: 2,
  page: 1,
  total: 0
}
const BatchRegisterWorkspaceVirtualScreen = () => {
  const { t, i18n: { language } } = useTranslation(['user'])
  const [isLoading, setIsLoading] = useState(false)
  const [visible, setVisible] = useState(false)

  const [dataSource, setDataSource] = useState([])
  const [pagination, setPagination] = useState(paginationInitial)
  const { registeredUsers, registerByCsvWorkspaceAction, resetDataCsv } = useRegisterWorkspaceVirtualByCsv()
  const {
    isWorkspaceAdmin,
    isWorkspaceVirtual } = useRoles()

  const { userList, isSubmitting } = registeredUsers

  const transFormData = async (data, index) => {
    const userRole = data.userRole ? data.userRole : ''
    const findUserRole = USER_ROLE_CSV.find((item) => item.label === userRole.trim())
    const dataTransForm = {
      email: data.email || '',
      fullName: data.fullName || '',
      fullNameKatakana: data.fullNameKatakana || '',
      classification: data.classification || '',
      userRole: findUserRole ? findUserRole.value : data.userRole,
      isExist: data.isExist,
      signinId: data.signinId,
      password: '',
      employeeNumber: data.employeeNumber
    }

    let errors = null

    try {
      const schema = await userSchema({ isExist: dataTransForm.isExist, t })
      await schema.validateSync({
        email: dataTransForm.email.trim().toLowerCase(),
        fullName: dataTransForm.fullName.trim(),
        fullNameKatakana: dataTransForm.fullNameKatakana.trim(),
        classification: dataTransForm.classification.trim(),
        userRole: dataTransForm.userRole,
        signinId: dataTransForm.signinId.trim(),
        password: '',
        employeeNumber: dataTransForm.employeeNumber
      })
      errors = null
    } catch (error) {
      errors = JSON.parse(JSON.stringify(error))
    }

    const dataUpdate = {
      ...dataTransForm,
      email: dataTransForm.email.trim().toLowerCase(),
      fullName: dataTransForm.fullName.trim(),
      fullNameKatakana: dataTransForm.fullNameKatakana.trim(),
      classification: dataTransForm.classification.trim(),
      recordId: index + 1,
      userRole: dataTransForm.userRole,
      signinId: dataTransForm.signinId.trim(),
      password: '',
      employeeNumber: dataTransForm.employeeNumber,
      status: !errors ? STATUS_CSV.PENDING : STATUS_CSV.FAILED,
      error: errors ? {
        message: errors.message,
        error_code: 'VALIDATION'
      } : null
    }

    return JSON.parse(JSON.stringify(dataUpdate))
  }

  useEffect(() => {
    if (userList && userList.length > 0) {
      const dataUpdate = dataSource.map((item) => {
        const foundRecord = userList.find((f) => f.recordId === item.recordId)
        return {
          email: item.email,
          fullName: item.fullName,
          fullNameKatakana: item.fullNameKatakana,
          status: foundRecord ? foundRecord.status : item.status,
          recordId: item.recordId,
          classification: item.classification,
          signinId: item.signinId,
          password: '',
          employeeNumber: item.employeeNumber,
          error: foundRecord ? (foundRecord.status === STATUS_CSV.FAILED ? {
            error_code: foundRecord.error,
            message: foundRecord.message
          } : null) : item.error,
          userRole: item.userRole
        }
      })
      setDataSource(dataUpdate)
    }
  }, [userList])

  const handleUpload = (file) => {
    setIsLoading(true)
    const arrName = file.name.split('.')
    const nameType = arrName[arrName.length - 1].toLowerCase() || ''

    const isCSV = file.type === 'text/csv' || file.type === 'application/vnd.ms-excel'

    if (isCSV && nameType === 'csv') {
      const reader = new FileReader()
      reader.onload = () => {
        formatCSVToUTF8WsVirtualAPI(file)
          .then((res) => {
            resetDataCsv()
            return res
          })
          .then(async (data) => {
            if (data && data.length > 0) {
              const listPromise = []
              data.forEach((item, index) => listPromise.push(transFormData(item, index)))
              const dataUpdate = await Promise.all(listPromise)
              setDataSource(dataUpdate)
              setPagination({
                ...pagination,
                page: 1,
                total: dataUpdate.length
              })
              await setIsLoading(false)
            } else {
              setDataSource([])
              await setIsLoading(false)
            }
          })
      }
      reader.readAsArrayBuffer(file)
    } else {
      setDataSource([])
      setIsLoading(false)
      notification.error({
        message: t('common:error'),
        description: t('error_message:validate_csv_type', { file: file.name }),
        duration: 2
      })
    }

    return !(isCSV && nameType === 'csv')
  }

  const columns = useMemo(
    () => tableColumns({ t, pagination }).filter((item) => !!item),
    [t]
  )

  const disabledRegister = useMemo(
    () => {
      if (dataSource.length <= 0 || !dataSource) {
        return true
      }
      const foundErrors = dataSource.filter((f) => !!f.error)
      return foundErrors.length > 0
    }, [dataSource]
  )

  const onRemoveTable = () => {
    setDataSource([])
    setPagination(paginationInitial)
    resetDataCsv()
  }

  const onRegisterUser = () => {
    const dataTransform = dataSource.map((item) => {
      const classification = userClassificationOptions.find((f) => f.label.trim() === item.classification.trim())
      const itemUpdate = {
        ...item,
        classification: classification ? classification.value : ''
      }
      return omit(itemUpdate, ['error', 'status'])
    })
    registerByCsvWorkspaceAction({ dataTransform })
  }
  const onCloseGuiderModal = () => setVisible(false)
  return (
    <Spin spinning={isSubmitting} size="large">
      <Wrapper>
        <Title
          icon={CloudUploadOutlined}
          title={t('menu:batch_workspace_register')}
        />
        <div className="introduce">
          <h3>{t('batch_register_user.intro_register')}</h3>
          <ol>
            <li>{t('batch_register_user.intro_register_text_1')}</li>
            <li>{t('batch_register_user.intro_register_text_2')}</li>
            <li>{t('batch_register_user.intro_register_text_3')}</li>
          </ol>
          <div>
            <Space>
              <Button
                type="primary"
                icon={<DownloadOutlined />}
                onClick={() => downloadOctetFile({
                  fileName: mappingFileNameWithRole(isWorkspaceAdmin, isWorkspaceVirtual, language),
                  downloadPath: END_POINT.USER.DOWNLOAD_CSV_TEMPLATE,
                  baseUrl: DOWNLOAD_CSV
                })}
              >
                {t('common:download_csv')}
              </Button>
              <Button
                icon={<QuestionCircleOutlined />}
                onClick={() => {
                  setVisible(true)
                }}
              >{t('batch_register_user.import_csv_intro')}
              </Button>
            </Space>
          </div>
        </div>
        <FormUploadDD
          accept="text/csv, application/vnd.ms-excel"
          onImport={handleUpload}
          onRemove={onRemoveTable}
          multiple={false}
          maxCount={1}
        />
        {dataSource && dataSource.length > 0 && (
          <>
            <Table
              locale={{
                emptyText: t('common:empty_data')
              }}
              rowKey={(record) => record.recordId}
              dataSource={dataSource}
              columns={columns}
              total={pagination.total}
              currentPage={pagination.page}
              loading={isLoading}
              isHideDelete
              pagination={false}
            />
            <div
              className="form-action-group"
              style={{
                width: '100%',
                display: 'flex',
                justifyContent: 'center',
                marginBottom: 36
              }}
            >
              <Popconfirm
                title={t('register_user.warning_submit_message')}
                onConfirm={onRegisterUser}
                disabled={disabledRegister || isSubmitting}
              >
                <Button
                  type="primary"
                  htmlType="submit"
                  loading={isSubmitting}
                  disabled={disabledRegister || isSubmitting}
                >
                  {t('common:register')}
                </Button>
              </Popconfirm>
            </div>
          </>
        )}
      </Wrapper>
      <GuiderModal
        visible={visible}
        onClose={onCloseGuiderModal}
      />
    </Spin>
  )
}

export default BatchRegisterWorkspaceVirtualScreen
