const express = require("express");
const fs = require("fs");
const app = express();

if (!process.env.PORT) {
    throw new Error("Please specify the port number for the HTTP server with the environment variable PORT.");
}
const port = process.env.PORT;

app.get("/video", (req, res) => {

    //
    // Original video from here:
    // https://sample-videos.com
    //
    const path = "./videos/Surfer1.mp4";
    fs.stat(path, (err, stats) => {
        if (err) {
            console.error("An error occurred ");
            res.sendStatus(500);
            return;
        }

        res.writeHead(200, {
            "Content-Length": stats.size,
            "Content-Type": "video/mp4",
        });
        fs.createReadStream(path).pipe(res);
    });
});

app.listen(port, () => {
    console.log(`Microservice listening on port ${port}, point your browser at http://localhost:${port}/video`);
});