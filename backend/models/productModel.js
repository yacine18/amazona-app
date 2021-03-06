import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true,
        unique: true,
    },
    image:{
        type: String,
        required: true,
    },
    brand:{
        type: String,
        required: true,
    },
    category:{
        type: String,
        required: true,
    },
    description:{
        type: String,
        required: true,
    },
    price:{
        type: Number,
        required: true,
    },
    countStock:{
        type: Number,
        required: true,
    },
    rating:{
        type: Number,
        required: true,
    },
    numReviews:{
        type: Number,
        required: true,
    },
    seller:{
         type:mongoose.Schema.Types.ObjectId, ref:'User'
    }
}, {
    timestamps: true
})

const Product = mongoose.model('Product', productSchema);
export default Product;