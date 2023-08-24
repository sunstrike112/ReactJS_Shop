import { EditOutlined, MinusOutlined, PlusOutlined } from '@ant-design/icons'
import { yupResolver } from '@hookform/resolvers/yup'
import { Button, Row, Space } from 'antd'
import {
  FormCheckbox,
  FormEditor, FormLabel, FormRadio,
  FormTextArea, FormUploadWithName, PopupButton, Title
} from 'Components'
import { OPTIONAL_OR_REQUIRED_ANSWER, QUESTION_TYPE } from 'Constants/course'
import { useCreateQuestion, useHistories, useRoles } from 'Hooks'
import { RoutesName } from 'Modules/course/routes'
import React, { useCallback, useEffect, useMemo } from 'react'
import { FormProvider, useFieldArray, useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { useParams } from 'react-router-dom'
import { Wrapper, Divider, Right } from 'Themes/facit'
import { stripHTML } from 'Utils'
import Choice from './components/Choice'
import CreateQuestionSchemma from './schema'

const DEFAULT_VALUES_CREATE = {
  contentQuestionHtml: '',
  optionAnswer: OPTIONAL_OR_REQUIRED_ANSWER[0].value,
  questionType: QUESTION_TYPE[0].value,
  typeTextList: [{ pathFile: '' }],
  listChoice: [{ contentAnswer: '', path: '', isCorrect: 'UNCHECKED' }, { contentAnswer: '', path: '', isCorrect: 'UNCHECKED' }],
  answerDescriptions: [{ value: '' }],
  description: '',
  remarks: '',
  isCorrect: 1,
  isCorrects: [1]
}

const CreateQuestionScreen = () => {
  const history = useHistories()
  const { t } = useTranslation(['test_question'])
  const { courseId, unitId } = useParams()
  const { createBy } = useRoles()

  const { isSuccess, createQuestionAction, isLoading } = useCreateQuestion()

  const form = useForm({
    resolver: yupResolver(CreateQuestionSchemma(t)),
    defaultValues: DEFAULT_VALUES_CREATE,
    mode: 'onChange'
  })

  const { handleSubmit, watch, control, reset, setValue, clearErrors, formState: { isValid } } = form
  const [questionTypeWatch, isCorrectsWatch, isCorrectWatch] = watch(['questionType', 'isCorrects', 'isCorrect'])

  const { fields: typeTextList, append, remove } = useFieldArray({
    control,
    name: 'typeTextList'
  })

  const { fields: listChoice, append: listChoiceAppend, remove: listChoiceRemove } = useFieldArray({
    control,
    name: 'listChoice'
  })

  const { fields: answerDescriptions, append: append3, remove: remove3 } = useFieldArray({
    control,
    name: 'answerDescriptions'
  })

  const options = useMemo(() => listChoice.map((field, index) => (
    { label: index + 1, value: index + 1 }
  ), [listChoice]))

  const onSubmit = useCallback((formData) => {
    const { isCorrect, isCorrects, answerDescriptions: answerDescriptionsSubmit, typeTextList: typeTextListData, ...data } = formData
    if (data.questionType === QUESTION_TYPE[0].value) {
      data.listChoice[isCorrect - 1].isCorrect = 'CHECKED'
    }
    if (data.questionType === QUESTION_TYPE[1].value) {
      isCorrects.forEach((isCorrectIdx) => {
        data.listChoice[isCorrectIdx - 1].isCorrect = 'CHECKED'
      })
    }
    data.answerDescriptions = answerDescriptionsSubmit.map((val) => (val.value))
    data.typeTextList = typeTextListData.map((val) => ({
      ...val.pathFile
    }))
    data.contentQuestion = stripHTML(data.contentQuestionHtml)

    createQuestionAction({ testId: unitId, payload: data, t })
  }, [])

  const handleListChoiceRemove = (idx) => {
    listChoiceRemove(idx)
    // Remove correct index if needed when user remove choice
    setValue('isCorrect', Math.min(idx, isCorrectWatch))
    // Remove correct index if needed when user remove choice
    setValue('isCorrects', isCorrectsWatch.filter((idxCorrect) => idxCorrect !== idx + 1))
  }

  useEffect(() => {
    if (isSuccess) {
      history.push(`${RoutesName.QUESTION_SETTING}/${courseId}/${unitId}?createBy=${createBy}`)
    }
  }, [isSuccess])

  useEffect(() => {
    clearErrors()
  }, [t])

  return (
    <Wrapper>
      <Title
        icon={EditOutlined}
        title={t('create.title')}
        backRoute={`${RoutesName.QUESTION_SETTING}/${courseId}/${unitId}?createBy=${createBy}`}
        backRouteText="test_question:back_to_question"
      />
      <div className="form-wrapper">
        <FormProvider {...form}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Divider />

            <Row>
              <FormLabel title={t('create.question_type')} description="Required" />
              <Right>
                <FormRadio
                  t={t}
                  name="questionType"
                  options={QUESTION_TYPE}
                />
              </Right>
            </Row>

            <Divider />

            <Row>
              <FormLabel title={t('create.question_text')} description="Required" />
              <Right className="form-editor-content-question">
                <FormEditor t={t} name="contentQuestionHtml" total={5000} />

                {typeTextList.map((field, index) => (
                  <div style={{ marginTop: 8 }} key={field.id}>
                    <FormUploadWithName
                      t={t}
                      name={`typeTextList.${index}.pathFile`}
                      maxCount={1}
                      size={20}
                      sizeRequired="20480 KB"
                    />
                    <span>{t('validation.file_required')}</span>
                  </div>
                ))}
                <Space style={{ marginTop: 8 }}>
                  {typeTextList.length > 1 && (
                    <Button
                      htmlType="button"
                      type="primary"
                      onClick={() => remove(typeTextList.length - 1)}
                    >
                      <MinusOutlined />
                    </Button>
                  )}
                  {typeTextList.length < 5 && (
                    <Button
                      htmlType="button"
                      type="primary"
                      onClick={() => append({ pathFile: '' })}
                    >
                      <PlusOutlined />
                    </Button>
                  )}
                </Space>
              </Right>
            </Row>

            {questionTypeWatch !== QUESTION_TYPE[2].value ? (
              <>
                {listChoice.map((field, index) => (
                  <Choice t={t} key={field.id} fields={listChoice} append={listChoiceAppend} remove={handleListChoiceRemove} index={index} />
                ))}

                <Divider />

                <Row>
                  <FormLabel title={t('create.correct_answer')} description="Required" />
                  <Right>
                    {questionTypeWatch === QUESTION_TYPE[1].value && (
                      <FormCheckbox t={t} options={options} name="isCorrects" />
                    )}
                    {questionTypeWatch === QUESTION_TYPE[0].value && (
                      <FormRadio t={t} options={options} name="isCorrect" />
                    )}
                  </Right>
                </Row>
              </>
            ) : (
              answerDescriptions.map((field, index) => (
                <React.Fragment key={field.id}>
                  <Divider />
                  <Row>
                    <FormLabel title={t('create.correct_answer_number', { number: index + 1 })} description={index === 0 ? 'Required' : 'Optional'} />
                    <Right className="form-editor-content-question">
                      <FormTextArea name={`answerDescriptions.${index}.value`} total={500} />

                      {index === answerDescriptions.length - 1 && (
                        <Row justify="end">
                          <Space>
                            {answerDescriptions.length > 1 && (
                              <Button
                                htmlType="button"
                                type="primary"
                                onClick={() => remove3(answerDescriptions.length - 1)}
                              >
                                <MinusOutlined />
                              </Button>
                            )}
                            {answerDescriptions.length < 30 && (
                              <Button
                                htmlType="button"
                                type="primary"
                                onClick={() => append3({ value: '' })}
                              >
                                <PlusOutlined />
                              </Button>
                            )}
                          </Space>
                        </Row>
                      )}
                    </Right>
                  </Row>
                </React.Fragment>
              ))
            )}

            <Divider />

            <Row>
              <FormLabel title={t('create.remark')} description="Optional" />
              <Right>
                <FormTextArea name="remarks" total={1000} />
              </Right>
            </Row>

            <Divider />

            <Row>
              <FormLabel title={t('create.explanation')} description="Optional" />
              <Right className="form-editor-content-question">
                <FormEditor t={t} name="description" total={10000} />
              </Right>
            </Row>

            <Divider />

            <div className="form-action-group">
              <Space>
                <Button htmlType="button" onClick={() => reset(DEFAULT_VALUES_CREATE)}>{t('common:clear')}</Button>
                <PopupButton
                  icon={EditOutlined}
                  titlePopup={t('create.warning_submit_message')}
                  textButton={t('common:register')}
                  okText={t('common:register')}
                  cancelText={t('common:cancel')}
                  disabled={isLoading || !isValid}
                  onConfirm={handleSubmit(onSubmit)}
                  isLoading={isLoading}
                />
              </Space>
            </div>
          </form>
        </FormProvider>
      </div>
    </Wrapper>
  )
}

export default CreateQuestionScreen
