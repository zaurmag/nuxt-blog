if (process.env.PROCESS_ENV === 'production') {
  module.exports = require('./keys.prod')
} else {
  module.exports = require('./keys.dev')
}
