import * as React from 'react'
import type { SVGProps } from 'react'
const SvgStarSparkle = (props: SVGProps<SVGSVGElement>) => (
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
      stroke="#E535AB"
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M12 3.868V2.96M12 22.958v-2.514M2 12.959h2.472M19.528 12.959H22M6.602 19.527 4.77 21.36M17.398 6.631l1.833-1.833M6.602 6.631 4.77 4.798M17.398 19.286l1.833 1.833M12.379 6.32l1.74 3.48 3.35.335a.424.424 0 0 1 .258.722l-2.76 2.759 1.023 3.749a.425.425 0 0 1-.598.49L12 16.16l-3.392 1.698a.425.425 0 0 1-.598-.49l1.023-3.751-2.76-2.761a.424.424 0 0 1 .258-.721l3.349-.335 1.74-3.482a.424.424 0 0 1 .759.002"
    />
  </svg>
)
export default SvgStarSparkle
