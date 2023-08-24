/* eslint-disable react/prop-types */
import { UnorderedListOutlined } from '@ant-design/icons'
import { Button, Spin } from 'antd'
import { FormCheckbox, FormLabel, Table } from 'Components'
import { useRoles, useSettingAccessCourse } from 'Hooks'
import React, { useCallback, useMemo, useState } from 'react'
import { Divider, Right, Row } from 'Themes/facit'
import { COMPANY_TYPES } from 'Utils'
import { USER_WORKSPACE_ROLE } from 'Constants/auth'
import tableColumns from './column'
import { SelectCompany } from './components'

const AccessCourse = ({ t, setValue, accessCourse, listCompany, setListCompany, isWorkSpace }) => {
  const { isAdmin, isSuperAdmin } = useRoles()
  const {
    loadCompanyTypesAction,
    isLoading, companyTypes,
    pagination,
    filter,
    listCompanySelected,
    paginationCompanySelected,
    isLoadingCompanySelected,
    loadCompanySelectedAction
  } = useSettingAccessCourse()

  const { page: currentPage, limit: pageSize, total } = paginationCompanySelected

  const [visibleCompanyModal, setVisibleCompanyModal] = useState(false)

  const columns = useMemo(() => tableColumns({ t, paginationCompanySelected }), [t, paginationCompanySelected])

  const handleSelectCompanyType = useCallback((companyType) => {
    setValue('accessCourse', companyType)
    setListCompany({
      selectedRowKeys: [],
      selectedRows: []
    })
    if (companyType.length) {
      loadCompanyTypesAction({
        params: {
          page: 1,
          limit: 100,
          filter: {
            accessCourse: companyType.length === COMPANY_TYPES.length ? 'ALL' : companyType[0]
          }
        }
      })
    }
  }, [])

  const handleOnChangeTableCompanySelected = useCallback((tablePag) => {
    loadCompanySelectedAction({
      params: {
        page: tablePag.current,
        limit: tablePag.pageSize
      },
      data: {
        ids: listCompany.selectedRowKeys
      }
    })
  }, [listCompany])

  const handleSelectCompany = (selected) => {
    setListCompany(selected)
  }

  return (isAdmin || isSuperAdmin) && (
    <>
      {(isWorkSpace === USER_WORKSPACE_ROLE.COMPANY_ADMIN)
        && (
        <>
          <Row>
            <FormLabel title={t('company:company_type')} description="Required" />
            <Right className="row__box">
              <FormCheckbox
                t={t}
                name="accessCourse"
                options={COMPANY_TYPES}
                onChange={handleSelectCompanyType}
              />
              <Spin spinning={isLoading}>
                <Button
                  onClick={() => setVisibleCompanyModal(true)}
                  disabled={isLoading || !accessCourse.length}
                  icon={<UnorderedListOutlined />}
                >
                  {t('company:select_company')}
                </Button>
              </Spin>
            </Right>
          </Row>
          <Row>
            {(accessCourse.length === COMPANY_TYPES.length && !listCompany.selectedRowKeys.length) && (
            <>
              <FormLabel />
              <Right><p>{t('company:access_company')}: <span style={{ fontWeight: 600 }}>{t('common:all')}</span></p></Right>
            </>
            )}
          </Row>
        </>
        )}
      {listCompany.selectedRowKeys.length ? (
        <Table
          rowKey={(record) => record.companyId}
          locale={{ emptyText: t('common:empty_data') }}
          dataSource={listCompanySelected}
          pagination={listCompany.selectedRowKeys.length > 20}
          columns={columns}
          total={total}
          pageSize={pageSize}
          currentPage={currentPage}
          onChange={handleOnChangeTableCompanySelected}
          loading={isLoadingCompanySelected}
          width="100%"
          isHideDelete
        />
      ) : null}
      {visibleCompanyModal && (
        <SelectCompany
          t={t}
          visibleCompanyModal={visibleCompanyModal}
          setVisibleCompanyModal={setVisibleCompanyModal}
          loadCompanyTypesAction={loadCompanyTypesAction}
          filter={filter}
          pagination={pagination}
          companyTypes={companyTypes}
          isLoading={isLoading}
          handleSelectCompany={handleSelectCompany}
          loadCompanySelectedAction={loadCompanySelectedAction}
          isLoadingCompanySelected={isLoadingCompanySelected}
          listCompany={listCompany}
        />
      )}
      <Divider />
    </>
  )
}

export default AccessCourse
