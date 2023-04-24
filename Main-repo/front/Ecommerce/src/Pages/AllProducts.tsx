import React from "react";

const AllProducts = () => {
  const products = [
    {
      id: 1,
      title: "Product 1",
      description: "Product description 1",
      images: [
        "https://images7.alphacoders.com/130/1301276.jpg",
        "https://images4.alphacoders.com/130/1306932.jpg",
      ],
      category: "Electronics",
      price: "20.00$",
      numberReview: "123000",
    },
    {
      id: 15,
      title: "Product 14",
      description: "Product description 14343",
      images: [
        "https://images7.alphacoders.com/130/1301276.jpg",
        "https://images4.alphacoders.com/130/1306932.jpg",
      ],
      category: "Electronics",
    },
    {
      id: 2,
      title: "Product 2",
      description: "Product description 2",
      images: [
        "https://images7.alphacoders.com/130/1301276.jpg",
        "https://images4.alphacoders.com/130/1306932.jpg",
      ],
      category: "Makeup",
    },
    {
      id: 3,
      title: "Product 3",
      description: "Product description 2",
      images: [
        "https://images7.alphacoders.com/130/1301276.jpg",
        "https://images4.alphacoders.com/130/1306932.jpg",
      ],
      category: "1",
    },
    {
      id: 4,
      title: "Product 4",
      description: "Product description 2",
      images: [
        "https://images7.alphacoders.com/130/1301276.jpg",
        "https://images4.alphacoders.com/130/1306932.jpg",
      ],
      category: "test",
    },
    {
      id: 5,
      title: "Product 5",
      description: "Product description 2",
      images: [
        "https://images7.alphacoders.com/130/1301276.jpg",
        "https://images4.alphacoders.com/130/1306932.jpg",
      ],
      category: "electronics",
    },
    // add more products as needed
  ];

  const categories = [...new Set(products.map((product) => product.category))];

  return (
    <div className="container mx-auto px-4">
      <h1 className="text-4xl font-bold my-8">All Products</h1>
      {categories.map((category) => {
        const categoryProducts = products
          .filter((product) => product.category === category)
          .slice(0, 3);
        return (
          <div key={category}>
            <h2 className="text-2xl font-bold my-4">{category}</h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
              {categoryProducts.map((product) => (
                <div
                  key={product.id}
                  className="bg-white shadow-md rounded-md p-6"
                >
                  <img
                    src={product.images[0]}
                    alt={product.title}
                    className="w-full h-64 object-cover mb-4 rounded-t-md"
                  />
                  <h3 className="text-xl font-semibold mb-2">
                    {product.title}
                  </h3>
                  <p className="text-gray-600">{product.description}</p>
                  <p className="text-gray-600">{product.price}</p>
                  <p className="text-gray-600">{product.numberReview}</p>
                  <button className="mt-4 bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-md">
                    Buy Now
                  </button>
                </div>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default AllProducts;
