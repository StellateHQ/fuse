import { cn } from '@/utils/tailwind'
import { ComponentProps } from 'react'

type Props = {} & ComponentProps<'p'>

export function Text({ className, ...props }: Props) {
  return <p className={cn('text-lg lg:text-xl', className)} {...props} />
}
