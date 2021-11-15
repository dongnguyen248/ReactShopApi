const Product = require("../models/Product");
const {
  verifyTOkenAndAuthorization,
  verifyTOkenAndAdmin,
} = require("./verifyToken");

const router = require("express").Router();


//create
router.post("/",verifyTOkenAndAdmin, async (req,res)=>{
    const newProduct = new Product(req.body);
    try{
        const saveProduct = await newProduct.save();
        res.status(200).json(saveProduct);
    }catch(err){
        res.status(500).json(err);
    }
} )


//update Product
router.put("/:id", verifyTOkenAndAdmin, async (req, res) => {
  try {
    const updateProduct = await Product.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    console.log(updateProduct)
    res.status(200).json(updateProduct);
  } catch (err) {
    res.status(500).json(err);
  }
});

//delete

router.delete("/:id", verifyTOkenAndAdmin, async (req, res) => {
  try {
    Product.findByIdAndDelete(req.params.id);
    res.status(200).json("Product has been delete...");
  } catch (err) {
    res.status(500).json(err);
  }
});
//get Product
router.get("/find/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    res.status(200).json(product);
  } catch (err) {
    res.status(500).json(err);
  }
});


//get all Product
router.get("/", async (req, res) => {
  const qNew = req.query.new;
  const qCategory = req.query.categories;
//  console.log(qCategory)
  try {
   let products;
   if(qNew){
       products = await Product.find().sort({createdAt: -1}).limit(5);
   }else if(qCategory){
       products = await Product.find({categories:{
           $in:[qCategory]
       }}); 
      
   }else{
       products = await Product.find();
   }

    res.status(200).json(products);
  } catch (err) {
    res.status(500).json(err);
  }
});



module.exports = router;