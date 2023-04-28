import React from 'react';
import OneProduct from './OneProduct';

interface IProduct {
    product_id: number
    product_name: string
    description: string
    price: number
    stock: number
    image: string
}

interface Props {
    products: IProduct[]
    getProduct:(id:number) => void
}

const ProductList = ({ products, getProduct}: Props) => {
    return (
        <div className="bg-grey">
            <h2 className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-11 lg:max-w-7xl lg:px-6 text-2xl font-bold tracking-tight text-gray-900">Smart Phones</h2>
            <div className="grid grid-cols-3 gap-10">
                {products.map(product => <OneProduct key={product.product_id} product={product} getProduct={getProduct} />)}
            </div>
        </div>
    )
}

export default ProductList;