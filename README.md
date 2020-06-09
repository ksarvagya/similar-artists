# similar-artists
tiny node app to find similar artists using the artsy public api and functional programming concepts such as monads, applicatives, semigroups, and more. nearly identical to brian lonsdorf's spotify related artist app from his egghead course.

## Usage
```
# clone the repo and move into it
git clone https://github.com/ksarvagya/similar-artists && cd similar-artists

# install dependencies
npm i

# run the app
node index.js ARTIST_1 -- ARTIST_2
```
#### Example

```
node index.js Philip Guston -- Arshile Gorky

-> [ 'William Baziotes',
     'Grace Hartigan',
     'Alfred Leslie',
     'Fritz Bultman' ]
```
