require('dotenv').config()

const Task = require('data.task')
const { findArtist, similarArtists } = require('./artsy')

const toSlug = x => x.toLowerCase().split(' ').join('-')

const Intersection = xs =>
({
  xs,
  concat: ({ xs: ys }) =>
    Intersection(xs.filter(x => ys.some(y => x === y)))
})

const argv = new Task((rej, res) => res(process.argv))

const names = argv.map(args => args.splice(2))
  .map(args => args.join(' '))
  .map(args => args.split(' -- '))
  .map(names => names.map(toSlug))

const related = name =>
  findArtist(name)
  .chain(similarArtists)
  .map(artists => artists.map(artist => artist.name))

const artistIntersection = rels1 => rels2 =>
  Intersection(rels1).concat(Intersection(rels2)).xs

const main = ([name1, name2]) =>
  Task.of(artistIntersection)
  .ap(related(name1))
  .ap(related(name2))

names.chain(main).fork(error => console.log('No results'), console.log)
