/// reference path="../../types/shell.d.ts" />
(function() {
  const excludeCollections = [
    'system.indexes',
    'system.users',
    'system.version',
    'system.sessions',
  ]

  function getIndexes() {
    const dbs = db.adminCommand({ listDatabases: 1 })
      .databases.map(db => db.name)


    const indexesSize = []

    let totalSize = 0

    for (const dbName of dbs) {
      console.log(`DB: ${dbName}`)

      // Get all collections for each database
      const collections = db.getSiblingDB(dbName).getCollectionNames()

      const collectionIndexSize = []
      let totalCollectionIndexSize = 0
      // Get all indexes for each collection
      for (const collectionName of collections) {
        console.log(`\tns: ${dbName}.${collectionName}`)
        let indexes = db.getSiblingDB(dbName)
          .getCollection(collectionName)
          .stats().indexSizes

        indexes = Object.keys(indexes).map(index => {
          console.log(`\t\tindex: ${index} size: ${indexes[index]}`)
          totalCollectionIndexSize += indexes[index]
        })

        collectionIndexSize.push({ collection: collectionName, size: totalCollectionIndexSize })
      }

      totalSize += totalCollectionIndexSize
    }

    console.log(`Total index size: ${totalSize}`)
  }


  function start() {
    getIndexes()
  }

  start()

})()