const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');

// Connection URL
const url = 'mongodb://localhost:27017';


// Database Name
const dbName = 'to-do-db';
const client = new MongoClient(url);

var _db;

function connectToDB(callback){
        // Use connect method to connect to the server
    client.connect(function(err) {
        console.log('Connected successfully to server');
        _db = client.db(dbName);
        callback(err)
    });
}

const findDocuments = async () => {
    // Get the documents collection
    const collection = _db.collection('to-do-collection');
    // Find some documents
    try{
        const results = await collection.find({}).toArray();
        return results
    } catch (error){
        throw new Error(error)
    }
    
  };

const insertDocuments = async (document) => {
    // Get the documents collection
    const collection = _db.collection('to-do-collection');
    // Insert some documents
    try{
        const result = await collection.insertOne(document);
        return result
    } catch(error){
        throw new Error(error)
    }
};

const updateDocument = async (document) => {
    // Get the documents collection
    const collection = _db.collection('to-do-collection');
    // Update document where a is 2, set b equal to 1
    try{
        const results = await collection.updateOne({ _id: document._id }, { $set: document });
        return results
    } catch(error){
        throw new Error(error)
    }
  };


  const removeDocument = async (document) => {
    // Get the documents collection
    const collection = _db.collection('to-do-collection');
    // Delete document where a is 3
    try{
        const results = await collection.deleteOne({ _id: document._id });
        return results
    } catch(error){
        throw new Error(error)
    }
  };

  module.exports = {
    removeDocument,
    updateDocument,
    insertDocuments,
    findDocuments,
    connectToDB

  }


// connectToDB(async () =>{
//     const result = await findDocuments()
//     console.log(result)
    
// })
