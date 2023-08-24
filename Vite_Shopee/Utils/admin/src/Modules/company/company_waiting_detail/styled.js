import { Row } from 'Themes/facit'
import styled from 'styled-components'

export const StyledTableInfo = styled.table`
  width: 100%;
  margin-top : 5px;
`

export const StyledButtons = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	gap: .5rem;

	margin: .5rem 0;
`

export const StyledRow = styled(Row)`
	width: 60%;

	.input {
		width: 50%;
	}
`

export const StyledEditMemoWrapper = styled.div`
	display: flex;
	align-items: center;
	gap: 1rem;

	.memo {
		max-width: 90%;
	}

	.ant-form-item {
		width: 90%;
	}
`
