(function() {
  const excludeDbs = ['admin', 'config', 'local', 'test']

  const reports: { dbName: string, collectionName: string, count: number }[] = []

  function numberCommafy(num: number) {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
  }

  function start() {
    const dbs = db.adminCommand({ listDatabases: 1 })
      .databases.map(db => db.name)
      .filter(db => !excludeDbs.includes(db))

    for (const dbName of dbs) {
      const collections = db.getSiblingDB(dbName).getCollectionNames()

      for (const collectionName of collections) {
        const collection = db.getSiblingDB(dbName).getCollection(collectionName)
        const count = collection.stats().count

        reports.push({ dbName, collectionName, count })
      }

    }

    const finalReport: { [db: string]: any } = {}
    let totalCountInSystem = 0

    reports.forEach((report) => {
      finalReport[report.dbName] = finalReport[report.dbName] || { collections: {}, totalCount: 0 }

      finalReport[report.dbName].collections[report.collectionName] = report.count !== undefined ? report.count : 0
      finalReport[report.dbName].totalCount += report.count !== undefined ? report.count : 0

      totalCountInSystem += report.count !== undefined ? report.count : 0
    })

    console.log('==================================')
    console.log()
    console.log('Total count in system:', numberCommafy(totalCountInSystem))
    console.log()
    console.log('==================================')
    console.log()
    // console.log(finalReport)
    console.log("============ SUMMARY ============")
    Object.keys(finalReport)
    .forEach((db) => {
      console.log(`Database: ${db}/ Total count: ${numberCommafy(finalReport[db].totalCount)}`)
    }
  )
  console.log()

    console.log('==================================')
    Object.keys(finalReport)
      .forEach((db) => {
        console.log('--------------')
        console.log(`\nDatabase: ${db} / Collections: ${Object.keys(finalReport[db].collections).length} / Total count: ${numberCommafy(finalReport[db].totalCount)}`)
        Object.keys(finalReport[db].collections)
          .forEach((collection) => {
            console.log(`\tCollection: ${collection} - ${numberCommafy(finalReport[db].collections[collection])}`)
          })
        console.log(`\n\t> Total count: ${numberCommafy(finalReport[db].totalCount)}`)
      })
  }

  start()
})()