interface Comment {
  id: string
  product_id: string
  author: string
  comment: string
}

interface ProductToBuy {
  name: string
  price: number
  amount: number
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

interface ProductOnCart {
  name: string
  price: number
  color: string
  illustration: boolean
  tissue: string
  category: "featured" | "commum"
  src: string
  amount: number
}

interface UserDatabase {
  username: string
  email: string
  password: string
}