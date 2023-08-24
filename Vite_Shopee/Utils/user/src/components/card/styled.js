import styled from 'styled-components'

const Wrapper = styled.div`
  margin-bottom: 2px;
  padding: 8px 4px;
  width: 33.33%;
  position: relative;
  @media screen and (min-width: 1024px) and (max-height: 1366px) {
    width: 25%;
  }
  @media screen and (min-width: 1440px) {
    width: 20%;
  }
  .tag-wrapper {
    position: absolute;
    bottom: 8px;
    width: 100%;
    left: 8px;
  }
  .free_course_box {
    background: ${({ theme }) => theme.green_light};
    padding: 8px 16px;
    border-radius: 4px;
  }
  .required_course_box {
    background: ${({ theme }) => theme.yellow};
    border-radius: 4px;
    padding: 2px 10px;
    margin: 10px;
    p {
      font-size: 14px;
    }
    @media screen and (min-width: 1440px) {
      padding: 2px 6px;
      p {
        font-size: 12px;
      }
    }
  }
  .course-tag {
    background: rgba(0, 0, 0, 0.7);
    border: none;
    display: inline-block;
    color: ${({ theme }) => theme.white};
    font-weight: ${({ theme }) => theme.fw_600};
    font-size: ${({ theme }) => theme.size_15};
  }
  .ctn {
    display: flex;
    flex-direction: column;
    padding: 10px 12px;
    background: ${({ theme }) => theme.white};
    border: 1px solid #F1F1F1;
    border-top: none;
    border-bottom: none;

    hr {
      margin-left: 0;
      width: 50%;
      border-top: 1px solid #1a1a1a;
      border-bottom: 1px solid #1a1a1a;
    }
    .line {
      height: 2px !important;
      width: 20%;
      margin-top: 8px;
      background: ${({ theme }) => theme.black};
    }
    .course-name {
      overflow: hidden;
      word-wrap: break-word;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
    }
    .description {
      display: -webkit-box;
      -webkit-line-clamp: 2;
      height: 44px;
      margin-top: 20px;
      margin-bottom: 16px;
      -webkit-box-orient: vertical;
      overflow: hidden;
    }
    .course-overview {
      margin-bottom: 10px;
      margin-top: 10px;
      overflow: hidden;
      height: 1.5em;

      p {
        color: #838383;
        display: -webkit-box;
        word-break: break-word;
        white-space: normal;
        -webkit-line-clamp: 1;
        line-height: 1.5em;
        width: 100%;
        overflow: hidden;
        text-overflow: ellipsis;
        -webkit-line-clamp: 1;
        -webkit-box-orient: vertical;
      }
    }
  }
  .new-channel {
    position: absolute;
    z-index: 1;
    margin-top: 8px;
    margin-left: -0.2rem;
    width: 54px;
    height: 32px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background: #F5222D;
    border-radius: 4px 4px 4px 0px;
    span {
      color: #FFFFFF;
      font-style: normal;
      font-weight: 400;
      font-size: 14px;
      line-height: 20px;
      text-align: center;
    }
    &::before {
      content: "";
      display: inline-block;
      position: absolute;
      left: 0;
      bottom: -4px;
      border-top: 4px solid #820014;
      border-left: 4px solid transparent;
    }
  }
  .expect-16-9 {
    width: 100%;
    position: relative;
    overflow: hidden;
    margin: 0;
    padding-top: 56.25%;
    position: relative;
    .card-img {
      border-top-left-radius: 4px;
      border-top-right-radius: 4px;
      height: 100%;
      object-fit: cover;
      position: absolute;
      top: 50%;
      left: 50%;
      width: 100%;
      transform: translate(-50%, -50%);
    }
  }

  .label-wrapper {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    background: white;
    border-top: none;
    border-right: none;
    .label-course_vote {
      display: flex;
      align-items: center;
      gap: 1rem;

      padding: 10px;
    }
  }

  .label-course {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    .label-course_unit {
      display: flex;
      flex-direction: row;
      div {
          margin-right: 4px;
        }
    }
    .required_course_box {
      align-self: center;
    }
  }

  .btn-hide-course {
    position: absolute;
    width: 30px;
    height: 30px;
    right: 12px;
    top: 15px;
    z-index: 15;
    background: #0a0a0a4a;
    cursor: pointer;
    border-radius: 4px;
    color: white;
    font-size: 22px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .ant-popover-inner {
    width: 390px;
  }
`

export const PopoverWrapper = styled.div`
  width: 360px;
  height: 100%;
  background-color: white;
  flex-direction: column;
  max-height: 350px;
  overflow: auto;
  padding: 8px;
  .popover__title {
    word-wrap: break-word;
  }
  .buy-course-box {
    width: 100%;
    display: flex;
    align-items: start;
    flex-direction: row;
    position: relative;
    justify-content: end;
    .add-to-cart-button {
      position: relative;
      .cart-icon {
        position: absolute;
        top: -5px;
        left: 5px;
        z-index: 10;
      }
      .add-to-cart-btn {
        padding: 10px 20px 10px 40px;
      }
    }
    button {
      display: inline-block;
      border-radius: 6px;
      padding: 10px 20px;
    }
    .view-cart-btn,
    .add-to-cart-btn {
      margin-right: 15px;
    }
  }
`
export const Divider = styled.div`
  width: 20%;
  border: 1px solid ${({ theme }) => theme.text_primary};
  margin-top: 8px;
  margin-bottom: 20px;
`

export default Wrapper
