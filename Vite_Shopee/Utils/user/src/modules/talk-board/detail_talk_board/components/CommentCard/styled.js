import styled from 'styled-components'

export const Wrapper = styled.div`
  background: white;
  padding: 16px;
  position: relative;
  &:after {
    position: absolute;
    content: '';
    bottom: 0;
    width: 100%;
    height: 1px;
    background: #d3d3d3;
  }
  .user {
    .user__avatar {
      img {
        width: 60px;
        height: 60px;
        border-radius: 100%;
        background-color: #d3d3d3;
      }
    }
    .user__name {
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
    .content {
      margin-top: 20px;
      margin-bottom: 20px;
    }
    .like-comment {
      padding-left: 20px;
    }
  }
`
