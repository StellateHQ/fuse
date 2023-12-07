const path = require('path')

module.exports = function (code, map) {
  const cwd = process.cwd()

  const { fs, resourcePath } = this

  const results = fs.readdirSync(path.resolve(cwd, 'types'), {
    recursive: true,
  })

  if (
    !resourcePath.includes('fuse/route.ts') &&
    !resourcePath.includes('fuse/server.ts') &&
    !resourcePath.includes('api/fuse.ts')
  )
    return code

  code = `${results.reduce((acc, cur) => {
    let rel = path.relative(this.context, path.resolve(cwd, 'types', cur))

    if (rel === cur) {
      rel = `./${rel}`
    }

    return `${acc}import '${rel}'\n`
  }, '')}\n${code}`

  return code
}
