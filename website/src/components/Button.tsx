import { ComponentProps } from 'react'
import { cn } from '@/utils/tailwind'

type Props = {
  variant: 'light' | 'dark' | 'starship'
} & ComponentProps<'button'>

export function Button({ className, ...props }: Props) {
  return (
    <button
      className={cn(
        'inline-flex items-center gap-2 rounded-[30px] px-[20px] py-[10px] text-sm font-medium',
        props.variant === 'light'
          ? 'border border-gravel-300 bg-[#FFF] text-black shadow-actions'
          : props.variant === 'dark'
            ? 'bg-black text-white'
            : 'bg-starship-950 text-starship-500',
        className,
      )}
      {...props}
    />
  )
}
