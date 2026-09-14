const Database = require('better-sqlite3');
const db = new Database('./.tmp/data.db');

const configs = db.prepare(`
  SELECT key, value 
  FROM strapi_core_store_settings 
  WHERE key LIKE 'plugin_content_manager_configuration_content_types::%'
`).all();

for (const c of configs) {
  const val = JSON.parse(c.value);
  console.log('====================================');
  console.log('KEY:', c.key);
  console.log('SETTINGS:', JSON.stringify(val.settings, null, 2));
  console.log('LIST METADATA (first 5 fields):', Object.keys(val.metadatas || {}).slice(0, 5));
}

db.close();
