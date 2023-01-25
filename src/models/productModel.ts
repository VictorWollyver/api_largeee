import { ObjectId, WithId } from 'mongodb'
import conn from '../db/conn'
const db = conn.db('Largeee')
const Products = db.collection('products')

class ProductModel {
  name: string
  price: number
  color: string
  illustration: boolean
  tissue: string

  constructor({ color, illustration, name, price, tissue }: Product) {
    this.color = color
    this.illustration = illustration
    this.name = name
    this.price = price
    this.tissue = tissue
  }

  static async getAllProducts() {
    const ProductsList = await Products.find({ }).toArray()
    return ProductsList
  }

  static async getProductByID(id: string) {
    const Product = await Products.findOne<WithId<Product>>({_id: new ObjectId(id)})
    return Product as WithId<Product>
  }

  static async getProductsFeatured() {
    const Product = await Products.find<WithId<Product[]>>({category: 'featured'}).toArray()
    return Product

  }
}

export default ProductModel