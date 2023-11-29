const ProductSchema = require('../../models/productSchema');
const { SUCCESS_MESSAGES, ERRORS_MESSAGE } = require('./product.const');

async function getProducts(req,res){
  try{
    const {limit, skip, filters} = req.query;
    const whereClause = {};
    const{category,priceRange = [],rating } = filters;
    if(category){
      whereClause.category = category;
    };
    if(priceRange.length){
      whereClause.price = {
        $gte: priceRange[0],
        $lte: priceRange[1],
      }
    }
    if(rating) {
      whereClause.rating = {
        $gte: rating
      };
    }
    const products = await ProductSchema.find();
    return res.status(200).json({
        data:{
        products
        },
        message:SUCCESS_MESSAGES.PRODUCT_FETCHED_SUCCESSFULLY 
    })
    
  }catch(error){
    console.log(error);
    return res.status(400).json({
        message:ERRORS_MESSAGE.SOMETHING_WENT_WRONG,
        error
    })
  }
};


async function getProductDetail(req,res){
    try{
      const {id} = req.params;
  const product = await ProductSchema.findById(id); 
  return res.status(200).json({
    data:{
        product
    },
    message:SUCCESS_MESSAGES.PRODUCT_FETCHED_SUCCESSFULLY 
  })
    }catch{
        return res(400).json({
            message:ERRORS_MESSAGE.SOMETHING_WENT_WRONG,
            error 
        })
    }
};

async function createNewProduct(req,res){
  try {
    console.log(req.body);
    const {
      name,
      description,
      price,
      stock,
      images
    } = req.body;
    const product = new ProductSchema({
      name,
      description,
      images,
      price,
      stock
    });
    await product.save();
    return res.status(201).json({
      data: { product },
      message: SUCCESS_MESSAGES.PRODUCT_CREATED_SUCCESSFULLY
    })
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      message: ERRORS_MESSAGE.SOMETHING_WENT_WRONG,
      error
    })
  }
};

async function updateProduct(req,res){
  try{
    const {id} = req.params;
    const product = await ProductSchema.findById(id);
    if(!product){
      throw({message:ERRORS_MESSAGE.VALIDATION_MESSAGES.PRODUCT_NOT_FOUND});
    }
    const {name,description,price, stock, images} = req.body;
    const updateObj = {
      name,
      description,
      price,
      stock,
      images
    }
    const updatedProduct = await ProductSchema.findOneAndUpdate({_id : id}, {$set : updateObj});
    return res.status(201).json({
      data: {product : updatedProduct},
      message:SUCCESS_MESSAGES.PRODUCT_UPDATED_SUCCESSFULLY 
    })
  }catch(error){
    return res.status(400).json({
      message:ERRORS_MESSAGE.SOMETHING_WENT_WRONG,
      error
    })
  }
};

async function deleteProduct(req,res){
  try{
    const {id} = req.params;
    const product = await ProductSchema.findById(id);
    if(!product){
      throw({message: ERRORS_MESSAGE.VALIDATION_MESSAGES.PRODUCT_NOT_FOUND});
    }
    await ProductSchema.findByIdAndDelete(id);
    return res.status(201).json({
      data:{},
      message:SUCCESS_MESSAGES.PRODUCT_DELETED_SUCCESSFULLY
    })
  }catch(error){
    console.log(error);
      return res.status(404).json({
        message:ERRORS_MESSAGE.SOMETHING_WENT_WRONG,
        error
      })
      
  }
};


module.exports = {
  getProducts,
  getProductDetail,
  createNewProduct,
  updateProduct,
  deleteProduct
}