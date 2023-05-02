import React from 'react';

const Orders = () => {
    return (
        <div className="container mx-auto py-6">
            <div className="flex justify-between items-center mb-4">
                <form className="flex items-center">
                    <label className="mr-2">Search:</label>
                    <input className="border rounded-lg px-4 py-2" type="text" name="search" id="search" placeholder="Search orders..." />
                    <button className="bg-gray-200 text-gray-700 px-4 py-2 rounded-lg" type="button">Search</button>
                </form>
                <form className="flex items-center">
                    <label className="mr-2">Status:</label>
                    <select className="border rounded-lg px-4 py-2" name="status" id="status">
                        <option value="">All</option>
                        <option value="completed">Completed</option>
                        <option value="processing">Processing</option>
                        <option value="cancelled">Cancelled</option>
                    </select>
                </form>
            </div>

            <table className="table-auto w-full">
                <thead>
                    <tr>
                        <th className="px-4 py-2 font-bold text-left">Order ID</th>
                        <th className="px-4 py-2 font-bold text-left">Date</th>
                        <th className="px-4 py-2 font-bold text-left">Status</th>
                        <th className="px-4 py-2 font-bold text-left"></th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td className="border px-4 py-2">1</td>
                        <td className="border px-4 py-2">2023-04-30</td>
                        <td className="border px-4 py-2"><span className="bg-green-500 text-white px-2 py-1 rounded-full">Completed</span></td>
                        <td className="border px-4 py-2"><a href="/order" style={{color:'blue'}}>view details</a></td>
                    </tr>
                    <tr>
                        <td className="border px-4 py-2">2</td>
                        <td className="border px-4 py-2">2023-04-30</td>
                        <td className="border px-4 py-2"><span className="bg-orange-500 text-white px-2 py-1 rounded-full">Processing</span></td>
                        <td className="border px-4 py-2"><a href="/order" style={{color:'blue'}}>view details</a></td>
                    </tr>
                    <tr>
                        <td className="border px-4 py-2">3</td>
                        <td className="border px-4 py-2">2023-04-30</td>
                        <td className="border px-4 py-2"><span className="bg-red-500 text-white px-2 py-1 rounded-full">Cancelled</span></td>
                        <td className="border px-4 py-2"><a href="/order" style={{color:'blue'}}>view details</a></td>
                    </tr>
                </tbody>
            </table>

        </div>
    )
}

export default Orders;