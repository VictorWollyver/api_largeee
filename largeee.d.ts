interface Comment {
  id: string
  product_id: string
  author: string
  comment: string
}

interface Product {
  name: string
  price: number
  color: string
  illustration: boolean
  tissue: string
  category: "featured" | "commum"
  src: string
}

interface UserDatabase {
  username: string
  email: string
  password: string
}