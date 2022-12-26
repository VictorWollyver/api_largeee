import conn from '../db/conn'

const db = conn.db('Largeee')
const commentsProduct = db.collection('comments_product')

class commentProductModel {
  product_id: string
  author: string
  comment: string

  constructor(product_id: string, author: string, comment: string) {
    this.product_id = product_id
    this.author = author
    this.comment = comment
  }

  async postComment() {
    await commentsProduct.insertOne(this)
  }

  static async getCommentPostByID(id: string) {
    const comments = await commentsProduct.find({ product_id: id }).toArray()
    return comments
  }


}

export default commentProductModel