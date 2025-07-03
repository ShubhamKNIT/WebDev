const express = require("express");
const app = express();
const PORT = 30000;

app.get("/", (req, res) => {
    res.send("Hello from Express + Node + JS");
});

app.get("/contact", (req, res) => {
    res.send("<a href='https://github.com/ShubhamKNIT'>Github: ShubhamKNIT</a>")
});

app.listen(PORT, () => {
    console.log(`Express server is running on port ${PORT}!!`);
});