import React from "react";

const Product = () => {
  const product = {
    id: 5,
    title: "Product 5",
    description: "Product description 2",
    images: [
      "https://images7.alphacoders.com/130/1301276.jpg",
      "https://images4.alphacoders.com/130/1306932.jpg",
    ],
    price: 49.99,
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row">
        <div className="w-full md:w-1/2">
          <img
            src={product.images[0]}
            alt={product.title}
            className="w-full h-64 md:h-auto object-contain mb-8 md:mb-0"
          />
        </div>
        <div className="w-full md:w-1/2 md:pl-8">
          <h1 className="text-3xl font-bold mb-4">{product.title}</h1>
          <p className="text-xl font-semibold text-gray-700 mb-4">
            ${product.price.toFixed(2)}
          </p>
          <p className="text-gray-600 mb-6">{product.description}</p>
          <button className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-6 rounded-md">
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default Product;
