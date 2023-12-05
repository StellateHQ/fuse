const plugin = (
  { template, types: t },
  opts: { isMjs: boolean } = { isMjs: false },
) => {
  const buildRequire = template(`const %%importName%% = require(%%source%%);`)
  const isMjs = opts.isMjs || false
  const impo = isMjs
    ? t.importDeclaration(
        [
          t.importSpecifier(
            t.identifier('nextFusePlugin'),
            t.identifier('nextFusePlugin'),
          ),
        ],
        t.stringLiteral('fuse/next/plugin'),
      )
    : buildRequire({
        importName: '{ nextFusePlugin }',
        source: 'fuse/next/plugin',
      })
  return {
    visitor: {
      Program(path) {
        path.node.body.unshift(impo)
      },
      ExportDefaultDeclaration(path) {
        const currentDeclaration = path.node.declaration
        path.node.declaration = t.callExpression(
          t.identifier('nextFusePlugin'),
          [currentDeclaration],
        )
      },
    },
  }
}

export default plugin
