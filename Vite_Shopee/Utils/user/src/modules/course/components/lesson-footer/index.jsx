import React from 'react'
import styled from 'styled-components'
import { Row, Col } from 'antd'
import PropTypes from 'prop-types'
import { useTranslation } from 'react-i18next'
import {
  IMG_PREV_LESSON,
  IMG_CANCEL_LESSON,
  IMG_NEXT_LESSON
} from '../../../../assets'

const Wrapper = styled.div`
  .cursor-pointer {
    cursor: pointer;
  }
  .lesson-footer {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 72px;
   
  }
  .lesson-footer-control {
    display: flex;
    height: 100%;
    width: 100%;
    justify-content: space-around;
  }
  .lesson-action-control {
    display: flex;
    div:nth-child(2) {
      margin: 0 88px;
    }
  }
  .lesson-action {
    justify-content: center;
    display: flex;
    flex-direction: column;
    align-items: center;
    img {
      cursor: pointer;
    }
  }
  .lesson-action-text {
    margin-bottom: 0px;
  }
  .lesson-slide-action {
    margin: 15px 0;
    display: flex;
    justify-content: center;
    .lesson-slide-action-text {
      margin: 0 56px;
    }
    button {
      cursor: pointer;
      border-radius: 48px;
    }
  }
  .prevbutton{
    background: #FFFFFF;
    border: 1px solid #838383;
  }
  .nextbutton{
    background:  #2B55EF;
    color: white;
    border: 1px solid #2B55EF;;
  }
  .button-text{
    padding: 5px 20px;
    margin: 0px;
  }
`
const LessonFooter = (props) => {
  const { t } = useTranslation()
  return (
    <>
      <Wrapper>
        <Row style={{ borderTop: '1px solid #f1f1f1' }}>
          <>
            <Col span={3} />
            <Col span={21}>
              <div className="lesson-footer">
                <div className="lesson-footer-control">
                  <div className="lesson-slide-action">
                    <button style={{ display: props.currentSlide === 0 ? 'none' : '' }} onClick={props.previous} className="prevbutton">
                      <p className="button-text">{t('lesson.prevbutton')}</p>
                    </button>
                  </div>
                  <div className="lesson-action-control">
                    <div className="lesson-action">
                      <img className="" width={24} height={28} alt="prev_lesson" src={IMG_PREV_LESSON} />
                      <p className="lesson-action-text">{t('lesson.prev_lesson')}</p>
                    </div>
                    <div className="lesson-action">
                      <img width={24} height={28} alt="prev_lesson" src={IMG_NEXT_LESSON} />
                      <p className="lesson-action-text">{t('lesson.next_lesson')}</p>
                    </div>
                    <div className="lesson-action">
                      <img onClick={() => window.history.back()} width={24} height={28} alt="prev_lesson" src={IMG_CANCEL_LESSON} />
                      <p className="lesson-action-text">{t('lesson.completebutton')}</p>
                    </div>
                  </div>
                  <div className="lesson-slide-action">
                    <button style={{ display: props.currentSlide === props.imageList.length - 1 ? 'none' : '' }} onClick={props.next} className="nextbutton">
                      <p className="button-text">{t('lesson.nextbutton')}</p>
                    </button>
                  </div>
                </div>
              </div>
            </Col>
          </>
        </Row>
      </Wrapper>
    </>
  )
}
LessonFooter.propTypes = {
  next: PropTypes.func,
  previous: PropTypes.func,
  currentSlide: PropTypes.number,
  imageList: PropTypes.array
}

export default LessonFooter
