// This is a generated file!

const files = require.context('../types', true, /.ts$/)
files
  .keys()
  .filter((path: string) => path.includes('types/'))
  .forEach(files)

export { executeQuery, executeMutation } from 'fuse/next/server'
