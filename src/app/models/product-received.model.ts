export interface ProductReceived {
    id: number
    Date: Date,
    ReferenceNumber: string,
    productReceivedDetail: Array<ProductReceived>
    stationId: number
}

export interface ProductReceivedDetail {
    id: number,
    Date: Date,
    fuelStockId: number,
    Invoice: string,
    ReferenceNumber: string,
    quantity: number,
    shortage: number,
    unitPrice: number,
    value: number,
    driver: string,
    vehicleNumber: string,
    narration: string
}