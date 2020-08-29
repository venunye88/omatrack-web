export interface FuelStock {
    id: number
    stationId: number
    stationName: string
    fuelProductId: number
    fuelProductName: string
    reorderLevel: number
    initialStock: number
    currentStock: number
    unitPrice: number
}


export interface StationStock {
    id: number,
    name: string
    stocks: Array<FuelStock>
}