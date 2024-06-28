const mongoose = require('mongoose');
mongoose.connect("mongodb+srv://nk28814:l1QuWbk20w1NNf9T@cluster0.kl3mjkr.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0");  //connect db
//mongoose.connect("mongodb://localhost:27017/super_market");  //connect db

const db = mongoose.connection;  //acquire the connection
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('Success db connection');
  console.log('deployed on live servergitn');
});

// mongodb+srv:nk28814:l1QuWbk20w1NNf9T@cluster0.kl3mjkr.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0



// const { MongoClient, ServerApiVersion } = require('mongodb');
// const uri = "mongodb+srv://nk28814:l1QuWbk20w1NNf9T@cluster0.kl3mjkr.mongodb.net/?appName=Cluster0";

// // Create a MongoClient with a MongoClientOptions object to set the Stable API version
// const client = new MongoClient(uri, {
//   serverApi: {
//     version: ServerApiVersion.v1,
//     strict: true,
//     deprecationErrors: true,
//   }
// });

// async function run() {
//   try {
//     // Connect the client to the server	(optional starting in v4.7)
//     await client.connect();
//     // Send a ping to confirm a successful connection
//     await client.db("admin").command({ ping: 1 });
//     console.log("Pinged your deployment. You successfully connected to MongoDB!");
//   } finally {
//     // Ensures that the client will close when you finish/error
//     await client.close();
//   }
// }
// run().catch(console.dir);






