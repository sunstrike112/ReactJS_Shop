/* eslint-disable no-mixed-spaces-and-tabs */
import React, { useEffect, useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import { FileOutlined, EditOutlined } from '@ant-design/icons'
import { useGetQuery, useLoadTestQuestionDetail } from 'Hooks'
import { renderQuestionType, stripHTML } from 'Utils/string'

import { Title, Image } from 'Components'
import { useParams } from 'react-router-dom'
import { RoutesName } from 'Modules/course/routes'
import { Wrapper, Block, Table, TBody, Tr, Th, Td } from 'Themes/facit'
import { getFileFromS3 } from 'Utils'

const TestQuestionDetail = () => {
  const { t } = useTranslation(['test_question'])
  const { questionId } = useParams()
  const { queryWorkspaceID } = useGetQuery()

  const { loadTestQuestionDetailAction, testQuestionDetail } =		useLoadTestQuestionDetail()

  useEffect(() => {
    loadTestQuestionDetailAction({ questionId })
  }, [questionId])

  const renderCorrectAnswer = useCallback(
    (type, listAnswer) => {
      if (type === 'DESCRIPTION') {
        return listAnswer.map(({ answerText }, index) => (
          <p style={{ marginBottom: 0 }} key={index}>
            {listAnswer.length > 1 && <span>&#8226;&nbsp;</span>}
            {answerText}
          </p>
        ))
      }
      if (type === 'CHOOSE_MANY') {
        const newListAnswer = listAnswer
          .map((item, index) => ({
            ...item,
            index: index + 1
          }))
          .filter((item) => item.isCorrect)
        return newListAnswer.map((item, index) => (
          <p style={{ marginBottom: 0 }} key={index}>
            {newListAnswer.length > 1 && <span>&#8226;&nbsp;</span>}
            {item.index}
          </p>
        ))
      }
      const answerCorrect = listAnswer?.findIndex(
        (item) => item.isCorrect
      )
      if (type === 'SELECT_ONE') {
        return answerCorrect + 1
      }
      return '-'
    },
    [testQuestionDetail]
  )

  const renderChoice = useCallback(
    (type, listAnswer) => {
      if (type !== 'DESCRIPTION') {
        return listAnswer?.map(({ answerText, imagePath }, index) => (
          <Tr key={index}>
            <Th>
              {t('create.choice_number', { number: index + 1 })}
            </Th>
            <Td>
              <p>{answerText}</p>
              {imagePath && <Image width={100} src={getFileFromS3(imagePath)} />}
            </Td>
          </Tr>
        ))
      }
      return null
    },
    [testQuestionDetail]
  )

  const renderFileQuestion = useCallback(
    (listFile) => listFile.map(({ socialPath, type, fileName }, index) => (type === 'IMAGE' ? (
      <Image
        key={index}
        width={100}
        src={getFileFromS3(socialPath)}
      />
    ) : (
      <div key={index}>
        <FileOutlined />&nbsp;{fileName}
      </div>
    ))),
    [testQuestionDetail]
  )

  return (
    <Wrapper>
      <Title
        icon={EditOutlined}
        title={t('test_question_detail')}
        backRoute={`${RoutesName.TEST_QUESTION_MANAGEMENT}${queryWorkspaceID.ONLY}`}
        backRouteText="test_question:back_to_test_question_management"
      />
      <Block>
        <Table>
          <TBody>
            <Tr>
              <Th>{t('create.question_type')}</Th>
              <Td>
                {renderQuestionType(
								  t,
								  testQuestionDetail.questionType
                ) || '-'}
              </Td>
            </Tr>
            <Tr>
              <Th>{t('create.question_text')}</Th>
              <Td>
                <p>
                  {testQuestionDetail.contentQuestion
									  ? stripHTML(
									    testQuestionDetail.contentQuestion
										  )
									  : '-'}
                </p>
                {testQuestionDetail.typeTextList
									&& renderFileQuestion(
									  testQuestionDetail.typeTextList
									)}
              </Td>
            </Tr>
            {renderChoice(
						  testQuestionDetail.questionType,
						  testQuestionDetail.listAnswer
            )}
            <Tr>
              <Th>{t('create.correct_answer')}</Th>
              <Td>
                {renderCorrectAnswer(
								  testQuestionDetail.questionType,
								  testQuestionDetail.listAnswer
                )}
              </Td>
            </Tr>
            <Tr>
              <Th>{t('create.explanation')}</Th>
              <Td>
                {testQuestionDetail.description
								  ? stripHTML(testQuestionDetail.description)
								  : '-'}
              </Td>
            </Tr>
            <Tr>
              <Th>{t('create.remark')}</Th>
              <Td>{testQuestionDetail.remarks || '-'}</Td>
            </Tr>
          </TBody>
        </Table>
      </Block>
    </Wrapper>
  )
}

export default TestQuestionDetail
