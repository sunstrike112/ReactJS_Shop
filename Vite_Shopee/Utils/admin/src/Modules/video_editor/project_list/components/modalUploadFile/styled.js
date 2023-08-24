import styled from 'styled-components'
import { CloudUploadOutlined } from '@ant-design/icons'
import { Upload, Modal } from 'antd'

const ModalUpload = styled(Modal)`
	.ant-modal-content {
		box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.12);
		border-radius: 16px ;
		background: #ffffff;
		width: 520px ;
		min-height: 500px !important;
	}
`

const Container = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
`

const UploadVideo = styled(Upload.Dragger)`
  margin-top: 8px;
	width: 420px !important;
	height: 270px !important;
	background: #f8f9fa !important;
	border: 1px solid #f8f9fa !important;
	border-radius: 8px !important;

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

const Row = styled.div`
  display: flex;
  flex-direction: row;
  width: 420px;
  align-items: center;
`
const Col = styled.div`
  display: flex;
  flex-direction: column;
  width: 420px;
  margin-top: 44px;
`

const Label = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
  flex: 1;
`

const Description = styled.span`
  color: ${({ theme }) => theme.white};
  background: ${({ theme, description }) => (description === 'Optional' ? theme.greyHight : theme.bg_primary)};
  padding: 3px 8px;
  border-radius: 1rem;
  font-weight: 600;
  font-size: 10px;
  margin-left: 5px;
`

export {
  IconUpload,
  UploadVideo,
  Container,
  ModalUpload,
  Row,
  Label,
  Description,
  Col
}
