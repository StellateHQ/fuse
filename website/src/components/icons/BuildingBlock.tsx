import * as React from 'react'
import type { SVGProps } from 'react'
const SvgBuildingBlock = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={25}
    fill="none"
    viewBox="0 0 24 25"
    aria-hidden="true"
    {...props}
  >
    <g
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.2}
    >
      <path d="M22 8.613v10l-10 4.285-10-4.285v-10l10 4.286zM12 22.898v-10M7.714 6.164 2 8.613M16.286 6.164 22 8.613M7.714 4.327c0 .379.451.742 1.255 1.01.803.268 1.894.419 3.03.419 1.137 0 2.227-.151 3.03-.419.804-.268 1.256-.631 1.256-1.01s-.452-.742-1.255-1.01c-.804-.268-1.894-.419-3.03-.419-1.137 0-2.228.15-3.031.419-.804.268-1.255.631-1.255 1.01" />
      <path d="M7.714 4.327v2.857c0 .789 1.919 1.429 4.285 1.429 2.367 0 4.286-.64 4.286-1.429V4.327" />
    </g>
  </svg>
)
export default SvgBuildingBlock
