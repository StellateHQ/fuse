import { Card } from './Card'
import {
  PothosLogo,
  GraphQlCodeGenLogo,
  GraphQlYogaLogo,
  GithubLogo,
  UrqlLogo,
} from '@/components/icons'
import { Heading } from './Heading'

export function PoweredByCards() {
  return (
    <div className="flex gap-[24px]">
      {poweredByItems.map(({ name, description, icon, githubUrl }, index) => (
        <Card key={index} className="flex flex-col gap-[20px]">
          {icon}
          <div className="flex flex-col gap-[8px]">
            <Heading
              level={3}
              className="text-[20px] tracking-[0.01em] lg:text-[20px]"
            >
              {name}
            </Heading>
            <p className="text-base text-gravel-300">{description}</p>
          </div>
          <div className="flex gap-[6px]">
            <GithubLogo className="h-[16px] w-[16px]" />
            <a
              href={`https://${githubUrl}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-gravel-500 hover:text-gravel-400 hover:underline focus:underline"
            >
              {githubUrl}
            </a>
          </div>
        </Card>
      ))}
    </div>
  )
}

const poweredByItems = [
  {
    icon: <PothosLogo width={32} height={32} />,
    name: 'Pothos',
    description:
      'The schema builder for creating GraphQL schemas in typescript using a strongly typed code first approach.',
    githubUrl: 'github.com/hayes/pothos',
  },
  {
    icon: (
      <>
        <UrqlLogo width={32} height={32} className="grayscale filter" />
      </>
    ),
    name: 'URQL',
    description:
      'Highly customizable and versatile GraphQL client, made to grow with your codebase.',
    githubUrl: 'github.com/urql-graphql/urql',
  },
  {
    icon: <GraphQlYogaLogo width={32} height={32} />,
    name: 'GraphQL Yoga',
    description:
      'The fully-featured GraphQL Server with focus on easy setup, performance and great developer experience.',
    githubUrl: 'github.com/dotansimha/graphql-yoga',
  },
] as const
