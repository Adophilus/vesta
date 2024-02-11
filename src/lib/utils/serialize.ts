type SerializableJunoDoc = {
  created_at?: BigInt
  updated_at?: BigInt
}

export type SerializedJunoDoc<T extends SerializableJunoDoc> = Omit<T, "created_at" | "updated_at"> & {
  created_at?: Date
  updated_at?: Date
}

export const serializeJunoDoc = <T extends SerializableJunoDoc>(doc: T): SerializedJunoDoc<T> => ({
  ...doc,
  created_at: doc.created_at ? new Date(Number(doc.created_at)) : undefined,
  updated_at: doc.updated_at ? new Date(Number(doc.updated_at)) : undefined,
})

