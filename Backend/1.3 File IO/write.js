const fs = require("node:fs");

// fs.writeFile(filenName, content, callback);
fs.writeFile("message.txt", "Hello from node js", (err) => {
    if (err) throw err;
    console.log("File has been saved successfully!!");
});

