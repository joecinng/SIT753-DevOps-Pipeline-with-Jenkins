// Import modules
var express = require("express");
var app = express();
// import http and socket.io libraries
var http = require('http').createServer(app);
var io = require('socket.io')(http);

// MIDDLEWARE functions:
// Used to serve static files like html, css
// When a request is made to the server for a static file
// Express looks for the file in the public folder and serves it
// if found.
app.use(express.static(__dirname+'/public'));
// Used to parse incoming requests with JSON payloads
// When the server receives a request with a JSON body,
// it parses the JSON data and make it available in the
// req.body property of the request object.
app.use(express.json());
// Used to parse incoming requests with URL-encoded payloads
// When the server receives a request with URL-encoded payloads, 
// it parses the data and makes it available in the req.body property
// of the request object.
app.use(express.urlencoded ({
    // the URL-encoded data should be parsed using the built-in
    // Node.js querystring library.
    extended: false
}));

// Import routes
let catsRoute = require('./Routers/catRouter');

// Use routes
app.use('/api/cats',catsRoute);

// define socket.io behaviour
io.on('connection', (socket) => { 
    console.log('a client is connected');
    socket.on('disconnect', () => {
        console.log('user disconnected');
    });
    setInterval(() => {
        socket.emit('number', parseInt(Math.random()*10));
    }, 1000);
});

// Start the server
var port = process.env.PORT || 3000;

http.listen(port, () => {
    console.log(`Express server started. App listening on port ${port}`);
});