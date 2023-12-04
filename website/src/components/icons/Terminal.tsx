import * as React from 'react'
import type { SVGProps } from 'react'
const SvgTerminal = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    fill="none"
    viewBox="0 0 24 24"
    aria-hidden="true"
    {...props}
  >
    <g
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.2}
    >
      <path d="M3.334 20.667A1.334 1.334 0 0 1 2 19.333V4.77a1.44 1.44 0 0 1 1.435-1.436h17.136a1.433 1.433 0 0 1 1.429 1.429V19.23a1.44 1.44 0 0 1-1.436 1.436z" />
      <path d="M5.645 18a.952.952 0 0 1-.978-.923V6.994A1.028 1.028 0 0 1 5.721 6h12.565a1.023 1.023 0 0 1 1.048.99v10.016a1.027 1.027 0 0 1-1.053.994zM13.334 12H16" />
      <path d="m8.667 10 2 2-2 2" />
    </g>
  </svg>
)
export default SvgTerminal
