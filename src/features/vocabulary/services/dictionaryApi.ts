import api from '~/services/api/axiosInstance'

const dictionaryApi = {
  sentenceQuery(query: string) {
    return api
      .dictionaryControllerSearchSentences({ query })
      .then((res) => res.data)
      .catch((err) => {
        throw err.response.data
      })
  }
}

export default dictionaryApi
