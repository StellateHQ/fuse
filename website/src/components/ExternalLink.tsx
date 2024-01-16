import { External } from '@/components/icons'

type ExternalLinkProps = {
  href: string
  children: React.ReactNode
}

export function ExternalLink({ href, children }: ExternalLinkProps) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="group inline-flex items-center gap-2.5 rounded-lg border border-gravel-400/20 bg-[linear-gradient(0deg,rgba(188,188,184,0.02)_0%,rgba(188,188,184,0.02)_100%),linear-gradient(180deg,rgba(255,255,255,0.04)_0%,rgba(255,255,255,0.00)_100%)] px-3 py-2 hover:border-starship-500 hover:bg-[linear-gradient(0deg,rgba(219,254,1,0.04)_0%,rgba(219,254,1,0.04)_100%),linear-gradient(180deg,rgba(255,255,255,0.04)_0%,rgba(255,255,255,0.00)_100%)]"
    >
      {children}
      <External className="w-4 text-gravel-300 group-hover:text-starship-500" />
    </a>
  )
}
