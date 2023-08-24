import { NormalButton } from 'Components'
import styled from 'styled-components'

export const Wrapper = styled.section`
	width: 100%;
	padding: 16px;
	margin-top: 1rem;
	background: ${({ theme }) => theme.white};
	border-radius: 1rem;
	box-shadow: 0px 4px 4px rgb(0 0 0 / 5%);
	.ant-form-item {
		margin-bottom: 0;
	}
`

export const SubmitButton = styled(NormalButton)`
	background: ${({ theme }) => theme.bg_primary};
	border: 1px solid ${({ theme }) => theme.bg_primary};
	color: ${({ theme }) => theme.white};
	font-weight: 600;
	font-size: 0.75rem;
	padding: 0.5rem 1.75rem;
	height: max-content;
	border-radius: 0.75rem;
	&:hover,
	&:focus {
		background-color: #5d4eb3;
		border-color: #5d4eb3;
		color: ${({ theme }) => theme.white};
	}
`
