import { WithId } from 'mongodb'
import conn from '../db/conn'
const db = conn.db('Largeee')
const cart = db.collection('cart_user')

class cartUserModel {

  static async addProductCart({ color, illustration, name, price, tissue}: WithId<Product>, id: string){
    await cart.insertOne({user_id: id, color, illustration, name, price, tissue})     
  }

  static async getCartByID(id: string){
    const listCart = await cart.find({ user_id: id}).toArray()    
    return listCart
  }

}

export default cartUserModel