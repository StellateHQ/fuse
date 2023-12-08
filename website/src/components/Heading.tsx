import { cn } from '@/utils/tailwind'
import { ComponentProps } from 'react'

type HeadingProps = {
  level: 1 | 2 | 3 | 4 | 5 | 6
  wrapBalance?: boolean
} & ComponentProps<'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'>

export function Heading({
  level,
  className,
  wrapBalance = true,
  ...props
}: HeadingProps) {
  const Element = `h${level}` as const
  return (
    <Element
      className={cn(
        'text-[28px] font-semibold tracking-[-1.28px] text-gravel-50 md:text-[36px]',
        wrapBalance ? '[text-wrap:balance]' : '',
        className,
      )}
      {...props}
    />
  )
}

type HeadingEyebrowProps = {
  variant?: 'starship' | 'gqlPink' | 'gravel'
} & ComponentProps<'p'>

/** Used for text above headings */
export function HeadingEyebrow({
  className,
  variant = 'starship',
  ...props
}: HeadingEyebrowProps) {
  return (
    <p
      className={cn(
        'w-[max-content] text-sm font-medium uppercase tracking-[1px] [text-wrap:balance]',
        variant === 'starship'
          ? 'bg-text-starship-gradient bg-clip-text  text-transparent'
          : variant === 'gqlPink'
            ? 'text-graphq-pink'
            : 'text-gravel-500',
        className,
      )}
      {...props}
    />
  )
}
