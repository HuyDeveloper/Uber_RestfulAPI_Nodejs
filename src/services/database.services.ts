
import { MongoClient, ServerApiVersion, Db, Collection } from 'mongodb';
import User from '~/models/schemas/User.schema';
import dotenv from 'dotenv'
import RefreshToken from '~/models/schemas/RefreshToken.schema';
dotenv.config()
const uri = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.atzgrz8.mongodb.net/?retryWrites=true&w=majority`;


class DatabaseService{
  private client: MongoClient
  private db: Db
  constructor(){
   this.client = new MongoClient(uri)
   this.db = this.client.db(`${process.env.DB_NAME}`)
  }
  async connect(){
    try {
      // Send a ping to confirm a successful connection
      await this.db.command({ ping: 1 });
      console.log("Pinged your deployment. You successfully connected to MongoDB!");
    } catch (error) {
      // Ensures that the client will close when you finish/error
      //await this.client.close();
      console.log(error)
      throw error
    }
  }
  get users(): Collection<User> {
    return this.db.collection(process.env.DB_USERS_COLLECTION as string)
  }
  get refreshToken(): Collection<RefreshToken> {
    return this.db.collection(process.env.DB_REFRESHTOKEN_COLLECTION as string)
  }
}

const databaseService = new DatabaseService()
export default databaseService

