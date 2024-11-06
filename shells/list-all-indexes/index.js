"use strict";
/// reference path="../../types/shell.d.ts" />
const excludeCollections = [
    'system.indexes',
    'system.users',
    'system.version',
    'system.sessions',
];
function start() {
    const dbs = db.adminCommand({ listDatabases: 1 })
        .databases.map(db => db.name);
    for (const dbName of dbs) {
        const collections = db.getSiblingDB(dbName).getCollectionNames();
        // Get all indexes for each collection
        for (const collectionName of collections) {
            const indexes = db.getSiblingDB(dbName)
                .getCollection(collectionName)
                .getIndexes();
            console.log(`\n// ${dbName}.${collectionName}`);
            // console.log(`Indexes: ${JSON.stringify(indexes, null, 2)}`)
            // console.log(indexes)
            // Create Index query commands
            const commands = indexes.map(index => {
                const keys = Object.keys(index.key)
                    .map(key => `${key}: 1`)
                    .join(', ');
                return `
db.getSiblingDB('${dbName}')
  .getCollection('${collectionName}')
  .createIndex(
    { ${keys} },
    { name: '${index.name}' })
        `;
            });
            commands.forEach(command => console.log(command));
        }
    }
}
start();