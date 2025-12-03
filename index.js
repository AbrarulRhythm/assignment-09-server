const express = require('express');
const cors = require('cors');
const app = express();
require('dotenv').config()
const { MongoClient, ServerApiVersion } = require('mongodb');

const port = process.env.PORT || 3000;

// Middleeare
app.use(cors());
app.use(express.json());

app.use(async (req, res, next) => {
    console.log(
        `⚡ ${req.method} - ${req.path} from ${req.host} at ⌛ ${new Date().toLocaleString()}`
    );
    next();
});


const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.qrthjko.mongodb.net/?appName=Cluster0`;
// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
})


async function run() {
    try {
        // Connect the client to the server	(optional starting in v4.7)
        // await client.connect();

        const db = client.db('toy_topia_db');
        const users = db.collection('users');

        // :::::::::::::::::::::::::::::: - User Related APIS - ::::::::::::::::::::::::::::::

        // Send a ping to confirm a successful connection
        await client.db("admin").command({ ping: 1 });
        console.log("Pinged your deployment. You successfully connected to MongoDB!");
    } finally {
        // Ensures that the client will close when you finish/error
        // await client.close();
    }
}
run().catch(console.dir);


// Basic Routes
app.get('/', (req, res) => {
    res.send({ status: 'ok', message: 'Toy Topia Server' });
});

// 404
app.all(/.*/, (req, res) => {
    res.status(404).json({
        status: 404,
        error: 'API not found',
    });
});

app.listen(port, () => {
    console.log(`Toy Topia server is running on port: ${port}`);
});