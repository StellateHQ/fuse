import type { Config } from 'tailwindcss'
import colors from 'tailwindcss/colors'

const customColors = {
  gravel: {
    '50': '#F8F8F7',
    '100': '#EBEBEA',
    '200': '#DCDCDA',
    '300': '#CDCDCB',
    '400': '#BCBCB8',
    '500': '#92928C',
    '600': '#73736D',
    '700': '#474743',
    '800': '#222221',
    '900': '#191918',
    '950': '#141413',
  },
  starship: {
    '50': '#FAFFDB',
    '100': '#F7FFC2',
    '200': '#F0FF94',
    '300': '#E9FE62',
    '400': '#E3FE34',
    '500': '#DBFE01',
    '600': '#B0CB01',
    '700': '#849801',
    '800': '#586600',
    '900': '#2C3300',
    '950': '#161900',
  },
  'graphq-pink': '#E535AB',
} as const

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,md,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,md,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,md,mdx}',
  ],
  theme: {
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      black: colors.black,
      white: colors.white,
      ...customColors,
    },
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'text-starship-gradient':
          'linear-gradient(80deg, #DBFE01 59.53%, #DBFE01 67.47%, #77DA05 84.41%)',
        'dark-card-gradient': `linear-gradient(180deg, rgba(218, 218, 218, 0.2) 0%,  rgba(218, 218, 218, 0) 90%)`,
        'steps-line-gradient':
          'linear-gradient(180deg, rgba(219, 254, 1, 0.00) -0.85%, #77DA05 18.91%, rgba(119, 218, 5, 0.00) 101.69%)',
        'vertical-line-gradient':
          'linear-gradient(180deg, rgba(242, 242, 242, 0) 0%, rgba(242, 242, 242, 0) 15%, rgba(242, 242, 242, 0.06) 100%)',
      },
      fontFamily: {
        sans: ['var(--font-geist-sans)'],
        mono: ['var(--font-geist-mono)'],
      },
      boxShadow: {
        actions:
          '0px 3px 12px 0px rgba(57, 73, 98, 0.08), 0px 2px 8px 0px rgba(57, 73, 98, 0.04), 0px -1px 2px 0px rgba(57, 73, 98, 0.02), 0px 0px 0px 1px rgba(57, 73, 98, 0.02);',
        card: '0px 1px 3px -1.25px rgba(0, 0, 0, 0.04), 0px 3px 12px -2.5px rgba(0, 0, 0, 0.03), 0px 10px 50px -3.75px rgba(0, 0, 0, 0.10);',
        video:
          '0px 6px 24px 0px rgba(0, 0, 0, 0.12), 0px 12px 16px 0px rgba(0, 0, 0, 0.14), 0px 8px 8px 0px rgba(0, 0, 0, 0.20), 0px 0px 0px 1px #222221, 0px 4px 4px 0px rgba(0, 0, 0, 0.25)',
        'dark-button-hover-shadow':
          '0px 3px 12px 0px rgba(34, 34, 33, 0.08), 0px 2px 8px 0px rgba(34, 34, 33, 0.04), 0px -1px 2px 0px rgba(34, 34, 33, 0.02), 0px 0px 0px 0.5px rgba(115, 115, 109, 0.40);',
        'starship-button-hover-shadow':
          '0px 3px 12px 0px rgba(34, 34, 33, 0.08), 0px 2px 8px 0px rgba(34, 34, 33, 0.04), 0px -1px 2px 0px rgba(34, 34, 33, 0.02), 0px 0px 0px 0.5px rgba(176, 203, 1, 0.40);',
        'light-button-hover-shadow':
          '0px 3px 12px 0px rgba(34, 34, 33, 0.08), 0px 2px 8px 0px rgba(34, 34, 33, 0.04), 0px -1px 2px 0px rgba(34, 34, 33, 0.02), 0px 0px 0px 0.5px rgba(115, 115, 109, 0.40);',
      },
    },
  },
  plugins: [],
}
export default config
