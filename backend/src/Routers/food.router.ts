import { Router } from "express";
import { sample_foods, sample_tags } from "../data";
import asyncHandler from "express-async-handler";
import { FoodModel } from "../models/food.model";
import mongoose from "mongoose";
const router = Router();
//1st api tha have a handler to handle the req
//asyncHandler is a middleware function used in ExpressJs to handle asynchronous operations.
router.get(
  "/seed",
  asyncHandler(async (req, res) => {
    // retrieves the count of documents (records) in the "FoodModel" collection
    const foodCount = await FoodModel.countDocuments();
    if (foodCount > 0) {
      res.send("seed is already done!");
      return;
    }
    await FoodModel.create(sample_foods);
    res.send("seed is done!");
  })
);

router.get(
  "/",
  asyncHandler(async (req, res) => {
    const foods = await FoodModel.find();
    res.send(foods);
  })
);

router.get(
  "/search/:searchTerm",
  asyncHandler(async (req, res) => {
    //it's instead of using toLocaleLowerCase for food name and search term
    const searchRegex = new RegExp(req.params.searchTerm, "i");
    const foods = await FoodModel.find({ name: { $regex: searchRegex } });
    res.send(foods);
  })
);

router.get(
  "/tags",
  asyncHandler(async (req, res) => {
    const tags = await FoodModel.aggregate([
      {
        $unwind: "$tags",
      },
      {
        $group: {
          _id: "$tags",
          count: { $sum: 1 },
        },
      },
      {
        $project: {
          _id: 0,
          name: "$_id",
          count: "$count",
        },
      },
    ]).sort({ count: -1 });

    const all = {
      name: "All",
      count: await FoodModel.countDocuments(),
    };

    tags.unshift(all);
    res.send(tags);
  })
);

router.get(
  "/tag/:tagName",
  asyncHandler(async (req, res) => {
    const foods = await FoodModel.find({ tags: req.params.tagName });
    res.send(foods);
  })
);

router.get("/:foodId", asyncHandler(async(req, res) => {
  const foodId = req.params.foodId;
  const food=await FoodModel.findById(foodId);
  res.send(food);
}));

export default router;
