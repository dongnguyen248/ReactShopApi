const Order = require('../models/Order');
const {
    verifyToken,
    verifyTOkenAndAuthorization,
    verifyTOkenAndAdmin,
} = require('./verifyToken');

const router = require('express').Router();

//create
router.post('/', verifyToken, async (req, res) => {
    const newOrder = new Order(req.body);
    try {
        const saveOrder = await newOrder.save();
        res.status(200).json(saveOrder);
    } catch (err) {
        res.status(500).json(err);
    }
});

//update user
router.put('/:id', verifyTOkenAndAdmin, async (req, res) => {
    try {
        const updateOrder = await Order.findByIdAndUpdate(
            req.params.id,
            {
                $set: req.body,
            },
            { new: true },
        );
        res.status(200).json(updateOrder);
    } catch (err) {
        res.status(500).json(err);
    }
});

// //delete

router.delete('/:id', verifyTOkenAndAuthorization, async (req, res) => {
    try {
        Order.findByIdAndDelete(req.params.id);
        res.status(200).json('Order has been delete...');
    } catch (err) {
        res.status(500).json(err);
    }
});
//get Order Cart
router.get('/find/:userId', verifyTOkenAndAuthorization, async (req, res) => {
    try {
        console.log(req.params.userId);
        const orders = await Order.find({ userId: req.params.userId });
        console.log(orders);
        res.status(200).json(orders);
    } catch (err) {
        res.status(500).json(err);
    }
});

//get all oder
router.get('/', verifyTOkenAndAdmin, async (req, res) => {
    try {
        const orders = Order.find();
        res.status(200).json(orders);
    } catch (err) {
        res.status(500).json(err);
    }
});
//get Monthy Income

router.get('/imcome', verifyTOkenAndAdmin, async (req, res) => {
    const date = new Date();
    const lastMonth = new Date(date.setMonth(date.getMonth() - 1));
    const previousMonth = new Date(
        new Date().setMonth(lastMonth.getMonth() - 1),
    );
    try {
        const income = await Order.aggregate([
            { $match: { createdAt: { $gte: previousMonth } } },
            {
                $project: {
                    month: { $month: '$createdAt' },
                    sales: '$amount',
                },
            },
            {
                $group: {
                    _id: '$month',
                    total: { $sum: '$amount' },
                },
            },
        ]);
        res.status(200).json(income);
    } catch (err) {
        res.status(200).json(err);
    }
});
module.exports = router;
