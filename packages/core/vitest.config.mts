import { defineConfig } from 'vitest/config'

export default defineConfig({

  test: {
    alias: {
      fuse: './builder.mjs'
    }
  },
})
