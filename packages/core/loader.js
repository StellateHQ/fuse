const path = require('path')

module.exports = function (code, map) {
  const { fs, resourcePath, rootContext: cwd } = this

  if (
    !resourcePath.includes('fuse/route.ts') &&
    !resourcePath.includes('fuse/server.ts') &&
    !resourcePath.includes('api/fuse.ts')
  )
    return code

  if (code.includes('require.context(')) {
    console.warn(
      'Found require.context in code, this can be removed from the codebase.',
    )
    return code
  }

  let hasSrcDir = false
  try {
    fs.statSync(path.resolve(cwd, 'src'))
    hasSrcDir = true
  } catch (e) {}

  let hasTypesDir = false
  try {
    fs.statSync(
      hasSrcDir
        ? path.resolve(cwd, 'src', 'types')
        : path.resolve(cwd, 'types'),
    )
    hasTypesDir = true
  } catch (e) {}

  const results = fs.readdirSync(
    hasSrcDir ? path.resolve(cwd, 'src', 'types') : path.resolve(cwd, 'types'),
    {
      recursive: true,
    },
  )

  code = `${results.reduce((acc, cur) => {
    let rel = path.relative(this.context, path.resolve(cwd, 'types', cur))

    if (rel === cur) {
      rel = `./${rel}`
    }

    return `${acc}import '${rel}'\n`
  }, '')}\n${code}`

  return code
}
