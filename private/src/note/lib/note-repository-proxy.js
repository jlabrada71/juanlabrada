import apiRequest from '@/lib/api-request'
import Note from './note'
import Logger from '@/lib/logger'

export default class NoteRepositoryProxy {
  // TODO: extract this function, otherwise it will be repeated in all repositories.
  static getConfig () {
    const authorization = `Bearer ${localStorage.getItem('accessToken')}`
    return {
      headers: {
        Authorization: authorization
      }
    }
  }

  static async findAll (query) {
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
      const url = `${process.env.VUE_APP_API_SERVER}/api/v1/notes${queryString}`
      const response = await apiRequest.get(url, NoteRepositoryProxy.getConfig())
      // alert(JSON.stringify(response));
      return NoteRepositoryProxy.convertToObject(response.data)
    } catch (e) {
      Logger.log(e, 'FindAll')
    }
    return []
  }

  static convertToObject (data) {
    const result = []
    data.forEach((item) => result.push(new Note(item)))
    return result
  }

  static async delete (note) {
    const entityId = note._id
    const url = `${process.env.VUE_APP_API_SERVER}/api/v1/notes/${entityId}`
    try {
      await apiRequest.delete(url, NoteRepositoryProxy.getConfig())
    } catch (e) {
      Logger.log(e, 'Delete')
    }
  }

  static async add (note) {
    const url = `${process.env.VUE_APP_API_SERVER}/api/v1/notes`
    try {
      await apiRequest.post(url, {
        note: note.toJSON()
      }, NoteRepositoryProxy.getConfig())
    } catch (e) {
      Logger.log(e, 'Add')
    }
  }

  static async update (note) {
    const entityId = note._id
    const url = `${process.env.VUE_APP_API_SERVER}/api/v1/notes/${entityId}`
    try {
      await apiRequest.put(url, {
        note: note.toJSON()
      }, NoteRepositoryProxy.getConfig())
    } catch (e) {
      Logger.log(e, 'update')
    }
  }

  static async rating (note, rating) {
    const entityId = note._id
    const url = `${process.env.VUE_APP_API_SERVER}/api/v1/notes/${entityId}/rating`
    try {
      await apiRequest.post(url, {
        rating
      }, NoteRepositoryProxy.getConfig())
    } catch (e) {
      Logger.log(e, 'rating')
    }
  }
}
