import styled from 'styled-components'
import { Space } from 'antd'

export const FormWrapper = styled.div`
  .link_path_s3 {
    display: flex;
    align-self: flex-end;
    align-items: center;
    pointer-events: ${({ isDisablePathUploadFile, isDisablePathUploadFileImage }) => (isDisablePathUploadFile || isDisablePathUploadFileImage) && 'none'};
  }
`

export const SpaceWrapper = styled(Space)`
  .ant-picker {
    width: 100%;
  }
  label {
    font-size: ${({ theme }) => theme.size_14};
    cursor: pointer;
  }
  label.ant-radio-wrapper {
    margin-right: 0;
  }
`
