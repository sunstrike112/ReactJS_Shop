import { v5 as uuidv5 } from 'uuid'
import { v4 as uuidv4 } from 'uuid'
const MY_NAMESPACE = '0406bea7-f9a4-4a39-b14a-f922314928cd'

export const fromString = (text: any) => {
  return uuidv5(text, MY_NAMESPACE)
}

export const randomUuid = () => {
  return uuidv4()
}
