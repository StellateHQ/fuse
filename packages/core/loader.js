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

  function getFiles(dir, files = []) {
    // Get an array of all files and directories in the passed directory using fs.readdirSync
    const fileList = fs.readdirSync(dir)
    // Create the full path of the file/directory by concatenating the passed directory and file/directory name
    for (const file of fileList) {
      const name = `${dir}/${file}`
      // Check if the current file/directory is a directory using fs.statSync
      if (fs.statSync(name).isDirectory()) {
        // If it is a directory, recursively call the getFiles function with the directory path and the files array
        getFiles(name, files)
      } else {
        // If it is a file, push the full path to the files array
        files.push(name)
      }
    }
    return files
  }

  const results = getFiles(
    hasSrcDir ? path.resolve(cwd, 'src', 'types') : path.resolve(cwd, 'types'),
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
