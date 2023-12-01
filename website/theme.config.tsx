import { type DocsThemeConfig } from 'nextra-theme-docs'
import { FuseLogoWithName } from './src/components/icons'

const themeConfig: DocsThemeConfig = {
  logo: <FuseLogoWithName />,
  primaryHue: 88,
  primarySaturation: {
    light: 65,
    dark: 99,
  },
  docsRepositoryBase: 'https://github.com/StellateHQ/fuse.js/tree/main/website',

  useNextSeoProps() {
    return {
      titleTemplate: '%s – Fuse.js',
    }
  },

  gitTimestamp: null,
}

export default themeConfig
