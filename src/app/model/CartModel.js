

function cart(items) {
    if (items === undefined) {
        this.items = []
    } else {
        this.items = items
    }
    this.totalPrice = 0

    this.add = function (product) {
        const index = this.items.findIndex(item => item.id === product.id)
        if (index < 0) {
            this.items.push({ id: product._id.toString(), price: product.price, name: product.name, quantity: 1, imageSrc: product.imageSrc })
        } else {
            this.items[index].quantity++
        }
    }

    this.decrease = function (id) {
        const index = this.items.findIndex(item => item.id === id)
        this.items[index].quantity--
        if (this.items[index].quantity == 0) {
            this.items.splice(index, 1)
            return 0
        }
        return this.items[index].quantity
    }

    this.increase = function (id) {
        const index = this.items.findIndex(item => item.id === id)
        this.items[index].quantity++
        return this.items[index].quantity
    }

    this.getTotalPrice = function () {
        let sum = 0
        if (this.items.length < 1) return 0
        Array.from(this.items).forEach(item => sum += item.quantity * item.price)
        return sum
    }

    this.getTotalPriceById = function (id) {
        const index = this.items.findIndex(item => item.id === id)
        if (index < 0) return 0
        const totalPrice = this.items[index].quantity * this.items[index].price
        return totalPrice
    }

    this.getTotalQuantity = function () {
        return this.items.length
    }

    this.delete = function (id) {
        const index = this.items.findIndex(item => item.id === id)
        this.items.splice(index, 1)
    }

    this.updateQuantity = function (id, newQuantity) {
        const index = this.items.findIndex(item => item.id === id)
        this.items[index].quantity = parseInt(newQuantity)
        return this.items[index].quantity
    }
}

module.exports = cart