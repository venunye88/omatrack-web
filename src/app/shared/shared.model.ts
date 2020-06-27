interface HasId {
    id: number
}

interface AuditFields extends HasId {
    createdAt: Date
    createdBy: string
    modifiedAt: Date
    modifiedBy: string
}

interface LookUp extends AuditFields {
    name: string
    notes: string
}


export { AuditFields, LookUp }


