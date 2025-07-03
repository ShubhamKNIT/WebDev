const fs = require("node:fs");

// fs.readFile(fileName, encoding/signal, callback(err, data))
fs.readFile("message.txt", "utf-8", (err, data) => {
    if (err) throw err;
    console.log(data);
});