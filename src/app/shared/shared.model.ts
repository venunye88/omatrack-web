interface HasId {
    id: number
}

interface AuditFields extends HasId {
    createdAt: Date
    createdBy: string
    modifiedAt: Date
    modifiedBy: string
}

interface LookUp extends HasId {
    name: string
    description: string
}


export { AuditFields, LookUp, HasId }


