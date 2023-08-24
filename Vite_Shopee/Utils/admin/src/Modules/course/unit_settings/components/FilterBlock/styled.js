import styled from 'styled-components'

import { InputSmall, Submit } from 'Components'

export const FilterWrapper = styled.div`
  display: flex;
`

export const Row = styled.div`
  display: flex;
  justify-content: ${(props) => (props.justifyContent || 'start')};
`

export const Form = styled.form`
`

export const FormGroup = styled.div`
  display: flex;
  align-items: center;
`

export const Label = styled.label`
  
`

export const InputField = styled(InputSmall)`
  
`

export const DropdownField = styled(InputSmall)`
  
`

export const ApplyFilterButton = styled(Submit)`
  
`
