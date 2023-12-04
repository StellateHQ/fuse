import * as React from 'react'
import type { SVGProps } from 'react'
const SvgNodeStack = (props: SVGProps<SVGSVGElement>) => (
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
      strokeMiterlimit={10}
      strokeWidth={1.2}
    >
      <path d="M21.67 16.95c0 .355-.178.711-.533.8l-7.111 3.2c-.267.089-.623.089-.89-.089-.266-.178-.444-.445-.444-.711V3.35c0-.267.178-.622.445-.711.266-.178.533-.178.889-.089l7.11 3.2c.356.178.534.444.534.8zM10.203 20.239c-.266.089-.533.089-.8-.089-.266-.178-.355-.444-.355-.711v-15.2c0-.266.178-.622.444-.71.267-.179.534-.179.89-.09M6.514 19.35c-.267.089-.533.089-.8-.09-.267-.177-.356-.444-.356-.71V5.039c0-.267.178-.622.445-.711.266-.178.533-.178.889-.09M2.825 18.461c-.266.089-.533.089-.8-.089-.266-.177-.355-.444-.355-.71V5.927c0-.267.178-.622.444-.711.267-.178.534-.178.89-.089" />
    </g>
  </svg>
)
export default SvgNodeStack
