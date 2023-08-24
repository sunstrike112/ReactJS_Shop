import { NormalButton } from 'Components'
import { Block, Td, Th } from 'Themes/facit'
import styled from 'styled-components'

export const StyledWrapper = styled(Block)`
	flex: 1;
`
export const InfoWrapper = styled.div`
	display: flex;
	flex-direction: ${({ isWorkspaceAdmin }) => (isWorkspaceAdmin ? 'row' : 'column')};
	gap: 1rem;
	color: ${({ theme }) => theme.text_primary};
	.info {
		flex: 1;
		.init__display {
			display: flex;
			gap: 2rem;
			p {
				margin-bottom: 0;
			}
		}
		table {
			width: 100%;
			margin: 0;
		}
	}
`
export const StyledAvatarWrapper = styled.div`
	.content {
		display: flex;
		flex-direction: ${({ isWorkspaceAdmin }) => (isWorkspaceAdmin ? 'column' : 'row')};
		align-items: center;
		gap: 1rem;
		margin-bottom: 0.5rem;
		.avatar {
			position: relative;
			img {
				width: 130px;
				height: 130px;
				object-fit: contain;
			}

			&__upload {
				position: absolute;
				inset: 0;
				display: flex;
				justify-content: center;
				align-items: center;
				border: none;
				opacity: 0;
				cursor: pointer;
				transition: ease 0.5s;
				&.loading {
					opacity: 0.5;
				}
				&:hover {
					opacity: 0.5;
				}
				svg {
					width: 24px;
					height: 24px;
				}
			}
		}

		.description {
		}
	}
`

export const CompanyInfoHeader = styled.table`
	width: 100%;
	margin-bottom: 10px;

	.ant-spin-nested-loading {
		margin-left: 20px;
	}

	.form_planZZ {
		display: flex;
		align-items: center;
	}

	.update__trial {
		display: flex;
		align-items: center;

		&__date {
			width: 200px;
		}

		&__btn {
			margin: 0 0 0 20px;
		}

		.ant-form-item {
			margin-bottom: 0;
			max-width: 200px;
		}
	}
`

export const StyledTd = styled(Td)`
	padding: ${({ isKeepPadding }) => (isKeepPadding ? '1rem 1rem' : '.5rem 1rem')};
`

export const StyledTh = styled(Th)`
	padding: .5rem 1rem;
	width: 220px;
`

export const SubmitButton = styled(NormalButton)`
	background: ${({ theme }) => theme.bg_primary};
	border: 1px solid ${({ theme }) => theme.bg_primary};
	color: ${({ theme }) => theme.white}!important;
	font-weight: 600;
	font-size: 0.75rem;
	padding: 0.4rem 1.75rem;
	height: auto;
	border-radius: 0.75rem;
	margin: 10px auto 0;
	&:hover,
	&:focus {
		background-color: #5d4eb3;
		border-color: #5d4eb3;
		color: ${({ theme }) => theme.white}!important;
	}
	p {
		color: ${({ theme }) => theme.white}!important;
	}
`
