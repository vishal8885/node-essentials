const { spawn } = require("child_process");

const dump = spawn('C:\\Program Files\\MongoDB\\Server\\4.2\\bin\\mongodump.exe', 
        ["--db", "booksdb",
        "--collection", "books",
    ]);

const mongoexport = spawn('C:\\Program Files\\MongoDB\\Server\\4.2\\bin\\mongoexport.exe', 
    ["--db", "booksdb",
    "--collection", "books",
    "--out", "books.json",
]);
