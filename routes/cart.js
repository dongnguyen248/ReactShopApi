const Cart = require('../models/Cart');
const {
    verifyToken,
    verifyTOkenAndAuthorization,
    verifyTOkenAndAdmin,
} = require('./verifyToken');

const router = require('express').Router();

//create
router.post('/', verifyToken, async (req, res) => {
    const newCart = new Cart(req.body);
    try {
        const saveCart = await newCart.save();
        res.status(200).json(saveCart);
    } catch (err) {
        res.status(500).json(err);
    }
});

//update user
router.put('/:id', verifyTOkenAndAuthorization, async (req, res) => {
    try {
        const updateCart = await Cart.findByIdAndUpdate(
            req.params.id,
            {
                $set: req.body,
            },
            { new: true },
        );
        res.status(200).json(updateCart);
    } catch (err) {
        res.status(500).json(err);
    }
});

//delete

router.delete('/:id', verifyTOkenAndAuthorization, async (req, res) => {
    try {
        Cart.findByIdAndDelete(req.params.id);
        res.status(200).json('Cart has been delete...');
    } catch (err) {
        res.status(500).json(err);
    }
});
//get User Cart
router.get('/find/:userId', async (req, res) => {
    try {
        const cart = await Cart.findOne({ userId: req.params.id });
        res.status(200).json(cart);
    } catch (err) {
        res.status(500).json(err);
    }
});

//get all Cart
router.get('/', verifyTOkenAndAdmin, async (req, res) => {
    try {
        const carts = Cart.find();
        res.status(200).json(carts);
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;
