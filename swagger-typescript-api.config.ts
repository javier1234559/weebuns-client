/* eslint-disable */
import { defaultConfig } from 'swagger-typescript-api-es'

export default defaultConfig({
  name: 'api-axios.ts',
  output: './src/services/api',
  url: 'http://localhost:8000/api-json',
  // url: 'https://plain-annabal-weebuns-4938a9e6.koyeb.app/api-json',
  httpClientType: 'axios'
})
