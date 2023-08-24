export const normalizeGroupsTree = (groups, parentKey) => groups.map((group) => {
  const key = parentKey ? `${parentKey}-${group.departmentId}` : group.departmentId
  return {
    title: group.name,
    key,
    children: group.childList?.length > 0 ? normalizeGroupsTree(group.childList, key) : [],
    data: group
  }
})

export const normalizeAttributesTree = (attributes, parentKey) => attributes.map((attribute) => {
  const key = parentKey ? `${parentKey}-${attribute.key}` : attribute.key
  return {
    title: attribute.title,
    key,
    children: attribute.childList?.length > 0 ? normalizeAttributesTree(attribute.childList, key) : [],
    data: attribute
  }
})

export const flatKeys = (array = [], key) => array
  .flatMap((item) => [item[key]]
    .concat(item.children || item.childList ? flatKeys(item.children || item.childList, key) : []))
