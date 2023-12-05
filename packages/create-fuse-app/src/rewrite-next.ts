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
        source: '"fuse/next/plugin"',
      })
  // TODO: safeguard against double require/import/export
  return {
    visitor: {
      Program(path) {
        path.node.body.unshift(impo)
      },
      ExportDefaultDeclaration(path) {
        if (isMjs) {
          const currentDeclaration = path.node.declaration
          path.node.declaration = t.callExpression(
            t.identifier('nextFusePlugin'),
            [currentDeclaration],
          )
        }
      },
      AssignmentExpression(path) {
        if (!isMjs) {
          const leftHand = path.node.left
          if (
            leftHand.object.name === 'module' &&
            leftHand.property.name === 'exports'
          ) {
            const originalRight = path.node.right
            path.node.right = t.callExpression(t.identifier('nextFusePlugin'), [
              originalRight,
            ])
          }
        }
      },
    },
  }
}

export default plugin
