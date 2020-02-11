/**
 * Write a program which reads an array from the standard input stdin and implement a custom sort for this array in ascending and descending order (these are sent via command line args  by –mode flag as “asc” or “desc”)
 * • The program should be started from npm script via nodemon (i.e. npm run <command>). 
 * • The program should be running in a stand-by mode and should not be terminated after the first-string processing. 
 */

var readline = require("readline");

if (process.argv.length === 2) {
    console.log('Expected mode argument "asc" or "desc"');
    process.exit(1);
}

var rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    terminal: false
});

rl.on('line', (data) => {
    sortData(data.split(' ').filter(Boolean));
});

function sortData(arr) {
    console.log(arr.sort(compareFunction));
}

function compareFunction(a, b) {
    const varA = Number(a) ? Number(a) : a;
    const varB = Number(b) ? Number(b) : b;
    let comparision = 0;
    if (varA > varB) {
        comparision = 1;
    } else if (varA < varB){
        comparision = -1;
    }

    return (
        (process.argv[2] === 'desc') ? (comparision * -1) : comparision
    );
}