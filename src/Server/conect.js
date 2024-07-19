const express = require('express');
const { MongoClient, ServerApiVersion } = require('mongodb');
const app = express();
const port = 5000; // O el puerto que desees

const uri = "mongodb+srv://mancillanixon7:um8xTFnPbq9eMwnx@systemdsi.mouqdaf.mongodb.net/?retryWrites=true&w=majority&appName=systemdsi";
const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

async function connectToDatabase() {
    try {
        await client.connect();
        await client.db("admin").command({ ping: 1 });
        console.log("Conectado a MongoDB Atlas!");
    } catch (error) {
        console.error("Error conectando a MongoDB Atlas:", error);
    }
}

app.get('/api/test', async (req, res) => {
    try {
        // Aquí puedes realizar operaciones con la base de datos
        res.send("Conexión exitosa a la base de datos!!!");
    } catch (error) {
        res.status(500).send("Error en la conexión a la base de datos.");
    }
});

app.listen(port, () => {
    console.log(`Servidor escuchando en http://localhost:${port}`);
});

connectToDatabase();








