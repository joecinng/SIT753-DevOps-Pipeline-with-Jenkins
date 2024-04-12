// destructuring catmodel to access static functions
const { CatModel } = require('../Models/catModel');

const getAllCats = async (req, res) => {
    try {
        const results = await CatModel.getCats();
        res.json({ statusCode: 200, data: results, message: 'get all cards success' });
    } catch (err) {
        console.error('Error getting cats:', err);
        res.status(500).json({ statusCode: 500, message: 'Internal server error' });
    }
};

const addCats = async (req, res) => {
    try {
        const { title, color, path, description } = req.body;

        const newCat = new CatModel(title, color, path, description);
        const newCatData = await CatModel.addCat(newCat);

        res.status(201).json({ statusCode: 201, data: newCatData, message: 'Cat created successfully' });
    } catch (err) {
        console.error('Error creating cat:', err);
        res.status(500).json({ statusCode: 500, message: 'Internal server error' });
    }
};

module.exports = {
    getAllCats,
    addCats
};
