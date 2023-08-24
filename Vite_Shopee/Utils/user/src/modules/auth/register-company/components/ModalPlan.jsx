/* eslint-disable react/jsx-wrap-multilines */
/* eslint-disable react/prop-types */
/* eslint-disable arrow-body-style */
import { Card, Col, Modal, Typography } from 'antd'
import React from 'react'
import { useTranslation } from 'react-i18next'
import Slider from 'react-slick'
import styled from 'styled-components'
import { AMOUNT_ICON, CLOSE_ICON } from '../../../../assets'
import { ClickAble, TextPrimary } from '../../../../components'

const CloseIconWrapper = styled(Col)`
  justify-content: center;
  display: flex;
  margin-bottom: 30px;
  height: 50px;
`
const PlanCardWrapper = styled.div`
  background: transparent !important;
`
const PlanWrapper = styled.div`
  background: transparent !important;
  box-shadow: none;
`
const PlanCard = styled(Card)`
  margin: 0 1rem;
  border-radius: 12px;

  .ant-card-head {
    background: #f1f1f1;
    border-radius: 12px 12px 0px 0px;
  }

  .ant-card-body {
    padding-top: 12px;
  }
`
const PlanTitle = styled.div`
  div.ant-typography {
    margin: 0;
  }
  background: #f1f1f1;
  margin-left: -24px;
  margin-right: -24px;
  margin-top: -12px;
  padding: 12px 24px;
  border-top-left-radius: 12px;
  border-top-right-radius: 12px;
`
const PlanData = styled.div``
const Data = styled.span`
  font-weight: bold;
  font-size: 72px;
`
const DataUnit = styled.span`
  color: #d3d3d3;
  font-size: 36px;
  font-weight: 200;
`
const PlanAmountBox = styled.div``

const AmountLabel = styled.div`
  font-size: 16px;
`
const AmountBox = styled.div`
  margin-top: 14px;
  display: flex;
  align-items: center;
`
const AmountIcon = styled.div`
  margin-right: 10px;
`
const Amount = styled.div`
  font-size: 24px;
  font-weight: bold;
  color: #ffa928;
`
const PlanPriceBox = styled.div`
  border-top: 1px solid #f1f1f1;
  margin-top: 36px;
  margin-left: -24px;
  margin-right: -24px;
  padding: 20px 24px 0;
`
const Price = styled.div`
  color: #00c271;
  font-size: 24px;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  font-weight: 500;
  line-height: 24px;
`
const PriceUnit = styled.div`
  color: #838383;
  font-size: 15px;
  align-self: flex-end;
  line-height: 15px;
`
function currencyStr(number) {
  if (number) {
    return number
      ?.toFixed(1)
      .replace(/\d(?=(\d{3})+\.)/g, '$&.')
      .slice(0, -2)
  }

  return 0
}

const ModalPlan = ({ isModalVisible, setIsModalVisible, planPackageData }) => {
  const { t } = useTranslation()

  const settings = {
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 3
  }

  return (
    <Modal
      visible={isModalVisible}
      onOk={() => setIsModalVisible(false)}
      onCancel={() => setIsModalVisible(false)}
      footer={null}
      width={1000}
      modalRender={() => (
        <div>
          <CloseIconWrapper span={24}>
            <ClickAble
              onClick={() => setIsModalVisible(false)}
              style={{ background: 'transparent' }}
            >
              <CLOSE_ICON />
            </ClickAble>
          </CloseIconWrapper>

          <PlanWrapper
            justify="space-between"
            gutter={[32]}
            className="ant-modal-content"
            align="stretch"
          >
            <Slider {...settings}>
              {planPackageData.map((v) => (
                <PlanCardWrapper key={v.id}>
                  <PlanCard>
                    <PlanTitle>
                      <TextPrimary fontSize="size_24" fontWeight="bold">
                        <Typography.Paragraph
                          ellipsis={{
                            rows: 1,
                            tooltip: t('register.planName', {
                              planName: v.name
                            })
                          }}
                        >
                          {t('register.planName', { planName: v.name })}
                        </Typography.Paragraph>
                      </TextPrimary>
                    </PlanTitle>

                    <PlanData>
                      <Data>{v.memory.substr(0, v.memory.length - 2)}</Data>
                      <DataUnit>{v.memory.substr(-2)}</DataUnit>
                    </PlanData>

                    <PlanAmountBox>
                      <AmountLabel>{t('register.planAmountLabel')}</AmountLabel>
                      <AmountBox>
                        <AmountIcon>
                          <AMOUNT_ICON />
                        </AmountIcon>
                        <Amount>{v.userUse}</Amount>
                      </AmountBox>
                    </PlanAmountBox>

                    <PlanPriceBox>
                      <Price>
                        {currencyStr(v.price)}
                        {t('register.yenPrice')}/
                        <PriceUnit>{t('register.monthPrice')}</PriceUnit>
                      </Price>
                    </PlanPriceBox>
                  </PlanCard>
                </PlanCardWrapper>
              ))}
            </Slider>
          </PlanWrapper>
        </div>
      )}
    />
  )
}

export default ModalPlan
