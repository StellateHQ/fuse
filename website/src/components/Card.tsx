import { cn } from '@/utils/tailwind'
import { ComponentProps } from 'react'

type CardProps = {} & ComponentProps<'div'>

export function Card({ className, ...props }: CardProps) {
  return (
    <div className="relative h-full w-[290px] shrink-0 rounded-[16px] border border-transparent p-1 shadow-card lg:w-[360px]">
      <div className="absolute inset-0 rounded-[16px] bg-dark-card-gradient" />
      <div className="absolute inset-[1px] rounded-[16px] bg-gravel-950" />
      <div
        className={cn(
          'relative h-full rounded-[12px] border border-gravel-800 bg-gravel-900 px-[24px] py-[20px]',
          className,
        )}
        {...props}
      />
    </div>
  )
}
