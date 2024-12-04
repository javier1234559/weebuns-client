import type { CodegenConfig } from '@graphql-codegen/cli'

const config: CodegenConfig = {
  overwrite: true,
  schema: 'http://localhost:8080/graphql',
  // schema: 'https://api.weebuns.blog/graphql',
  documents: 'src/**/*.{ts,tsx}',
  generates: {
    'src/services/graphql/graphql.ts': {
      plugins: ['typescript', 'typescript-operations', 'typescript-react-apollo']
    }
  }
}

export default config
