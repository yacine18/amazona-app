import express from 'express';
import Product from '../models/productModel.js';
import data from '../data.js';
import expressAsyncHandler from 'express-async-handler';
import { isAuth, isAdmin, isSellerOrAdmin } from '../utils.js'

const productRouter = express.Router()

productRouter.get('/', expressAsyncHandler(async (req, res) => {
    const seller = req.query.seller || ''
    const sellerFilter = seller ? {seller} : {}
    const products = await Product.find({...sellerFilter});
    res.send(products)
}))

productRouter.get('/seed', expressAsyncHandler(async (req, res) => {
    const createdProducts = await Product.insertMany(data.products)
    res.send({ createdProducts })
}))

productRouter.get('/:id', expressAsyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id);
    if (product) {
        res.send(product)
    } else {
        res.status(404).send({ message: 'page not Found!' })
    }

}))

productRouter.post('/', isAuth, isSellerOrAdmin, expressAsyncHandler(async (req, res) => {
    const product = new Product({
        name: "Sample Name",
        image: "../../template/images/product-1.jpg",
        seller: req.user._id,
        category: 'sample category',
        price: 1200,
        brand: 'sample brand',
        countStock: 10,
        rating: 2.5,
        numReviews: 5,
        description: 'the iMac from Apple'
    })
    const createdProduct = await product.save()
    res.send({ message: 'Product created', product: createdProduct })
}))

productRouter.put('/:id', isAuth, isSellerOrAdmin, expressAsyncHandler(async (req, res) => {
    const productId = req.params.id
    const product = await Product.findById(productId)
    if (product) {
        product.name = req.body.name
        product.price = req.body.price
        product.image = req.body.image
        product.category = req.body.category
        product.brand = req.body.brand
        product.countStock = req.body.countStock
        product.description = req.body.description

        const updatedProduct = await product.save()
        res.send({ message: 'Product updated', product: updatedProduct })
    } else {
        res.status(404).send({ message: 'Product not Found' })
    }
}))

productRouter.delete('/:id', isAuth, isAdmin, expressAsyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id)
    if (product) {
        const deletedProduct = product.remove()
        res.send({ message: 'Product deleted', product: deletedProduct })
    } else {
        res.status(404).send({ message: 'Product not Found' })
    }
}))

export default productRouter;