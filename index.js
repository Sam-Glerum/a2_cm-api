const express = require('express');
const server = express();
const port = process.env.PORT || 3000;

server.get("/", (req, res) => {
    res.send("Welcome to the a2_cm api");
});


server.listen(port, () => {
    console.log("Server is running on port " + port);
});



