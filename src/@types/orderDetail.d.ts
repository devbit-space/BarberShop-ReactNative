declare interface OrderDetailObject {
    name: string
    dateTime: string
    prices: {
        haircut: string
        cleanShave: string
        grandTotal: string
    },
    orderNumber: string
    payment: string []
}