import { ComponentProps } from 'react'
import { cn } from '@/utils/tailwind'
import { ClassValue } from 'clsx'

type ButtonVariant = 'light' | 'dark' | 'starship'

function getClassNames(variant: ButtonVariant, className?: ClassValue) {
  return cn(
    'inline-flex items-center gap-2 rounded-[30px] px-[20px] py-[10px] text-sm font-medium',
    variant === 'light'
      ? 'border-[0.5px] border-gravel-300 bg-white text-black shadow-actions hover:bg-gravel-100 hover:shadow-light-button-hover-shadow'
      : variant === 'dark'
        ? 'bg-gravel-950 text-white hover:bg-gravel-800 hover:shadow-dark-button-hover-shadow'
        : 'bg-starship-950 text-starship-500 hover:text-starship-950 hover:bg-starship-500 hover:shadow-starship-button-hover-shadow',
    className,
  )
}

type ButtonProps = {
  variant: ButtonVariant
} & ComponentProps<'button'>

export function Button({ className, ...props }: ButtonProps) {
  return (
    <button className={getClassNames(props.variant, className)} {...props} />
  )
}

type ButtonLinkProps = {
  variant: ButtonVariant
} & ComponentProps<'a'>

export function ButtonLink({ className, ...props }: ButtonLinkProps) {
  return <a className={getClassNames(props.variant, className)} {...props} />
}
