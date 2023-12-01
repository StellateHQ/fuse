import { type DocsThemeConfig } from 'nextra-theme-docs'
import { FuseLogoWithName } from './src/components/icons'

const themeConfig: DocsThemeConfig = {
  logo: <FuseLogoWithName />,
  primaryHue: 88,
  primarySaturation: 99,

  useNextSeoProps() {
    return {
      titleTemplate: '%s – Fuse.js',
    }
  },
}

export default themeConfig
