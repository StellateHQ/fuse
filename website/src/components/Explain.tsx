import { ReactNode } from 'react'
import * as Tooltip from '@radix-ui/react-tooltip'

type ExplainProps = {
  children: ReactNode
  term?: string
}

// could also be used for a glossary page?
export const glossary: Record<string, ReactNode> = {
  fragments: (
    <>
      Fragments are reusable pieces of graphql queries,{' '}
      <a
        href="https://graphql.org/learn/queries/#fragments"
        target="_blank"
        rel="noreferrer noopener"
      >
        learn more
      </a>
      .
    </>
  ),
}

export function Explain({ term, children }: ExplainProps) {
  const key =
    typeof term === 'string'
      ? term.toLocaleLowerCase()
      : typeof children === 'string'
        ? children.toLowerCase()
        : undefined
  const concept = key ? glossary[key] : undefined

  if (concept === undefined) {
    return children
  }

  return (
    <Tooltip.Provider delayDuration={300} skipDelayDuration={100}>
      <Tooltip.Root>
        <Tooltip.Trigger asChild>
          <span className="cursor-help" tabIndex={0}>
            {children}
          </span>
        </Tooltip.Trigger>
        <Tooltip.Portal>
          <Tooltip.Content
            sideOffset={5}
            side="top"
            className="tooltip-content bg-gravel-50"
          >
            <span>{concept}</span>
            <Tooltip.Arrow className="fill-gravel-50" />
          </Tooltip.Content>
        </Tooltip.Portal>
      </Tooltip.Root>
    </Tooltip.Provider>
  )
}
