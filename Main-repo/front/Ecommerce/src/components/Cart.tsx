import React, { useState } from 'react';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


type CartProps = {
    items: {
        id: number;
        product_name: string;
        description: string;
        price: number;
        stock: number;
        image: string;
    }[];
    setItems: (items: (prevItems: { id: number; product_name: string; description: string; price: number; stock: number; image: string; }[]) => { id: number; product_name: string; description: string; price: number; stock: number; image: string; }[]) => void;
}

const Cart: React.FC<CartProps> = ({ items,setItems }) => {
    const [quantities, setQuantities] = useState<{ [key: number]: number }>(
        Object.fromEntries(items.map((item) => [item.id, 1]))
    );

    const totalPrice = Object.keys(quantities).reduce(
        (acc, itemId) =>
            acc + items.find((item) => item.id === Number(itemId))!.price * quantities[Number(itemId)],
        0
    );

    const handleAdd = (itemId: string) => {
        const id = Number(itemId);
        if (quantities[id] < items.find((item) => item.id === id)!.stock) {
            setQuantities((prevQuantities) => ({ ...prevQuantities, [id]: prevQuantities[id] + 1 }));
        }
    };

    const handleReduce = (itemId: string) => {
        const id = Number(itemId);
        if (quantities[id] > 1) {
            setQuantities((prevQuantities) => ({ ...prevQuantities, [id]: prevQuantities[id] - 1 }));
        }
    };

 
    const handleDelete = (itemId: string) => {
        const id = Number(itemId);
        const confirmed = window.confirm('Are you sure you want to remove this item from your cart?');
        if (confirmed) {
            setQuantities((prevQuantities) => {
                const { [id]: _, ...rest } = prevQuantities;
                return rest;
            });
            setItems((prevItems: { id: number; product_name: string; description: string; price: number; stock: number; image: string; }[]) => prevItems.filter((item) => item.id !== id));

        }
    };
    return (
        <div className="bg-white p-4 rounded-lg shadow-lg">
            <h2 className="text-xl font-bold mb-4">Cart</h2>
            {items.length === 0 ? (
                <p>Your cart is empty.</p>
            ) : (
                <>
                    <div className="flex flex-wrap">
                        {items.map((item) => (
                            <div key={item.id} className="w-full p-2" style={{ maxWidth: "300px" }}>
                            <div className="bg-gray-100 rounded-lg p-2">
                                <div className="flex items-center justify-between mb-2">
                                    <h3 className="font-bold text-lg">{item.product_name}</h3>
                                    <p className="text-gray-700 font-bold">${item.price.toFixed(2)}</p>
                                </div>
                                <img
                                    src={item.image}
                                    alt={item.product_name}
                                    className="w-full h-32 object-cover rounded-lg shadow-md"
                                />
                                <div className="flex justify-center mt-2">
                                    <button
                                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 h-10 w-10 rounded-full shadow-md"
                                        onClick={() => handleReduce(String(item.id))}
                                    >
                                        -
                                    </button>
                                    <p className="mx-4 font-bold">{quantities[item.id]}</p>
                                    <button
                                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 h-10 w-10 rounded-full shadow-md"
                                        onClick={() => handleAdd(String(item.id))}
                                    >
                                        +
                                    </button>
                                    <button
                                        className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 h-10 w-10 rounded-full shadow-md ml-4"
                                        onClick={() => handleDelete(String(item.id))}
                                    >
                                       <FontAwesomeIcon icon={faTrash} />
                                    </button>
                                </div>
                            </div>
                            </div>
                        ))}
                    </div>
                    <p className="text-xl font-bold mt-4">Total: ${totalPrice.toFixed(2)}</p>
                </>
            )}
        </div>
    );
};

export default Cart;

