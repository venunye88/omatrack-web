export interface ProductReceived {
    Date: Date,
    fuelStockId: number,
    Invoice: string,
    ReferenceNumber: string,
    quantity: number,
    shortage: number,
    receiptedPrice: number,
    value: number,
    transporterId: number,
    driver: string,
    vehicleNumber: string,
    narration: string
}