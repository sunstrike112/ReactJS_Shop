/* eslint-disable no-unused-vars */
import { EyeOutlined } from '@ant-design/icons'
import { Title } from 'Components'
import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { DEFAULT_PAG } from 'Utils'
import { Wrapper, Block, Table, TBody, Td, Th, Tr } from 'Themes/facit'
import { useLocation } from 'react-router-dom'
import { useGetQuery, useUnitLearnCourseStatus } from 'Hooks'
import tableColumns from './column'
import { RoutesName } from '../../routes'

import TableData from '../../component/TableSort'
import QuestionsModal from './QuestionsModal'

const DEFAULT_LIMIT = 20

const ViewHistory = () => {
  const { t } = useTranslation(['courseResult', 'reportTemplateManagement'])
  const { queryWorkspaceID } = useGetQuery()
  const {
    unitDetail,
    pagination,
    loadUnitDetailAction,
    isLoading
  } = useUnitLearnCourseStatus()
  const location = useLocation()
  const paramsRecord = new URLSearchParams(location.search)
  const userId = paramsRecord.get('userId')
  const unitId = paramsRecord.get('unitId')
  const courseId = paramsRecord.get('courseId')
  const completeStartTime = paramsRecord.get('completeStartTime')
  const completeEndTime = paramsRecord.get('completeEndTime')
  const endTime = paramsRecord.get('endTime')
  const startTime = paramsRecord.get('startTime')
  const [visibleQuestionsModal, setVisibleQuestionsModal] = useState(false)
  const [recordId, setRecordId] = useState('')

  const { total, limit: pageSize, page: currentPage } = pagination

  const onSelectQuestions = useCallback((record) => {
    setRecordId(record.id)
    setVisibleQuestionsModal(true)
  }, [])

  const columns = useMemo(() => tableColumns({ t, pagination, onSelectQuestions, unitType: unitDetail.unitType, signinId: unitDetail.signinId }),
    [t, pagination, onSelectQuestions, unitDetail.unitType])

  // eslint-disable-next-line no-shadow
  const onChangePag = ({ current, pageSize }) => {
    let params = {
      unitId, userId, courseId, page: current, limit: pageSize, completeStartTime, completeEndTime, startTime, endTime
    }
    loadUnitDetailAction({ params })
  }

  useEffect(() => {
    loadUnitDetailAction({ params: { unitId, userId, courseId, page: DEFAULT_PAG.page, limit: DEFAULT_LIMIT, completeStartTime, completeEndTime, startTime, endTime } })
  }, [])

  const histViewUnit = useMemo(() => {
    if (unitDetail.historyViewUnits && unitDetail.historyViewUnits.total > 0) {
      return unitDetail.historyViewUnits.result
    } return []
  }, [unitDetail])

  return (
    <Wrapper>
      <Title
        icon={EyeOutlined}
        title={t('viewingHistory')}
        backRoute={`${RoutesName.UNIT_LEARN_COURSE}${queryWorkspaceID.ONLY}`}
        backRouteText={t('back_to_unit_learn_course')}
      />
      <Block>
        <Table>
          <TBody>
            <Tr>
              <Th>{t('course')}</Th>
              <Td>{unitDetail.courseName}</Td>
            </Tr>
            <Tr>
              <Th>{t('unit')}</Th>
              <Td>{unitDetail.unitName}</Td>
            </Tr>
            <Tr>
              <Th>{t('unit_setting:unitTypeName')}</Th>
              <Td>{t(`common:${unitDetail.unitType?.toLowerCase()}`)}</Td>
            </Tr>
            {unitDetail.isDraft === 1 && (
            <Tr>
              <Th>{t('common:status')}</Th>
              <Td>{t('reportTemplateManagement:is_draft')}</Td>
            </Tr>
            )}
          </TBody>
        </Table>
      </Block>
      <TableData
        rowKey={(record) => record.courseId}
        locale={{ emptyText: t('common:empty_data') }}
        dataSource={histViewUnit}
        columns={columns}
        total={total}
        pageSize={pageSize}
        currentPage={currentPage}
        onChange={onChangePag}
        loading={isLoading}
      />
      {visibleQuestionsModal && <QuestionsModal recordId={recordId} typeSelected={unitDetail.unitType} onClose={setVisibleQuestionsModal} />}
    </Wrapper>
  )
}

export default ViewHistory
