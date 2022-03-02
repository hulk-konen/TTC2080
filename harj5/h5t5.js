

const fs   = require('fs')
const path = require('path')

if (process.argv.length <= 4 || isNaN(process.argv[2]) || isNaN(process.argv[3]) || isNaN(process.argv[4])) {
  console.log(`Usage: ${path.basename(__filename)} RANDOMIZED_NUMBERS_COUNT MIN_VALUE MAX_VALUE
`)
  process.exit(-1)
}

const count  = parseInt(process.argv[2]) 
const min = parseInt(process.argv[3]) 
const max = parseInt(process.argv[4]) 

let taulu = Array.from({length: count}, () => Math.floor(Math.random() * (max - min  + 1) + min));

console.log(taulu)
