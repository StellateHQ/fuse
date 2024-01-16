import * as React from 'react'
import type { SVGProps } from 'react'
const SvgObservability = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    fill="none"
    viewBox="0 0 24 24"
    aria-hidden="true"
    {...props}
  >
    <path
      stroke="#DBFE01"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.2}
      d="M3.333 20.667A1.333 1.333 0 0 1 2 19.333V4.77a1.44 1.44 0 0 1 1.436-1.437h17.136A1.433 1.433 0 0 1 22 4.763V19.23a1.439 1.439 0 0 1-1.436 1.436zM22 7.333H2M16.667 3.333v4M12.667 3.333v4"
    />
    <path
      stroke="#DBFE01"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.2}
      d="M2 15.333h5.176a1.334 1.334 0 0 0 1.193-.737l1.578-3.156a.666.666 0 0 1 1.229.089l1.649 4.947a.667.667 0 0 0 1.228.088l1.583-3.16a1.332 1.332 0 0 1 1.192-.737H22"
    />
  </svg>
)
export default SvgObservability
