import React, {useState} from 'react';
import OneOrder from './OneOrder';

interface IOrder {
    order_id: number
    user_id: number
    order_date: Date
    total_amount: string
    shipping_address: string
    shipping_city: string
    shipping_zip_code: string
    shipping_country: string
    status: string
}

interface Props {
    orders: IOrder[]
    searchOrder: (id:number) => void
}

const Orders = ({ orders, searchOrder }: Props) => {
    const [id,setId] = useState<string>("")
    return (
        <div className="container mx-auto py-6">
            <div className="flex justify-between items-center mb-4">
                <form className="flex items-center">
                    <label className="mr-2">Search:</label>
                    <input className="border rounded-lg px-4 py-2" type="text" name="search" id="search" placeholder="Search orders by id..." onChange={(e)=>setId(e.target.value)}/>
                    <button className="bg-gray-200 text-gray-700 px-4 py-2 rounded-lg" type="button" onClick={()=>{searchOrder(Number(id)); setId("")}}>Search</button>
                </form>
                <form className="flex items-center">
                    <label className="mr-2">Status:</label>
                    <select className="border rounded-lg px-4 py-2" name="status" id="status">
                        <option value="">All</option>
                        <option value="completed">Completed</option>
                        <option value="processing">Pending</option>
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
                    {orders.map(order=><OneOrder key={order.order_id} order={order} />)}
                </tbody>
            </table>

        </div>
    )
}

export default Orders;