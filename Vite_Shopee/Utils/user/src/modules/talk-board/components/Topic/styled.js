import styled from 'styled-components'

export const Wrapper = styled.div`
    background-color: #F1F1F1;
    background-color: ${({ isRead }) => (isRead ? 'white' : '#F1F1F1')};
    position: relative;
    padding: 16px;
    border: 1px solid ${({ theme }) => theme.grey_blur};
    border-radius: 8px;
    margin-bottom: 20px;
    background-color: ${({ isRead, theme }) => (isRead ? theme.white : theme.grey_blur)};
    .title-wrapper {
        cursor: default;
        .topic__description {
            cursor: pointer;
        }
        .date__group {
            .ant-space-item:nth-child(3) {
                cursor: pointer;
                padding-top: 5px;
            }
        }
    }
    .show__more {
        display: flex;
        cursor: pointer;
    }
    .content__des {
        cursor: pointer;
        line-height: ${({ lineHeight }) => `${lineHeight}`};
        margin-bottom: 8px;
        overflow-wrap: break-word;
        margin-right: 18px;
        display: -webkit-box;
        -webkit-line-clamp: ${({ isShowMore }) => (isShowMore ? 3 : 'unset')};
        -webkit-box-orient: vertical;
        overflow: hidden;
        word-break: break-word;
        white-space: pre-wrap;
    }
    .content {
        .content__title {
            cursor: pointer;
            display: inline-block;
            p:hover {
                color: ${({ theme }) => theme.talk_primary};
            }
        }
        p {
            padding-right: 10px;
            word-break: break-word;
            white-space: pre-line;
        }
    }
    .ant-dropdown {
        min-width: 180px;
        padding: 5px 0;
    }
    .ant-dropdown-menu-item {
        padding: 4px 12px;
        div {
            padding: 6px 14px;
        }
        &:hover {
            background-color: ${({ theme }) => theme.talk_hover};
        }
    }

    .icon-unread {
        position: absolute;
        right: 14px;
        top: 50%;
        transform: translateY(-50%);
        width: 8px;
        height: 8px;
        border-radius: 50%;
        background-color: ${({ theme }) => theme.talk_primary};
    }

    .date__group {
        display: flex;
        align-items: center;
        justify-content: center;
        .ant-space-item img {
            padding-bottom: 3px;
        }
        .anticon {
            color: ${({ theme }) => theme.text_primary};
        }
    }

    .content {
        &__title {
            padding-bottom: 12px;
            position: relative;
            &:after {
                content: '';
                position: absolute;
                bottom: 0;
                left: 0;
                width: 103px;
                height: 1px;
                background-color: black;
            }
        }
        &__des {
            margin: 10px 0;
        }
        &__social {
            display: flex;
            gap: 12px;
            align-items: center;
        }
    }
    p {
        word-break: break-word;
        white-space: pre-line;
    }
`

export const BoxRead = styled.div`
  display: flex;
  align-items: center;
  padding: 11px 14px;
  .text {
    margin-left: 14px;
  }
`
