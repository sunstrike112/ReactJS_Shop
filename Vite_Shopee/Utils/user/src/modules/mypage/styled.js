import styled from 'styled-components'
import { MEDIA_WIDTHS } from '../../themes'
import { Image } from '../../components'

export const TabWrapper = styled.div`
  display: flex;
`

export const Wrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 15px 20px 0px 20px;
  background: ${({ theme }) => theme.bg_yellow_white};
  @media screen and (max-width: ${MEDIA_WIDTHS.upToLarge}px) {
    padding: 32px 32px 0px 32px;
  }
  @media screen and (max-width: ${MEDIA_WIDTHS.upToMedium}px) {
    padding: 32px 0px 0px 0px;
  }
  .container {
    width: 100%;
    max-width: 2400px;
    background: ${({ theme }) => theme.bg_yellow_white};
  }
  .top {
    position: relative;
    .course-header {
      width: 300px;
      height: 0;
      left: -20px;
      top: -58px;
      border-right: 120px solid transparent;
      border-bottom: 60px solid ${({ theme }) => theme.white};
      border-left: 0px solid transparent;
      box-sizing: content-box;
      p {
        font-weight: bold;
        padding-left: 32px;
        line-height: 58px;
        img {
          margin-right: 15px;
        }
      }
    }
    .course-list {
      min-height: calc(100vh - 354px);
      .course-list-content {
        display: flex;
      }
      .course-tab-content {
        display: flex;
      }
    }
    .tab-header {
      padding: 0 2px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 8px;

      &-right {
        display: flex;
        align-items: center;

        &-divider {
          margin: 0 15px;
          width: 1px;
          height: 36px;
          background-color: ${({ theme }) => theme.bg_divider};
        }

        .input-search {
          > div > input {
            border: 1px solid ${({ theme }) => theme.grey_blur};
            font-weight: ${({ theme }) => theme.bold};
            @media screen and (max-width: ${MEDIA_WIDTHS.upToLarge}px) {
              width: 300px;
            }
            @media screen and (max-width: ${MEDIA_WIDTHS.upToMedium}px) {
              width: 250px;
            }
            @media screen and (min-width: 768px) {
              font-size: ${({ theme }) => theme.size_11};
            }
            @media screen and (min-width: 1024px) {
              font-size: ${({ theme }) => theme.size_15};
            }
          }

          .icon {
            z-index: 0;
          }
        }
      }
    }

    .course-content {
      padding: 5px 12px 0px;
      .course-content-bottom {
        .categories-box {
          width: 305px;
          margin-right: 20px;
        }
        .course-list {
          @media screen and (min-width: 768px) {
            width: 700px;
          }
          @media screen and (min-width: 834px) {
            width: 810px;
          }
          @media screen and (min-width: 1024px) {
            width: 1000px;
          }
          @media screen and (min-width: 1440px) {
            width: 1350px;
          }
          .course-title {
            margin-bottom: 4px;
          }
        }
      }
    }
  }

  .course-numbers-box {
    width: 38px;
    height: 24px;
    background: ${({ theme }) => theme.grey_blur};
    border-radius: 4px;
    display: flex;
    align-items: center;
    margin-left: 16px;
    justify-content: center;
  }
  .d-flex {
    display: flex;
  }
  .filter {
    display: flex;
    justify-content: space-between;
    margin-bottom: 40px;
    @media screen and (max-width: ${MEDIA_WIDTHS.upToMedium}px) {
      flex-direction: column;
    }
  }
`

export const StyledCourseDisplayWrapper = styled.div`
  display: flex;
  gap: .5rem;
`

export const StyledTypeDisPlayImage = styled(Image)`
  cursor: pointer;
  width: 40px;
  height: 40px;
`
