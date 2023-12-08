import { cn } from '@/utils/tailwind'
import { ComponentProps } from 'react'

export function MobileMenuLines({
  className,
  ...props
}: ComponentProps<'svg'>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      className={cn('mobile-menu-lines', className)}
      aria-hidden="true"
    >
      <g>
        <path
          d="M1.6665 4.87161H18.3332"
          stroke="black"
          strokeWidth="1.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
      <path
        d="M1.6665 9.99911H18.3332"
        stroke="black"
        strokeWidth="1.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <g>
        <path
          d="M1.6665 15.1284H18.3332"
          stroke="black"
          strokeWidth="1.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
    </svg>
  )
}
