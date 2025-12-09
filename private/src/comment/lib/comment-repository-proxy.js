import axios from 'axios'
import qs from 'qs'

export default class CommentRepositoryProxy {
  static async findAll (filter) {
    try {
      let queryString = ''
      if (filter) {
        queryString = `?${qs.stringify(filter)}`
      }
      const url = `${process.env.VUE_APP_API_SERVER}/api/v1/comments${queryString}`
      const response = await axios.get(url)
      return response.data
    } catch (e) {
      alert(e)
    }
    return []
  }

  static async delete (comment) {
    const entityId = comment._id
    const url = `${process.env.VUE_APP_API_SERVER}/api/v1/comments/${entityId}`
    try {
      await axios.delete(url, {
        //    headers: {
        //      Authorization: authorizationToken
        //    },
        //    data: {
        //      source: source
        //    }
      })
    } catch (e) {
      alert(e)
    }
  }

  static async add (comment) {
    const url = `${process.env.VUE_APP_API_SERVER}/api/v1/comments`
    try {
      await axios.post(url, {
      //    headers: {
      //      Authorization: authorizationToken
      //    },
        comment
      })
    } catch (e) {
      alert(e)
    }
  }

  static async update (comment) {
    alert(JSON.stringify(comment))
    const entityId = comment._id
    const url = `${process.env.VUE_APP_API_SERVER}/api/v1/comments/${entityId}`
    try {
      await axios.put(url, {
      //    headers: {
      //      Authorization: authorizationToken
      //    },
        comment
      })
    } catch (e) {
      alert(e)
    }
  }
}
