import styled from 'styled-components'

export const Wrapper = styled.div`
  position: relative;
  display: flex;
  .workspace_avatar {
    width: 40px;
    height: 40px;
    object-fit: cover;
    cursor: pointer;
    border-radius: 5px;
    border: 2px solid ${({ theme, isActive }) => (isActive === true ? theme.green : theme.white)};
  }
  .workspace_box {
    position: absolute;
    z-index: 100;
    top: 45px;
    right: 10px;
    border-radius: 4px;
    border: 1px solid ${({ theme }) => theme.grey_blur};
    width: 220px;
    background: ${({ theme }) => theme.white};
    box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.12);
    .workspace_item {
      height: 40px;
      align-items: center;
      display: flex;
      cursor: pointer;
      padding: 0 20px;

      &.see_more {
        border-top: 1px solid ${({ theme }) => theme.grey_blur};
        .see_more_text {
          width: 100%;
          text-align: center;
        }
      }

      &_img {
        width: 40px;
        height: 90%;
        object-fit: cover;
        margin-right: 12px;
        border-radius: 5px;
      }

      &_name {
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }

      &.active {
        background: ${({ theme }) => theme.green_light};
      }
      &:hover {
        background: ${({ theme }) => theme.green_light};
      }
    }
  }
`
