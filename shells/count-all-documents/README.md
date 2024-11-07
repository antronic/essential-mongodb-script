# List all indexes

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