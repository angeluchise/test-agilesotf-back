
import * as fs from 'fs';
import * as dotenv from 'dotenv';

const config = dotenv.parse(fs.readFileSync(`src/environments/dev.env`))

const BASE_DIR = config.NODE_ENV === 'prod' ? 'dist' : 'src';

module.exports = [{
   "name": "mysql",
   "type": "mysql",
   "host": config.DB_HOST,
   "port": config.DB_PORT,
   "username": config.DB_USERNAME,
   "password": config.DB_PASSWORD,
   "database": config.DB_DATABASE,
   "synchronize": false,
   "logging": false,
   "entities": [
      `${BASE_DIR}/models/**/*.{ts,js}`
   ],
   "migrations": [
      `${BASE_DIR}/migration/**/*.{ts,js}`
   ],
   "subscribers": [
      `${BASE_DIR}/subscriber/**/*.{ts,js}`
   ],
   "cli": {
      "entitiesDir": "src/models",
      "migrationsDir": `src/migration`,
      "subscribersDir": "src/subscriber"
   }
}, {
   "name": "seed",
   "type": "mysql",
   "host": config.DB_HOST,
   "port": config.DB_PORT,
   "username": config.DB_USERNAME,
   "password": config.DB_PASSWORD,
   "database": config.DB_DATABASE,
   "synchronize": false,
   "logging": false,
   "entities": [
      `${BASE_DIR}/models/**/*.{ts,js}`
   ],
   "migrations": [
      `${BASE_DIR}/seeds/**/*.{ts,js}`
   ],
   "subscribers": [
      `${BASE_DIR}/subscriber/**/*.{ts,js}`
   ],
   "cli": {
      "entitiesDir": "src/models",
      "migrationsDir": `src/seeds`,
      "subscribersDir": "src/subscriber"
   }
}
]