import React, { useState } from 'react';

interface IProduct {
    product_id: number
    product_name: string
    description: string
    price: number
    stock: number
    image: string
}

type CheckoutProps = {
    items: IProduct[]
};

type PersonalInfo = {
    name: string;
    email: string;
    phone: string;
    address: string;
    city: string;
    state: string;
    zip_code: string;
    country: string;
    [key: string]: string;
};

const Checkout = ({ items }:CheckoutProps) => {
    const [personalInfo, setPersonalInfo] = useState<PersonalInfo>({
        name: '',
        email: '',
        phone: '',
        address: '',
        city: '',
        state: '',
        zip_code: '',
        country: '',
    });
    const [formErrors, setFormErrors] = useState<Partial<PersonalInfo>>({});
    const [formSubmitted, setFormSubmitted] = useState(false);

    const totalPrice = items.reduce(
        (acc, item) => acc + item.price,
        0
    );

    const validateForm = (values: PersonalInfo) => {
        let errors: Partial<PersonalInfo> = {};
        const requiredFields = ['name', 'email', 'phone', 'address', 'city', 'state', 'zip_code', 'country',];
        requiredFields.forEach((field) => {
            if (!values[field]) {
                errors[field] = 'This field is required';
            }
        });
        return errors;
    };

    const handleInputChange = (
        event: React.ChangeEvent<HTMLInputElement>

    ) => {
        const { name, value } = event.target;
        setPersonalInfo((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const errors = validateForm(personalInfo);
        setFormErrors(errors);
        if (Object.keys(errors).length === 0) {
            // Process payment and shipping information
            // Display confirmation message
            setFormSubmitted(true);
        }
    };

    if (formSubmitted) {
        return (
            <div className="bg-white p-4 rounded-lg shadow-lg">
                <h2 className="text-xl font-bold mb-4">Thank you for your order!</h2>
                <p className="text-lg mb-4">We have received your order and will begin processing it shortly.</p>
                <p className="text-lg mb-4">You will receive an email with your order confirmation and tracking information once your order has shipped.</p>
                <p className="text-lg mb-4">If you have any questions or concerns, please contact us at support@rbkecommerce.com.</p>
            </div>
        );
    }


    return (
        <>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div className="flex justify-between space-x-4">
                    <div className="w-full max-w-sm">
                        <label className="block text-gray-700 font-bold mb-2" htmlFor="name">
                            Name
                        </label>
                        <input
                            className={`appearance-none border ${formErrors.name ? 'border-red-500' : ''
                                } rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline`}
                            type="text"
                            name="name"
                            value={personalInfo.name}
                            onChange={handleInputChange}
                        />
                        {formErrors.name && (
                            <p className="text-red-500 text-xs italic">{formErrors.name}</p>
                        )}
                    </div>
                    <div className="w-full max-w-sm">
                        <label className="block text-gray-700 font-bold mb-2" htmlFor="email">
                            Email
                        </label>
                        <input
                            className={`appearance-none border ${formErrors.email ? 'border-red-500' : ''
                                } rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline`}
                            type="email"
                            name="email"
                            value={personalInfo.email}
                            onChange={handleInputChange}
                        />
                        {formErrors.email && (
                            <p className="text-red-500 text-xs italic">{formErrors.email}</p>
                        )}
                    </div>
                    <div className="w-full max-w-sm">
                        <label className="block text-gray-700 font-bold mb-2" htmlFor="phone">
                            Phone
                        </label>
                        <input
                            className={`appearance-none border ${formErrors.phone ? 'border-red-500' : ''
                                } rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline`}
                            type="tel"
                            name="phone"
                            value={personalInfo.phone}
                            onChange={handleInputChange}
                        />
                        {formErrors.phone && (
                            <p className="text-red-500 text-xs italic">{formErrors.phone}</p>
                        )}
                    </div>
                </div>
                <div className="flex justify-between space-x-4">
                    <div className="w-full max-w-sm">
                        <label className="block text-gray-700 font-bold mb-2" htmlFor="address">
                            Address
                        </label>
                        <input
                            className={`appearance-none border ${formErrors.address ? 'border-red-500' : ''
                                } rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline`}
                            type="text"
                            name="address"
                            value={personalInfo.address}
                            onChange={handleInputChange}
                        />
                        {formErrors.address && (
                            <p className="text-red-500 text-xs italic">{formErrors.address}</p>
                        )}
                    </div>
                    <div className="w-full max-w-sm">
                        <label className="block text-gray-700 font-bold mb-2" htmlFor="city">
                            City
                        </label>
                        <input
                            className={`appearance-none border ${formErrors.city ? 'border-red-500' : ''} rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline`}
                            type="text"
                            name="city"
                            value={personalInfo.city}
                            onChange={handleInputChange}
                        />
                        {formErrors.city && (
                            <p className="text-red-500 text-xs italic">{formErrors.city}</p>
                        )}
                    </div>
                    <div className="w-full max-w-sm">
                        <label className="block text-gray-700 font-bold mb-2" htmlFor="state">
                            State
                        </label>
                        <input className={`appearance - none border ${formErrors.state ? 'border-red-500' : ''} rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline`}
                            type="text"
                            name="state"
                            value={personalInfo.state}
                            onChange={handleInputChange} />
                        {formErrors.state && (
                            <p className="text-red-500 text-xs italic">{formErrors.state}</p>
                        )}
                    </div>
                </div>
                <div className="flex justify-between space-x-4">
                    <div className="w-full max-w-sm">
                        <label className="block text-gray-700 font-bold mb-2" htmlFor="zip_code">
                            Zip Code
                        </label>
                        <input
                            className={`appearance - none border ${formErrors.zip_code ? 'border-red-500' : ''} rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline`}
                            type="text"
                            name="zip_code"
                            value={personalInfo.zip_code}
                            onChange={handleInputChange} />
                        {formErrors.zip_code && (
                            <p className="text-red-500 text-xs italic">{formErrors.zip_code}</p>
                        )}
                    </div>

                    <div className="w-full max-w-sm">
                        <label className="block text-gray-700 font-bold mb-2" htmlFor="country">
                            Country
                        </label>
                        <input
                            className={`appearance - none border ${formErrors.country ? 'border-red-500' : ''} rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline`}
                            type="text"
                            name="country"
                            value={personalInfo.country}
                            onChange={handleInputChange} />
                        {formErrors.country && (
                            <p className="text-red-500 text-xs italic">{formErrors.country}</p>
                        )}
                    </div>
                </div>
            </form>


            <div className="bg-white p-4 rounded-lg shadow-lg">
                <h2 className="text-xl font-bold mb-4">Checkout</h2>
                <div className="flex flex-wrap">
                    {items.map((item) => (
                        <div key={item.product_id} className="w-full p-2" style={{ maxWidth: "300px" }}>
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
                            </div>
                        </div>
                    ))}
                </div>
                <p className="text-xl font-bold mt-4">Total: ${totalPrice.toFixed(2)}</p>
                <form onSubmit={handleSubmit}>
                    {/* Form fields for payment and shipping information */}
                    <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 h-10 w-full rounded-md shadow-md mt-4">
                        Submit Order
                    </button>
                </form>
            </div>
        </>
    )
}


export default Checkout;
