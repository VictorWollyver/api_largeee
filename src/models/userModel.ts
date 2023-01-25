import { ObjectId, WithId } from "mongodb"
import client from "../db/conn"

const db = client.db('Largeee')
const Largeee = db.collection('user')

class User {
  username: string
  password: string
  email: string
  constructor(username: string, password: string, email: string) {
    this.username = username
    this.password = password
    this.email = email
  }

  async createUser() {
    const { insertedId } = await Largeee.insertOne(this)
    return insertedId
  }

  static async getUserByEmail(email: string){
    const user = await Largeee.findOne<Promise<WithId<UserDatabase>>>({ email: email })
    return user
  }
}

export default User