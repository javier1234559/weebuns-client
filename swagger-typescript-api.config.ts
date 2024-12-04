/* eslint-disable */
import { defaultConfig } from 'swagger-typescript-api-es'

export default defaultConfig({
  name: 'api-axios.ts',
  output: './src/services/api',
  url: 'http://localhost:8080/api-json',
  // url: 'https://neutral-kathrine-weebuns-b3fea564.koyeb.app/api-json',
  httpClientType: 'axios'
})
