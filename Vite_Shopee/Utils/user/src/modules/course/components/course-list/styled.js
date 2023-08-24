import styled from 'styled-components'

export const StyledWrapper = styled.div`
  .course-list-content {
    margin-bottom: 5px;
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    border-radius: 8px;
    width: 100%;
    align-items: center;

    .course-as-list {
      flex: 1;
      display: flex;
      flex-direction: column;
      gap: 10px;
      
      margin-top: 8px;
    }
  }

  .course-tab-content {
    z-index: 0;
    margin-bottom: 5px;
    display: flex;
    flex-wrap: wrap;
    width: 100%;
  }

  .list-empty {
    p {
      text-align: center;
    }
  }
`
