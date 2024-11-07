/// reference path="../../types/shell.d.ts" />
// ===========================================================
// ===========================================================
// ====================== CONFIGURATION ======================
const excludeCollections = [
  'system.indexes',
  'system.users',
  'system.version',
  'system.sessions',
]

const excludeIndexOptions = new Set(['expireAfterSeconds', 'unique'])

// ===========================================================
// ===========================================================
// ===========================================================
function getIndexes() {
  const dbs = db.adminCommand({ listDatabases: 1 })
    .databases.map(db => db.name)


  for (const dbName of dbs) {
    const collections = db.getSiblingDB(dbName).getCollectionNames()

    // Get all indexes for each collection
    for (const collectionName of collections) {
      let indexes = db.getSiblingDB(dbName)
        .getCollection(collectionName)
        .getIndexes()

      console.log(`\n// ${dbName}.${collectionName}`)
      // console.log(`Indexes: ${JSON.stringify(indexes, null, 2)}`)
      // console.log(indexes)

      // =============================================
      //
      indexes = indexes.filter((index) => {
        const { key, v, name, ...options } = index
        const hasExcludeOptions = Object.keys(options).some(opt => excludeIndexOptions.has(opt))

        return (index.name !== '_id_' && !hasExcludeOptions)
      })
      //
      // Create Index query commands
      const commands = indexes.map(index => {
        //
        const keys = Object.keys(index.key)
          .map((key) => {
            //
            return `"${key}": ${index.key[key]}`
          })
          .join(', ')
        // =============================================
        // Keys
        const { key, v, name, ...options } = index
        const optionsString = JSON.stringify(options)
        // =============================================

        return `
db.getSiblingDB('${dbName}')
  .getCollection('${collectionName}')
  .createIndex({ ${keys} }, ${optionsString})
    `
  })
  // { name: '${index.name}' })

      commands.forEach(command => console.log(command))
    }
  }
}


function start() {
  getIndexes()
}

start()