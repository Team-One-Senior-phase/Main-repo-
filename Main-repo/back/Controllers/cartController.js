const Cart = require('../ORM/cart.model.js');
const Product = require('../ORM/product.model.js');

//  add item to cart
async function addToCart(req, res) {
  const user_id = req.body.user_id;
  const product_id = req.body.product_id;
  const quantity = req.body.quantity;

  try {
    const product = await Product.findByPk(product_id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    // Check if the requested quantity is available in stock
    if (quantity > product.stock) {
      return res.status(400).json({ message: 'Insufficient stock' });
    }

    let cartItem = await Cart.findOne({
      where: {
        user_id: user_id,
        product_id: product_id,
      },
    });

    if (cartItem) {
      cartItem.quantity = Math.max(cartItem.quantity + quantity, 1);
      await cartItem.save();
    } else {
      cartItem = await Cart.create({
        user_id: user_id,
        product_id: product_id,
        quantity: Math.max(quantity, 1),
      });
    }

    res.status(200).json({ message: 'Item added to cart' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
}

// delete item from cart
async function deleteCartItem(req, res) {
  const user_id = req.body.user_id;
  const cart_id = req.body.cart_id;

  try {
    const cartItem = await Cart.findByPk(cart_id);
    if (!cartItem || cartItem.user_id !== user_id) {
      return res.status(404).json({ message: 'Cart item not found' });
    }

    await cartItem.destroy();
    res.status(200).json({ message: 'Cart item deleted' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
}

async function getCartItems(user_id) {
  try {
    const cartItems = await Cart.findAll({
      where: { user_id },
      include: [{ model: Product, attributes: ['product_name', 'image', 'price'] }]
    });
    console.log(cartItems[0].dataValues.product.dataValues);

    return cartItems.map(cartItem => ({
      id: cartItem.id,
      quantity: cartItem.quantity,
      product: cartItem.Product
    }));
  } catch (error) {
    console.error(error);
    throw new Error('Error getting cart items');
  }
}

async function getCartItemsHandler(req, res) {
  const user_id = req.params.user_id;

  try {
    const cartItems = await getCartItems(user_id);
    res.status(200).json(cartItems);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
}




module.exports = { addToCart , deleteCartItem, getCartItemsHandler};
