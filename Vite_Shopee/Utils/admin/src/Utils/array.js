import i18next from 'i18next'
import { concat, isEmpty } from 'lodash'
import { FILE_SMARTPHONE } from '../Constants'

i18next.setDefaultNamespace('upload_file')

export const swap = (arr, index1, index2) => {
  [arr[index1], arr[index2]] = [arr[index2], arr[index1]]
  return arr
}

export const normailizeFolderTree = (childFolders, parentKey, parentName, breadcrumbParent = []) => childFolders.map((item) => {
  const key = parentKey ? `${parentKey}-${item.id}` : String(item.id)
  const folderParent = parentName ? `${parentName} > ${item.name}` : item.name
  const title = () => {
    if (item.keyFile) return i18next.t(`upload_file:${item.keyFile}`)
    if (item.name === FILE_SMARTPHONE) return i18next.t('upload_file:FILE_FOR_SMARTPHONE')
    return item.name
  }
  const breadcrumb = [...breadcrumbParent, {
    key: item.id,
    text: title(),
    data: {
      ...item,
      keyFile: item.name === FILE_SMARTPHONE ? 'FILE_FOR_SMARTPHONE' : item.keyFile
    }
  }]
  return {
    title,
    key,
    children: item.childFolders.length > 0 ? normailizeFolderTree(item.childFolders, key, folderParent, breadcrumb) : [],
    data: { ...item, breadcrumb, folderParent }
  }
})

export const findDeepFolderTree = (arr, id) => arr.reduce((result, node) => {
  if (isEmpty(result)) {
    if (node?.data?.id === +id) {
      return node
    }
    return findDeepFolderTree(node.children, id)
  }
  return result
}, {})

export const normailizeGroupTree = (childList, parentKey) => childList.map((item) => {
  const key = parentKey ? `${parentKey}-${item.departmentId}` : item.departmentId
  return {
    title: item.name,
    key,
    children: item.childList?.length > 0 ? normailizeGroupTree(item.childList, key) : [],
    data: item
  }
})

export const normailizeAttributeTree = (childList, parentKey) => childList.map((item) => {
  const key = parentKey ? `${parentKey}-${item.departmentId}` : item.departmentId
  return {
    title: item.attributeName,
    key,
    children: item.childList?.length > 0 ? normailizeAttributeTree(item.childList, key) : [],
    data: item
  }
})

export const mapDeepGroupTree = (children = []) => children.reduce((result, item) => {
  const temp = String(item.key).split('-')
  const id = temp[temp.length - 1]
  result.push(+id)
  if (item.children) {
    result.push(...mapDeepGroupTree(item.children))
  }

  return result
}, [])

export const mapDeepGroupKey = (data = []) => data.reduce((result, item) => {
  result.push(item.key)
  if (item.children.length) {
    result.push(...mapDeepGroupKey(item.children))
  }

  return result
}, [])

export const normailizeListCategoryTree = (child) => child.map((item) => {
  const key = item.id ? item.id : `-${item.categoryId}${item.listCourseCategoryChild?.categoryId || ''}`
  const mergeCategoryAndCourse = concat(item.listCourseDtos || [], item.listCourseCategoryChild || [])

  return {
    id: item.id,
    title: item.categoryName || item.name,
    key,
    children: mergeCategoryAndCourse.length > 0 ? normailizeListCategoryTree(mergeCategoryAndCourse) : null
  }
})

export const removeFromArray = (arr, arrRemove) => arr.filter((element) => !arrRemove.includes(element))
