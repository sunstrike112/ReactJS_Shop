import React from 'react'
import styled from 'styled-components'
import { useTranslation } from 'react-i18next'
import Container from '../container'
import { Image, TextPrimary, LinkIcon } from '..'
import { MAPPING, PHONECALL, MAILBOX, LOGO_COMPANY } from '../../assets/index'
import { MEDIA_WIDTHS } from '../../themes'
import { useGetQuery, useGlobalStore } from '../../hooks'
import { getFileFromS3 } from '../../utils'

const FooterBox = styled.div`
  background: ${({ theme }) => theme.white};
  border: 1px solid ${({ theme }) => theme.grey_blur};
  .footer {
    display: flex;
    height: 180px;
    justify-content: space-between;
    padding: 30px 130px; 
    .info {  
      min-width: 300px;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      div {
        margin-bottom: 12px;
      }
    }
    .info-social {
      > div p {
        margin-bottom: 50px;
      }
    }
    .box-social {
      display: flex;
      align-items: flex-end;
      justify-content: space-between;
      .box-icon {
        &:not(:last-child) {
          margin-right: 28px;
        }
        img {
          width: 28px;
        }
      }
    }
    p {
      color: black;
      margin: 0;
    }
    .logo__company {
      img {
        width: 120px;
        height: 60px;
        object-fit: contain;
      }
      @media screen and (max-width: ${MEDIA_WIDTHS.upToMedium}px) {
        padding: 10px;
      }
    }
    @media screen and (max-width: ${MEDIA_WIDTHS.upToMedium}px) {
      padding: 25px 20px 36px 20px;
      .logo {
        margin-bottom: 24px;
      }
      .info {
        p {
          font-size: 12px;
        }
      }
      .info-social {
        display: flex;
        justify-content: center;
      }
    }
  }
  .d-flex {
    display: flex;
    img {
      margin-right: 11px;
    }
  }
`
const Footer = () => {
  const { t } = useTranslation()

  // FOR custom hooks
  const { queryWorkspaceID } = useGetQuery()
  const { infoCompany } = useGlobalStore()

  return (
    <FooterBox className="footer-box">
      <Container>
        <div className="footer">
          <div className="logo">
            <LinkIcon
              className="logo__company"
              src={getFileFromS3(infoCompany.logoPath) || LOGO_COMPANY}
              to={`/${queryWorkspaceID.ONLY}`}
            />
          </div>
          <div className="info">
            <div>
              <TextPrimary fontSize="size_16" fontWeight="fw_600">
                {t('common.footer.info')}
              </TextPrimary>
            </div>
            <div>
              <div className="d-flex">
                <Image src={MAPPING} alt="mapping" />
                <TextPrimary>{infoCompany.address || t('common.footer.location')}</TextPrimary>
              </div>
              <div className="d-flex">
                <Image src={PHONECALL} alt="phonecall" />
                <TextPrimary>{infoCompany.phone || t('common.footer.phone')}</TextPrimary>
              </div>
              <div className="d-flex">
                <Image src={MAILBOX} alt="mapping" />
                <TextPrimary>{infoCompany.email || t('common.footer.email')}</TextPrimary>
              </div>
            </div>
          </div>
          <div className="info-social">
            {/* <div className="box-social">
              <Clickable className="box-icon">
                <Image src={ICON_INSTAGRAM} alt="instagram" />
              </Clickable>
              <Clickable className="box-icon">
                <Image src={ICON_FACEBOOK} alt="facebook" />
              </Clickable>
              <Clickable className="box-icon">
                <Image src={ICON_TWITTER} alt="twitter" />
              </Clickable>
            </div> */}
          </div>
        </div>
      </Container>
    </FooterBox>
  )
}

export default Footer
