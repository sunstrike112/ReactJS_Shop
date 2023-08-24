import styled from 'styled-components'
import { Wrapper as WrapperFacit } from 'Themes/facit'
import { Button } from 'antd'
import { MEDIA_WIDTHS } from 'Themes'

import { TitleWrapper } from '../../../Components/title/styled'
import { Content } from '../../setting_maintain/styled'

const Container = styled(WrapperFacit)`
  min-height: calc(100vh - 64px);
	margin: 8px 0;
`

const TitleBar = styled(TitleWrapper)`
	width: 100%;
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	align-items: center;
	margin: 0;
	.left {
		font-size: 1.2rem;
		svg {
			margin-right: 6px;
		}
		+ button {
			margin-top: 0px;
		}
	}
`

const ButtonStyled = styled(Button)`
  max-height: 36px;

  &.btn_edit, 
  &.btn_upload {
    background: ${({ theme }) => theme.bg_primary};
    color: ${({ theme }) => theme.white};
  }
  &.btn_upload {
		height: 42px;
  }

  &.ant-btn[disabled], .ant-btn[disabled]:hover, .ant-btn[disabled]:focus, .ant-btn[disabled]:active {
    background: #f5f5f5;
    color: rgba(0, 0, 0, 0.25);
  }

`

const Wrapper = styled(Content)`
	min-height: calc(100vh - 128px);

	.list_top {
		display: flex;
		justify-content: space-between;
		align-items: center;
		gap: 10px;
		margin-bottom: 24px;

		.title_list {
			font-size: 16px;
			font-weight: bold;
			span {
				font-weight: 500;
				margin-left: 8px;
				font-size: 10px;
				opacity: .7;
			}
		}
	}
	
	.empty_project {
		margin-top: 100px;
		width: 100%;
		display: flex;
		justify-content: center;
	}
	.list_project{
		--gap-size: 32px;
		display: flex;
		width: 100%;
		gap: var(--gap-size);
		flex-direction: row;
		flex-wrap: wrap;
		justify-content: space-between;
		.card-item {
			width: 100%;
	
			@media screen and (max-width: ${MEDIA_WIDTHS.upToLarge}px) {
				max-width: 100%;
			}
		}
	}
`
export {
  Container,
  TitleBar,
  ButtonStyled,
  Wrapper
}
