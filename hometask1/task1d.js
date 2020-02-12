/**
 * Write a node program to create a HTTP server which has below routes
 * 1.	/readfile – this is a GET call which takes a file path and read contents from the file to print.
 * 2.	/writefile – this is a POST call which accepts a file path and content to be written to the specific file, take care of file descriptor and exception handling like if no file exists, new file should be created
 * 3.	/deletefile – this is a DELETE call which takes the file path, should delete the file
 * Implement both sync and async ways for “/readfile”,“/writefile” and “/deletefile”
 */

var http = require("http");
var fs = require("fs");
var url = require("url");

http.createServer(function(req, res) {
    const queryObject = url.parse(req.url, true);
    const filepath = queryObject.query.q;
    var route = queryObject.pathname;
    if (route === "/readfile" && req.method === "GET") {
      readFileContents(filepath, res);
    } else if (route === "/writefile" && req.method === "POST") {
        var jsonString = '';

        req.on('data', function (data) {
            jsonString += data;
        });

        req.on('end', function () {
            writeFileContents(JSON.parse(jsonString), res);
        });
        
    } else if (route === "/deletefile" && req.method === "GET") {
        deleteFile(filepath, res);
    }
  })
  .listen(3000, function() {
    console.log("server started at port 3000");
  });

function sendErrorResponse(err, res) {
    res.writeHead(500, { "Content-Type": "application/json" });
    res.write(JSON.stringify({error: err}));
    res.end();
}

function readFileContents(path, res) {
  fs.readFile(path, 'utf8', function(err, contents) {
      if (err) {
        if (err.errno === -4058) {
            sendErrorResponse(`${err.path} path doesn't exist`, res);
        }
      } else {
          res.write(contents);
          res.end();
      }
  });
}

function writeFileContents(body, res) {
    fs.writeFileSync(body.path, JSON.stringify(body.data), {flag: 'w'});
    res.end();
}

function deleteFile(path, res) {
    fs.unlink(path, function(err, contents) {
        if (err) {
          if (err.errno === -4058) {
              sendErrorResponse(`${err.path} path doesn't exist`, res);
          }
        } else {
            res.write(`${path} successfully deleted`);
            res.end();
        }
    });
}
