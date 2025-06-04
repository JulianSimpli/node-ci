const mongoose = require('mongoose')
const redis = require('redis')
const util = require('util')
const keys = require('../config/keys')

const redisUrl = keys.redisUrl
const client = redis.createClient(redisUrl)
client.hget = util.promisify(client.hget)

// create new Query function attr for caching
mongoose.Query.prototype.cache = function (options = {}) {
  this.useCache = true
  this.hashKey = JSON.stringify(options.key || '')
  return this
}

// store reference to original exec function
const exec = mongoose.Query.prototype.exec

mongoose.Query.prototype.exec = async function () {
  if (!this.useCache) {
    return exec.apply(this, arguments)
  }

  const copyQueryInfo = Object.assign({}, this.getQuery(), {
    collection: this.mongooseCollection.name,
  })

  const key = JSON.stringify(copyQueryInfo)

  // see if we have a value for 'key' in redis
  const cacheValue = await client.hget(this.hashKey, key)
  // if we do, return that
  if (cacheValue) {
    // return JSON.parse(cacheValue) // does not work, exec expects us to return mongoose document
    const doc = JSON.parse(cacheValue)

    return Array.isArray(doc)
      ? doc.map((d) => new this.model(d))
      : new this.model(doc)
  }
  // otherwise, issue the query and store the result in redis

  const result = await exec.apply(this, arguments)
  client.hset(this.hashKey, key, JSON.stringify(result))
  return result
}

module.exports = {
  clearHash(key) {
    client.del(JSON.stringify(key))
  },
}
