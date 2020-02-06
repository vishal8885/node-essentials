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