const dotenv = require('dotenv')

dotenv.config()

const config = {
  db: {
    url: 'localhost:27017',
    name: 'chatdb'
  }
}

module.exports = config
