# List all indexes

## Configuration
You can configure the list index options index `index.js`

- Determine the collections to exclude
```javascript
const excludeCollections = [
    'system.indexes',
    'system.users',
    'system.version',
    'system.sessions',
];
```
- Determine the index options to exlcude
```javascript
const excludeIndexOptions = new Set(['expireAfterSeconds', 'unique']);
```

## Usage
```bash
mognosh --tls <MongoDB URI> --retryWrite=false -f './shells/list-all-indexes/index.js'
```