import express from "express";
import asyncHandler from "express-async-handler";
import ProductModel from "../models/ProductModel.js";

// @desc    Fetch all products
// @route   GET /api/products
export const getProducts = asyncHandler(async (req, res) => {
   const response = await ProductModel.find({});
   res.json(response);
});

// @desc    add product
// @route   POST /api/products
export const addProduct = asyncHandler(async (req, res) => {
   const request = req.body;
   console.log(request);
   const createdProduct = await ProductModel.create(request);
   res.status(201).json(createdProduct);
});

// @desc    delete product
// @route   DELETE /api/products/:id
export const deleteProduct = asyncHandler(async (req, res) => {
   const id = req.params.id;
   const deletedProduct = await ProductModel.findByIdAndDelete(id);
   res.status(201).json(deletedProduct);
});

// @desc    update product
// @route   PUT /api/products/:id
export const updateProduct = asyncHandler(async (req, res) => {
   const id = req.params.id;
   const request = req.body;
   const updateProduct = await ProductModel.findByIdAndUpdate(id, request, {
      new: true,
   });
   res.status(201).json(updateProduct);
});
