import { ReactNode } from 'react'
import * as Tooltip from '@radix-ui/react-tooltip'

type ExplainProps = {
  children: ReactNode
  term?: string
}

// could also be used for a glossary page?
export const glossary: Record<string, ReactNode> = {
  colocation: (
    <>
      Co-location means that we put things we use close to where we use them,
      like in the fuse case we&apos;ll put the data-requirements (our fragments)
      close to the components we write so we can iterate on them quickly.
    </>
  ),
  nullability: (
    <>
      Nullability in GraphQL means that a field can return <code>null</code> or{' '}
      a value. This is different from being optional as GraphQL has no notion of{' '}
      <code>undefined</code>. When a null value is returned for a non-nullable
      field then this will bubble the null value up to the first non-nullable
      parent field.
    </>
  ),
  documents: (
    <>
      When you write a GraphQL query you are writing a document, the document
      (also referred to as the executable document) will be presented to the
      server and be translated into the data you are asking for.
    </>
  ),
  types: (
    <>
      A GraphQL Type is the basic building block of GraphQL, it can be an
      object/interface defining multiple fields (properties on an entity), it
      can be a scalar like a string or integer, it can be a given input type, a
      union of types or an enum of values.
    </>
  ),
  fields: (
    <>
      A field is a piece of data that exists on an object/interface type, they
      can be queried and represent a scalar value or a relation to other another
      entity.
    </>
  ),
  resolvers: (
    <>
      A resolver is a piece of logic that accompanies a field, this can allow us
      to compute a value, rename a property or fetch a related value from a
      database/...
    </>
  ),
  fragments: (
    <>
      A fragment is a reusable piece of a query, it can be used to avoid
      repeating yourself and to co-locate data-requirements with your
      components. Look at it like a blueprint of a component, given this data
      this component will visualize it.
    </>
  ),
  'type-condition': (
    <>
      A type-condition allows us to conditionally ask for the fields, this is
      useful on union types where the fields on the returned types could be
      inherently different.
    </>
  ),
  'fragment-spreads': (
    <>
      A fragment-spread is the way to use a fragment, you can recognise it by it
      looking like <code>...fragment_name</code> and will signal that the fields
      defined in that fragment will be queried where we spread the fragment.
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
          <span
            className="cursor-help underline decoration-dashed"
            tabIndex={0}
          >
            {children}
          </span>
        </Tooltip.Trigger>
        <Tooltip.Portal>
          <Tooltip.Content sideOffset={5} side="top" asChild>
            <div className="tooltip-content relative rounded-[4px] p-0 text-starship-500">
              <span className="inline-block bg-transparent p-[8px] text-starship-500">
                {concept}
              </span>
              <Tooltip.Arrow className="fill-gravel-950" />
            </div>
          </Tooltip.Content>
        </Tooltip.Portal>
      </Tooltip.Root>
    </Tooltip.Provider>
  )
}
