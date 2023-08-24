import { Block, Table } from 'Themes/facit'
import styled from 'styled-components'

export const StyledWrapper = styled.div`
	width: 50%;
	display: flex;
	flex-direction: column;
`
export const InfoWrapper = styled.div`
	color: ${({ theme }) => theme.text_primary};
`

export const StyledPlanPackage = styled(Block)`
	margin-bottom: 0;
	flex: 1;
	.btn_cancel {
		font-family: 'Kokono', sans-serif;
	}

	img {
		width: 100%;
	}

	.planName {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding-bottom: 10px;
		height: 45px;
		p {
			width: 50%;
		}
		div {
			width: 50%;
			text-align: right;
			padding-right: 15px;
			svg {
				cursor: pointer;
			}
		}
	}

	.th {
		width: 150px;
		padding: 0.5rem;
	}

	.ant-progress-outer {
		width: 95%;
	}
`

export const StyledPaymentHistories = styled(Block)`
	flex: 1;
	.selectMonthBox {
		width: 50%;
		display: flex;
		justify-content: end;
		align-items: center;
		p {
			display: inline-block;
			margin-right: 10px;
		}
	}
	table {
		width: 100%;
	}

	.planName {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding-bottom: 10px;
		height: 45px;
	}

	.paymentInfo {
		height: 90%;
		display: flex;
		flex-direction: column;
	}

	.textAlign {
		text-align: center;
	}

	.buttonGroup {
		display: flex;
		justify-content: center;
		gap: 1rem;
	}
`

export const StyledTable = styled(Table)`
	width: 100%;
	margin: 1rem 0;
`

export const CompanyInfoHeader = styled.table`
	width: 100%;
	margin-bottom: 10px;
`
