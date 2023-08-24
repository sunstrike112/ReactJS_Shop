/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable max-len */
/* eslint-disable react/prop-types */
import React, { useMemo } from 'react'
import styled from 'styled-components'
import i18next from 'I18n'
import { Dropdown, Menu } from 'antd'
import { useTranslation } from 'react-i18next'
import { HomeOutlined } from '@ant-design/icons'
import { AVATAR_DEFAULT, EN_ICON, VI_ICON, JP_ICON, COMPANY_LOGO, LOGOUT_ICON } from 'Assets'
import { getFileFromS3, signOut } from 'Utils'
import { useAuth } from 'Hooks'
import { USER_URL } from 'Constants'
import { USER_ROLE } from 'Constants/auth'
import { Image } from 'Components'

const Wrapper = styled.header`
  margin: .7rem 1rem;
	padding: 0 0.75rem;
  position: sticky;
  z-index: 998;
  top: 0;
  display: flex;
  height: 4rem;
  align-items: center;
  border-bottom: 0 solid #f8f9fa;
  border-radius: 1rem;
  box-shadow: 0 1.6rem 3rem rgb(0 0 0 / 10%);
  background-color: ${({ theme }) => theme.bg_light_transparent};
  backdrop-filter: blur(0.5rem);
  will-change: backdrop-filter;

  .container {
    padding: 0 .75rem;
    width: 100%;
    .row {
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      .header-left {
        flex: 1 0;
        .search {
          display: flex;
          align-items: center;
          label.cursor-pointer {
            cursor: pointer;
            svg.svg-icon--material {
              font-size: 1.5rem;
              fill: #6c5ed3;
            }
          }
          input.search-input {
            border: none;
            background-color: transparent;
            width: 100%;
            font-weight: 500;
            padding: .3rem .75rem;

            &:focus-visible {
              outline: none;
            }
          }
        }
        .logo {
          width: 150px;
        }
      }
      .header-right {
        flex: 0 0 auto;
        width: auto;
        .row {
          flex-wrap: wrap;

          .col-auto {
            margin: .5rem;
            button {
              cursor: pointer;
            }
          }

          .btn-action {
            padding: .625rem;
            width: calc(28px + 1.25rem);
            height: calc(28px + 1.25rem);
            background-color: transparent;
            border: none;
            border-radius: 1.25rem;
            &:hover, &:active {
              background-color: #e7eef8;
              border-color: #e7eef8;
            }
          }

          .user-info {
            cursor: pointer;
            display: flex;
            align-items: center;

            .text-end {
              text-align: end;
              margin-right: .7rem;
              .name {
                font-weight: 600;
                font-size: .75rem;
                color: #808191;
              }

              .title {
                font-weight: 300;
                font-size: .75rem;
                color: #6c757d;
              }
            }

            .avatar {
              box-shadow: 0 1.6rem 3rem rgb(0 0 0 / 10%);
              object-fit: cover;
              border-radius: 50%;
              border: #e9e7f8 1px solid;
            }
          }
        }
      }
    }
  }
`

const Header = () => {
  const { t, i18n: { language } } = useTranslation()
  const { metaData, profile } = useAuth()
  const role = metaData?.roles?.[0]

  const handleLogout = () => signOut(false, metaData.userId)

  const languageIcon = useMemo(() => {
    switch (language) {
      case 'jp':
        return <JP_ICON />
      case 'en':
        return <EN_ICON />
      case 'vi':
        return <VI_ICON />
      default:
        return null
    }
  }, [language])

  const menu = (
    <Menu>
      <Menu.Item key="1" onClick={() => i18next.changeLanguage('jp')}>
        <JP_ICON />
        <span>&nbsp;日本語</span>
      </Menu.Item>
      <Menu.Item key="0" onClick={() => i18next.changeLanguage('en')}>
        <EN_ICON />
        <span>&nbsp;English</span>
      </Menu.Item>
      <Menu.Item key="2" onClick={() => i18next.changeLanguage('vi')}>
        <VI_ICON />
        <span>&nbsp;Tiếng Việt</span>
      </Menu.Item>
    </Menu>
  )

  const dropdownMenu = (
    <Menu>
      {([USER_ROLE.COMPANY_ADMIN, USER_ROLE.SUB_ADMINISTRATOR, USER_ROLE.COURSE_ADMIN].includes(role)) && (
        <>
          <Menu.Item key="0" onClick={() => window.location.replace(USER_URL)}>
            <HomeOutlined />
            <span>&nbsp;{t('home_page')}</span>
          </Menu.Item>
          <Menu.Divider />
        </>
      )}
      <Menu.Item key="1" onClick={handleLogout}>
        <LOGOUT_ICON className="logout-icon" />
        <span>&nbsp;{t('logout')}</span>
      </Menu.Item>
    </Menu>
  )

  return (
    <Wrapper>
      <div className="container">
        <div className="row">
          <div className="header-left">
            <Image width={120} src={COMPANY_LOGO} alt="logo" />
          </div>
          <div className="header-right">
            <div className="row g-3">
              <div className="col-auto">
                <Dropdown overlay={menu} trigger={['click']}>
                  <button type="button" className="btn-action" aria-label="Change language" data-tour="lang-selector" aria-expanded="false">
                    {languageIcon}
                  </button>
                </Dropdown>
              </div>
              <div className="col user-info" role="presentation">
                <Dropdown overlay={dropdownMenu} trigger={['click']}>
                  <a className="ant-dropdown-link" style={{ display: 'flex', alignItems: 'center' }} onClick={(e) => e.preventDefault()}>
                    <div className="me-3">
                      <div className="text-end">
                        <div className="name">{profile.fullName}</div>
                      </div>
                    </div>
                    <div className="position-relative">
                      <img
                        className="avatar rounded-circle bg-lo25-warning"
                        src={getFileFromS3(profile.avatar) || AVATAR_DEFAULT}
                        alt="Avatar"
                        width="48"
                        height="48"
                      />
                    </div>
                  </a>
                </Dropdown>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Wrapper>
  )
}

export default Header
