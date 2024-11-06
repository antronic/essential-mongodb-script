/// reference types="@types/mongodb" />
import type { } from '@mongosh/shell-api'

namespace AdminCommands {

  type ListDatabasesResponse = {
    databases: {
      name: string
      sizeOnDisk: number
      empty: boolean
    }[]

    totalSize: number
    totalSizeMb: number
    ok: number
  }

  type ListDatabases = (options: { listDatabases: 1 }) => ListDatabasesResponse
}

type AdminCommandFunction =
| AdminCommands.ListDatabases


interface Document {
  [key: string]: any;
}

interface IndexDocument extends Document {
  v: number;
  key: Document;
  name: string;
}

type Collection = {
  getIndexes: () => IndexDocument[]
}

type Database = {
  getCollectionNames: () => string[]
  getCollection: (name: string) => Collection
}

declare global {
  const db: {
    adminCommand: AdminCommandFunction

    getCollection: (name: string) => Collection
    getSiblingDB: (name: string) => Database
  }

  const print: (message: string) => void
}