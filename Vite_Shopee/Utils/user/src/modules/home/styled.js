import styled from 'styled-components'

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  .container {
    background: ${({ theme }) => theme.white};
    padding: 20px;
  }
  
  .top {
    position: relative;
    .course-header {
      width: 300px;
      height: 0; 
      // position: absolute;
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
      }
    }
    .course-content {
      padding: 5px 130px;
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
