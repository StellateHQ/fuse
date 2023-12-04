import * as React from 'react'
import type { SVGProps } from 'react'
const SvgArrowConnectingNodes = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={25}
    height={24}
    fill="none"
    viewBox="0 0 25 24"
    aria-hidden="true"
    {...props}
  >
    <g stroke="currentColor" strokeLinejoin="round" strokeWidth={1.2}>
      <path d="M16.559 15.285h4.835s.94 0 .94.94v4.835s0 .94-.94.94H16.56s-.94 0-.94-.94v-4.836s0-.939.94-.939ZM3.272 2.001h4.836s.939 0 .939.939v4.836s0 .939-.939.939H3.272s-.939 0-.939-.94V2.94s0-.939.94-.939Z" />
      <path
        strokeLinecap="round"
        d="M11.864 5.357h3.791a3.321 3.321 0 1 1 0 6.642h-3.179M12.812 11.999h-3.8a3.321 3.321 0 0 0 0 6.643h3.932"
      />
      <path
        strokeLinecap="round"
        d="m14.03 3.185-2.172 2.171 2.171 2.172M10.773 20.813l2.171-2.171-2.171-2.172"
      />
    </g>
  </svg>
)
export default SvgArrowConnectingNodes
