import styled from 'styled-components'

export const Wrapper = styled.div`
  border-radius: 12px;

  .header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 32px 32px 15px 32px;

    &__close {
      cursor: pointer;
    }
  }

  .users {
    padding: 22px 32px;
    height: 45vh;
    overflow-y: scroll;
    position: relative;
    ::-webkit-scrollbar {
      width: 4px;
    }
    ::-webkit-scrollbar-thumb {
      background: #838383;
    }
    &__search__empty {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      &--text {
        margin-top: 8px;
        text-align: center;
      }
    }
    .user {
      display: flex;
      align-items: center;
      margin-bottom: 16px;
      &__avatar {
        margin-right: 8px;
      }
    }
  }

  .ant-tabs {
    .ant-tabs-nav {
      padding: 0 28px;
      margin-bottom: 0;
      .ant-tabs-tab {
        padding: 0 5px 8px 5px;
        &:hover {
          color: ${({ theme }) => theme.talk_primary};
        }
        .ant-tabs-tab-btn {
          &:active {
            color: ${({ theme }) => theme.talk_primary};
          }
        }
        &.ant-tabs-tab-active {
          .ant-tabs-tab-btn {
            color: ${({ theme }) => theme.talk_primary};
          }
        }
      }
      .tab__like {
        display: flex;
        align-items: center;
        &__icon {
          margin-right: 6px;
        }
      }
      .ant-tabs-ink-bar {
        background: ${({ theme }) => theme.talk_primary};
     }
    }
  }
`
