import { LECTURES_FILES, VIDEO_RECORDING, FILE_SMARTPHONE, RECORDING, FOLDER_KEYFILE, MARK_SPLIT } from '../Constants'

export function getText(html) {
  let divContainer = document.createElement('div')
  divContainer.innerHTML = html
  return divContainer.textContent || divContainer.innerText || ''
}

export function formatMoney(amount, suffix = '￥') {
  return `${amount}${suffix}`
}

export function formatOption(text, options) {
  return options.find((opt) => opt.value === text?.trim())?.label || ''
}

export function stripHTML(string) {
  let tmp = document.createElement('DIV')
  tmp.innerHTML = string
  return tmp.textContent || tmp.innerText || ''
}

export function renderQuestionType(t, type) {
  switch (type) {
    case 'CHOOSE_MANY': return t('unit_setting:question_setting.multiple_choice')
    case 'DESCRIPTION': return t('unit_setting:question_setting.description_choice')
    case 'SELECT_ONE': return t('unit_setting:question_setting.single_choice')
    default:
      return '-'
  }
}

export function renderTypeAnswer(t, type) {
  switch (type) {
    case 'UNREQUIRED':
      return t('common:label_optional')
    case 'REQUIRED':
      return t('common:label_required')
    default:
      return '-'
  }
}

export function camel2Text(key) {
  const result = key.replace(/([A-Z])/g, ' $1')
  const finalResult = result.charAt(0).toUpperCase() + result.slice(1)
  return finalResult
}

export function replaceToPassword(string) {
  return string.replaceAll(/./g, '*')
}

export function translateFolderName(folderName, folderKeyFile, defaultLectureName, defaultVideoName, defaultFileSmartphone, defaultRecording) {
  const folderNameArr = folderName.split(MARK_SPLIT)
  switch (folderNameArr[0]) {
    case LECTURES_FILES:
      folderNameArr.splice(0, 1, defaultLectureName)
      if (folderNameArr[1] === VIDEO_RECORDING) {
        folderNameArr.splice(1, 1, defaultVideoName)
      }
      break
    case FILE_SMARTPHONE:
      folderNameArr.splice(0, 1, defaultFileSmartphone)
      break
    case RECORDING:
      if (folderKeyFile === FOLDER_KEYFILE) {
        folderNameArr.splice(0, 1, defaultRecording)
      }
      break
    default:
      break
  }
  return folderNameArr.join(MARK_SPLIT)
}
