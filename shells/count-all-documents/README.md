# List all indexes

## Configure

1. Install `mongosh` on your machine
2. Edit the `index.js` file to exclude the databases you don't want to count the documents from

```javascript
const excludeDbs = ['admin', 'config', 'local', 'test']
```

## Usage
```bash
mognosh --tls <MongoDB URI> --retryWrite=false -f './shells/count-all-documents/index.js'
```