export interface FuelStock {
    id: number
    stationId: number
    stationName: string
    fuelProductId: number
    fuelProductName: string
    reorderLevel: number
    quantity: number
}
