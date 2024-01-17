import * as React from 'react'
import type { SVGProps } from 'react'
const SvgScalable = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={25}
    fill="none"
    viewBox="0 0 24 25"
    aria-hidden="true"
    {...props}
  >
    <path
      stroke="#DBFE01"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.2}
      d="M14.72 15.347a2.85 2.85 0 1 0 0-5.7 2.85 2.85 0 0 0 0 5.7"
    />
    <path
      stroke="#DBFE01"
      strokeWidth={1.2}
      d="M2.963 12.853a.356.356 0 1 1 0-.712M2.963 12.853a.356.356 0 1 0 0-.712"
    />
    <path
      stroke="#DBFE01"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.2}
      d="M7.595 13.922a1.425 1.425 0 1 0 0-2.85 1.425 1.425 0 0 0 0 2.85M21.845 13.922a1.425 1.425 0 1 0 0-2.85 1.425 1.425 0 0 0 0 2.85"
    />
  </svg>
)
export default SvgScalable
