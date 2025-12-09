export default class Order {
  constructor () {
    this.orderItems = []
  }

  addOrderItem (orderItem) {
    this.orderItems.push(orderItem)
  }

  total () {
    const totalizer = (accumulator, orderItem) => accumulator + orderItem.count * orderItem.price
    return this.orderItems.reduce(totalizer, 0)
  }
}
