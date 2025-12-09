import axios from 'axios'

export default class OrderRepositoryProxy {
  static async findAll () {
    try {
      const url = `${process.env.VUE_APP_API_SERVER}/api/v1/orders`
      const response = await axios.get(url)
      return response.data
    } catch (e) {
      alert(e)
    }
    return []
  }

  static async delete (order) {
    const entityId = order._id
    const url = `${process.env.VUE_APP_API_SERVER}/api/v1/orders/${entityId}`
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

  static async add (order) {
    const url = `${process.env.VUE_APP_API_SERVER}/api/v1/orders`
    try {
      await axios.post(url, {
      //    headers: {
      //      Authorization: authorizationToken
      //    },
        order
      })
    } catch (e) {
      alert(e)
    }
  }

  static async update (order) {
    alert(JSON.stringify(order))
    const entityId = order._id
    const url = `${process.env.VUE_APP_API_SERVER}/api/v1/orders/${entityId}`
    try {
      await axios.put(url, {
      //    headers: {
      //      Authorization: authorizationToken
      //    },
        order
      })
    } catch (e) {
      alert(e)
    }
  }
}
