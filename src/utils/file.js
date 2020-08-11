const convertImgToBase64Syc = (img) => {
  const canvas = document.createElement('canvas')
  canvas.width = img.width
  canvas.height = img.height
  const ctx = canvas.getContext('2d')
  ctx.drawImage(img, 0, 0, img.width, img.height)
  const ext = img.src.substring(img.src.lastIndexOf('.') + 1).toLowerCase()
  return canvas.toDataURL('image/' + ext)
}
const convertImgToBase64 = img => {
  return Promise.resolve(convertImgToBase64Syc(img))
}
const convertImgUrlToImg = url => {
  return new Promise((resolve, reject) => {
    const img = new Image()
    img.crossOrigin = 'Anonymous'
    img.src = url
    img.onload = () => {
      resolve(img)
    }
    img.onerror = () => reject(new Error(`loading image url (${url}) error`))
  })
}

const convertImgToFile = img => {
  return new Promise(resolve => {
    convertImgToBlob(img).then(data => {
      const file = new File([data], data.name)
      file.fullName = data.fullName
      resolve(file)
    })
  })
}
const convertImgToBlob = (img) => {
  const canvas = document.createElement('canvas')
  canvas.width = img.width
  canvas.height = img.height
  const ctx = canvas.getContext('2d')
  ctx.drawImage(img, 0, 0, img.width, img.height)
  const fullName = img.src.substring(img.src.lastIndexOf('/') + 1).toLowerCase()
  const [ name, ext ] = fullName.split('.')
  return new Promise(resolve => {
    canvas.toBlob((res) => {
      res.name = name
      res.fullName = fullName
      resolve(res)
    }, ext)
  })
}
const convertImgUrlToFile = url => {
  return new Promise((resolve, reject) => {
    convertImgUrlToImg(url).then(img => {
      console.log(img)
      console.log('==')
      convertImgToFile(img).then(resolve)
    }).catch(reject)
  })
}

const convertImgUrlToBlob = url => {
  return new Promise((resolve, reject) => {
    convertImgUrlToImg(url).then(img => {
      convertImgToBlob(img).then(resolve)
    }).catch(reject)
  })
}

export {
  convertImgUrlToBlob,
  convertImgUrlToFile,
  convertImgToBase64,
  convertImgToBase64Syc
}
