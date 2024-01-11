import { cn } from '@/utils/tailwind'

const count = 7

export function PageVerticalLines({ inverted }: { inverted?: boolean }) {
  // return null
  return (
    <div
      className={cn(
        'absolute bottom-0 left-[52px] top-0 hidden -translate-x-1/2 transform-gpu gap-[12px] xl:flex',
      )}
    >
      {Array.from(Array(count)).map((_, i) => (
        <VerticalLine key={i} inverted={inverted} />
      ))}
    </div>
  )
}

function VerticalLine({ inverted }: { inverted?: boolean }) {
  return (
    <div
      className={cn(
        'h-full w-[1px] bg-vertical-line-gradient',
        inverted ? 'rotate-180' : undefined,
      )}
    />
  )
}
