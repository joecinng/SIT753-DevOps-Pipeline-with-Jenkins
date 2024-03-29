// Import modules
var express = require("express");
const { MongoClient, ServerApiVersion } = require('mongodb');

var app = express();
const uri = "mongodb+srv://joecin:axLYNQ3bXQ5lXu14@cluster0.sxo5vn3.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
let collection;

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

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

async function runDBConnection() {
    try {
        // Connect the client to the server (optional starting in v4.7)
        await client.connect();
        collection = client.db().collection('Cat');
        console.log("collection: ", collection);
    } catch (ex) {
        console.error("error: ", ex);
    }
}
runDBConnection().catch(console.dir);

app.get('/api/cats', async (req, res) => {
    let results = await collection.find({}).toArray(function(err, result) {
        if (err) throw err;
    });
    res.json({ statusCode: 200, data: results, message: 'get all cards success' });
});

app.post('/api/cats', async (req, res) => {
    try {
        const { title, color, path, description } = req.body;

        const newCat = {
            title: title,
            color: color,
            path: path,
            description: description
        };

        collection.insertOne(newCat, function(err, res) {
            if (err) throw err;
        });

        res.status(201).json({ statusCode: 201, data: newCat, message: 'Cat created successfully' });
    } catch (err) {
        console.error('Error creating cat:', err);
        res.status(500).json({ statusCode: 500, message: 'Internal server error' });
    }
});

var port = process.env.port || 3000;

app.get('/', (req, res) => {
    res.render('index.html');
})

app.listen(port,()=>{
    console.log(`Express server started. App listening on port ${port}`)
})