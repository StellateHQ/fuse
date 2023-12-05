import { cn } from '@/utils/tailwind'
import { ComponentProps } from 'react'

type SectionProps = {
  variant?: 'light' | 'dark'
} & ComponentProps<'div'>

export function Section({
  variant = 'light',
  className,
  ...props
}: SectionProps) {
  return (
    <section
      className={cn(
        variant === 'light' ? 'text-gravel-900' : 'bg-gravel-950 text-white',
      )}
    >
      <div className={cn(className)} {...props} />
    </section>
  )
}

type SmallBleedProps = {} & ComponentProps<'div'>

export function SmallBleed({ className, ...props }: SmallBleedProps) {
  return <div className={cn(className)} {...props} />
}

export function MaxWidthContainer({
  className,
  variant = 'default',
  ...props
}: ComponentProps<'div'> & { variant?: 'larger' | 'default' }) {
  return (
    <div
      className={cn(
        'mx-auto w-full px-[20px]',
        variant === 'default' ? 'max-w-[1140px]' : 'max-w-[1240px]',
        className,
      )}
      {...props}
    />
  )
}
