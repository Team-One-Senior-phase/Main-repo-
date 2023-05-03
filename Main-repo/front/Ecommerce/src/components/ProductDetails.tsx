import React from 'react';
import { Link } from 'react-router-dom'
import jwt from 'jwt-decode'

interface IProduct {
    product_id: number
    product_name: string
    description: string
    price: number
    stock: number
    image: string
}

interface Props {
    product: IProduct
    addToCart:(user_id:number, product_id:number)=> void
}

type TokenUser = {
    user_id: number,
    iat: number
  }

const ProductDetails = ({ product,addToCart }: Props) => {

    const handleAddToCart = (): void => {
        const token = localStorage.getItem("JWT token")
        const user = jwt(JSON.stringify(token)) as TokenUser
        console.log(user.user_id)
        if(user.user_id){
          addToCart(user.user_id,product.product_id)
        }
        else{
          window.confirm('You have to login to add product to your cart')
        }
      }

    return (
        <section className="flex flex-col gap-16 py-10 bg-gray-100 bg-grey">
            <div className="container mx-auto flex justify-around  items-center w-[80%]">
                <div className="w-96 flex justify-end">
                    <img src={product.image} alt={product.product_name} className="w-full select-none" />
                </div>
                <div className="flex flex-col gap-3">
                    <h2 className="text-4xl">{product.product_name}</h2>
                    <span className="font-semibold">
                        Price: <span className="text-2xl">{product.price}</span>
                    </span>
                    <div className="flex flex-col gap-2">
                        <h1 className="text-2xl">Key features</h1>
                        <p className="text-gray-800">{product.description}</p>
                    </div>
                    <button
                        onClick={() => handleAddToCart()}
                        className="bg-sky-500 text-sky-50 px-2 py-1 mt-4"
                    >
                        add to cart
                    </button>
                </div>
            </div>
            <Link
                to="/"
                className="text-xl py-1 text-center hover:text-cyan-500 duration-300 select-none"
            >
                &larr; Go back
            </Link>
        </section>
    )
}

export default ProductDetails;