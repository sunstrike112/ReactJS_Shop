import styled from 'styled-components'

export const Wrapper = styled.div`
  .d-flex {
    display: flex;
  }
  p,
  span {
    word-break: break-all;
  }
  .show_more {
    cursor: pointer;
    display: ${({ isShowMore }) => (isShowMore ? 'flex' : 'none')} !important;
    img {
      padding-bottom: 12px;
    }
  }
  .course-list-content {
    width: 100%;
    padding: 32px;
    border-radius: 8px;
    background: ${({ theme }) => theme.white};
    border: 1px solid ${({ theme }) => theme.grey_blur};
    @media screen and (max-width: 1024px) {
      padding: 24px;
    }
    /* box-sizing: content-box; */
  }
  .list-tag {
    margin-bottom: 10px;
    align-self: center;
    .course-tag {
      font-size: 15px;
      background: rgba(0, 0, 0, 0.7);
      border-radius: 2px;
      color: white;
      padding: 2px 4px;
      word-wrap: break-word;
      white-space: normal;
      margin-right: 4px;

      &:last-child {
        margin-right: 0;
      }
    }
  }
  .course-tab-content {
    margin-bottom: 5px;
    .box-course-type {
      margin-bottom: 2px;
      .section-image-course {
        width: 50%;
        overflow: hidden;
        height: 100%;
        max-height: 600px;
        img {
          border-radius: 8px;
          height: 90%;
          width: 100%;
        }
      }
      .section-info-course {
        margin-top: 6px;
        .info {
          margin-top: 20px;
          display: flex;
          flex-direction: row;
          justify-content: space-between;
          .course-detail {
            width: 45%;
          }
          .course_category {
            display: inline-block;
          }
          .line {
            margin: 0px 8px;
          }
          p {
            margin-bottom: 8px;
          }
        }
        .description {
          color: ${({ theme }) => theme.grey};
          max-height: ${({ isReadMore }) => (isReadMore ? 'max-content' : '250px')};
          overflow: hidden;
          -webkit-mask-image: ${({ isShowMore, isReadMore }) => ((isShowMore && !isReadMore) ? 'linear-gradient(#fff,#fff,rgba(255,255,255,0))' : 'none')};
        }
      }
    }
  }
`

export const CourseInfo = styled.tr`
  display: flex;
  td:first-child {
    min-width: 180px;
    @media screen and (max-width: 1024px) {
      min-width: 150px;
    }
    p {
      word-break: break-word;
    }
  }
  td:last-child {
    width: 100%;
    @media screen and (max-width: 1024px) {
      margin-left: 10px;
    }
    span {
      word-break: break-word;
    }
  }
`
