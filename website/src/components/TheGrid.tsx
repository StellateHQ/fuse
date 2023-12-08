import { useRef } from 'react'

const blockSize = 100

const getPath = (size: number) => {
  const start = 1
  const end = size - 1
  return `M ${start} ${start} L ${end} ${start} ${end} ${end} ${start} ${end} ${start} ${start}`
}

export function TheGrid() {
  const circleRef = useRef<SVGCircleElement>(null)

  return (
    <>
      <div
        className="absolute inset-x-0 top-0 z-0 h-[685px] overflow-hidden"
        onMouseMove={(e) => {
          if (!circleRef.current) {
            return
          }
          console.log(e)
        }}
      >
        <img
          src="/images/the-grid.svg"
          className="relative left-1/2 max-w-none -translate-x-1/2 bg-white"
          alt="A white background with black stripes forming a grid, this is the background of the hero section."
        />

        {/* <svg
          className="absolute left-0 top-0 h-full w-full"
          width="100%"
          height="100%"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <pattern
              id="grid"
              width={blockSize}
              height={blockSize}
              patternUnits="userSpaceOnUse"
            >
              <path
                d={getPath(blockSize)}
                fill="#FFF"
                stroke="transparent"
                strokeWidth="0.5"
              />
            </pattern>
            <radialGradient id="pointer">
              <stop offset="10%" stopColor="#DBFE01" />
              <stop offset="95%" stopColor="#F3F3F3" />
            </radialGradient>
          </defs>
          <rect width="100%" height="100%" fill="#F3F3F3" />
          <circle
            ref={circleRef}
            cx="100"
            cy="100"
            r="50"
            fill="url(#pointer)"
          />
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg> */}
      </div>
    </>
  )
}
