module.exports = {
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
            removeViewBox: false,
          },
        },
      },
    ],
  },
}
