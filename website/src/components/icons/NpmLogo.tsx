import * as React from 'react'
import type { SVGProps } from 'react'
const SvgNpmLogo = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={20}
    height={20}
    fill="none"
    viewBox="0 0 20 20"
    aria-hidden="true"
    {...props}
  >
    <path
      fill="currentColor"
      d="M1 19V1h18v18zM4.273 4.273v11.044h5.58V6.576h3.251v8.742h2.214V4.273z"
    />
  </svg>
)
export default SvgNpmLogo
