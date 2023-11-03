import { builder } from '../../dist/index.mjs'

const wait = (time: number) => new Promise(resolve => setTimeout(resolve, time))
builder.queryField('fastField', t => t.string({
  description: 'A field that resolves fast.',
  resolve: async () => {
    await wait(100)
    return 'I am speed'
  }
}))

builder.queryField('slowfield', t => t.string({
  description: 'A field that resolves slowly.',
  args: {
    waitFor: t.arg({ type: 'Int', defaultValue: 5000 })
  },
  resolve: async (_, args) => {
    await wait(args.waitFor || 5000)
    return 'I am slow'
  }
}))
