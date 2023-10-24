// create-passkey.js

const { MongoClient } = require('mongodb');
const url = 'mongodb://localhost:27017'; // Update with your MongoDB connection string
const dbName = 'mydb'; // Update with your database name

const generatePasskey = () => {
  const passkey = Math.random().toString(36).substring(2, 10); // Generate a random passkey
  return passkey;
};

const storePasskey = async () => {
  const client = new MongoClient(url, { useUnifiedTopology: true });

  try {
    await client.connect();
    const db = client.db(dbName);
    const passkeysCollection = db.collection('passkeys');
    const passkey = generatePasskey();

    // Insert the generated passkey into the collection
    await passkeysCollection.insertOne({ passkey });

    console.log(`Passkey "${passkey}" created and stored in the database.`);
  } catch (err) {
    console.error('Error:', err);
  } finally {
    client.close();
  }
};

storePasskey();
