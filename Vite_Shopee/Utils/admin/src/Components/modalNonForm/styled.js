import styled from 'styled-components'
import Modal from 'react-modal'

export const ModalWrapper = styled(Modal)`
  box-sizing: border-box;
  padding: 0;
  color: rgba(0, 0, 0, 0.85);
  font-size: 14px;
  font-variant: 'tabular-nums';
  line-height: 1.5715,;
  list-style: 'none';
  font-feature-settings: 'tnum', 'tnum';
  pointer-events: none;
  position: relative;
  top: 100px;
  max-width: calc(100vw - 32px);
  margin: 0 auto;
  padding-bottom: 24px;
  width: ${(theme) => {
    switch (theme.size) {
      case 'large':
        return '100%'
      case 'small':
        return '40%'
      default:
        return '55%'
    }
  }};
  .ant-modal-content {
    border-radius: 1rem;
    max-height: 80vh;
    overflow: ${(theme) => theme.overflow || 'auto'};
  .ant-modal-header {
    height: 70px;
  }
  
  .ant-modal-body {
    overflow-x: hidden;
    max-height: calc(80vh - 125px);
  }

  .ant-modal-footer {
    display: flex;
    justify-content: center;
    height: 55px;

    .button__cancel {
      margin-right: 10px;
    }

    .ant-btn {
      &:not(.ant-dropdown-trigger) {
        margin-left: 0;
      }
    }
  }

  .title__wrapper {
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 24;
    width: 95%;
    .left {
      span {
        font-size: 24px;
        font-weight: 700;
        padding: 0;
        margin-top: 5px;
      }
    }
    .right {
      display: flex;
      align-items: center;
      .filter-tag {
        margin-right: .75rem;
        color: #4d67f6;
        background-color: #eceffd;
        border-color: #f0effb;
        text-align: center;
        vertical-align: middle;
        border: 1px solid transparent;
        padding: 0.25rem .75rem;
        border-radius: 1rem;
      }
      .separator {
        height: 2rem;
        border-left: 1px solid #adb5bd;
        margin-right: .75rem;
      }
      .filter {
        color: #6c5dd3;
        background-color: #f0effb;
        border-color: #f0effb;
        display: inline-block;
        font-weight: 600;
        line-height: 1;
        text-align: center;
        text-decoration: none;
        vertical-align: middle;
        border: 1px solid transparent;
        padding: 0.5rem .75rem;
        font-size: .8rem;
        border-radius: .75rem;
        transition: color .15s ease-in-out,background-color .15s ease-in-out,border-color .15s ease-in-out,box-shadow .15s ease-in-out;
        &:hover {
          color: #fff;
          background-color: #6c5dd3;
          border-color: #6c5dd3;
        }
      }
    }
  }
}
`

export const Error = styled.div`
	background-color: ${({ theme }) => theme.bg_error};
	border: 1px solid ${({ theme }) => theme.bd_error};
	padding: 8px 16px;
`
