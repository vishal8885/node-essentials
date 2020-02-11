/**
 * Write another program to print “list of files in a directory” – passed by command line arguments
 * Take care of handling all cases (if no path/directory exists – print appropriate error in console)
 * Otherwise using NPM script, accept command line args, parse those to determine “directory path” and print list of file names
 */

var fs = require('fs');
var args = process.argv;
var path = '/';

if (args.length > 2) {
    path = process.argv[2]
}
 
fs.readdir(path, function(err, files) {
    if (err) {
        if (err.errno === -4058) {
            console.error(`${err.path} path doesn't exist`);
        }
    } else {
        files.forEach(file => console.log(file));
    }
});