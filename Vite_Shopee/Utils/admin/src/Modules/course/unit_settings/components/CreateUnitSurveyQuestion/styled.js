import styled from 'styled-components'
import { Divider as DividerAntd } from 'antd'

export const Wrapper = styled.div`
	.dynamic-wrapper {
		position: relative;
		.dynamic-button {
			position: absolute;
			bottom: 25px;
			right: 10px;
			.add {
				margin-right: .2rem;
			}
		}
	}
	.back-button {
		margin-bottom: 1rem;
	}
`

export const ListButton = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
  .button__submit {
    margin-left: 5px;
    padding: 20px;
  }
  .icon {
    fill: ${({ theme }) => theme.white};
  }
`

export const Divider = styled(DividerAntd)`
  height: 2px;
  padding: 0;
  margin: 0;
`
export const Row = styled.div`
  display: flex;
  flex-direction: row;
`
export const Left = styled.div`
  display: flex;
  width: 30%;
  background-color: ${({ theme }) => theme.bg_primary};
  padding: 16px;
  span {
    font-weight: 600;
  }
`

export const Right = styled.div`
  display: flex;
  width: 70%;
  padding: 16px;
  flex-direction: column;
  .react-select-container {
    width: 100%;
  }
  .upload-button {
    display: flex;
    align-items: center;
    border-radius: 4px;
    margin-bottom: 4px;
    span {
      margin-left: 8px;
    }
  }
`

export const UploadButton = styled.section`
  display: flex;

  .remove-upload-button {
    margin-right: 8px;
  }
`
