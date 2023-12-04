import { cn } from '@/utils/tailwind'
import NextPluginSnippet from './snippets/nextPlugin.mdx'
import ApiRouteSnippet from './snippets/apiRoute.mdx'
import InstallSnippet from './snippets/npmInstall.mdx'

export function FuseInstructions() {
  return (
    <ol className="list-none">
      {steps.map(({ title, content }, index) => (
        <li
          className="relative flex flex-col items-start gap-[16px] pb-[64px]"
          key={index}
        >
          <div className="flex items-center gap-[16px]">
            <div
              className={cn(
                'flex h-[32px] w-[32px] items-center justify-center rounded-full border border-starship-900',
                'bg-starship-950 font-semibold text-starship-500',
              )}
            >
              <span>{index + 1}</span>
              <span className="sr-only">Step {index + 1}</span>
            </div>
            <h3 className="text-[20px] text-gravel-50 md:text-[28px]">
              {title}
            </h3>
          </div>
          <div className="flex max-w-full flex-col gap-[16px] pl-[50px] md:gap-[20px]">
            {content}
          </div>
          <div
            className="pointer-events-none absolute bottom-[0] left-[16px] top-[40px] w-[1px] bg-steps-line-gradient"
            aria-hidden="true"
          />
        </li>
      ))}
    </ol>
  )
}

const steps = [
  {
    title: <>Install the npm packages</>,
    content: (
      <>
        <div className="max-w-full overflow-x-auto">
          <InstallSnippet />
        </div>
      </>
    ),
  },
  {
    title: 'Add the Next.js plugin to your `next.config.js`',
    content: (
      <>
        <div className="max-w-full overflow-x-auto">
          <NextPluginSnippet />
        </div>
      </>
    ),
  },
  {
    title: 'Create the /api/fuse API route',
    content: (
      <>
        <p className="text-[14px] font-normal">
          This API route will serve as the entrypoint to the GraphQL API that
          Fuse.js creates. If you are using Next.js&apos;s app router, add a
          file at app/api/fuse/route.ts and copy the below code to it:
        </p>
        <div className="max-w-full overflow-x-auto">
          <ApiRouteSnippet />
        </div>
        <p className="text-[14px] font-normal">
          That&apos;s it! Fuse.js will now serve a GraphQL API at /api/fuse and
          automatically generated a GraphQL query for user(id: ID!).
        </p>
      </>
    ),
  },
]
