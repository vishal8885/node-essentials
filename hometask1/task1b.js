// Write a program to use Child process to print “node version” and “number of cores in CPU” 

var { spawn } = require("child_process");
var numCPUs  = require("os").cpus().length;

const bat = spawn('node', ['-v']);

bat.stdout.on('data', (data) => {
  console.log('Node version', data.toString());
  console.log('number of cores in CPU ', numCPUs);
})

