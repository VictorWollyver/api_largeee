import { WithId, ObjectId } from 'mongodb'
import conn from '../db/conn'
const db = conn.db('Largeee')
const cart = db.collection('cart_user')

class cartUserModel {

  static async addProductCart({ color, illustration, name, price, tissue, src, _id}: WithId<Product>, id: string){

    await cart.insertOne({user_id: id, product_id: _id, color, illustration, name, price, tissue, src, amount: 1 })     
  }

  static async getCartByID(id: string){
    const listCart = await cart.find({ user_id: id }).toArray()    
    return listCart
  }

  static async verifyIfUserCartAlreadyExists(user_id: string, product_id: string){
    const alreadyExists = await cart.find({ user_id: user_id, product_id: new ObjectId(product_id) }).toArray() 
    return alreadyExists
  }

  static async updateAmountProduct(user_id: string, product_id: string){
    const update = await cart.updateOne({ user_id: user_id,  product_id: new ObjectId(product_id)}, { $inc: {amount: 1 }})    
    return update
  }

}

export default cartUserModel