import { cn } from '@/utils/tailwind'
import { ComponentProps } from 'react'

type CardProps = {
  height?: 'full' | 'auto'
} & ComponentProps<'div'>

export function Card({ className, height = 'full', ...props }: CardProps) {
  return (
    <div
      className={cn(
        'relative shrink-0 rounded-[16px] border border-transparent p-1 shadow-card',
        `h-${height}`,
      )}
    >
      <div className="absolute inset-0 rounded-[16px] bg-dark-card-gradient" />
      <div className="absolute inset-[1px] rounded-[16px] bg-gravel-950" />
      <div
        className={cn(
          'relative rounded-[12px] border border-gravel-800 bg-gravel-900 px-[24px] py-[20px]',
          `h-${height}`,
          className,
        )}
        {...props}
      />
    </div>
  )
}
