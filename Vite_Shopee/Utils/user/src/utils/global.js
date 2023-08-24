export const setFavicon = (faviconPath) => {
  const faviconElm = document.getElementById('favicon')
  faviconElm.href = faviconPath
}

export const setTitle = (title) => {
  document.title = title
}
