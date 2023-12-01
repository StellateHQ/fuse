import clsx, { ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

/**
 * Composes Tailwind classes
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
