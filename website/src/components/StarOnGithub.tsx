import { useRef } from 'react'
import { useCountUp } from 'react-countup'
import { ButtonLink } from '@/components/Button'
import { GithubLogo, Star } from '@/components/icons'

type StarOnGithubProps = {
  stars: number
  countStart: number
}

export function StarOnGithub({ stars = 0, countStart = 0 }: StarOnGithubProps) {
  const countUpRef = useRef<HTMLSpanElement | null>(null)
  useCountUp({
    ref: countUpRef,
    start: countStart,
    end: stars,
    duration: 4,
    delay: 1,
  })

  return (
    <ButtonLink
      href="https://github.com/StellateHQ/fuse"
      target="_blank"
      variant="light"
      rel="noopener noreferrer"
      className="justify-center py-1.5 pr-2.5"
    >
      <GithubLogo className="h-5 w-5" />
      Star on GitHub
      {stars && (
        <div className="inline-flex h-7 items-center gap-1.5 rounded-xl border border-gravel-200 bg-gravel-50 px-2.5">
          <Star className="h-4 w-4" />
          <span ref={countUpRef} className="text-sm tabular-nums" />
        </div>
      )}
    </ButtonLink>
  )
}
