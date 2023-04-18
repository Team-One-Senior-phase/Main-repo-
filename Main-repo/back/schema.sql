-- users table stores information about the users of the website

CREATE TABLE
    users (
        user_id INT AUTO_INCREMENT PRIMARY KEY,
        user_name VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL UNIQUE,
        password VARCHAR(255) NOT NULL,
        phone VARCHAR(20) DEFAULT '',
        address VARCHAR(255) NOT NULL DEFAULT '',
        city VARCHAR(255) NOT NULL DEFAULT '',
        state VARCHAR(255) NOT NULL DEFAULT '',
        zip_code VARCHAR(10) NOT NULL DEFAULT '',
        country VARCHAR(255) NOT NULL DEFAULT '',
        role ENUM('admin', 'customer') NOT NULL DEFAULT 'customer',
        is_banned BOOLEAN NOT NULL DEFAULT FALSE,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    );

-- Products table stores information about the products sold on the website

CREATE TABLE
    products (
        product_id INT AUTO_INCREMENT PRIMARY KEY,
        product_name VARCHAR(255) NOT NULL,
        description TEXT,
        price DECIMAL(10, 2) NOT NULL,
        stock INT NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    );

-- Categories table stores information about the categories of the products sold on the website

CREATE TABLE
    categories (
        category_id INT AUTO_INCREMENT PRIMARY KEY,
        category_name VARCHAR(255) NOT NULL,
        description TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    );

-- Products_Categories table stores the relationship between products and categories

CREATE TABLE
    products_categories (
        product_id INT,
        category_id INT,
        PRIMARY KEY (product_id, category_id),
        FOREIGN KEY (product_id) REFERENCES products(product_id) ON DELETE CASCADE,
        FOREIGN KEY (category_id) REFERENCES categories(category_id) ON DELETE CASCADE
    );

-- Orders table stores information about the orders placed by the users

CREATE TABLE
    orders (
        order_id INT AUTO_INCREMENT PRIMARY KEY,
        user_id INT,
        order_date TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
        total_amount DECIMAL(10, 2) NOT NULL,
        status VARCHAR(20) NOT NULL,
        shipping_address VARCHAR(255) NOT NULL,
        shipping_city VARCHAR(255) NOT NULL,
        shipping_state VARCHAR(255) NOT NULL,
        shipping_zip_code VARCHAR(10) NOT NULL,
        shipping_country VARCHAR(255) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        FOREIGN KEY (user_id) REFERENCES users(user_id)
    );

-- Order_Items table stores information about the items in each order

CREATE TABLE
    order_items (
        order_id INT,
        product_id INT,
        quantity INT NOT NULL,
        price DECIMAL(10, 2) NOT NULL,
        PRIMARY KEY (order_id, product_id),
        FOREIGN KEY (order_id) REFERENCES orders(order_id) ON DELETE CASCADE,
        FOREIGN KEY (product_id) REFERENCES products(product_id) ON DELETE CASCADE
    );

-- Reviews table stores information about the reviews left by the users for the products

CREATE TABLE
    reviews (
        review_id INT AUTO_INCREMENT PRIMARY KEY,
        user_id INT,
        product_id INT,
        rating INT NOT NULL,
        review_text TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        FOREIGN KEY (user_id) REFERENCES users(user_id),
        FOREIGN KEY (product_id) REFERENCES products(product_id)
    );

-- Promotions table stores information about the current promotions and discounts on the website

CREATE TABLE
    promotions (
        promotion_id INT AUTO_INCREMENT PRIMARY KEY,
        promotion_name VARCHAR(255) NOT NULL,
        discount DECIMAL(5, 2) NOT NULL,
        start_date DATE NOT NULL,
        end_date DATE NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    );

-- Promotion_Products table stores the relationship between promotions and products

CREATE TABLE
    promotion_products (
        promotion_id INT,
        product_id INT,
        PRIMARY KEY (promotion_id, product_id),
        FOREIGN KEY (promotion_id) REFERENCES promotions(promotion_id) ON DELETE CASCADE,
        FOREIGN KEY (product_id) REFERENCES products(product_id) ON DELETE CASCADE
    );

-- Payments table stores information about the payments made by the users

CREATE TABLE
    payments (
        payment_id INT AUTO_INCREMENT PRIMARY KEY,
        user_id INT,
        order_id INT,
        payment_method VARCHAR(255) NOT NULL,
        payment_amount DECIMAL(10, 2) NOT NULL,
        payment_date TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        FOREIGN KEY (user_id) REFERENCES users(user_id),
        FOREIGN KEY (order_id) REFERENCES orders(order_id)
    );

-- Wishlists table stores the lists of products that the users want to purchase in the future

CREATE TABLE
    wishlists (
        wishlist_id INT AUTO_INCREMENT PRIMARY KEY,
        user_id INT,
        product_id INT,
        added_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (user_id) REFERENCES users(user_id),
        FOREIGN KEY (product_id) REFERENCES products(product_id)
    );

-- Cart_Items table stores the items that the users add to their shopping cart

CREATE TABLE
    cart_items (
        cart_item_id INT AUTO_INCREMENT PRIMARY KEY,
        user_id INT,
        product_id INT,
        quantity INT NOT NULL,
        price DECIMAL(10, 2) NOT NULL,
        added_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (user_id) REFERENCES users(user_id),
        FOREIGN KEY (product_id) REFERENCES products(product_id)
    );