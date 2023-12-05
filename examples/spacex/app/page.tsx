'use client'

import * as React from 'react'

import styles from './page.module.css'
import Link from 'next/link'

export default function Page() {
  return (
    <main className={styles.main}>
      <h1>Welcome to Fuse</h1>
      <Link href='/client'>Try the Streaming SSR example</Link>
      <Link href='/rsc'>Try the RSC example</Link>
    </main>
  )
}
