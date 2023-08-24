/* eslint-disable react/prop-types */
import React, { useCallback, useLayoutEffect, useMemo } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { useParams } from 'react-router-dom'
import { useQuestionSetting, useTestDetail } from 'Hooks/unit_settings'
import { FormLabel, FormSelect } from 'Components'
import { Row, Col, Button, Spin } from 'antd'
import { Divider } from 'Themes/facit'
import { Right } from './styled'

const UpdatePassScore = ({ t, isClearData, isViewing }) => {
  const { unitId, courseId } = useParams()
  const form = useForm()
  const { handleSubmit, setValue } = form
  const { updatePassScoreAction, questionSetting } = useQuestionSetting()
  const { detailTest } = useTestDetail()

  const { data: dataTest } = detailTest
  const { isLoadingUpdatePassScore } = questionSetting

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
    <div className="form-wrapper">
      <FormProvider {...form}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Row>
            <Col span={5}>
              <FormLabel width={100} title={t('unit')} />
            </Col>
            <Col span={18}>
              <Right noInput>
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
            <Col span={18}>
              <Right noInput>
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
            <Divider />
            <Col span={5}>
              <FormLabel
                width={100}
                title={t('detail.passing_score')}
                description="Required"
              />
            </Col>
            <Col span={18}>
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
                <Spin spinning={isLoadingUpdatePassScore}>
                  <Button
                    type="primary"
                    htmlType="button"
                    onClick={handleSubmit(onSubmit)}
                    disabled={!dataTest?.optionSettingsResponse.numberOfQuestions || isViewing}
                    size="large"
                  >
                    {t('common:ok')}
                  </Button>
                </Spin>
              </Right>
            </Col>
          </Row>
          <Divider style={{ marginBottom: '1rem' }} />
        </form>
      </FormProvider>
    </div>

  )
}

export default UpdatePassScore
