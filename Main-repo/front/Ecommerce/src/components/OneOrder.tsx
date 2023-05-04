import React from 'react';

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
    order: IOrder
}

const OneOrder = ({ order }: Props) => {
    return (
        <tr>
            <td className="border px-4 py-2">{order.order_id}</td>
            <td className="border px-4 py-2">{order.order_date.toString()}</td>
            <td className="border px-4 py-2"><span className="bg-orange-500 text-white px-2 py-1 rounded-full">{order.status}</span></td>
            <td className="border px-4 py-2"><a href="/order" style={{ color: 'blue' }}>view details</a></td>
        </tr>
    )
}

export default OneOrder;