/* eslint-disable no-extra-boolean-cast */
/* eslint-disable max-len */
import React, { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { Button } from 'antd'
import moment from 'moment'
import { EditOutlined, EyeOutlined } from '@ant-design/icons'
import { useTestDetail, useRoles, useHistories, useGetQuery } from 'Hooks'

import { Title } from 'Components'
import { useParams } from 'react-router-dom'
import { RoutesName } from 'Modules/course/routes'
import { FORMAT_TIME } from 'Constants/formatTime'
import { Wrapper, Block, Table, TBody, Tr, Th, Td } from 'Themes/facit'
import { QUERY } from 'Constants'

const UnitSettingsScreen = () => {
  const { t } = useTranslation(['unit_setting'])
  const history = useHistories()
  const { unitId, courseId } = useParams()
  const { queryWorkspaceID } = useGetQuery()

  const { isViewing, createBy } = useRoles()
  const { getDetailTestAction, detailTest } = useTestDetail()

  useEffect(() => {
    getDetailTestAction({ courseId, unitId })
  }, [courseId, unitId])

  return (
    detailTest && (
      <Wrapper>
        <Title title={t('detail.title')} backRoute={`${RoutesName.UNIT_SETTINGS}${queryWorkspaceID.ONLY}`} backRouteText={t('back_to_unit_setting')} />
        <Block>
          <div className="block-head">
            <div className="left">
              <h2>{t('basic_info')}</h2>
            </div>
            <div className="right">
              <Button
                type="primary"
                icon={<EditOutlined />}
                size="large"
                disabled={isViewing}
                onClick={() => history.push(`${RoutesName.BASIC_SETTING_INFO}/${courseId}/${detailTest.data?.basicInformationResponse.unitId}?${QUERY.CREATE_BY}=${createBy}`)}
              >
                {t('common:button_setup')}
              </Button>
            </div>
          </div>
          <Table>
            <TBody>
              <Tr>
                <Th>{t('course')}</Th>
                <Td>{detailTest.data?.basicInformationResponse.courseName}</Td>
              </Tr>
              <Tr>
                <Th>{t('unit')}</Th>
                <Td>{detailTest.data?.basicInformationResponse.unitName}</Td>
              </Tr>
              <Tr>
                <Th>{t('unit_detail')}</Th>
                <Td>{detailTest.data?.basicInformationResponse.unitDetails || '-'}</Td>
              </Tr>
              <Tr>
                <Th>{t('limit_start_date')}</Th>
                <Td>
                  {detailTest.data?.basicInformationResponse.limitOnAttendanceStart
                    ? t('detail.release_since_value', {
                      time: moment(detailTest.data?.basicInformationResponse.limitOnAttendanceStart).format(
                        FORMAT_TIME.DATE_HOUR_MINUTES
                      )
                    })
                    : t('detail.label_limit_start_date')}
                </Td>
              </Tr>
              <Tr>
                <Th>{t('limit_end_date')}</Th>
                <Td>
                  {detailTest.data?.basicInformationResponse.limitOnAttendanceEnd
                    ? t('detail.release_until_value', {
                      time: moment(detailTest.data?.basicInformationResponse.limitOnAttendanceEnd).format(
                        FORMAT_TIME.DATE_HOUR_MINUTES
                      )
                    })
                    : t('detail.label_limit_end_date')}
                </Td>
              </Tr>
              <Tr>
                <Th>{t('message_complete')}</Th>
                <Td>{detailTest.data?.basicInformationResponse.completionMessage || '-'}</Td>
              </Tr>
              <Tr>
                <Th>{t('estimate_study')}</Th>
                <Td>{ detailTest.data?.basicInformationResponse.estimatedStudyTime
                  ? t('minutes', { number: detailTest.data?.basicInformationResponse.estimatedStudyTime })
                  : '-'}
                </Td>
              </Tr>
            </TBody>
          </Table>
        </Block>

        <Block>
          <div className="block-head">
            <div className="left">
              <h2>{t('detail.question_settings')}</h2>
            </div>
            <div className="right">
              <Button
                type="primary"
                icon={isViewing ? <EyeOutlined /> : <EditOutlined />}
                size="large"
                onClick={() => history.push(`${RoutesName.QUESTION_SETTING}/${courseId}/${detailTest.data?.basicInformationResponse.unitId}?${QUERY.CREATE_BY}=${createBy}`)}
              >
                {t(isViewing ? 'common:tooltip.view' : 'common:button_setup')}
              </Button>
            </div>
          </div>
          <Table>
            <TBody>
              <Tr>
                <Th>{t('detail.number_of_question')}</Th>
                <Td>
                  {detailTest.data?.optionSettingsResponse.numberOfQuestions
                    ? t('detail.number_of_question_count', {
                      number: detailTest.data?.optionSettingsResponse.numberOfQuestions
                    })
                    : t('detail.set_item')}
                </Td>
              </Tr>
              <Tr>
                <Th>{t('detail.passing_score')}</Th>
                <Td>
                  {detailTest.data?.optionSettingsResponse.numberOfQuestions
                    ? t('detail.passing_score_count', {
                      pointPass: detailTest.data?.optionSettingsResponse.passingScore || 0,
                      totalPoint: detailTest.data?.optionSettingsResponse.numberOfQuestions
                    })
                    : t('detail.set_item')}
                </Td>
              </Tr>
            </TBody>
          </Table>
        </Block>
        <Block>
          <div className="block-head">
            <div className="left">
              <h2>{t('detail.option_settings')}</h2>
            </div>
            <div className="right">
              <Button
                type="primary"
                icon={<EditOutlined />}
                size="large"
                disabled={isViewing}
                onClick={() => history.push(`${RoutesName.OPTION_SETTING}/${courseId}/${detailTest.data?.basicInformationResponse.unitId}?${QUERY.CREATE_BY}=${createBy}`)}
              >
                {t('common:button_setup')}
              </Button>
            </div>
          </div>
          <Table>
            <TBody>
              <Tr>
                <Th>{t('detail.time_limit')}</Th>
                <Td>{detailTest.data?.questionSettings.timeLimit
                  ? t('minutes', { number: detailTest.data?.questionSettings.timeLimit })
                  : t('common:none')}
                </Td>
              </Tr>
              <Tr>
                <Th>{t('detail.answerTitle')}</Th>
                <Td>{!!detailTest.data?.questionSettings.isShowAnswer
                  ? t('detail.isAnswerDisplay')
                  : t('detail.isAnswerHidden')}
                </Td>
              </Tr>
            </TBody>
          </Table>
        </Block>
      </Wrapper>
    )
  )
}

export default UnitSettingsScreen
