/* eslint-disable @next/next/no-img-element */
import Link from 'next/link'
import { ButtonLink } from '../components/Button'
import { MaxWidthContainer, Section, SmallBleed } from '@/components/Section'
import { Heading, HeadingEyebrow } from '@/components/Heading'
import { Text } from '@/components/Text'
import { PoweredByCards } from '@/components/PoweredByCards'
import {
  ArrowConnectingNodes,
  ArrowOpeningPath,
  BuildingBlock,
  FuseLogoWithNameDark,
  FuseLogoWithNameLight,
  GatsbyLogo,
  GithubLogo,
  GraphiqlLogo,
  NodeStack,
  NpmLogo,
  PrismaLogo,
  PuzzlePieces,
  StellateLogo,
  StellateLogoWithName,
  Terminal,
  UrqlLogo,
  XLogo,
} from '@/components/icons'
import Head from 'next/head'
import { getHeadMetaContent } from '@/components/HeadMeta'
import { Card } from '@/components/Card'
import { TheGrid } from '@/components/TheGrid'
import { MobileMenuLines } from '@/components/MobileMenuLines'
import { useEffect, useState } from 'react'
import { cn } from '@/utils/tailwind'
import { PageVerticalLines } from '@/components/PageVerticaLines'

export const IndexPage = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  useEffect(() => {
    const handler = (e: UIEvent) => {
      if (window.innerWidth >= 640) {
        setIsMenuOpen(false)
      }
    }
    window.addEventListener('resize', handler, {
      passive: true,
    })
    return () => {
      window.removeEventListener('resize', handler)
    }
  }, [setIsMenuOpen])

  return (
    <>
      <Head>
        {getHeadMetaContent({
          url: 'https://fusejs.org',
        })}
      </Head>
      <div className="bg-white">
        <TheGrid />

        <header className="fixed left-1/2 top-0 z-50 mx-auto w-[100%] max-w-4xl -translate-x-1/2 px-3 py-5">
          <div className="relative overflow-hidden rounded-[20px] border border-[rgba(218,218,218,.25)] p-1 shadow-card">
            <div className="absolute inset-0 bg-[rgba(248,248,248,.60)] backdrop-blur" />
            <div
              className={cn(
                'relative z-10 flex items-center justify-between rounded-[16px] border border-gravel-200 bg-[rgba(248,248,248,.90)] px-3 shadow-card md:px-5',
                isMenuOpen ? 'rounded-b-none' : '',
              )}
            >
              <div className="flex shrink-0">
                <Link href="/" className="flex items-center gap-2 py-2 pr-2">
                  <FuseLogoWithNameLight />
                  <span className="sr-only">Fuse</span>
                </Link>
              </div>

              <div className="hidden items-center gap-4 sm:flex">
                <Link
                  href="/docs"
                  className="p-2 font-medium text-gravel-900 hover:text-starship-700"
                >
                  Docs
                </Link>
                <Link
                  href="https://github.com/StellateHQ/fuse.js/tree/main/examples"
                  className="p-2 font-medium text-gravel-900 hover:text-starship-700"
                >
                  Examples
                </Link>
              </div>

              <div className="flex items-center gap-[16px]">
                <div className="flex items-center gap-[20px]">
                  <a
                    href="https://stellate.co"
                    target="_blank"
                    className="cursor-pointer text-gravel-950 hover:text-gravel-700 focus:text-gravel-700"
                  >
                    <StellateLogo />
                    <span className="sr-only">Stellate</span>
                  </a>
                  <a
                    href="https://x.com/stellate"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="cursor-pointer text-gravel-950 hover:text-gravel-700 focus:text-gravel-700"
                  >
                    <XLogo />
                    <span className="sr-only">Check Fuse on X</span>
                  </a>
                  <a
                    href="https://github.com/StellateHQ/fuse.js"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="cursor-pointer text-gravel-950 hover:text-gravel-700 focus:text-gravel-700"
                  >
                    <GithubLogo />
                    <span className="sr-only">Fuse on Github</span>
                  </a>
                </div>
                <div className="block h-[12px] w-[1px] bg-gravel-200 sm:hidden" />
                <button
                  className="hamburger-menu block sm:hidden"
                  onClick={() => setIsMenuOpen((value) => !value)}
                  tabIndex={0}
                  aria-label="Menu"
                >
                  <MobileMenuLines className={isMenuOpen ? 'open' : ''} />
                </button>
              </div>
            </div>
            <div
              className={cn(
                'mobile-links relative z-0 flex items-center justify-between rounded-b-[16px] border border-t-0 border-gravel-200 px-[16px] shadow-card sm:hidden md:px-5',
                isMenuOpen ? 'open' : undefined,
              )}
            >
              <div
                className="flex flex-col py-[8px] sm:hidden"
                aria-hidden={isMenuOpen ? 'false' : 'true'}
              >
                <Link
                  href="/docs"
                  className="py-[12px] font-medium text-gravel-900 hover:text-starship-700"
                >
                  Docs
                </Link>
                <Link
                  href="https://github.com/StellateHQ/fuse.js/tree/main/examples"
                  className="py-[12px] font-medium text-gravel-900 hover:text-starship-700"
                >
                  Examples
                </Link>
              </div>
            </div>
          </div>
        </header>

        <main className="relative pt-[116px] md:pt-[140px]">
          <Section className="mx-auto max-w-[1100px] px-5">
            <h2 className="mt-4 text-4xl font-bold  leading-[44px] tracking-tight [text-wrap:balance] md:mt-6 md:text-center md:text-[56px] md:leading-[67px]">
              The fastest way to build and query great APIs with TypeScript
            </h2>
            <h3 className="mt-6 text-lg leading-8 text-gravel-700 md:text-center md:text-xl md:[text-wrap:balance]">
              Use Fuse to aggregate all your data sources and shape them into a
              great API for your clients—fully typesafe from data source to
              client query.
            </h3>
            <div className="mt-10 flex items-center gap-4 md:justify-center">
              <ButtonLink
                variant="dark"
                href="/docs"
                className="justify-center md:w-[164px]"
              >
                Get Started{' '}
                <svg
                  width={20}
                  height={20}
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 text-starship-400"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M10 20c5.523 0 10-4.477 10-10S15.523 0 10 0 0 4.477 0 10s4.477 10 10 10zm-2.917-5.201a.416.416 0 01-.589 0L5.316 13.62a.417.417 0 010-.589l4.649-4.65a.2.2 0 00.047-.223.217.217 0 00-.194-.136l-3.224.018a.417.417 0 01-.294-.707l1.815-1.815a.433.433 0 01.312-.124l5.622.271a.433.433 0 01.4.401l.271 5.622a.416.416 0 01-.118.318l-1.797 1.797a.425.425 0 01-.713-.3l.006-3.2a.216.216 0 00-.136-.195.208.208 0 00-.223.048l-4.656 4.643z"
                    fill="currentColor"
                  />
                </svg>
              </ButtonLink>
              <ButtonLink
                href="https://github.com/StellateHQ/fuse.js"
                target="_blank"
                variant="light"
                rel="noopener noreferrer"
                className="justify-center md:w-[164px]"
              >
                <svg
                  width={20}
                  height={20}
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4"
                >
                  <g clipPath="url(#clip0_307_2869)">
                    <path
                      d="M10 0a10 10 0 100 20 10 10 0 000-20zm5.183 8.65l-2.325 2.067a.425.425 0 00-.108.475l1.358 3.125a.408.408 0 01-.1.475.417.417 0 01-.483.058l-3.333-1.875a.459.459 0 00-.417 0L6.442 14.85a.417.417 0 01-.484-.058.409.409 0 01-.1-.475l1.392-3.125a.425.425 0 00-.108-.475L4.817 8.65a.442.442 0 01-.109-.467.417.417 0 01.392-.266h2.758a.425.425 0 00.384-.25l1.375-3.2a.417.417 0 01.766 0l1.375 3.2a.425.425 0 00.384.25H14.9a.416.416 0 01.406.516.441.441 0 01-.123.217z"
                      fill="#000"
                    />
                  </g>
                  <defs>
                    <clipPath id="clip0_307_2869">
                      <path fill="#fff" d="M0 0H20V20H0z" />
                    </clipPath>
                  </defs>
                </svg>
                Star on GitHub
              </ButtonLink>
            </div>
          </Section>

          <section className="relative z-10 mx-auto -mb-16 mt-16 max-w-[1100px] px-3">
            {/* mobile video below */}
            <div className="relative overflow-hidden rounded-lg bg-gravel-900 text-white shadow-video md:hidden">
              <video
                autoPlay
                loop
                muted
                playsInline
                width="609"
                poster="/videos/video-sample-vertical-poster.png"
                className="w-full"
              >
                <source
                  src="/videos/video-sample-vertical.mp4"
                  type="video/mp4"
                />
              </video>
            </div>
            {/* desktop video below */}
            <div className="relative hidden overflow-hidden rounded-lg bg-gravel-900 text-white shadow-video md:flex">
              <video
                autoPlay
                loop
                muted
                playsInline
                width="1200"
                className="w-full"
                poster="/videos/video-poster.png"
              >
                <source src="/videos/video-sample.mp4" type="video/mp4" />
              </video>
            </div>
          </section>

          <Section
            variant="dark"
            className="flex flex-col gap-6 pb-[48px] pt-[160px] md:gap-24 md:pb-[96px]"
          >
            <PageVerticalLines />
            <MaxWidthContainer>
              <div className="flex min-w-0 flex-col gap-5 md:items-center md:text-center">
                <HeadingEyebrow>What&apos;s Fuse?</HeadingEyebrow>
                <Heading level={2}>
                  Build great APIs{' '}
                  <span className="bg-text-starship-gradient bg-clip-text text-transparent">
                    effortlessly
                  </span>
                </Heading>
                <Text className="text-gravel-300 md:w-2/3">
                  Build a GraphQL API that aggregates all your microservices,
                  data stores, and third-party APIs with the minimum amount of
                  code, and get a TypeScript client to access it easily—all the
                  while having all the best practices built-in under the hood
                  for you.
                </Text>
              </div>
            </MaxWidthContainer>
            <MaxWidthContainer>
              <div className="flex justify-center md:hidden">
                <img
                  src="/images/homepage-code-sample-mobile.svg"
                  alt="A Fuse code sample, this shows on the left a code-editor where we see us converting a user-endpoint to a user-node. The code sample starts by calling a function called node, passes a generic in there called ProductSource, representing the Product type on the REST endpoint, next it gives the node a name 'Product'. It specifies a load function, which is called 'getProductsByIds' and finishes off by defining the shape of the data that will be returned from our node, the shape has a name which in this case is a string that gets exposed from the product_name property of the resource, a details property which is also a string and a category which has a custom resolve function returning the product.category_id. On the right we see how this translates to GraphQL where we can query this node by means of `query GetProduct($id: ID!) { product(id: $id) { id name details category { id name} } }`"
                />
              </div>
              <div className="hidden md:flex md:justify-center">
                <img
                  src="/images/homepage-code-sample-desktop.svg"
                  alt="A Fuse code sample, this shows on the left a code-editor where we see us converting a user-endpoint to a user-node. The code sample starts by calling a function called node, passes a generic in there called ProductSource, representing the Product type on the REST endpoint, next it gives the node a name 'Product'. It specifies a load function, which is called 'getProductsByIds' and finishes off by defining the shape of the data that will be returned from our node, the shape has a name which in this case is a string that gets exposed from the product_name property of the resource, a details property which is also a string and a category which has a custom resolve function returning the product.category_id. On the right we see how this translates to GraphQL where we can query this node by means of `query GetProduct($id: ID!) { product(id: $id) { id name details category { id name} } }`"
                />
              </div>
            </MaxWidthContainer>
          </Section>

          <Section
            variant="dark"
            className="flex flex-col gap-6 pb-[48px] pt-[160px] md:gap-24 md:pb-[96px]"
          >
            <PageVerticalLines />
            <MaxWidthContainer>
              <div className="flex min-w-0 flex-col gap-5 md:items-center md:text-center">
                <HeadingEyebrow>What&apos;s in Fuse?</HeadingEyebrow>
                <Heading level={2}>
                  TODO:{' '}
                  <span className="bg-text-starship-gradient bg-clip-text text-transparent">
                    Everything you need
                  </span>{' '}
                  to build and query a great API
                </Heading>
              </div>
            </MaxWidthContainer>
          </Section>

          <Section variant="dark" className="py-[48px] md:py-[96px]">
            <PageVerticalLines inverted />
            <div className="flex flex-col gap-5">
              <MaxWidthContainer className="flex flex-col gap-[32px] md:flex-row">
                <div className="flex min-w-0 flex-col gap-5 md:w-1/2">
                  <HeadingEyebrow variant="starship">
                    Why GraphQL?
                  </HeadingEyebrow>
                  <Heading level={2}>GraphQL is the best API framework</Heading>
                  <ul className="flex max-w-[420px] list-none flex-col gap-5 text-gravel-300">
                    <li className="flex gap-2">
                      <ArrowOpeningPath className="w-[20px] shrink-0 text-starship-500" />
                      <span className="[text-wrap:balance] md:text-[18px]">
                        Fetch the data for a page in a single request, even if
                        it is spread between many data sources
                      </span>
                    </li>
                    <li className="flex gap-2">
                      <PuzzlePieces className="w-[20px] shrink-0 text-starship-500" />
                      <span className="[text-wrap:balance] md:text-[18px]">
                        Define data requirements per component with fragment
                        composition for essentially infinite codebase
                        scalability
                      </span>
                    </li>
                    <li className="flex gap-2">
                      <NodeStack className="w-[20px] shrink-0 text-starship-500" />
                      <span className="[text-wrap:balance] md:text-[18px]">
                        Evolve your API without versions because clients aren’t
                        impacted by additive changes
                      </span>
                    </li>
                    <li className="flex gap-2">
                      <NodeStack className="w-[20px] shrink-0 text-starship-500" />
                      <span className="[text-wrap:balance] md:text-[18px]">
                        Simplify observability, governance, and security by
                        having a central access point for all your data
                      </span>
                    </li>
                  </ul>
                </div>
                <div className="flex justify-center md:w-1/2">
                  <img
                    className="relative transform md:translate-y-[-12px]"
                    src="/images/fuse-circle.svg"
                    alt="A circle consisting of three layers, the outer one in a darker green showing a datasource with a PostGres and REST logo, the second layer in a lightest green showing a GraphQL logo and last but not least the center showing the Fuse logo which is a black 'x' with a green outline."
                  />
                </div>
              </MaxWidthContainer>
            </div>
          </Section>
          <Section variant="dark">
            <div className="flex flex-col gap-[28px]">
              <MaxWidthContainer>
                <Heading
                  level={2}
                  className="text-[20px] text-gravel-400 md:text-center md:text-[28px]"
                >
                  Powered by the GraphQL ecosystem
                </Heading>
              </MaxWidthContainer>
              <MaxWidthContainer
                variant="larger"
                className="flex gap-[24px] overflow-x-auto"
              >
                <PoweredByCards />
              </MaxWidthContainer>
            </div>
          </Section>

          <Section
            variant="dark"
            className="flex flex-col gap-[10px] py-[48px] md:gap-[24px] md:py-[96px]"
          >
            <PageVerticalLines />
            <MaxWidthContainer className="flex flex-col gap-[48px] md:gap-[100px]">
              <div className="flex flex-col gap-[20px] md:flex-row md:items-start md:gap-[0]">
                <div className="flex flex-col gap-[12px] md:gap-[20px]">
                  <div>
                    <HeadingEyebrow>How to use it at scale?</HeadingEyebrow>
                    <Heading level={2}>The Fuse Method</Heading>
                  </div>

                  <Heading
                    level={3}
                    wrapBalance={false}
                    className="max-w-[500px] text-[20px] md:text-[28px]"
                  >
                    Treat your API as an aggregation & transformation layer
                  </Heading>
                  <Text className="max-w-[500px] text-gravel-300">
                    Client-facing APIs <strong>aggregate</strong> any number of
                    underlying data sources, like databases, third-party APIs,
                    and microservices.
                  </Text>
                  <Text className="max-w-[500px] text-gravel-300">
                    Then, they <strong>transform</strong> them into something
                    usable by clients, which is necessary because the way data
                    sources think about their data often doesn’t cover exactly
                    how clients want to use it.
                  </Text>
                  <Text className="max-w-[500px] text-gravel-300">
                    Fuse’s design is explicitly optimized to make it as simple
                    as possible to build a typesafe aggregation & transformation
                    layer. The only code you write defines where to fetch data
                    from and how to expose it.
                  </Text>

                  <Heading
                    level={3}
                    wrapBalance={false}
                    className="mt-14 max-w-[500px] text-[20px] md:text-[28px]"
                  >
                    Have your frontend teams own the API
                  </Heading>
                  <Text className="max-w-[500px] text-gravel-300">
                    The only people who truly understand clients’ needs are the
                    teams working on those clients.
                  </Text>
                  <Text className="max-w-[500px] text-gravel-300">
                    Thus, APIs should be owned by a team closer to the frontend
                    teams than the backend teams.
                  </Text>
                  <Text className="max-w-[500px] text-gravel-300">
                    Often, this is a dedicated API team that sits right next to
                    the frontend teams. In smaller organizations, this can also
                    be a shared effort by all frontend & mobile teams.
                  </Text>
                </div>
                <div className="flex w-full shrink-0 flex-col justify-center gap-20 px-[4px] md:w-[50%] md:pl-[68px] md:pr-[32px] lg:w-[50%]">
                  <div className="flex max-w-[500px] self-center md:hidden md:max-w-[none]">
                    <img
                      src="/images/fuse-diagram-mobile.svg"
                      alt="A diagram showing, from top to bottom, a set of squares representing, the backend teams working with PostGres, Rest and gRPC, these connect to a central node named 'Fuse' which in turns connects to three nodes Android, iOS and web"
                    />
                  </div>
                  <div className="hidden self-center md:flex">
                    <img
                      src="/images/fuse-diagram-desktop.svg"
                      alt="A diagram showing, from top to bottom, a set of squares representing, the backend teams working with PostGres, Rest and gRPC, these connect to a central node named 'Fuse' which in turns connects to three nodes Android, iOS and web"
                    />
                  </div>

                  <div className="mx-auto max-w-[350px] md:max-w-none">
                    <img src="/images/fuse-workflow.svg" />
                  </div>
                </div>
              </div>
              <ButtonLink
                href="/docs/data-layers"
                target="_blank"
                variant="light"
                rel="noopener noreferrer"
                className="justify-center md:w-[164px]"
              >
                Learn more
                <svg
                  width={20}
                  height={20}
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M10 20c5.523 0 10-4.477 10-10S15.523 0 10 0 0 4.477 0 10s4.477 10 10 10zm-2.917-5.201a.416.416 0 01-.589 0L5.316 13.62a.417.417 0 010-.589l4.649-4.65a.2.2 0 00.047-.223.217.217 0 00-.194-.136l-3.224.018a.417.417 0 01-.294-.707l1.815-1.815a.433.433 0 01.312-.124l5.622.271a.433.433 0 01.4.401l.271 5.622a.416.416 0 01-.118.318l-1.797 1.797a.425.425 0 01-.713-.3l.006-3.2a.216.216 0 00-.136-.195.208.208 0 00-.223.048l-4.656 4.643z"
                    fill="currentColor"
                  />
                </svg>
              </ButtonLink>
            </MaxWidthContainer>
          </Section>

          <Section variant="dark" className="py-[48px] md:py-[96px]">
            <PageVerticalLines inverted />
            <MaxWidthContainer className="flex flex-col gap-[56px] pb-[48px]">
              <div className="flex min-w-0 flex-col gap-5 md:items-center md:text-center">
                <HeadingEyebrow>Who is behind Fuse?</HeadingEyebrow>
                <Heading
                  level={2}
                  className="flex flex-wrap items-center gap-[6px]"
                >
                  Built by the team{' '}
                  <span className="flex items-center gap-[16px]">
                    at
                    <StellateLogoWithName
                      aria-label="Stellate"
                      className="ml-[-20px] h-[30px] shrink-0 md:ml-0 md:h-[44px]"
                    />
                  </span>
                </Heading>
                <Text className="max-w-[700px] text-gravel-300 ">
                  Fuse is made by the team at Stellate, the GraphQL CDN, which
                  includes core team members and creators of some of the most
                  popular open-source projects in the GraphQL ecosystem,
                  including Prisma, the GraphQL Playground, GraphiQL, urql,
                  Gatsby and others.
                </Text>
              </div>
              <div className="flex flex-wrap items-center gap-12 md:justify-center">
                <GraphiqlLogo className="h-[36px] shrink-0 md:h-[40px]" />
                <PrismaLogo className="h-[36px] shrink-0 md:h-[40px]" />
                <UrqlLogo className="h-[36px] shrink-0 md:h-[40px]" />
                <GatsbyLogo className="h-[36px] shrink-0 md:h-[40px]" />
              </div>
            </MaxWidthContainer>
          </Section>

          <footer className="flex flex-col bg-gravel-950 px-[20px] text-white">
            <MaxWidthContainer className="flex flex-col items-start justify-between gap-[24px] border-t border-t-gravel-800 px-0 py-[32px] md:flex-row md:items-center">
              <FuseLogoWithNameDark />
              <div className="flex flex-col items-start gap-[10px] md:flex-row md:items-center md:gap-[32px]">
                <Link
                  href="/docs"
                  className="p-2 font-medium text-gravel-300 hover:text-gravel-50"
                >
                  Docs
                </Link>
                <Link
                  href="https://github.com/StellateHQ/fuse.js/tree/main/examples"
                  className="p-2 font-medium text-gravel-300 hover:text-gravel-50"
                >
                  Examples
                </Link>
              </div>
              <div className="flex items-center gap-5">
                <a
                  href="https://stellate.co"
                  target="_blank"
                  className="cursor-pointer text-gravel-500 hover:text-gravel-200"
                >
                  <StellateLogo />
                  <span className="sr-only">Stellate</span>
                </a>
                <a
                  href="https://x.com/stellate"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="cursor-pointer text-gravel-500 hover:text-gravel-200"
                >
                  <XLogo />
                  <span className="sr-only">Check Fuse on X</span>
                </a>
                <a
                  href="https://www.npmjs.com/package/fuse"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="cursor-pointer text-gravel-500 hover:text-gravel-200"
                >
                  <NpmLogo />
                  <span className="sr-only">Fuse NPM package</span>
                </a>
                <a
                  href="https://github.com/StellateHQ/fuse.js"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="cursor-pointer text-gravel-500 hover:text-gravel-200"
                >
                  <GithubLogo />
                  <span className="sr-only">Fuse on Github</span>
                </a>
              </div>
            </MaxWidthContainer>
            <MaxWidthContainer className="flex flex-col-reverse justify-between px-0 pb-[16px] lg:flex-row">
              <p className="text-gravel-500 lg:text-center">
                © {new Date().getFullYear()}{' '}
                <a href="https://stellate.co" target="_blank">
                  Stellate, Inc
                </a>
              </p>
              <p className="max-w-[500px] pb-[20px] text-gravel-500 [text-wrap:balance] lg:max-w-none lg:pb-[12px] lg:text-center">
                <a
                  href="https://fusejs.org"
                  target="_blank"
                  className="text-gravel-200 hover:underline focus:underline"
                >
                  Fuse
                </a>{' '}
                is created by{' '}
                <a
                  href="https://stellate.co"
                  target="_blank"
                  className="text-gravel-200 hover:underline focus:underline"
                >
                  Stellate
                </a>
                . Follow{' '}
                <a
                  href="https://x.com/stellate"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gravel-200 hover:underline focus:underline"
                >
                  @Stellate
                </a>{' '}
                on Twitter for updates and star the repository on{' '}
                <a
                  href="https://github.com/StellateHQ/fuse.js"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gravel-200 hover:underline focus:underline"
                >
                  Github
                </a>
              </p>
            </MaxWidthContainer>
          </footer>
        </main>
      </div>
    </>
  )
}

export default IndexPage
