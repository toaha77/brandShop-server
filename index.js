const express = require('express');
const { MongoClient, ServerApiVersion,ObjectId } = require('mongodb');
const cors = require('cors');
const app = express();


const port = process.env.PORT || 5000

app.use(cors());
app.use(express.json())

// hw1020471
// y1aEkjHQyIOf43mE

const uri = "mongodb+srv://hw1020471:y1aEkjHQyIOf43mE@cluster0.qegvawy.mongodb.net/?retryWrites=true&w=majority";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();

    const brandCollection = client.db("brandDB").collection('brand')
    const productCollection = client.db("brandDB").collection('brands')
    const brandCardCollection = client.db("brandDB").collection('brandsCard')
    app.get('/brands', async(req, res) =>{
      const result = await productCollection.find().toArray()
      res.send(result)
    })
    app.get('/brandsCard', async(req, res) =>{
      const result = await brandCardCollection.find().toArray()
      res.send(result)
    })
    app.post('/addProduct', async(req, res) =>{
      const product = req.body
      const result = await brandCollection.insertOne(product)
      console.log(result);
      res.send(result)
    })
    app.put('/addProduct/:id', async(req,res) =>{
      const id = req.params.id
      const filter = {_id: new ObjectId(id)}
      const options = {upsert: true}
      const updatedProduct = req.body
      const product = {
        $set:{
            name: updatedProduct.name,
            brand: updatedProduct.brand,
            photo: updatedProduct.photo,
            type: updatedProduct.type,
            description: updatedProduct.description,
            price: updatedProduct.price,
            rating: updatedProduct.rating
        }
      }
      const result = await brandCollection.updateOne(filter, product, options )
      res.send(result)
    })
    app.get('/addProduct', async(req, res) =>{
      const result = await brandCollection.find().toArray()
      res.send(result)
    })
    app.get('/addProduct/:id', async(req, res)=>{
      const id = req.params.id
      const query =  {_id: new ObjectId(id)}
     const result = await brandCollection.findOne(query)
     res.send(result)
    })
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);
app.get('/', (req, res) => {
  res.send('CRUD is running')
})

 app.listen(port, () => console.log(`Example app listening on port ${port}!`));