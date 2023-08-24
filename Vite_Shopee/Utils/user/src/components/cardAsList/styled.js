import styled from 'styled-components'
import { ClickAble } from '..'

const MAX_UNITS = 4

export const stylesIcon = {
  fontSize: 20,
  width: 20,
  height: 20,
  marginLeft: 0
}

export const StyledWrapper = styled(ClickAble)`
  min-height: 83px;
  padding: 10px 20px;
  position: relative;
  border: 1px solid ${({ theme }) => theme.bg_scroll_bar};
  border-radius: 4px;
  background-color: ${({ theme }) => theme.white};

  .btn-hide-course {
    position: absolute;
    width: 30px;
    height: 30px;
    right: 3px;
    top: 3px;
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

  .new-channel {
    position: absolute;
    right: 0;
    bottom: -5px;
    margin-right: -4px;
    width: 54px;
    height: 32px;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: ${({ theme }) => theme.bg_mark_new};
    border-radius: 4px 0 4px 4px;
    span {
      color: #ffffff;
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
      right: 0;
      top: -4px;
      border-bottom: 4px solid #820014;
      border-right: 4px solid transparent;
    }
  }

  .wrapper {
    width: 100%;
    display: flex;
    justify-content: space-between;
    .left {
      flex: 1;
      display: flex;
      align-items: center;
      gap: 1rem;

      .card-img {
        border-radius: 4px;
        width: 60px;
        height: 60px;
        object-fit: cover;
      }

      .card-content {
        flex: 1;
        p {
          width: 80%;
          overflow: hidden;
          word-wrap: break-word;
          display: -webkit-box;
          -webkit-line-clamp: 1;
          -webkit-box-orient: vertical;
        }
      }
    }

    .right {
      width: 30%;

      .progress {
        span {
          color: ${({ theme }) => theme.grey};
        }
      }

      &-units {
        display: flex;
        justify-content: center;
        gap: 8px;
        width: calc((${MAX_UNITS} * ${stylesIcon.width}px) + (8px * ${MAX_UNITS - 1}));
      }
    }
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
