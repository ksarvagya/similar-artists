const request = require('request')
const Task = require('data.task')
const Either = require('data.either')

const artsyGet = url =>
  new Task((rej, res) => request({ url,
    headers: {
      'x-xapp-token': process.env.ARTSY_API_KEY,
      'cache-control': 'no-cache'
    }
  }, (error, response, body) => error ? rej(error) : res(body)))

const getJSON = url =>
  artsyGet(url)
  .map(parse)
  .chain(eitherToTask)

const eitherToTask = e =>
  e.fold(Task.rejected, Task.of)

const prop = key => obj =>
  Either.fromNullable(obj[key])

const parse = Either.try(JSON.parse)

const findArtist = name =>
  getJSON(`https://api.artsy.net/api/artists/${name}`)
  .map(prop('id'))
  .chain(eitherToTask)

const similarArtists = id =>
  getJSON(`https://api.artsy.net/api/artists?similar_to_artist_id=${id}&size=50&page=1`)
  .map(prop('_embedded'))
  .chain(eitherToTask)
  .map(prop('artists'))
  .chain(eitherToTask)

module.exports = { findArtist, similarArtists }
