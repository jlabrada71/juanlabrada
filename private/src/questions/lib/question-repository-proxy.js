import apiRequest from '@/lib/api-request'
import Logger from '@/lib/logger'
import { accessToken, toQuery } from '@/lib/url-utils'

export default class QuestionRepositoryProxy {
  // TODO: extract this function, otherwise it will be repeated in all repositories.

  static async findAll (params) {
    try {
      const queryString = toQuery(params)
      const url = `${process.env.VUE_APP_API_SERVER}/api/v1/questions${queryString}`
      const response = await apiRequest.get(url, accessToken())
      Logger.debug(response.data, 'FindAll')
      return QuestionRepositoryProxy.convertToObject(response.data)
    } catch (e) {
      Logger.log(e, 'FindAll')
    }
    return []
  }

  static convertToObject (data) {
    const result = []
    data.forEach((item) => result.push(item))
    return result
  }

  static async delete (question) {
    const entityId = question._id
    const url = `${process.env.VUE_APP_API_SERVER}/api/v1/questions/${entityId}`
    try {
      await apiRequest.delete(url, accessToken())
    } catch (e) {
      Logger.log(e, 'Delete question')
    }
  }

  static async add (question) {
    const url = `${process.env.VUE_APP_API_SERVER}/api/v1/questions`
    try {
      await apiRequest.post(url, {
        question
      }, accessToken())
    } catch (e) {
      Logger.log(e, 'Add question')
    }
  }

  static async update (question) {
    const entityId = question._id
    const url = `${process.env.VUE_APP_API_SERVER}/api/v1/questions/${entityId}`
    try {
      await apiRequest.put(url, {
        question
      }, accessToken())
    } catch (e) {
      Logger.log(e, 'Update question')
    }
  }
}
