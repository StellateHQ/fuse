const path = require('path')

module.exports = function (code, map) {
  const cwd = process.cwd()

  const { fs, resourcePath } = this

  console.log('Transforming', resourcePath)
  const results = fs.readdirSync(path.resolve(cwd, 'types'), {
    recursive: true,
  })
  code = `${results.reduce(
    (acc, cur) =>
      `${acc}\nimport '${path.relative(
        this.context,
        path.resolve(cwd, 'types'),
      )}/${cur}'`,
    '',
  )}\n\n${code}`
  console.log(code)
  return code
}
