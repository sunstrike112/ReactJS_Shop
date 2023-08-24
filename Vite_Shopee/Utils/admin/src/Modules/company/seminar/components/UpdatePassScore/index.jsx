/* eslint-disable react/prop-types */
import React, { useCallback, useLayoutEffect, useMemo } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { useParams } from 'react-router-dom'
import { useQuestionSetting, useTestDetail } from 'Hooks/unit_settings'
import { FormLabel, FormSelect, PrimaryButton } from 'Components'
import { Row, Col } from 'antd'
import { Divider, Right } from './styled'

const UpdatePassScore = ({ t, isClearData }) => {
  const { unitId, courseId } = useParams()
  const form = useForm()
  const { handleSubmit, setValue } = form
  const { updatePassScoreAction } = useQuestionSetting()
  const { detailTest } = useTestDetail()

  const { data: dataTest } = detailTest

  useLayoutEffect(() => {
    if (dataTest) {
      setValue('passScore', {
        label: dataTest.optionSettingsResponse.passingScore || 0,
        value: dataTest.optionSettingsResponse.passingScore || 0
      })
    }
  }, [dataTest, isClearData])

  const onSubmit = useCallback((formData) => {
    const data = { passScore: formData.passScore.value }
    updatePassScoreAction({ courseId, unitId, data })
  }, [courseId, unitId])

  const scoreOptions = useMemo(
    () => [...Array(dataTest?.optionSettingsResponse.numberOfQuestions + 1 || 0)].map((v, i) => ({
      label: i,
      value: i
    })),
    [dataTest]
  )

  return (
    <FormProvider {...form}>
      <Divider />
      <Row>
        <Col span={5}>
          <FormLabel width={100} title={t('unit')} />
        </Col>
        <Col span={18}>
          <Right>
            <span>{dataTest?.basicInformationResponse.unitName}</span>
          </Right>
        </Col>
      </Row>
      <Divider />
      <Row>
        <Col span={5}>
          <FormLabel
            width={100}
            title={t('detail.number_of_question')}
          />
        </Col>
        <Col span={6}>
          <Right>
            <span>
              {dataTest?.optionSettingsResponse.numberOfQuestions
                ? t('detail.number_of_question_count', {
                  number: dataTest?.optionSettingsResponse.numberOfQuestions
                })
                : t('detail.number_of_question_count', {
                  number: 0
                })}
            </span>
          </Right>
        </Col>
        <Col span={4}>
          <FormLabel
            width={100}
            title={t('detail.passing_score')}
            description="Required"
          />
        </Col>
        <Col span={9}>
          <Right>
            <FormSelect
              name="passScore"
              isSearchable={false}
              t={t}
              placeholder={null}
              options={scoreOptions}
              isClearable={false}
            />
            <span className="pass_score">
              {t('detail.passing_score_count', {
                pointPass: null,
                totalPoint: dataTest?.optionSettingsResponse.numberOfQuestions
              })}
            </span>
            <PrimaryButton
              disabled={(!dataTest?.optionSettingsResponse.numberOfQuestions)}
              title={t('common:change')}
              width={null}
              backgroundcolor="blueHight"
              onClick={handleSubmit(onSubmit)}
            />
          </Right>
        </Col>
      </Row>
      <Divider />
    </FormProvider>
  )
}

export default UpdatePassScore
