import styled from 'styled-components'
import { Form } from 'antd'

export const WrapperFormItem = styled(Form.Item)`
	height: max-content;
	width: 100%;
	margin-bottom: 10px;

	.ant-input {
		min-height: 38px;
		border-radius: 4px;
	}

	.ant-form-item-label {
		font-size: 14px;
		overflow: unset;
		white-space: unset;
		.ant-form-item-no-colon {
			height: 100%;
		}
	}

	.ant-input-affix-wrapper {
		padding-top: 1px;
		padding-bottom: 1px;

		&:not(.ant-input-affix-wrapper-disabled) {
			&:hover {
				border-color: #b6aee9;
			}
		}

		&.ant-input-affix-wrapper-status-error {
			.ant-input {
				background: ${({ theme }) => theme.white};
			}
		}

		.ant-input {
			border: none;
			outline: 0;
			box-shadow: none;
			border-radius: 0 !important;

			&:focus,
			&:hover {
				border-color: none;
				outline: 0;
				box-shadow: none;
			}
		}
	}
`

export const WrapperLabel = styled.div`
	width: 100%;
	font-size: 13px;
`
