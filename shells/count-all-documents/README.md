# Count all documents

This script will count all the documents in all the databases in your MongoDB instance by using the `db[collection].stats().count` method which is faster than `db[collection].countDocuments({})` method.

In the downside, this script will not count the exact number of documents in the collection if the collection has a lot of documents. The `db[collection].stats().count` method will return an approximate number of documents in the collection.


## Pre-requisite
- [`mongosh`](https://www.mongodb.com/docs/mongodb-shell/install/) installed on your machine

## Configure

Edit the `index.js` file to exclude the databases you don't want to count the documents from

```javascript
const excludeDbs = ['admin', 'config', 'local', 'test']
```

## Usage
```bash
mognosh --tls <MongoDB URI> --retryWrite=false -f './shells/count-all-documents/index.js'
```