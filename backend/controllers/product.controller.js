import { Product } from '../models/product.model.js';
import mongoose from 'mongoose';

export const getProducts = async (req, res) => {
    try {
        const products = await Product.find({});
        return res.status(200).json({
            success: true,
            messsage: "Products Fetched",
            data: products
        });
    } catch (error) {
        console.error("Error in fetching products:", error.message);
        return res.status(500).json({
            success: false,
            messsage: "Server Error"
        });
    }
}

export const createProduct = async (req, res) => {
    const {name, price, image} = req.body;
    
    if(!name || !price || !image) {
        return res.status(400).json({
            success: false,
            message: "Please provide all fields!"
        });
    }

    const newProduct = new Product({ name, price, image });

    try {
        await newProduct.save();
        return res.status(201).json({
            success: true,
            messsage: "Product Created",
            data: newProduct
        });
    } catch (error) {
        console.error("Error in creating product:", error.message);
        return res.status(500).json({
            success: false,
            messsage: "Server Error"
        });
    }
}

export const deleteProduct = async (req, res) => {
    const {id} = req.params;

    if(!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({
            success: false,
            messsage: "Invalid Product Id"
        });
    }

    try {
        await Product.findByIdAndDelete(id);
        return res.status(200).json({
            success: true,
            messsage: "Product Deleted"
        });
    } catch (error) {
        console.error("Error in deleting product:", error.message);
        return res.status(500).json({
            success: false,
            messsage: "Server Error"
        });
    }
}

export const updateProduct = async (req, res) => {
    const {id} = req.params;
    const product = req.body;

    if(!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({
            success: false,
            messsage: "Invalid Product Id"
        });
    }

    try {
        const updatedProduct = await Product.findByIdAndUpdate(id, product, {new: true});
        return res.status(200).json({
            success: true,
            messsage: "Product Updated",
            data: updatedProduct
        });
    } catch (error) {
        console.error("Error in updating product:", error.message);
        return res.status(500).json({
            success: false,
            messsage: "Server Error"
        });
    }
}