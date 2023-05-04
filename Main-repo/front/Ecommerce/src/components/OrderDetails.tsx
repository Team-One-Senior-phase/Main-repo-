import React from 'react';

const OrderDetails = () => {
    return (
        <div className="container mx-auto py-6">
            <section className="flex flex-wrap justify-between mb-6">
                <div className="w-full md:w-1/2">
                    <h2 className="text-lg font-bold mb-2">Order #12345</h2>
                    <p className="mb-2">Order placed on <strong>April 30, 2023</strong></p>
                    <p className="mb-2">Status: <span className="bg-green-500 text-white px-2 py-1 rounded-full">Completed</span></p>
                </div>
                <div className="w-full md:w-1/2">
                    <div className="bg-gray-100 rounded-lg px-4 py-2">
                        <p className="mb-2"><span className="font-bold">Subtotal:</span> $100.00</p>
                        <p className="mb-2"><span className="font-bold">Shipping:</span> $10.00</p>
                        <p className="mb-2"><span className="font-bold">Tax:</span> $9.00</p>
                        <hr className="my-2"/>
                            <p className="mb-2"><span className="font-bold">Total:</span> $119.00</p>
                    </div>
                </div>
            </section>
            <section className="mb-6">
                <h3 className="text-lg font-bold mb-2">Order Items</h3>
                <table className="table-auto w-full">
                    <thead>
                        <tr>
                            <th className="px-4 py-2 font-bold text-left">Product</th>
                            <th className="px-4 py-2 font-bold text-left">Price</th>
                            <th className="px-4 py-2 font-bold text-left">Quantity</th>
                            <th className="px-4 py-2 font-bold text-left">Total</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td className="border px-4 py-2">Product A</td>
                            <td className="border px-4 py-2">$50.00</td>
                            <td className="border px-4 py-2">2</td>
                            <td className="border px-4 py-2">$100.00</td>
                        </tr>
                    </tbody>
                </table>
            </section>
        </div>

    )
}

export default OrderDetails;