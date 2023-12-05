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
  GraphqlPlaygroundLogo,
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
import { HeadMeta } from '@/components/HeadMeta'
import { Card } from '@/components/Card'

export const IndexPage = () => {
  return (
    <>
      <Head>
        <HeadMeta url="https://fusejs.org" />
      </Head>
      <div className="bg-white">
        <div className="pointer-events-none absolute inset-x-0 top-0 z-0 h-[685px] overflow-hidden">
          <img
            src="/images/the-grid.svg"
            className="relative left-1/2 max-w-none -translate-x-1/2 bg-white"
            alt=""
          />
        </div>

        <header className="sticky top-0 z-50 mx-auto max-w-4xl px-3 py-5">
          <div className="rounded-[20px] border border-gravel-100 bg-white p-1 shadow-card">
            <div className="flex h-12 items-center justify-between rounded-2xl border border-gravel-200 px-3 shadow-card md:px-5">
              <div className="flex shrink-0">
                <Link href="/" className="flex items-center gap-2 px-2 py-2">
                  <FuseLogoWithNameLight />
                  <span className="sr-only">Fuse.js</span>
                </Link>
              </div>

              <div className="hidden items-center gap-4 md:flex">
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

              <div className="flex items-center gap-5">
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
                  href="https://www.npmjs.com/package/fuse"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="cursor-pointer text-gravel-950 hover:text-gravel-700 focus:text-gravel-700"
                >
                  <NpmLogo />
                  <span className="sr-only">Fuse NPM package</span>
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
            </div>
          </div>
        </header>

        <main className="relative pt-5 md:pt-11">
          <Section className="mx-auto max-w-[1100px] px-5">
            <div className="flex md:justify-center">
              <ButtonLink
                href="http://stellate.co/blog/introducing-fuse-js"
                target="_blank"
                variant="light"
                rel="noopener noreferrer"
              >
                <svg
                  width={16}
                  height={17}
                  viewBox="0 0 16 17"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4"
                >
                  <g clipPath="url(#clip0_261_5723)">
                    <path
                      d="M13.895 8.127h.011a.167.167 0 110 .334h-.04c-2.006 0-3.595.49-4.704 1.605-1.104 1.108-1.649 2.75-1.755 4.87v.025a.167.167 0 01-.334 0h0v-.007c-.031-2.114-.538-3.764-1.654-4.882C4.301 8.954 2.663 8.461.573 8.461a.167.167 0 110-.333v0H.58c2.105-.031 3.755-.54 4.874-1.656 1.12-1.118 1.619-2.756 1.619-4.844a.167.167 0 01.333 0c0 2.07.487 3.7 1.601 4.818 1.113 1.116 2.762 1.633 4.888 1.681z"
                      fill="currentColor"
                      stroke="currentColor"
                    />
                    <mask id="a" fill="#fff">
                      <path d="M11.258 3.04h.833v.834a.5.5 0 001 0V3.04h.834a.5.5 0 100-1h-.834v-.833a.5.5 0 10-1 0v.833h-.833a.5.5 0 100 1z" />
                    </mask>
                    <path
                      d="M11.258 3.04h.833v.834a.5.5 0 001 0V3.04h.834a.5.5 0 100-1h-.834v-.833a.5.5 0 10-1 0v.833h-.833a.5.5 0 100 1z"
                      fill="currentColor"
                    />
                    <path
                      d="M12.091 3.04h1v-1h-1v1zm.5 1.334v1-1zm.5-1.334v-1h-1v1h1zm0-1h-1v1h1v-1zm-.5-1.333v-1 1zm-.5 1.333v1h1v-1h-1zm-.833 2h.833v-2h-.833v2zm-.167-1v.834h2V3.04h-2zm0 .834c0 .398.158.78.44 1.06l1.414-1.414a.5.5 0 01.146.354h-2zm.44 1.06a1.5 1.5 0 001.06.44v-2a.5.5 0 01.354.146L11.53 4.934zm1.06.44a1.5 1.5 0 001.06-.44L12.239 3.52a.5.5 0 01.353-.146v2zm1.06-.44a1.5 1.5 0 00.44-1.06h-2a.5.5 0 01.147-.354l1.414 1.414zm.44-1.06V3.04h-2v.834h2zm-1 .166h.834v-2h-.834v2zm.834 0a1.5 1.5 0 001.06-.439l-1.414-1.414a.5.5 0 01.354-.147v2zm1.06-.439a1.5 1.5 0 00.44-1.06h-2a.5.5 0 01.146-.354L14.985 3.6zm.44-1.06a1.5 1.5 0 00-.44-1.061l-1.414 1.414a.5.5 0 01-.146-.354h2zm-.44-1.061a1.5 1.5 0 00-1.06-.44v2a.5.5 0 01-.354-.146l1.414-1.414zm-1.06-.44h-.834v2h.834v-2zm.166 1v-.833h-2v.833h2zm0-.833a1.5 1.5 0 00-.44-1.06L12.239 1.56a.5.5 0 01-.147-.354h2zm-.44-1.06a1.5 1.5 0 00-1.06-.44v2a.5.5 0 01-.353-.146L13.652.146zm-1.06-.44a1.5 1.5 0 00-1.06.44l1.414 1.414a.5.5 0 01-.354.146v-2zm-1.06.44a1.5 1.5 0 00-.44 1.06h2a.5.5 0 01-.146.354L11.53.146zm-.44 1.06v.833h2v-.833h-2zm1-.167h-.833v2h.833v-2zm-.833 0a1.5 1.5 0 00-1.06.44l1.413 1.414a.5.5 0 01-.353.146v-2zm-1.06.44a1.5 1.5 0 00-.44 1.06h2a.5.5 0 01-.147.354L10.197 1.48zm-.44 1.06c0 .398.158.78.44 1.061l1.413-1.414a.5.5 0 01.147.353h-2zm.44 1.061a1.5 1.5 0 001.06.44v-2a.5.5 0 01.353.146L10.197 3.6z"
                      fill="currentColor"
                      mask="url(#a)"
                    />
                    <mask id="b" fill="#fff">
                      <path d="M15.409 13.96h-.834v-.833a.5.5 0 00-1 0v.833h-.833a.5.5 0 000 1h.833v.834a.5.5 0 001 0v-.834h.834a.5.5 0 000-1z" />
                    </mask>
                    <path
                      d="M15.409 13.96h-.834v-.833a.5.5 0 00-1 0v.833h-.833a.5.5 0 000 1h.833v.834a.5.5 0 001 0v-.834h.834a.5.5 0 000-1z"
                      fill="currentColor"
                    />
                    <path
                      d="M14.575 13.96h-1v1h1v-1zm-1 0v1h1v-1h-1zm0 1h1v-1h-1v1zm1 0v-1h-1v1h1zm.834-2h-.834v2h.834v-2zm.166 1v-.833h-2v.833h2zm0-.833a1.5 1.5 0 00-.439-1.06l-1.414 1.413a.5.5 0 01-.146-.353h2zm-.439-1.06a1.5 1.5 0 00-1.06-.44v2a.5.5 0 01-.354-.147l1.414-1.414zm-1.06-.44a1.5 1.5 0 00-1.061.44l1.414 1.413a.5.5 0 01-.354.147v-2zm-1.061.44a1.5 1.5 0 00-.44 1.06h2a.5.5 0 01-.146.353l-1.414-1.414zm-.44 1.06v.833h2v-.833h-2zm1-.167h-.833v2h.833v-2zm-.833 0a1.5 1.5 0 00-1.06.44l1.414 1.414a.5.5 0 01-.354.146v-2zm-1.06.44a1.5 1.5 0 00-.44 1.06h2a.5.5 0 01-.146.354L11.68 13.4zm-.44 1.06c0 .398.158.78.44 1.06l1.414-1.413a.5.5 0 01.146.353h-2zm.44 1.06a1.5 1.5 0 001.06.44v-2a.5.5 0 01.354.147L11.68 15.52zm1.06.44h.833v-2h-.833v2zm-.167-1v.834h2v-.834h-2zm0 .834c0 .397.159.779.44 1.06l1.414-1.414a.5.5 0 01.146.354h-2zm.44 1.06a1.5 1.5 0 001.06.44v-2a.5.5 0 01.354.146l-1.414 1.414zm1.06.44a1.5 1.5 0 001.061-.44l-1.414-1.414a.5.5 0 01.354-.146v2zm1.061-.44a1.5 1.5 0 00.44-1.06h-2a.5.5 0 01.146-.354l1.414 1.414zm.44-1.06v-.834h-2v.834h2zm-1 .166h.833v-2h-.834v2zm.833 0a1.5 1.5 0 001.06-.44l-1.414-1.413a.5.5 0 01.354-.147v2zm1.06-.44a1.5 1.5 0 00.44-1.06h-2a.5.5 0 01.146-.353l1.415 1.414zm.44-1.06a1.5 1.5 0 00-.44-1.06l-1.414 1.414a.5.5 0 01-.146-.354h2zm-.44-1.06a1.5 1.5 0 00-1.06-.44v2a.5.5 0 01-.354-.146L16.47 13.4z"
                      fill="currentColor"
                      mask="url(#b)"
                    />
                  </g>
                  <defs>
                    <clipPath id="clip0_261_5723">
                      <path
                        fill="#fff"
                        transform="translate(0 .5)"
                        d="M0 0H16V16H0z"
                      />
                    </clipPath>
                  </defs>
                </svg>
                Read Fuse.js Announcement
                <svg
                  width={16}
                  height={17}
                  viewBox="0 0 16 17"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 text-starship-400"
                >
                  <mask id="a" fill="#fff">
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M8 16.5a8 8 0 100-16 8 8 0 000 16zm-2.332-4.16a.333.333 0 01-.471 0l-.943-.943a.333.333 0 010-.472l3.72-3.72a.16.16 0 00.037-.178.173.173 0 00-.155-.109l-2.579.015a.333.333 0 01-.236-.566l1.452-1.452a.347.347 0 01.25-.1l4.497.218a.347.347 0 01.32.32l.218 4.498a.333.333 0 01-.095.254l-1.437 1.438a.34.34 0 01-.57-.24l.004-2.56a.173.173 0 00-.108-.156.167.167 0 00-.18.038l-3.724 3.714z"
                    />
                  </mask>
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M8 16.5a8 8 0 100-16 8 8 0 000 16zm-2.332-4.16a.333.333 0 01-.471 0l-.943-.943a.333.333 0 010-.472l3.72-3.72a.16.16 0 00.037-.178.173.173 0 00-.155-.109l-2.579.015a.333.333 0 01-.236-.566l1.452-1.452a.347.347 0 01.25-.1l4.497.218a.347.347 0 01.32.32l.218 4.498a.333.333 0 01-.095.254l-1.437 1.438a.34.34 0 01-.57-.24l.004-2.56a.173.173 0 00-.108-.156.167.167 0 00-.18.038l-3.724 3.714z"
                    fill="#141413"
                  />
                  <path
                    d="M5.668 12.34l-.47-.473-.001.001.471.471zm-.471 0l-.471.47.47-.47zm-.943-.943l-.471.471.471-.471zm0-.472l-.471-.471.471.471zm3.72-3.72l-.457-.485-.008.007-.007.008.472.47zm.047-.083l.652.138-.652-.138zm-.01-.095l-.618.25.005.01.613-.26zm-.061-.078l.38-.547-.38.547zm-.094-.03l.02-.667h-.024l.004.666zm-2.579.014l-.006.666h.01l-.004-.666zm-.324-.396l-.655-.125.655.125zm.088-.17l-.471-.472-.007.007.478.465zm1.452-1.452l-.466-.476-.005.004.471.472zm.25-.1l.032-.665h-.018l-.014.666zm4.497.218l.049-.665h-.008l-.008-.001-.033.666zm.22.1l.472-.471-.472.471zm.1.22l.667-.032v-.008l-.001-.008-.665.048zm.218 4.498l-.666.032v.01l.666-.043zm-.095.254l.472.471.005-.005-.476-.466zm-1.437 1.438l.452.49.01-.01.01-.009-.472-.471zm-.172.085l-.115-.657.115.657zm-.19-.022l-.26.615.26-.615zm-.15-.121l.55-.377-.55.377zm-.059-.183H9.01v.019l.666-.019zm.005-2.56l.667.002V8.723l-.667.02zm-.031-.093l-.547.381.547-.381zm-.077-.062l.249-.618-.006-.002-.243.62zm-.096-.008l-.137-.652.137.652zm-.084.046l.471.472.002-.002-.473-.47zm5.941-.125A7.333 7.333 0 018 15.833v1.334A8.667 8.667 0 0016.667 8.5h-1.334zM8 1.167A7.333 7.333 0 0115.333 8.5h1.334A8.667 8.667 0 008-.167v1.334zM.667 8.5A7.333 7.333 0 018 1.167V-.167A8.667 8.667 0 00-.667 8.5H.667zM8 15.833A7.333 7.333 0 01.667 8.5H-.667A8.667 8.667 0 008 17.167v-1.334zm-2.567-2.73a1 1 0 00.707-.292l-.943-.943a.333.333 0 01.236-.098v1.334zm-.707-.292a1 1 0 00.707.293V11.77c.088 0 .173.035.235.097l-.942.943zm-.943-.943l.943.943.942-.943-.942-.943-.943.943zm-.293-.707a1 1 0 00.293.707l.943-.943a.333.333 0 01.097.236H3.49zm.293-.707a1 1 0 00-.293.707h1.333a.333.333 0 01-.097.236l-.943-.943zm3.72-3.72l-3.72 3.72.943.943 3.719-3.72-.943-.942zm-.135.251a.507.507 0 01.149-.265l.913.972a.827.827 0 00.243-.432l-1.305-.275zm.03.302a.507.507 0 01-.03-.302l1.305.275a.827.827 0 00-.048-.494l-1.227.521zm.17.21a.493.493 0 01-.175-.22l1.237-.5a.84.84 0 00-.3-.375l-.762 1.094zm.268.088a.493.493 0 01-.268-.089l.763-1.094a.84.84 0 00-.455-.15l-.04 1.333zm-2.555.014l2.578-.014-.007-1.333-2.579.014.008 1.333zm-.56-.17a1 1 0 00.55.17l.013-1.333c.065 0 .129.02.183.057l-.745 1.105zm-.364-.445a1 1 0 00.365.444l.745-1.105a.333.333 0 01.121.148l-1.23.513zm-.059-.572a1 1 0 00.06.572l1.23-.513c.025.06.032.126.02.19l-1.31-.249zm.265-.51a1 1 0 00-.265.51l1.31.25a.333.333 0 01-.089.17l-.956-.93zm1.459-1.459L4.57 5.895l.943.943 1.452-1.452-.943-.943zm.34-.223c-.125.05-.239.124-.335.219l.933.952a.32.32 0 01-.106.069l-.491-1.24zm.395-.07a1.013 1.013 0 00-.394.07l.49 1.24a.32.32 0 01-.124.022l.028-1.333zm4.516.217L6.775 4.15l-.064 1.332 4.497.217.065-1.332zm.659.295a1.013 1.013 0 00-.643-.294l-.097 1.33a.32.32 0 01-.203-.093l.943-.943zm.294.643a1.014 1.014 0 00-.294-.643l-.943.943a.32.32 0 01-.093-.203l1.33-.097zm.218 4.513l-.217-4.497-1.332.064.217 4.498 1.332-.065zm-.061.401a1 1 0 00.06-.412l-1.33.087a.334.334 0 01.02-.138l1.25.463zm-.223.352c.098-.1.174-.22.223-.352l-1.25-.463a.334.334 0 01.074-.117l.953.932zm-1.443 1.443l1.438-1.438-.943-.942-1.438 1.437.943.943zm-.529.27c.19-.033.368-.12.51-.251l-.904-.98a.327.327 0 01.165-.082l.23 1.314zm-.564-.063c.178.075.374.097.564.064l-.23-1.314a.327.327 0 01.184.02l-.518 1.23zm-.44-.36c.11.16.262.284.44.36l.518-1.23a.327.327 0 01.143.117l-1.1.753zm-.175-.54c.005.193.066.38.175.54l1.1-.753a.327.327 0 01.058.176l-1.333.037zm.004-2.58l-.004 2.56 1.333.003.005-2.56-1.334-.003zm.089.289a.493.493 0 01-.088-.267l1.332-.04a.84.84 0 00-.15-.455l-1.094.762zm.22.175a.493.493 0 01-.22-.175l1.094-.762a.84.84 0 00-.375-.3l-.499 1.237zm.292.027a.5.5 0 01-.286-.024l.487-1.241a.833.833 0 00-.476-.04l.275 1.305zm.251-.137a.5.5 0 01-.251.137l-.275-1.305a.833.833 0 00-.42.228l.946.94zM6.14 12.81l3.724-3.714-.941-.944-3.724 3.714.941.944z"
                    fill="#141413"
                    mask="url(#a)"
                  />
                  <path
                    d="M5.433 12.437a.333.333 0 00.235-.098l3.724-3.714a.167.167 0 01.257.024c.02.027.03.06.031.094l-.005 2.56a.34.34 0 00.57.24l1.439-1.438a.333.333 0 00.094-.255l-.217-4.497a.347.347 0 00-.32-.32l-4.498-.217a.347.347 0 00-.25.099L5.041 6.367a.333.333 0 00.236.566l2.579-.015a.173.173 0 01.165.204.16.16 0 01-.047.084l-3.72 3.72a.333.333 0 000 .47l.943.943a.333.333 0 00.236.098z"
                    fill="currentColor"
                  />
                </svg>
              </ButtonLink>
            </div>
            <div className="mt-10 flex md:justify-center">
              <h3 className="flex items-center gap-1.5 text-xs font-medium uppercase tracking-wider text-gravel-700 md:text-sm">
                The data layer for
                <svg
                  width={17}
                  height={17}
                  viewBox="0 0 17 17"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 text-gravel-950"
                >
                  <path
                    d="M7.976.504l-.242.022c-2.272.205-4.4 1.431-5.749 3.315A7.919 7.919 0 00.573 7.337c-.064.439-.072.569-.072 1.165 0 .595.008.725.072 1.165a8.032 8.032 0 005.472 6.463c.519.167 1.066.281 1.689.35.242.027 1.29.027 1.532 0 1.075-.119 1.985-.385 2.882-.843.138-.07.165-.089.146-.105-.013-.009-.6-.796-1.303-1.746l-1.279-1.728-1.603-2.373a229.167 229.167 0 00-1.614-2.37c-.006-.002-.012 1.052-.015 2.34-.005 2.253-.007 2.343-.035 2.396a.284.284 0 01-.137.143c-.05.025-.094.03-.33.03h-.27l-.073-.046a.294.294 0 01-.105-.114l-.032-.07.003-3.136.004-3.137.049-.06a.428.428 0 01.116-.096c.064-.032.089-.035.36-.035.318 0 .371.013.454.104.024.025.892 1.332 1.93 2.907 1.038 1.574 2.458 3.725 3.156 4.78l1.266 1.919.065-.042a8.216 8.216 0 001.643-1.442 7.963 7.963 0 001.883-4.09c.064-.439.072-.569.072-1.164 0-.596-.008-.726-.072-1.165A8.032 8.032 0 0010.955.873 8.399 8.399 0 009.29.525a20.677 20.677 0 00-1.314-.02zm3.275 4.839c.075.037.136.11.158.184.012.04.015.91.012 2.87l-.005 2.812-.495-.76-.497-.76V7.644c0-1.322.006-2.065.015-2.1a.319.319 0 01.155-.198c.064-.032.088-.036.333-.036.232 0 .272.004.324.032z"
                    fill="currentColor"
                  />
                </svg>
                Next.js
              </h3>
            </div>
            <h2 className="mt-4 text-4xl font-bold  leading-[44px] tracking-tight [text-wrap:balance] md:mt-6 md:text-center md:text-[56px] md:leading-[67px]">
              End-to-end typesafe data fetching for frontend teams at scale
            </h2>
            <h3 className="mt-6 text-lg leading-8 text-gravel-700 md:text-center md:text-xl md:[text-wrap:balance]">
              Use Fuse.js to build a data layer that fetches data exactly how
              you need it. No more waiting for backend teams to update their
              APIs for your specific use case.
              {/* Stop waiting for the backend team to update their APIs to match
              your needs, use Fuse.js to build a data layer that fetches data
              exactly how you need it. */}
              {/*
            Ship faster by empowering frontend teams to shape data to meet their
            needs, all with Fuse.js, the best way to build a data layer.
  */}
            </h3>
            <div className="mt-10 flex items-center gap-4 md:justify-center">
              <ButtonLink variant="dark" href="/docs">
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

          <section className="z-10 mx-auto -mb-16 mt-16 max-w-[1100px] px-3">
            <div className="relative h-[600px] rounded-2xl bg-gravel-900 shadow-video">
              Video here
            </div>
          </section>

          <Section variant="dark" className="flex flex-col gap-14 py-16 pt-40">
            <MaxWidthContainer>
              <div className="flex min-w-0 flex-col gap-5 md:items-center">
                <HeadingEyebrow>What&apos;s Fuse.js?</HeadingEyebrow>
                <Heading level={2}>
                  The best way to build a{' '}
                  <span className="bg-text-starship-gradient bg-clip-text text-transparent">
                    data layer
                  </span>
                </Heading>
                <Text className="w-2/3 text-gravel-300">
                  Fuse is an opinionated framework for creating fully typesafe
                  data layers that allow frontend teams to translate
                  resource-based APIs to their needs.
                </Text>
              </div>
            </MaxWidthContainer>
            <MaxWidthContainer>
              <picture>
                <source
                  media="(max-width: 767px)"
                  srcSet="/images/homepage-code-sample-mobile.png"
                />
                <source
                  media="(min-width: 768px)"
                  srcSet="/images/homepage-code-sample.png"
                />
                <img
                  src="/images/homepage-code-sample.png"
                  alt="Code sample showing how Fuse turns a REST API data source into GraphQL"
                />
              </picture>
            </MaxWidthContainer>
          </Section>

          {/* Do we want to keep this section?  */}
          {/* <Section variant="dark" className=" flex flex-col gap-14 px-5 py-16">
          <MaxWidthContainer className="flex flex-col gap-5">
            <HeadingEyebrow>
              There&apos;s nothing new under the sun
            </HeadingEyebrow>
            <Heading level={2}>Proven at scale</Heading>
            <Text className="text-gravel-300">
              At Stellate, we have spoken with hundreds of companies at scale
              about their APIs. That is how we discovered that the most
              successful ones all use and love this data layer pattern. (despite
              it not having a unified name until now!)
            </Text>
          </MaxWidthContainer>
        </Section> */}

          <Section variant="dark" className="py-16">
            <div className="flex flex-col gap-5">
              <MaxWidthContainer className="flex gap-24">
                <div className="flex min-w-0 flex-col gap-5">
                  <HeadingEyebrow variant="starship">
                    Why Fuse.js?
                  </HeadingEyebrow>
                  <Heading level={2} className="text-[28px] md:text-[36px]">
                    Optimal data fetching out of the box
                  </Heading>
                  <ul className="flex max-w-[420px] list-none flex-col gap-5 text-gravel-300">
                    <li className="flex gap-2">
                      <ArrowOpeningPath className="shrink-0 text-starship-500" />
                      <span>
                        Every page gets exactly, and only, the data it needs in
                        a single network request.
                      </span>
                    </li>
                    <li className="flex gap-2">
                      <PuzzlePieces className="shrink-0 text-starship-500" />
                      <span>
                        Data requirements are defined per component, allowing it
                        to scale no matter how big the codebase gets.
                      </span>
                    </li>
                    <li className="flex gap-2">
                      <NodeStack className="shrink-0 text-starship-500" />
                      <span>
                        Nodes are automatically data loaded under the hood—no
                        more n+1 problems.
                      </span>
                    </li>
                  </ul>
                </div>
                <img
                  className="hidden md:block"
                  src="/images/fuse-circles-with-logos.svg"
                  alt=""
                />
              </MaxWidthContainer>
              <MaxWidthContainer className="flex gap-24 pt-[32px] md:pt-[48px]">
                <div className="flex min-w-0 flex-col gap-5">
                  <Heading
                    level={2}
                    className="text-[20px] md:text-[28px] lg:text-[28px]"
                  >
                    An intuitive developer experience
                  </Heading>
                </div>
              </MaxWidthContainer>
              <MaxWidthContainer variant="larger">
                <ul className="grid gap-4 md:grid-cols-3 md:gap-6">
                  <li>
                    <Card className="flex flex-col items-start gap-[16px]">
                      <div className="rounded-[6px] bg-gravel-950 p-[8px]">
                        <BuildingBlock className="shrink-0 text-starship-500" />
                      </div>
                      <span>
                        The whole API is documented and consistency enforced,
                        thanks to the schema.
                      </span>
                    </Card>
                  </li>
                  <li>
                    <Card className="flex flex-col items-start gap-[16px]">
                      <div className="rounded-[6px] bg-gravel-950 p-[8px]">
                        <ArrowConnectingNodes className="shrink-0 text-starship-500" />
                      </div>
                      <span>
                        Typesafe end-to-end from data source to client
                        component.
                      </span>
                    </Card>
                  </li>
                  <li>
                    <Card className="flex flex-col items-start gap-[16px]">
                      <div className="rounded-[6px] bg-gravel-950 p-[8px]">
                        <Terminal className="shrink-0 text-starship-500" />
                      </div>
                      <span>
                        IDE autocomplete, hot module-replacement, an API
                        playground, and more out of the box.
                      </span>
                    </Card>
                  </li>
                </ul>
              </MaxWidthContainer>
            </div>
          </Section>

          <Section variant="dark" className="py-16">
            <MaxWidthContainer className="flex flex-col gap-[40px] lg:flex-row">
              <div className="flex min-w-0 flex-col gap-5">
                <HeadingEyebrow>Why a data layer?</HeadingEyebrow>
                <Heading level={2}>Ship fast at scale</Heading>
                <Text className="text-gravel-300">
                  The 
                  <span className="text-starship-500">
                    fastest moving companies have a central data layer
                  </span>{' '}
                  for frontend teams to translate resource-based APIs to user
                  needs, which minimizes friction points with backend engineers.
                </Text>
                <Text className="text-gravel-300">
                  However, this pattern is not widely known. In most companies,
                  the backend engineers collaborate with frontend teams on APIs
                  that work for the clients. This is often a painful process,
                  not to mention slow, because backend engineers think in
                  resources, but frontend teams think in user needs .
                </Text>
                <Text className="text-gravel-300">
                  <span className="text-starship-500">
                    Data layers enable everyone to do the work they’re meant to
                    do
                  </span>
                  , thereby reducing the friction between the teams and allowing
                  everyone to ship faster.
                </Text>
              </div>
              <div className="flex w-full shrink-0 justify-center pt-16 lg:w-[45%]">
                <img src="/images/fuse-diagram.svg" alt="" />
              </div>
            </MaxWidthContainer>
          </Section>

          <Section variant="light" className="py-16">
            <MaxWidthContainer>
              <Heading
                level={2}
                className="pb-[36px] text-gravel-900 md:pb-[48px] md:text-center"
              >
                Fuse.js&apos;s principles
              </Heading>

              <ul className="flex list-none flex-col items-start justify-center gap-[32px] md:flex-row md:gap-[56px]">
                <li className="flex grow basis-0 flex-col gap-[12px] md:gap-[24px]">
                  <img
                    className="w-[38px] shrink-0 md:w-[48px]"
                    src="/images/fuse-logo-inverted.svg"
                    alt=""
                  />
                  <div className="flex flex-col gap-[10px]">
                    <Heading
                      level={3}
                      className="text-[16px] text-gravel-950 md:text-[20px] lg:text-[20px]"
                    >
                      Incrementally adoptable
                    </Heading>
                    <p className="text-gravel-80 text-[14px] md:text-[16px]">
                      Start using Fuse.js for a single resource or microservice
                      to try it out, no need to rewrite anything that&apos;s
                      already working.
                    </p>
                  </div>
                </li>
                <li className="flex grow basis-0 flex-col gap-[12px] md:gap-[24px]">
                  <img
                    className="w-[38px] shrink-0 md:w-[48px]"
                    src="/images/fuse-logo-white-border.svg"
                    alt=""
                  />
                  <div className="flex flex-col gap-[10px]">
                    <Heading
                      level={3}
                      className="text-[16px] text-gravel-950 md:text-[20px] lg:text-[20px]"
                    >
                      Pit of success
                    </Heading>
                    <p className="text-gravel-80 text-[14px] md:text-[16px]">
                      Fuse.js has an opinionated design that makes it easy to do
                      the right thing and hard to do the wrong thing. It&apos;s
                      optimized to guide you and your team down the &quot;pit of
                      success.&quot;
                    </p>
                  </div>
                </li>
                <li className="flex grow basis-0 flex-col gap-[12px] md:gap-[24px]">
                  <img
                    className="w-[38px] shrink-0 md:w-[48px]"
                    src="/images/fuse-logo.svg"
                    alt=""
                  />
                  <div className="flex flex-col gap-[10px]">
                    <Heading
                      level={3}
                      className="text-[16px] text-gravel-950 md:text-[20px] lg:text-[20px]"
                    >
                      Great developer experience
                    </Heading>
                    <p className="text-gravel-80 text-[14px] md:text-[16px]">
                      In order to be adopted at scale, Fuse.js needs to have a
                      great developer experience.
                    </p>
                  </div>
                </li>
              </ul>
            </MaxWidthContainer>
          </Section>

          <Section variant="dark">
            <MaxWidthContainer className="flex flex-col gap-[56px] pb-[48px] pt-16">
              <div className="flex min-w-0 flex-col gap-5 md:items-center md:text-center">
                <HeadingEyebrow>Who is behind Fuse.js?</HeadingEyebrow>
                <Heading level={2}>Built by the team at Stellate</Heading>
                <Text className="max-w-[700px] text-gravel-300 ">
                  Fuse.js is made by the team at Stellate, the GraphQL CDN,
                  which includes core team members and creators of some of the
                  most popular open-source projects in the GraphQL ecosystem,
                  including Prisma, the GraphQL Playground, GraphiQL, urql,
                  Gatsby and others.
                </Text>
              </div>
              <div className="flex flex-wrap items-center gap-12 md:justify-center">
                <GraphqlPlaygroundLogo className="h-[36px] md:h-[40px]" />
                <PrismaLogo className="h-[36px] md:h-[40px]" />
                <UrqlLogo className="h-[36px] md:h-[40px]" />
                <StellateLogoWithName className="h-[36px] md:h-[40px]" />
                <GatsbyLogo className="h-[36px] md:h-[40px]" />
              </div>
            </MaxWidthContainer>

            <div className="flex flex-col gap-[28px] pb-16">
              <MaxWidthContainer>
                <Heading
                  level={2}
                  className="text-[20px] text-gravel-400 md:text-center md:text-[28px] lg:text-[28px]"
                >
                  <span aria-hidden="true">...and</span> powered by
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

          <footer className="flex flex-col bg-gravel-950 px-[20px] text-white">
            <p className="pb-[12px] text-center text-gravel-500">
              <span className="bg-text-starship-gradient bg-clip-text  text-transparent">
                Fuse
              </span>{' '}
              is created by{' '}
              <a
                href="https://stellate.co"
                target="_blank"
                className="font-semibold text-gravel-200 hover:underline focus:underline"
              >
                Stellate
              </a>
              . Follow{' '}
              <a
                href="https://x.com/stellate"
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold text-gravel-200 hover:underline focus:underline"
              >
                @Stellate
              </a>{' '}
              on Twitter for updates and star the repository on{' '}
              <a
                href="https://github.com/StellateHQ/fuse.js"
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold text-gravel-200 hover:underline focus:underline"
              >
                Github
              </a>
              .
            </p>
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
            <MaxWidthContainer className="px-0 pb-[16px]">
              <p className="text-gravel-500 md:text-center">
                © {new Date().getFullYear()}{' '}
                <a href="https://stellate.co" target="_blank">
                  Stellate, Inc
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
