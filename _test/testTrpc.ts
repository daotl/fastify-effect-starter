import { createTRPCProxyClient, httpBatchLink } from '@trpc/client'
import type { TrpcRouter } from '~/trpc/router'
import superjson from 'superjson'

const httpBatchLinkOpts = { url: 'http://localhost:3000/trpc' }
const trpcClientOpts = {
  // FIXME: useRuntimeConfig() cannot be used here
  // links: [httpBatchLink({ url: useRuntimeConfig().trpcEndpoint })],
  links: [httpBatchLink(httpBatchLinkOpts)],
  transformer: superjson,
}
const client = createTRPCProxyClient<TrpcRouter>(trpcClientOpts)

const a = await client.hello.hello.query({
  username: 'lifang',
})
console.log(a.text, 'text')
