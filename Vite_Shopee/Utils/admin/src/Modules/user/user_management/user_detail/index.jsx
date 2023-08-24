import React, { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { Space, Tag, Tooltip, Spin } from 'antd'
import { UserOutlined } from '@ant-design/icons'
import { useUserManagement } from 'Hooks/user'
import { useGetQuery, useRoles } from 'Hooks'

import { Title } from 'Components'
import { formatDate, MEMBER_TYPE_CONVERT } from 'Utils'
import { useParams } from 'react-router-dom'
import { Wrapper, Table, TBody, Tr, Th, Td, Block } from 'Themes/facit'
import { Loading } from './styled'
import { userClassificationOptions } from '../../constant'

const styles = {
  td: {
    padding: '8px 16px'
  },
  th: {
    width: 250,
    padding: '8px 16px'
  }
}
const UserDetailScreen = () => {
  const { t } = useTranslation(['user'])
  const { userId } = useParams()
  const { companyId } = useGetQuery()
  const { isSuperAdmin } = useRoles()

  const { user, loadUserAction, isLoading } = useUserManagement()

  const renderGender = (gender) => {
    switch (gender) {
      case 0:
        return t('detail.male')
      case 1:
        return t('detail.female')
      default:
        return t('detail.unknown')
    }
  }

  useEffect(() => {
    if (isSuperAdmin) loadUserAction({ params: { userId, companyId } })
    else loadUserAction({ params: { userId } })
  }, [])

  return (
    <Wrapper>
      <Title icon={UserOutlined} title={t('detail.title')} />
      {isLoading && user ? (
        <Loading>
          <Spin
            size="large"
          />
        </Loading>
      ) : (
        <Block>
          <Table>
            <TBody>
              <Tr>
                <Th style={styles.th}>{t('detail.email')}</Th>
                <Td style={styles.td}>{user.email}</Td>
              </Tr>
              <Tr>
                <Th style={styles.th}>{t('common:loginId')}</Th>
                <Td style={styles.td}>{user.signinId}</Td>
              </Tr>
              <Tr>
                <Th style={styles.th}>{t('detail.name')}</Th>
                <Td style={styles.td}>{user.fullName}</Td>
              </Tr>
              <Tr>
                <Th style={styles.th}>{t('detail.nameFurigana')}</Th>
                <Td style={styles.td}>{user.fullNameKatakana}</Td>
              </Tr>
              <Tr>
                <Th style={styles.th}>{t('detail.classification')}</Th>
                <Td style={styles.td}>{userClassificationOptions?.filter((option) => option?.value === user?.classification)[0]?.label}</Td>
              </Tr>
              <Tr>
                <Th style={styles.th}>{t('common:employee_number')}</Th>
                <Td style={styles.td}>{user.employeeNumber}</Td>
              </Tr>
              <Tr>
                <Th style={styles.th}>{t('detail.birthday')}</Th>
                <Td style={styles.td}>{user.dateOfBirth}</Td>
              </Tr>
              <Tr>
                <Th style={styles.th}>{t('detail.login_status')}</Th>
                <Td style={styles.td}>
                  {t(user.loginStatus)}
                </Td>
              </Tr>
              <Tr>
                <Th style={styles.th}>{t('detail.group')}</Th>
                <Td style={styles.td}>{
                  user.listDepartment?.map((item, index) => (
                    <Space key={index}>
                      <Tooltip title={item.departmentName}>
                        <Tag className="truncate">{item.departmentName}</Tag>
                      </Tooltip>
                    </Space>
                  ))
                }
                </Td>
              </Tr>
              <Tr>
                <Th style={styles.th}>{t('detail.attribute')}</Th>
                <Td style={styles.td}>{
                  user.listAttributes?.map((item, index) => (
                    <Space key={index}>
                      <Tooltip title={item.attributeName}>
                        <Tag className="truncate">{item.attributeName}</Tag>
                      </Tooltip>
                    </Space>
                  ))
                }
                </Td>
              </Tr>
              <Tr>
                <Th style={styles.th}>{t('member_type')}</Th>
                <Td style={styles.td}>{user.listRoles && t(MEMBER_TYPE_CONVERT[user.listRoles[0]])}</Td>
              </Tr>
              <Tr>
                <Th style={styles.th}>{t('detail.latest_login')}</Th>
                <Td style={styles.td}>{formatDate(user.lastLogin)}</Td>
              </Tr>
              <Tr>
                <Th style={styles.th}>{t('detail.gender')}</Th>
                <Td style={styles.td}>{renderGender(user.gender)}</Td>
              </Tr>
              <Tr>
                <Th style={styles.th}>{t('detail.phone')}</Th>
                <Td style={styles.td}>{user.cellPhone}</Td>
              </Tr>
              <Tr>
                <Th style={styles.th}>{t('detail.address')}</Th>
                <Td style={styles.td}>{user.address}</Td>
              </Tr>
              <Tr>
                <Th style={styles.th}>{t('detail.birthday')}</Th>
                <Td style={styles.td}>{user.dateOfBirth}</Td>
              </Tr>
              <Tr>
                <Th style={styles.th}>{t('detail.login_status')}</Th>
                <Td style={styles.td}>
                  {t(user.loginStatus)}
                </Td>
              </Tr>
              <Tr>
                <Th style={styles.th}>{t('detail.overviewYourSelf')}</Th>
                <Td style={styles.td}>{user.overviewYourSelf}</Td>
              </Tr>
            </TBody>
          </Table>
          {/* Temporary hide for release 2021/12/27 */}
          {/* <WrapperButton>
            <Space>
              <Button
                icon={<UnorderedListOutlined />}
                size="large"
                onClick={() => history.push(`${RoutesName.USER_LEARN_STATUS}/${userId}`)}
              >
                {t('detail.learn_status_button')}
              </Button>
              <Button
                icon={<UnorderedListOutlined />}
                size="large"
                onClick={() => history.push(`${RoutesName.USER_TEST_RESULT}/${userId}`)}
              >
                {t('detail.test_result_button')}
              </Button>
              <Button
                icon={<UnorderedListOutlined />}
                size="large"
                onClick={() => history.push(`${RoutesName.USER_LEARN_HISTORY}/${userId}`)}
              >
                {t('detail.learn_history_button')}
              </Button>
            </Space>
          </WrapperButton> */}
        </Block>
      )}
    </Wrapper>
  )
}

export default UserDetailScreen
