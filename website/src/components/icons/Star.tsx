import * as React from 'react'
import type { SVGProps } from 'react'
const SvgStar = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={17}
    height={17}
    fill="none"
    viewBox="0 0 17 17"
    aria-hidden="true"
    {...props}
  >
    <path
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.2}
      d="m9.262 2.214 1.89 3.778 3.634.364a.46.46 0 0 1 .28.783l-2.995 2.994 1.11 4.07a.46.46 0 0 1-.65.532l-3.68-1.84-3.682 1.842a.46.46 0 0 1-.649-.533l1.11-4.07-2.995-2.997a.46.46 0 0 1 .28-.783l3.635-.363 1.89-3.779a.46.46 0 0 1 .822.002"
    />
  </svg>
)
export default SvgStar
