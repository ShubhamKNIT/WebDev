import express from "express";
import bodyParser from "body-parser";
import { dirname } from "path";
import { fileURLToPath } from "url";
import morgan from "morgan";
// import cors from "cors";
const __dirname = dirname(fileURLToPath(import.meta.url));

const app = express();
const port = 30000;

/*
    Logs the incoming request from client to server
    Log Format: tiny, dev, combined, short, common or custom
    Log data can be written to file for later use
    Track API USAGE
    Debug during dev
    AUDIT SECURITY
*/
app.use(morgan("combined"));
/*
    ORIGIN: protocol + domain + port
    CORS: Cross-origin resource sharing allow/disallow
    CORF: Cross-origin resource frogery

    Uses: To control what part of frontend can access your backend
    Fix: Use cors middleware in express or configure headers manually

    CORS can be used with Cookie + JWT auth
*/
// app.use(cors());    // allows CORS

/*
    bodyparser parses the html document
    to get the body and then we can req.body 
    to get all details we need in API

    app.use() is called before any express handlers
*/
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/public/index.html");
});

app.post("/submit", (req, res) => {
    console.log(req.body);
    res.send(req.body.pet);
});

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});
