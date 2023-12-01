import * as React from 'react'
import type { SVGProps } from 'react'
const SvgArrowOpeningPath = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={25}
    fill="none"
    aria-hidden="true"
    {...props}
  >
    <path
      stroke="#E535AB"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.2}
      d="M2.445 12.959H19.11M15.778 10.07l3.333 2.889-3.333 2.889M21.555 2.959v4.444a1.334 1.334 0 0 1-2.666 0V2.96M18.889 22.959v-4.444a1.333 1.333 0 1 1 2.666 0v4.444M15.2 2.959v3.333a1.334 1.334 0 0 1-2.667 0V2.96M12.533 22.959v-3.333a1.333 1.333 0 1 1 2.667 0v3.333M8.445 2.959V6.07M3.556 2.959v2.222M8.445 19.848v3.111M3.556 20.737v2.222"
    />
  </svg>
)
export default SvgArrowOpeningPath
