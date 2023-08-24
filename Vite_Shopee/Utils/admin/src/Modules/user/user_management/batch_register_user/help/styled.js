import styled from 'styled-components'

export const Wrapper = styled.div`
  display: flex;
  width: 100%;
  background-color: #fff;
  flex-direction: column;
  overflow: auto;
  
  .title, .content {
    margin-top: .5rem;
    padding: 0 24px;
  }
  .content {
    table {
      border: 1px solid #ccc;
      text-align: left;

      tbody {
        tr:first-child {
          background-color: #f9f9f9;
          th {
            /* border: 1px solid #ccc; */
            padding: .5rem;

            &:nth-child(1) {
              width: 30%
            }
            &:nth-child(2) {
              width: 70%
            }
          }
        }
        tr:not(:first-child) {
          th {
            border: 1px solid #ccc;
            font-weight: 500;
            padding: .5rem;
          }
          &:nth-child(odd) {
            background-color: #f9f9f9;
          }
        }
      }
    }
  }
`
