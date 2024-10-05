import { defaultConfig } from 'swagger-typescript-api-es'

export default defaultConfig({
  name: 'api-axios.ts',
  output: './src/services',
  url: 'http://localhost:8000/api-json',
  httpClientType: 'axios'
})
