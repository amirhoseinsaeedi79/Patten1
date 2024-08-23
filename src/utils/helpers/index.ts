export const bToA = (obj: object) => {
  return btoa(unescape(encodeURIComponent(JSON.stringify(obj))))
}

export const aToB = (data: string) => {
  return JSON.parse(decodeURIComponent(escape(atob(data))))
}

export const fileToBase64 = (file: File) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () => resolve(reader.result)
    reader.onerror = reject
  })
