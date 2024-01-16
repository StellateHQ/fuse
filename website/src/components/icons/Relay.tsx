import * as React from 'react'
import type { SVGProps } from 'react'
const SvgRelay = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={25}
    fill="none"
    viewBox="0 0 24 25"
    aria-hidden="true"
    {...props}
  >
    <g clipPath="url(#a)">
      <path
        fill="#DBFE01"
        d="M20.495 16.364H10.001a1.793 1.793 0 0 1 0-3.583h5.73a3.037 3.037 0 0 0 3.033-3.032 3.037 3.037 0 0 0-3.033-3.033H5.365a2.265 2.265 0 0 0-4.427.672 2.265 2.265 0 0 0 4.456.57h10.339a1.792 1.792 0 0 1 0 3.583h-5.73a3.038 3.038 0 0 0-3.033 3.033 3.038 3.038 0 0 0 3.033 3.033h10.5a2.264 2.264 0 1 0 0-1.243z"
      />
    </g>
    <defs>
      <clipPath id="a">
        <path fill="#fff" d="M0 .5h24v24H0z" />
      </clipPath>
    </defs>
  </svg>
)
export default SvgRelay
