import apiRequest from '@/lib/api-request'
import Logger from '@/lib/logger'

export default class FilesRepositoryProxy {
  // TODO: extract this function, otherwise it will be repeated in all repositories.
  static getConfig () {
    const authorization = `Bearer ${localStorage.getItem('accessToken')}`
    return {
      headers: {
        Authorization: authorization
      }
    }
  }

  static async findAll (path) {
    try {
      let queryString = ''
      if (path) {
        queryString += `/${path}`
      }
      const url = `${process.env.VUE_APP_API_SERVER}/api/v1/files/firebase${queryString}`
      const response = await apiRequest.get(url, FilesRepositoryProxy.getConfig())
      // alert(JSON.stringify(response));
      return response.data
    } catch (e) {
      Logger.log(e, 'FindAll')
    }
    return []
  }

  static async delete (file) {
    const entityId = file._id
    const url = `${process.env.VUE_APP_API_SERVER}/api/v1/files/firebase/${entityId}`
    try {
      await apiRequest.delete(url, FilesRepositoryProxy.getConfig())
    } catch (e) {
      Logger.log(e, 'Delete')
    }
  }

  static async add (files) {
    const url = `${process.env.VUE_APP_API_SERVER}/api/v1/files/firebase`
    try {
      await apiRequest.post(url, {
        files: files.toJSON()
      }, FilesRepositoryProxy.getConfig())
    } catch (e) {
      Logger.log(e, 'Add')
    }
  }
}
