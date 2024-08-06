const { MongoClient } = require('mongodb');

// Connection URL
const url = 'mongodb://localhost:27017'; // Replace with your MongoDB URI
const dbName = 'ItCompany'; // Replace with your database name

// Create a new MongoClient without deprecated options
const client = new MongoClient(url);

async function performCRUDOperations() {
    try {
        // Connect to the MongoDB server
        await client.connect();
        console.log('Connected successfully to server');

        // Access the database and collection
        const db = client.db(dbName);
        const collection = db.collection('employee');

        // Insert a document
        const insertResult = await collection.insertOne({ name: 'John Doe', email: 'john.doe@example.com' });
        console.log('Inserted document:', insertResult.insertedId);

        // Find a document
        const foundDocument = await collection.findOne({ name: 'John Doe' });
        console.log('Found document:', foundDocument);

        // Update a document
        const updateResult = await collection.updateOne(
            { name: 'John Doe' },
            { $set: { email: 'john.doe@newdomain.com' } }
        );
        console.log('Updated document count:', updateResult.modifiedCount);

        // Delete a document
        const deleteResult = await collection.deleteOne({ name: 'John Doe' });
        console.log('Deleted document count:', deleteResult.deletedCount);

    } catch (err) {
        console.error('An error occurred during CRUD operations:', err);
    } finally {
        // Close the connection
        await client.close();
    }
}

performCRUDOperations().catch(console.error);
