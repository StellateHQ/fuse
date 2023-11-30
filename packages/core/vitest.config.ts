import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    deps: {
      fallbackCJS: true,
    },
  },
})
