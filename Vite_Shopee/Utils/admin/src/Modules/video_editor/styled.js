import styled from 'styled-components'
import { SubmitButton } from 'Components/ChangePlanModal/styled'
import { Input, Upload, Modal } from 'antd'
import { CloudUploadOutlined } from '@ant-design/icons'
import { TitleWrapper } from '../../Components/title'
import { Content } from '../setting_maintain/styled'

const Wrapper = styled.div`
	min-height: calc(100vh - 39px);
	display: flex;
	width: 100%;
	padding: 0 1rem;
	flex-direction: column;
	overflow: auto;
	color: #323232;
	.flex-wrap {
		display: flex;
		font-weight: 400;
		font-size: 13px;
		line-height: 20px;
	}

`
const ModalUpload = styled(Modal)`
	.ant-modal-content {
		box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.12);
		border-radius: 16px ;
		background: #ffffff;
		width: 519px ;
		min-height: 501px !important;
	}

	.ant-modal-close {
		display: none ;
	}

	.ant-upload-span {
		display: ${({ isShowListFile }) => (isShowListFile ? 'flex' : 'none')};
	}
`

const TitleBar = styled(TitleWrapper)`
	width: 100%;
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	align-items: center;
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

const ButtonFeature = styled(SubmitButton)`
	width: max-content;
	justify-self: end;
	margin-top: 15px;
	p {
		font-weight: 600;
		font-size: 12px;
		line-height: 18px;
	}
`
const ContentItem = styled(Content)``
const CardContent = styled.div`
	display: flex;
	margin-bottom: 24px;
	align-items: center;
	div:nth-child(2){
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		align-items: flex-start;
		div:nth-child(3){
			justify-self: end;
		}
	}
`

const CardThumb = styled.img`
	width: 180px;
	min-width: 180px;
	height: 170px;
	border-radius: 12px;
	margin-right: 24px;
	border: 1px solid #ccc;
`
const CardDescription = styled.div`
	& > p:nth-child(1) {
		font-size: 16px;
		font-weight: 600;
		color: #1a1a1a;
		line-height: 24px;
		margin-bottom: 8px;
	}
	& > p:nth-child(2) {
		font-size: 14px;
		font-weight: 400;
		color: #838383;
		line-height: 21px;
		margin-bottom: 20px;
	}
	& > div {
		display: flex;
	}
	button {
		height: 42px;
	}
	button:nth-child(1) {
		width: 71px;
		margin-right: 8px;
	}
	button:nth-child(2) {
		width: 87px;
		background: ${({ theme }) => theme.bg_danger_strong};
		border: 1px solid ${({ theme }) => theme.bg_danger_strong};
		&:hover,
		&:focus {
			background-color: ${({ theme }) => theme.bg_danger};
			border: 1px solid ${({ theme }) => theme.bg_danger_strong};
		}
	}
`
const WrapperFlex = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
  .text-upload{
    margin-bottom: 12px;
		font-weight: 400;
		font-size: 13px;
		line-height: 20px;
  }
`
const InputForm = styled(Input)`
	background: #f8f9fa;
	border: 1px solid #f8f9fa;
	box-sizing: border-box;
	box-shadow: inset 0px 1px 2px rgba(0, 0, 0, 0.14);
	border-radius: 19px;
	width: 320px;
	height: 38px;
	margin-left: 16px;
	margin-bottom: 44px;
`
const UploadForm = styled(Upload.Dragger)`
	width: 423px !important;
	height: 273px !important;
	background: #f8f9fa !important;
	border: 1px solid #f8f9fa !important;
	border-radius: 8px !important;
	margin-bottom: 32px;
	.ant-upload-drag-icon {
		margin-bottom: 32px;
	}
	.ant-upload-text {
		font-weight: 600;
		font-size: 19px;
		line-height: 28px;
		margin-bottom: 12px;
	}
	.ant-upload-hint {
		font-weight: 400;
		font-size: 13px;
		line-height: 20px;
	}
`
const IconUpload = styled(CloudUploadOutlined)`
	svg {
		width: 80px;
		height: 80px;
		color: #000;
	}
`
export {
  CardThumb,
  Wrapper,
  TitleBar,
  ButtonFeature,
  ContentItem,
  CardContent,
  CardDescription,
  WrapperFlex,
  InputForm,
  UploadForm,
  IconUpload,
  ModalUpload
}
