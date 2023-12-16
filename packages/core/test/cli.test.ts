import path from 'node:path'
import fs from 'node:fs'
import { afterAll, beforeAll, describe, expect, test } from 'vitest'
import { execa } from 'execa'

const fixturesDir = path.join(__dirname, 'fixtures')
const allFixtures = fs.readdirSync(fixturesDir)

describe.each(allFixtures)('%s', (fixtureName) => {
  const fixtureDir = path.join(fixturesDir, fixtureName)
  beforeAll(async () => {
    await execa('pnpm', ['install'], { cwd: fixtureDir })
  }, 25_000)

  afterAll(async () => {
    await fs.promises.rm(path.join(fixtureDir, 'node_modules'), {
      recursive: true,
    })
  }, 25_000)

  test('Should run the dev command', async () => {
    const process = execa('pnpm', ['fuse', 'dev', '--server'], {
      cwd: fixtureDir,
    })

    await new Promise((resolve) => {
      process.stdout?.on('data', (data) => {
        const msg = data.toString()
        if (msg.includes('Server listening on')) {
          resolve(null)
        }
      })
    })

    const result = await fetch('http://localhost:4000/graphql', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query: '{ _version }',
      }),
    }).then((x) => x.json())
    expect(result.data._version).toBeDefined()
  }, 10_000)
})
