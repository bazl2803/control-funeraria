export interface Policy {
    id?: number,
    clientId: number,
    serviceId: number,
    funeralId?: number,
    balance: number,
    date?: Date,
    prime?: number,
    notes?: string,
    status?: string,
    modality?: string
}