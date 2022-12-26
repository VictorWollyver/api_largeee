import { ObjectId } from "mongodb"
import client from "../db/conn"

const db = client.db('Largeee')
const Largeee = db.collection('user')

class User {
  username: string
  password: string
  constructor(username: string, password: string) {
    this.username = username
    this.password = password
  }

  async createUser() {
    const { insertedId } = await Largeee.insertOne(this)
    return insertedId
  }

  static async getUserByID(id: string) {
    const user = await Largeee.findOne({ _id: new ObjectId(id) })
    return user
  }
}

export default User