/* eslint-disable react/prop-types */
import React, { useState, useCallback, useMemo } from 'react'
import { isEmpty } from 'lodash'
import { useTranslation } from 'react-i18next'

import { Modal, Table } from 'Components'
import { swap } from 'Utils'
import tableColumns from './column'
import ConfirmDeleteQuestionModal from '../ConfirmDeleteQuestionModal'

const UnitSurveyQuestions = ({
  onClose,
  visible,
  errors,
  dataSource = [],
  onCreateQuestion,
  onEditQuestion,
  deleteUnitSurveyQuestions,
  updateOrderUnitSurveyQuestion,
  surveyId,
  isViewing
}) => {
  const { t } = useTranslation(['unit_setting'])
  const [rowSelected, setRowSelected] = useState({
    selectedRowKeys: [],
    selectedRows: []
  })
  const [visibleConfirmDelete, setVisibleConfirmDelete] = useState(false)

  const handleOrder = useCallback((index1, index2) => {
    const surveyQuestions = swap(dataSource, index1, index2)
    const data = surveyQuestions.map(({ questionId }, offsetId) => ({ offsetId, questionId }))
    updateOrderUnitSurveyQuestion({
      surveyId,
      surveyQuestions,
      data
    })
  }, [dataSource])

  const columns = useMemo(
    () => tableColumns({ t, action: { onEditQuestion, handleOrder }, dataSource, isViewing }),
    [t, dataSource, isViewing]
  )

  const onSelectChange = (selectedRowKeys, selectedRows) => setRowSelected({ selectedRowKeys, selectedRows })

  const handleConfirmDelete = () => {
    const surveyQuestionsTemp = dataSource
      .filter(({ questionId }) => !rowSelected.selectedRowKeys.includes(questionId))
    deleteUnitSurveyQuestions({
      surveyId,
      data: {
        ids: rowSelected.selectedRowKeys
      },
      surveyQuestionsTemp
    })
    setVisibleConfirmDelete(false)
    setRowSelected({ selectedRowKeys: [], selectedRows: [] })
  }

  return (
    <Modal
      visible={visible}
      onClose={() => onClose(false)}
      title={t('unit_survey_question.management.title')}
      disabledSubmit={!isEmpty(errors)}
      onSubmitText={t('unit_survey_question.management.confirm_question')}
      isNotFooterButton
    >
      <Table
        locale={{ emptyText: t('common:empty_data') }}
        pagination={false}
        dataSource={dataSource}
        columns={columns}
        rowSelection={{
          selectedRowKeys: rowSelected.selectedRowKeys,
          onChange: onSelectChange,
          preserveSelectedRowKeys: true,
          getCheckboxProps: () => ({
            disabled: isViewing
          })
        }}
        rowKey={(record) => record.questionId}
        total={dataSource.length}
        selected={rowSelected.selectedRowKeys.length}
        createText={!isViewing && t('unit_survey_question.management.create_question')}
        onDelete={() => setVisibleConfirmDelete(true)}
        onCreate={() => onCreateQuestion(true)}
        width="100%"
        isHideDelete={isViewing}
      />
      <ConfirmDeleteQuestionModal
        t={t}
        isVisible={visibleConfirmDelete}
        onSubmit={handleConfirmDelete}
        setIsVisble={setVisibleConfirmDelete}
        numberOfSelectedRecord={rowSelected.selectedRowKeys.length}
        disabledSubmit={false}
      />
    </Modal>
  )
}

export default UnitSurveyQuestions
