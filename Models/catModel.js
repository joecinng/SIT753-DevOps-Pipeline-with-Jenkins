const connectToDB = require('../dbConnections');

class CatModel 
{
    constructor (title, color, path, description) {
        this.title = title,
        this.color = color,
        this.path = path,
        this.description = description
    }

    static async getCats(){
        try {
            const collection = await connectToDB();
            const results = await collection.find({}).toArray();
            return results;
        } catch (err) {
            console.error('Error getting cats:', err);
            throw err;
        }
    };

    static async addCat(newCat) {
        try {
            const collection = await connectToDB();
            const result = await collection.insertOne(newCat);
            return result;
        } catch (err) {
            console.error('Error adding cat:', err);
            throw err;
        }
    };
}
module.exports = {
    CatModel
};