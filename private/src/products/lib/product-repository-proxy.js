import axios from 'axios'

export default class ProductRepositoryProxy {
  static async findAll () {
    try {
      const url = `${process.env.VUE_APP_API_SERVER}/api/v1/products`
      const response = await axios.get(url)
      return response.data
    } catch (e) {
      alert(e)
    }
    return []
  }

  static async delete (product) {
    const entityId = product._id
    const url = `${process.env.VUE_APP_API_SERVER}/api/v1/products/${entityId}`
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

  static async add (product) {
    const url = `${process.env.VUE_APP_API_SERVER}/api/v1/products`
    try {
      await axios.post(url, {
      //    headers: {
      //      Authorization: authorizationToken
      //    },
        product
      })
    } catch (e) {
      alert(e)
    }
  }

  static async update (product) {
    alert(JSON.stringify(product))
    const entityId = product._id
    const url = `${process.env.VUE_APP_API_SERVER}/api/v1/products/${entityId}`
    try {
      await axios.put(url, {
      //    headers: {
      //      Authorization: authorizationToken
      //    },
        product
      })
    } catch (e) {
      alert(e)
    }
  }
}
