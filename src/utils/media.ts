import dayjs from 'dayjs'

export const setFileName = (req, file, callback) => {
  const [name, extensionName] = file.originalname.split('.')
  const randomName = Array(4)
    .fill(null)
    .map(() => Math.round(Math.random() * 16).toString(16))
    .join('')

  const fileName = `${name}-${randomName}.${extensionName}`
  callback(null, fileName)
}

export const imageFileFilter = (req, file, callback) => {
  if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
    return callback(new Error('Only image files are allowed!'), false)
  }
  callback(null, true)
}

export const generateFilePath = (timestamp?: string | number): string => {
  if (!timestamp) timestamp = Date.now()
  const randomString = () => {
    return Array(8)
      .fill(null)
      .map(() => Math.round(Math.random() * 16).toString(16))
      .join('')
  }
  let random = randomString()

  for (let i = 0; i < 2; i++) {
    random += '-' + randomString()
  }

  return random + '-' + timestamp
}
