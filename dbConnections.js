const { MongoClient } = require('mongodb');

const uri = "mongodb+srv://joecin:axLYNQ3bXQ5lXu14@cluster0.sxo5vn3.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

// async function 
async function connectToDB() {
    const client = new MongoClient(uri);
    
    try {
        // await the execution of async function until the `client.connect()` is resolved
        await client.connect();
        const collection = client.db().collection('Cat');
        console.log("Collection connected: ", collection);
        return collection;
    } catch (ex) {
        console.error("Error connecting to database: ", ex);
        throw ex;
    }
}

// export cat collection connection
module.exports = connectToDB;
