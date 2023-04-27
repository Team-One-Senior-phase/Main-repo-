import React from 'react';
import { Link } from "react-router-dom";

interface IProduct {
    product_name: string
    description: string
    price: number
    stock: number
    image: string
}

interface Props {
    product: IProduct
}
const OneProduct = ({ product }: Props) => {
    return (
        <div className="single-product flex flex-col bg-gray-50 gap-3 shadow-md hover:shadow-xl hover:scale-105 duration-300 px-4 py-7 rounded-sm overflow-hidden">
      <div className="flex justify-center">
        <img
          className="w-72 h-48 object-contain hover:scale-110 duration-500"
          src={product.image}
          alt={product.product_name}
        />
      </div>
      <Link
        to={product.product_name}
        state={product}
        className="hover:text-rose-500 duration-300 flex justify-between items-center"
      >
        <h2 className="text-stone-950 font-semibold text-xl capitalize">
          {product.product_name}
        </h2>
      </Link>
      <p className="text-sm text-gray-600">
        Price: <span className="text-rose-500 font-semibold">{product.price} DT</span>
      </p>
      <div className="flex justify-between items-center">
        <Link
          to={product.product_name}
          state={product}
          className="hover:text-rose-50 text-gray-900 duration-300 flex justify-between items-center"
        >
          <button className="text-sky-400 px-2 py-1 border border-sky-400 rounded-md hover:bg-sky-400 hover:text-sky-50 duration-300">
            More Info
          </button>
        </Link>
        <button
          onClick={() => console.log("ksk")}
          className="bg-sky-400 text-sky-50 hover:bg-sky-50 hover:text-sky-400 duration-300 border border-sky-400 px-2 py-1 rounded-md"
        >
          add to cart
        </button>
      </div>
    </div>
    )
}

export default OneProduct;