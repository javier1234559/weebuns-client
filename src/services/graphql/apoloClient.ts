import { ApolloClient, ApolloLink, createHttpLink, InMemoryCache } from '@apollo/client'
import { setContext } from '@apollo/client/link/context'
import { onError } from '@apollo/client/link/error'

import { globalConfig } from '~/config'
import { getToken } from '~/utils/token'

const httpLink = createHttpLink({
  uri: globalConfig.API_URL + '/graphql',
  credentials: 'include'
})

const authLink = setContext(async (_, { headers }) => {
  // const token: string = (await TokenManager.getToken()) as string
  const token = getToken() as string

  return {
    headers: {
      ...headers,
      Authorization: token ? `Bearer ${token}` : ''
    }
  }
})

// Error handling link
const errorLink = onError(({ networkError }) => {
  if (networkError) {
    console.log(`[Network error]: ${networkError}`)
  }

  // if (graphQLErrors) {
  //   for (const err of graphQLErrors) {
  //     // Pass through if the error is not an authentication error
  //     if ((err as any).extensions?.response?.message !== 'Unauthorized') {
  //       forward(operation)
  //       continue
  //     }
  //     switch (err.extensions?.code) {
  //       case 'UNAUTHENTICATED':
  //         // Handle token refresh here
  //         break
  //     }
  //   }
  // }
})

// Create Apollo Client
export const apolloClient = new ApolloClient({
  link: ApolloLink.from([errorLink, authLink, httpLink]),
  cache: new InMemoryCache()
})
