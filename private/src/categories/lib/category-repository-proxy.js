import axios from 'axios'

export default class CategoryRepositoryProxy {
  static async findAll () {
    try {
      const url = `${process.env.VUE_APP_API_SERVER}/api/v1/categories`
      const response = await axios.get(url)
      return response.data
    } catch (e) {
      alert(e)
    }
    return []
  }

  static async delete (category) {
    const entityId = category._id
    const url = `${process.env.VUE_APP_API_SERVER}/api/v1/categories/${entityId}`
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

  static async add (category) {
    const url = `${process.env.VUE_APP_API_SERVER}/api/v1/categories`
    try {
      await axios.post(url, {
      //    headers: {
      //      Authorization: authorizationToken
      //    },
        category
      })
    } catch (e) {
      alert(e)
    }
  }

  static async update (category) {
    alert(JSON.stringify(category))
    const entityId = category._id
    const url = `${process.env.VUE_APP_API_SERVER}/api/v1/categories/${entityId}`
    try {
      await axios.put(url, {
      //    headers: {
      //      Authorization: authorizationToken
      //    },
        category
      })
    } catch (e) {
      alert(e)
    }
  }
}
