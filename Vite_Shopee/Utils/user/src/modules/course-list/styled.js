import styled from 'styled-components'

const Wrapper = styled.div`
  display: flex;
  min-width: 700px;
  max-width: 1399px;
  margin: 0px auto;
  justify-content: space-between;
  .ant-divider-vertical {
    height: 100%;
    @media screen and (max-width: 1170px) {
      display: none;
    }
  }
  
  .container {
    background: ${({ theme }) => theme.white};
    display: flex;
    justify-content: center;
    align-items: center;
    .sidebar__icon {
      z-index: 5;
      position: absolute;
      top: 20px;
      left: 10px;
      @media screen and (min-width: 1170px) {
        display: none;
      }
    }
  }
  
  .top {
    position: relative;
    height: 100%;
    z-index: 0;
    min-height: calc(100vh - 244px);
    background: ${({ theme }) => theme.bg_cyan_white};

    @media screen and (min-width: 1170px) {
      min-height: calc(100vh - 254px);
    }

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
        padding-left: 24px;
        line-height: 58px;
      }
    }
    .course-content {
      padding: 5px 8px;
      background: ${({ theme }) => theme.bg_cyan_white};
      .course-type-title {
        margin-bottom: 10px;
        > div {
          border-top-right-radius: 3px;
          border-top-left-radius: 3px;
        }
        p {
          font-weight: 600;
        }
      }
    }
  }
  @media (max-width: 768px) {
    flex-direction: column;
  }
`
export default Wrapper
