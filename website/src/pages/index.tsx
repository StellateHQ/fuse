/* eslint-disable @next/next/no-img-element */
import Link from 'next/link'
import type { InferGetStaticPropsType, GetStaticProps } from 'next'
import { getTweet, type Tweet } from 'react-tweet/api'
import { ButtonLink } from '../components/Button'
import { MaxWidthContainer, Section } from '@/components/Section'
import { Heading, HeadingEyebrow } from '@/components/Heading'
import { Text } from '@/components/Text'
import { PoweredByCards } from '@/components/PoweredByCards'
import {
  ArrowOpeningPath,
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
  UrqlLogo,
  XLogo,
  Observability,
  Automatic,
  GlobalUnique,
  Relay,
  Security,
  Scalable,
  External,
  ReactLogo,
  NextJsLogo,
  VueLogo,
  AngularjsLogo,
  ReactNativeLogo,
  SwiftLogo,
  KotlinLogo,
  JavaLogo,
  HttpLogo,
  BunLogo,
  NodeJsLogo,
  CloudflareWorkersLogo,
  AwsLogo,
} from '@/components/icons'
import Head from 'next/head'
import { getHeadMetaContent } from '@/components/HeadMeta'
import { Card } from '@/components/Card'
import { ExternalLink } from '@/components/ExternalLink'
import { TheGrid } from '@/components/TheGrid'
import { Testimonials } from '@/components/Testimonials'
import { MobileMenuLines } from '@/components/MobileMenuLines'
import { StarOnGithub } from '@/components/StarOnGithub'
import { useEffect, useState } from 'react'
import { cn } from '@/utils/tailwind'
import { PageVerticalLines } from '@/components/PageVerticaLines'

export const IndexPage = ({
  tweets,
  githubStars,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
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
          url: 'https://fusedata.dev',
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
                  href="https://github.com/StellateHQ/fuse/tree/main/examples"
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
                    <StellateLogo className="h-5 w-5" />
                    <span className="sr-only">Stellate</span>
                  </a>
                  <a
                    href="https://x.com/stellate"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="cursor-pointer text-gravel-950 hover:text-gravel-700 focus:text-gravel-700"
                  >
                    <XLogo className="h-5 w-5" />
                    <span className="sr-only">Check Fuse on X</span>
                  </a>
                  <a
                    href="https://github.com/StellateHQ/fuse"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="cursor-pointer text-gravel-950 hover:text-gravel-700 focus:text-gravel-700"
                  >
                    <GithubLogo className="h-5 w-5" />
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
                  href="https://github.com/StellateHQ/fuse/tree/main/examples"
                  className="py-[12px] font-medium text-gravel-900 hover:text-starship-700"
                >
                  Examples
                </Link>
              </div>
            </div>
          </div>
        </header>

        <main className="relative pt-[116px] md:pt-[140px]">
          <Section className="mx-auto max-w-[968px] px-5">
            <h2 className="mt-4 text-4xl font-bold  leading-[44px] tracking-tight md:mt-6 md:text-center md:text-[56px] md:leading-[67px]">
              Build and query great APls with TypeScript
            </h2>
            <h3 className="mt-6 text-lg leading-8 text-gravel-700 md:text-center md:text-xl md:[text-wrap:balance]">
              Aggregate all your data sources and transform them into a great
              API for your clients with many best practices built-in for
              you—fully typesafe from data source to client query.
            </h3>
            <div className="mt-10 flex flex-wrap items-center gap-4 md:justify-center">
              <ButtonLink
                variant="dark"
                href="/docs"
                className="justify-center"
              >
                Get Started <External className="w-5 text-starship-400" />
              </ButtonLink>
              <StarOnGithub stars={githubStars} />
            </div>
          </Section>

          <div className="relative mt-6 pb-4 ">
            <div className="absolute inset-x-0 bottom-0 h-20 bg-gravel-950" />
            <section className="relative mx-auto max-w-[1152px] px-3">
              <div className="rounded-2xl bg-gravel-950 p-1.5 shadow-video">
                {/* mobile video below */}
                <div className="overflow-hidden rounded-lg md:hidden">
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
                <div className="hidden overflow-hidden rounded-lg md:flex">
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
              </div>
            </section>
          </div>

          <Testimonials tweets={tweets} />

          <Section
            variant="dark"
            className="flex flex-col gap-6 py-12 md:gap-24 md:py-24"
          >
            <PageVerticalLines />
            <MaxWidthContainer>
              <div className="flex min-w-0 flex-col gap-5 md:items-center md:text-center">
                <HeadingEyebrow>What&apos;s Fuse?</HeadingEyebrow>
                <Heading level={2}>
                  A framework for building great APIs{' '}
                  <span className="bg-text-starship-gradient bg-clip-text text-transparent">
                    effortlessly
                  </span>
                </Heading>
                <Text className="text-gravel-300 md:w-2/3">
                  Build a GraphQL API that aggregates all your microservices,
                  data stores, and third-party APIs with the minimum amount of
                  code. Fuse generates a TypeScript client to access your API
                  with full type safety.
                </Text>
              </div>
            </MaxWidthContainer>
            <MaxWidthContainer>
              <div className="flex justify-center md:hidden">
                <div className="relative pb-10">
                  <img
                    src="/images/homepage-code-sample-mobile.svg"
                    alt="A Fuse code sample, this shows on the left a code-editor where we see us converting a user-endpoint to a user-node. The code sample starts by calling a function called node, passes a generic in there called ProductSource, representing the Product type on the REST endpoint, next it gives the node a name 'Product'. It specifies a load function, which is called 'getProductsByIds' and finishes off by defining the shape of the data that will be returned from our node, the shape has a name which in this case is a string that gets exposed from the product_name property of the resource, a details property which is also a string and a category which has a custom resolve function returning the product.category_id. On the right we see how this translates to GraphQL where we can query this node by means of `query GetProduct($id: ID!) { product(id: $id) { id name details category { id name} } }`"
                  />
                  <div className="absolute -bottom-4 right-4 w-[240px]">
                    <OneCommand />
                  </div>
                </div>
              </div>
              <div className="hidden md:flex md:justify-center">
                <div className="relative">
                  <img
                    src="/images/homepage-code-sample-desktop.svg"
                    alt="A Fuse code sample, this shows on the left a code-editor where we see us converting a user-endpoint to a user-node. The code sample starts by calling a function called node, passes a generic in there called ProductSource, representing the Product type on the REST endpoint, next it gives the node a name 'Product'. It specifies a load function, which is called 'getProductsByIds' and finishes off by defining the shape of the data that will be returned from our node, the shape has a name which in this case is a string that gets exposed from the product_name property of the resource, a details property which is also a string and a category which has a custom resolve function returning the product.category_id. On the right we see how this translates to GraphQL where we can query this node by means of `query GetProduct($id: ID!) { product(id: $id) { id name details category { id name} } }`"
                  />
                  <div className="absolute bottom-6 left-28 w-[400px]">
                    <OneCommand />
                  </div>
                </div>
              </div>
            </MaxWidthContainer>
          </Section>

          <Section variant="dark" className="py-12 md:py-24">
            <PageVerticalLines />

            <div className="mx-auto flex max-w-[968px] flex-col gap-5 px-5 md:items-center md:text-center">
              <HeadingEyebrow>What&apos;s in it?</HeadingEyebrow>
              <Heading level={2} wrapBalance>
                <span className="bg-text-starship-gradient bg-clip-text text-transparent">
                  Everything you need
                </span>{' '}
                to build and query a great API
              </Heading>
              <Text className="text-gravel-300">
                All the best practices built-in, so you don&apos;t have to think
                about them
              </Text>
              <ul className="flex flex-col gap-3 text-gravel-300 md:mt-5 md:max-w-3xl md:flex-row md:flex-wrap md:justify-center md:gap-x-6 md:gap-y-3">
                <li className="flex items-center gap-2.5">
                  <Automatic className="w-6 shrink-0 text-starship-500" />
                  <span className="text-lg">Automatic data loaders</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <GlobalUnique className="w-6 shrink-0 text-starship-500" />
                  <span className="text-lg">Globally unique IDs</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <Relay className="w-6 shrink-0 text-starship-500" />
                  <span className="text-lg">Relay-style node query</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <Security className="w-6 shrink-0 text-starship-500" />
                  <span className="text-lg">Production-grade security</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <Scalable className="w-6 shrink-0 text-starship-500" />
                  <span className="text-lg">
                    Scalable Relay-style pagination
                  </span>
                </li>
              </ul>
            </div>

            <MaxWidthContainer className="mt-9">
              <div className="relative  md:mx-auto md:mt-16 md:max-w-[1008px]">
                <Card>
                  <div className="flex flex-col gap-5 md:flex-row md:items-start md:gap-14">
                    <p className="text-sm text-gravel-300 md:w-[45%] md:text-lg">
                      Fuse generates a TypeScript client for your API that you
                      can use with all JavaScript frameworks (including support
                      for React Server Components). In other languages, you can
                      access your API with any GraphQL client.
                    </p>
                    <div className="flex flex-wrap gap-2 md:w-[55%] md:gap-3">
                      <ExternalLink href="/docs/client/javascript/react">
                        <ReactLogo className="md:h-6 md:w-auto" />
                      </ExternalLink>
                      <ExternalLink href="/docs/client/javascript/nextjs">
                        <NextJsLogo className="md:h-6 md:w-auto" />
                      </ExternalLink>
                      <ExternalLink href="/docs/client/javascript/vue">
                        <VueLogo className="md:h-6 md:w-auto" />
                      </ExternalLink>
                      <ExternalLink href="/docs/client/javascript/angular">
                        <AngularjsLogo className="md:h-6 md:w-auto" />
                      </ExternalLink>
                      <ExternalLink href="/docs/client/javascript/react">
                        <ReactNativeLogo className="md:h-6 md:w-auto" />
                      </ExternalLink>
                      <ExternalLink href="/docs/client/other/ios">
                        <SwiftLogo className="md:h-6 md:w-auto" />
                      </ExternalLink>
                      <ExternalLink href="/docs/client/other/android">
                        <KotlinLogo className="md:h-6 md:w-auto" />
                      </ExternalLink>
                      <ExternalLink href="/docs/client/other/android">
                        <JavaLogo className="md:h-6 md:w-auto" />
                      </ExternalLink>
                      <ExternalLink href="/docs/client/other/http">
                        <HttpLogo className="md:h-6 md:w-auto" />
                      </ExternalLink>
                    </div>
                  </div>

                  <div className="mt-5 md:mt-9 md:max-w-lg lg:max-w-xl">
                    <h3 className="font-semibold text-white md:text-xl">
                      You can deploy your Fuse API anywhere with adapters for
                    </h3>
                    <div className="mt-5 flex flex-wrap gap-2 md:gap-3">
                      <ExternalLink href="/docs/deployment/nextjs">
                        <NextJsLogo className="md:h-6 md:w-auto" />
                      </ExternalLink>
                      <ExternalLink href="/docs/deployment/bun">
                        <BunLogo className="md:h-6 md:w-auto" />
                      </ExternalLink>
                      <ExternalLink href="/docs/deployment/node">
                        <NodeJsLogo className="md:h-6 md:w-auto" />
                      </ExternalLink>
                      <ExternalLink href="/docs/deployment/cloudflare-workers">
                        <CloudflareWorkersLogo className="md:h-6 md:w-auto" />
                      </ExternalLink>
                      <ExternalLink href="/docs/deployment/lambda">
                        <AwsLogo className="md:h-6 md:w-auto" />
                      </ExternalLink>
                    </div>
                  </div>
                </Card>
                <div className="mt-9 md:absolute md:-bottom-8 md:right-4 md:w-[308px] lg:-bottom-11 lg:right-16">
                  <OneCommand />
                </div>
              </div>
            </MaxWidthContainer>
          </Section>

          <Section variant="dark" className="py-12 md:py-24">
            <PageVerticalLines inverted />
            <MaxWidthContainer>
              <div className="flex flex-col gap-5">
                <HeadingEyebrow variant="starship">Why GraphQL?</HeadingEyebrow>
                <Heading level={2}>GraphQL is the best API framework</Heading>
              </div>

              <div className="mt-6 flex flex-col gap-6 md:flex-row md:items-center md:gap-10">
                <div className="md:flex-1">
                  <ul className="flex max-w-[420px] flex-col gap-5 text-gravel-300">
                    <li className="flex gap-3">
                      <ArrowOpeningPath className="w-6 shrink-0 text-starship-500" />
                      <span className="[text-wrap:balance] md:text-[18px]">
                        Fetch the data for a page in a single request, even if
                        it is spread between many data sources
                      </span>
                    </li>
                    <li className="flex gap-3">
                      <PuzzlePieces className="w-6 shrink-0 text-starship-500" />
                      <span className="[text-wrap:balance] md:text-[18px]">
                        Define data requirements per component with fragment
                        composition for essentially infinite codebase
                        scalability
                      </span>
                    </li>
                    <li className="flex gap-3">
                      <NodeStack className="w-6 shrink-0 text-starship-500" />
                      <span className="[text-wrap:balance] md:text-[18px]">
                        Evolve your API without versions because clients aren’t
                        impacted by additive changes
                      </span>
                    </li>
                    <li className="flex gap-3">
                      <Observability className="w-6 shrink-0 text-starship-500" />
                      <span className="[text-wrap:balance] md:text-[18px]">
                        Simplify observability, governance, and security by
                        having a central access point for all your data
                      </span>
                    </li>
                  </ul>
                </div>
                <div className="flex justify-center md:flex-1">
                  <img
                    className="relative w-60 md:w-[350px]"
                    src="/images/fuse-circle.svg"
                    alt="A circle consisting of three layers, the outer one in a darker green showing a datasource with a PostGres and REST logo, the second layer in a lightest green showing a GraphQL logo and last but not least the center showing the Fuse logo which is a black 'x' with a green outline."
                  />
                </div>
              </div>
            </MaxWidthContainer>
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
                href="/docs/fuse-method"
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
                  href="https://github.com/StellateHQ/fuse/tree/main/examples"
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
                  href="https://github.com/StellateHQ/fuse"
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
                  href="https://fusedata.dev"
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
                  href="https://github.com/StellateHQ/fuse"
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

function OneCommand() {
  return (
    <Card className="px-3 py-2 md:px-6 md:py-5">
      <p className="text-sm font-semibold leading-4 [text-wrap:balance] md:text-base md:leading-5">
        Get started in seconds with one command!
      </p>
      <div className="mt-2 flex items-center gap-2 rounded-lg bg-starship-900 px-4 py-3 text-xs text-starship-500 md:mt-4 md:text-base">
        <code className="font-mono">$</code>
        <code className="font-mono">npx create-fuse-app</code>
      </div>
    </Card>
  )
}

const TWEET_IDS = [
  '1736702967531884761',
  '1732696412301721726',
  '1734668875805966816',
  '1732709507912925250',
  '1732713511136969138',
]

export const getStaticProps = (async () => {
  try {
    const tweets = await Promise.all(
      TWEET_IDS.map((tweetId) => getTweet(tweetId)),
    )

    const res = await fetch('https://api.github.com/repos/StellateHQ/fuse')
    const repo = await res.json()

    return {
      props: {
        tweets: tweets.filter((tweet) => tweet !== undefined) as Tweet[],
        githubStars: repo.stargazers_count as number,
      },
      revalidate: 60 * 60,
    }
  } catch (e) {
    console.error(e)
    return { props: { tweets: [], githubStars: 0, revalidate: 60 * 60 } }
  }
}) satisfies GetStaticProps<{
  tweets: Tweet[]
  githubStars: number
}>

export default IndexPage
