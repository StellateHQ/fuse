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

  let hasImport = false
  return {
    visitor: {
      Program(path) {
        if (isMjs) {
          hasImport = !!path.node.body.find((node) => {
            if (
              node.type === 'ImportDeclaration' &&
              node.source.value === 'fuse/next/plugin'
            ) {
              return true
            }
          })
        } else {
          hasImport = !!path.node.body.find((node) => {
            if (
              node.type === 'VariableDeclaration' &&
              node.declarations[0].init.type === 'CallExpression' &&
              node.declarations[0].init.callee.name === 'require' &&
              node.declarations[0].init.arguments[0].value ===
                'fuse/next/plugin'
            ) {
              return true
            }
          })
        }

        if (!hasImport) {
          path.node.body.unshift(impo)
        }
      },
      ExportDefaultDeclaration(path) {
        if (isMjs) {
          const currentDeclaration = path.node.declaration
          path.node.declaration = t.callExprssion(
            t.callExpression(t.identifier('nextFusePlugin'), []),
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
            path.node.right = t.callExpression(
              t.callExpression(t.identifier('nextFusePlugin'), []),
              [originalRight],
            )
          }
        }
      },
    },
  }
}

export default plugin
