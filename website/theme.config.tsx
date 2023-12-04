import { type DocsThemeConfig } from 'nextra-theme-docs'
import { FuseLogoWithName } from './src/components/icons'

const themeConfig: DocsThemeConfig = {
  logo: <FuseLogoWithName />,
  primaryHue: 88,
  primarySaturation: {
    light: 50,
    dark: 99,
  },
  docsRepositoryBase: 'https://github.com/StellateHQ/fuse.js/tree/main/website',

  useNextSeoProps() {
    return {
      titleTemplate: '%s – Fuse.js',
    }
  },

  footer: {
    text: (
      <span>
        © {new Date().getFullYear()}{' '}
        <a href="https://stellate.co" target="_blank">
          Stellate, Inc
        </a>
      </span>
    ),
  },

  gitTimestamp: null,
}

export default themeConfig
