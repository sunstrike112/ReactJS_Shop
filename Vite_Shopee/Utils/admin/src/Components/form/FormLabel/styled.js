import { MEDIA_WIDTHS } from 'Themes'
import styled from 'styled-components'

export const Label = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	gap: .5rem;

	width: ${({ width }) => `${width}%`};
	min-height: 100%;
	padding: 16px;

	@media screen and (max-width: ${MEDIA_WIDTHS.upToExtraSmall}px) {
		width: 100%;
		padding-bottom: 5px;
	}
	p {
		flex: 1;
	}
`

export const Content = styled.div`
	display: flex;
	flex-wrap: wrap;
	justify-content: space-between;
	align-items: center;
`

export const Description = styled.span`
	color: ${({ theme }) => theme.white};
	background: ${({ theme, description }) => (description === 'Optional' ? theme.greyHight : theme.bg_primary)};
	padding: 3px 8px;
	border-radius: 1rem;
	font-weight: 600;
	font-size: 10px;
	margin-left: 5px;
`
