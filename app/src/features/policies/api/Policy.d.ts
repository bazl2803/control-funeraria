export interface Policy {
    id?: number,
    clientId: number,
    serviceId: number,
    funeralId?: number,
    date?: Date,
    balance: number,
    value: number,
    fee: number,
    prime: number,
    notes?: string,
    status?: string,
    modality?: string
}