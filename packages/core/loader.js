const path = require('path')

module.exports = function (code) {
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
  const typesDir = hasSrcDir
    ? path.resolve(cwd, 'src', 'types')
    : path.resolve(cwd, 'types')
  try {
    fs.statSync(typesDir)
    hasTypesDir = true
  } catch (e) {}

  if (!hasTypesDir) {
    return code
  }

  function getFiles(dir, files = []) {
    const fileList = fs.readdirSync(dir)
    for (const file of fileList) {
      const name = `${dir}/${file}`
      if (fs.statSync(name).isDirectory()) {
        getFiles(name, files)
      } else {
        files.push(name)
      }
    }
    return files
  }

  const results = getFiles(typesDir)

  code = `${results.reduce((acc, cur) => {
    const curPath = path.resolve(typesDir, cur)
    let rel = path.relative(this.context, curPath)

    if (rel === cur) {
      rel = `./${rel}`
    }

    return `${acc}import '${rel}'\n`
  }, '')}\n${code}`

  return code
}
