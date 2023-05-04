import React, { useState } from 'react';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom'

interface IProduct {
    product_id: number
    product_name: string
    description: string
    price: number
    stock: number
    image: string
}

interface Item {
    cart_id: number
    user_id: number
    product_id: number
    product_name: string
    description: string
    price: number
    stock: number
    quantity: number
    image: string
}

type CartProps = {
    items: Item[]
    addToCart: (user_id: number, product_id: number) => void
    reduceQuantity: (user_id: number, product_id: number) => void
    deleteCartItem: (user_id: number, cart_id: number) => void
}

const Cart: React.FC<CartProps> = ({ items, addToCart, reduceQuantity, deleteCartItem }) => {
    const [quantities, setQuantities] = useState<{ [key: number]: number }>(
        Object.fromEntries(items.map((item) => [item.product_id, 1]))
    );

    const totalPrice = items.reduce((acc, curr) => {
        return acc + curr.price * curr.quantity;
    }, 0);

    const handleAdd = (item: Item) => {
        if (item.quantity < item.stock) {
            addToCart(item.user_id, item.product_id)
        }
    };


    const handleDelete = (item:Item) => {
        const confirmed = window.confirm('Are you sure you want to remove this item from your cart?');
        if (confirmed) {
            deleteCartItem(item.user_id,item.cart_id)
        }
    };
    return (
        <div className="bg-white p-4 rounded-lg shadow-lg">
            <h2 className="text-xl font-bold mb-4">Shopping Cart</h2>
            {items.length === 0 ? (
                <p>Your cart is empty.</p>
            ) : (
                <>
                    <div className="flex flex-wrap">
                        {items.map((item) => (
                            <div key={item.product_id} className="w-full p-2" style={{ maxWidth: "300px" }}>
                                <div className="bg-gray-100 rounded-lg p-2">
                                    <div className="flex items-center justify-between mb-2">
                                        <h3 className="font-bold text-lg">{item.product_name}</h3>
                                        <p className="text-gray-700 font-bold">{item.price} DT</p>
                                    </div>
                                    <img
                                        src={item.image}
                                        alt={item.product_name}
                                        className="w-full h-50 object-cover rounded-lg shadow-md"
                                    />
                                    <div className="flex justify-center mt-2">
                                        <button
                                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 h-10 w-10 rounded-full shadow-md"
                                            onClick={() => reduceQuantity(item.user_id, item.product_id)}
                                        >
                                            -
                                        </button>
                                        <p className="mx-4 font-bold">{item.quantity}</p>
                                        <button
                                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 h-10 w-10 rounded-full shadow-md"
                                            onClick={() => handleAdd(item)}
                                        >
                                            +
                                        </button>
                                        <button
                                            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 h-10 w-10 rounded-full shadow-md ml-4"
                                            onClick={() => handleDelete(item)}
                                        >
                                            <FontAwesomeIcon icon={faTrash} />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                    <p className="text-xl font-bold mt-4">Total: {totalPrice} DT</p>
                </>
            )}
            <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 h-10 w-40 rounded-md shadow-md mt-4">
                <Link to="/checkout">Chekout</Link>
            </button>
        </div>
    );
};

export default Cart;

