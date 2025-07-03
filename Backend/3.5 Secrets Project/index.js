//To see how the final website should work, run "node solution.js".
//Make sure you have installed all the dependencies with "npm i".
//The password is ILoveProgramming

import express from "express";
import bodyParser from "body-parser";
import { dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));

var auth = false;
const app = express();
const PORT = 3000;
const SECRET_PASS = "ILoveProgramming";

function isAuthorized(req, res, next) {
    if (req.body["password"] === SECRET_PASS) {
        auth = true;
    }
    next();
}

app.use(isAuthorized);
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/public/index.html");
});

app.post("/check", (req, res) => {
    if (auth) {
        res.sendFile(__dirname + "/public/secret.html");
    }
    else {
        res.sendFile(__dirname + "/public/index.html");
    }
});

app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
});