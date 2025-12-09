import axios from 'axios'
import Logger from '@/lib/logger'

// this code is used to debug axios requests
axios.interceptors.request.use((request) => {
  Logger.debug('Starting Request', 'Api-Request')
  return request
})
axios.interceptors.response.use((response) => {
  Logger.debug('Response:', 'Api-Request')
  return response
})

export default class ApiRequest {
  constructor (config) {
    this.config = config
  }

  static async get (url, config) {
    Logger.debug(`get API Request called: ${url}`, 'api-request')
    return axios.get(url, config)
  }

  static async post (url, data, config) {
    Logger.debug(`post API Request called: ${url}`, 'api-request')
    Logger.debug(data, 'api-request')
    Logger.debug(config, 'api-request')
    Logger.debug('================', 'api-request')
    return axios.post(url, data, config)
  }

  static async delete (url, config) {
    Logger.debug(`delete API Request called: ${url}`, 'api-request')
    return axios.delete(url, config)
  }

  static async put (url, data, config) {
    Logger.debug(`put API Request called: ${url}`, 'api-request')
    Logger.debug(data, 'api-request')
    Logger.debug(config, 'api-request')
    Logger.debug('================', 'api-request')
    return axios.put(url, data, config)
  }

  static async request (config) {
    Logger.debug(`request API called: ${config.url}`, 'api-request')
    return axios.request(config)
  }

  static async head (url, config) {
    Logger.debug(`head request API called: ${url}`, 'api-request')
    return axios.head(url, config)
  }

  static async options (url, config) {
    Logger.debug(`options request API called: ${url}`, 'api-request')
    return axios.options(url, config)
  }

  static async patch (url, config, data) {
    Logger.debug(`patch request API called: ${url}`, 'api-request')
    return axios.patch(url, data, config)
  }
}
