import React from 'react'
import { useTranslation } from 'react-i18next'
import { useRouteMatch } from 'react-router-dom'
import HomeLayout from '../../layouts/home'
import { ProfileWrapper } from '../styled'
import { PENCIL_ICON, AVATAR_DEFAULT, PHONECALL, MAILBOX } from '../../../assets'
import { TextPrimary, Image, ClickAble } from '../../../components'
import { useHistories, useProfile } from '../../../hooks'
import { NOT_AVAILABLE, USER_WORKSPACE_ROLE } from '../../../constants'
import { getFileFromS3 } from '../../../utils'

const userClassificationOptions = [
  { value: null, name: '-' },
  { value: 1, name: '経営者' },
  { value: 2, name: '役職者' },
  { value: 3, name: '正社員' },
  { value: 4, name: '非正規社員' },
  { value: 5, name: 'ビジネスパートナー' }
]

const VITURAL_COMPANY_NAME = 'なし'

const Profile = () => {
  const { t } = useTranslation()
  const { path } = useRouteMatch()
  const history = useHistories()
  const { profile, userRole } = useProfile()

  const handleGender = (gender) => {
    switch (gender) {
      case 0:
        return t('profile.home.male')
      case 1:
        return t('profile.home.female')
      default:
        return t('profile.home.unknown')
    }
  }

  return (
    <HomeLayout>
      <ProfileWrapper>
        <div className="content">
          <div className="content__header">
            <Image
              className="content__header--avatar"
              alt="avatar"
              src={getFileFromS3(profile.avatar)}
              srcDefault={AVATAR_DEFAULT}
            />
            <div className="content__header--profile">
              <TextPrimary fontSize="size_14" fontWeight="fw_600">
                {profile.fullNameKatakana}
              </TextPrimary>
              <TextPrimary fontSize="size_24" fontWeight="fw_600">
                {profile.fullName}
              </TextPrimary>
              <div className="wrapper-icon">
                <Image src={MAILBOX} alt="mapping" />
                <TextPrimary fontSize="size_14" fontWeight="fw_600">
                  {profile.email}
                </TextPrimary>
              </div>
              <div className="wrapper-icon">
                <Image src={PHONECALL} alt="phonecall" />
                <TextPrimary fontSize="size_14" fontWeight="fw_600">
                  {profile.cellPhone}
                </TextPrimary>
              </div>
              <TextPrimary fontSize="size_14" fontWeight="fw_600">
                {profile.telePhone}
              </TextPrimary>
              {[USER_WORKSPACE_ROLE.COMPANY_ADMIN].includes(profile.isWorkSpace)
                && (
                <ClickAble
                  className="content__header--profile__edit"
                  onClick={() => history.push(`${path}/edit`)}
                >
                  <Image src={PENCIL_ICON} alt="pencil_icon" />
                  <span>{t('profile.home.edit')}</span>
                </ClickAble>
                )}
            </div>
          </div>
          <div className="content__info">
            <TextPrimary className="content__info--title" fontSize="size_24" fontWeight="fw_600">
              {t('profile.home.profile')}
            </TextPrimary>
            <tbody>
              <tr>
                <td>
                  <TextPrimary fontSize="size_16" fontWeight="fw_600">
                    {t('profile.home.companyCode')}
                  </TextPrimary>
                </td>
                <td>
                  <TextPrimary fontSize="size_16" fontWeight="fw_400">
                    {profile.companyCode || NOT_AVAILABLE}
                  </TextPrimary>
                </td>
              </tr>
              <tr>
                <td>
                  <TextPrimary fontSize="size_16" fontWeight="fw_600">
                    {t('profile.home.login_ID')}
                  </TextPrimary>
                </td>
                <td>
                  <TextPrimary fontSize="size_16" fontWeight="fw_400">
                    {profile.signinId || NOT_AVAILABLE}
                  </TextPrimary>
                </td>
              </tr>
              <tr>
                <td>
                  <TextPrimary fontSize="size_16" fontWeight="fw_600">
                    {t('profile.home.name_company')}
                  </TextPrimary>
                </td>
                <td>
                  <TextPrimary fontSize="size_16" fontWeight="fw_400">
                    {profile.isVirtualCompany
                      ? VITURAL_COMPANY_NAME
                      : userRole === 'INDIVIDUAL_USER'
                        ? profile.companyNameIndividual
                        : profile.companyName}
                  </TextPrimary>
                </td>
              </tr>
              <tr>
                <td>
                  <TextPrimary fontSize="size_16" fontWeight="fw_600">
                    {t('profile.home.gender')}
                  </TextPrimary>
                </td>
                <td>
                  <TextPrimary fontSize="size_16" fontWeight="fw_400">
                    {handleGender(profile.gender)}
                  </TextPrimary>
                </td>
              </tr>
              <tr>
                <td>
                  <TextPrimary fontSize="size_16" fontWeight="fw_600">
                    {t('profile.home.address')}
                  </TextPrimary>
                </td>
                <td>
                  <TextPrimary fontSize="size_16" fontWeight="fw_400">
                    {profile.address ? profile.address : '-'}
                  </TextPrimary>
                </td>
              </tr>
              <tr>
                <td>
                  <TextPrimary fontSize="size_16" fontWeight="fw_600">
                    {t('register.user_classification')}
                  </TextPrimary>
                </td>
                <td>
                  <TextPrimary fontSize="size_16" fontWeight="fw_400">
                    {userClassificationOptions?.filter((option) => option?.value === profile?.classification)[0]?.name}
                  </TextPrimary>
                </td>
              </tr>
              <tr>
                <td>
                  <TextPrimary fontSize="size_16" fontWeight="fw_600">
                    {t('profile.home.employeeNumber')}
                  </TextPrimary>
                </td>
                <td>
                  <TextPrimary fontSize="size_16" fontWeight="fw_400">
                    {profile.employeeNumber ? profile.employeeNumber : '-'}
                  </TextPrimary>
                </td>
              </tr>
              <tr>
                <td>
                  <TextPrimary fontSize="size_16" fontWeight="fw_600">
                    {t('profile.home.birthday')}
                  </TextPrimary>
                </td>
                <td>
                  <TextPrimary fontSize="size_16" fontWeight="fw_400">
                    {profile.dayOfBirth ? profile.dayOfBirth : '-'}
                  </TextPrimary>
                </td>
              </tr>
              <tr>
                <td>
                  <TextPrimary fontSize="size_16" fontWeight="fw_600">
                    {t('profile.home.overview_your_Self')}
                  </TextPrimary>
                </td>
                <td>
                  <TextPrimary fontSize="size_16" fontWeight="fw_400" className="text__overview">
                    {profile.overviewYourSelf ? profile.overviewYourSelf : '-'}
                  </TextPrimary>
                </td>
              </tr>
            </tbody>
          </div>
        </div>
      </ProfileWrapper>
    </HomeLayout>
  )
}

export default Profile
