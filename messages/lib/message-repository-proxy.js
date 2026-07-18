import apiRequest from '@/lib/api-request'
import { log } from '@/lib/logger'

export default class MessageRepositoryProxy {
  constructor(config) {
    this.config = config
    // this.config.public.apiServer = 'http://localhost:3000'
  }
  // TODO: extract this function, otherwise it will be repeated in all repositories.
  static getHeaders () {
    const authorization = `Bearer ${localStorage.getItem('accessToken')}`
    return {
      headers: {
        Authorization: authorization
      }
    }
  }

  async findAll (query) {
    try {
      let queryString = ''
      if (query) {
        let operator = '?'
        const keys = Object.keys(query)
        keys.forEach((key) => {
          queryString += `${operator}${key}=${query[key]}`
          operator = '&'
        })
      }
      const url = `${this.config.public.apiServer}/api/v1/messages${queryString}`
      const response = await apiRequest.get(url, MessageRepositoryProxy.getHeaders())
      // alert(JSON.stringify(response))
      return response.data
    } catch (e) {
      log(e, 'FindAll')
    }
    return []
  }

  async delete (message) {
    const entityId = message._id
    const url = `${this.config.public.apiServer}/api/v1/messages/${entityId}`
    try {
      await apiRequest.delete(url, MessageRepositoryProxy.getHeaders())
    } catch (e) {
      log(e, 'Delete')
    }
  }

  async add (message) {
    const url = `${this.config.public.apiServer}/api/v1/messages`
    try {
      await apiRequest.post(url, {
        message
      })
    } catch (e) {
      log(e, 'Add')
    }
  }

  async update (message) {
    const entityId = message._id
    const url = `${this.config.public.apiServer}/api/v1/messages/${entityId}`
    try {
      await apiRequest.put(url, {
        message: message.toJSON()
      }, MessageRepositoryProxy.getHeaders())
    } catch (e) {
      log(e, 'update')
    }
  }
}
