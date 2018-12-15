let formatFileSize = fileSize => {
  let temp
  if (fileSize < 1024) {
    return fileSize + 'B'
  } else if (fileSize < 1024 * 1024) {
    temp = fileSize / 1024
    temp = temp.toFixed(2)
    return temp + 'KB'
  } else if (fileSize < 1024 * 1024 * 1024) {
    temp = fileSize / (1024 * 1024)
    temp = temp.toFixed(2)
    return temp + 'MB'
  } else {
    temp = fileSize / (1024 * 1024 * 1024)
    temp = temp.toFixed(2)
    return temp + 'GB'
  }
}
let isType = (type) => {
  switch (type) {
    case 'image/png':
      return 'icon-image1'
    case 'image/gif':
      return 'icon-image1'
    case 'image/jpeg':
      return 'icon-image1'
    case 'image/webp':
      return 'icon-image1'
    case 'application/msword':
      return 'icon-word1'
    case 'application/vnd.openxmlformats-officedocument.wordprocessingml.document':
      return 'icon-word1'
    case 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet':
      return 'icon-excel1'
    case 'application/vnd.openxmlformats-officedocument.presentationml.presentation':
      return 'icon-ppt1'
    case 'application/vnd.ms-powerpoint':
      return 'icon-ppt1'
    case 'application/vnd.ms-excel':
      return 'icon-excel1'
    case 'application/pdf':
      return 'icon-pdf1'
    case 'text/plain':
      return 'icon-txt1'
    case 'video/mp4':
      return 'icon-video1'
    default:
      return 'icon-unknown1'
  }
}
let isSuffix = (type) => {
  switch (type) {
    case 'PNG':
      return 'icon-image1'
    case 'GIF':
      return 'icon-image1'
    case 'JPEG':
      return 'icon-image1'
    case 'JPG':
      return 'icon-image1'
    case 'DOC':
      return 'icon-word1'
    case 'DOCX':
      return 'icon-word1'
    case 'XLS':
      return 'icon-excel1'
    case 'PPT':
      return 'icon-ppt1'
    case 'PPTX':
      return 'icon-ppt1'
    case 'XLSX':
      return 'icon-excel1'
    case 'PDF':
      return 'icon-pdf1'
    case 'TXT':
      return 'icon-txt1'
    case 'MP4':
      return 'icon-video1'
    default:
      return 'icon-unknown1'
  }
}
export {
  formatFileSize,
  isType,
  isSuffix
}
