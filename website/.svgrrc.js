module.exports = {
  expandProps: false,
  typescript: true,
  outDir: './src/components/icons/',
  prettier: false,
  expandProps: 'end',
  svgProps: {
    'aria-hidden': 'true',
  },
  svgoConfig: {
    plugins: [
      {
        name: 'preset-default',
        params: {
          overrides: {
            // disable a default plugin
            removeViewBox: false,

            // customize the params of a default plugin
            inlineStyles: {
              onlyMatchedOnce: false,
            },
          },
        },
      },
    ],
  },
}
