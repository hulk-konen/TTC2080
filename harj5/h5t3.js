const fs = require('fs')
console.log("Reading file and calculate a sum...")
fs.readFile('h5t3-tiedosto.txt', (error, data) => {
    if (error) {
    console.error(error)
    }
    else {
    let taulu = data.toString().split(",")
    const intTaulu = taulu.map(elem => parseInt(elem, 10));
    const initialValue = 0;
    const summaroija = intTaulu.reduce(
       (previousValue, currentValue) => previousValue + currentValue,
        initialValue
     );
    
    console.log("Sum is: " + summaroija)
    }
 })
 
