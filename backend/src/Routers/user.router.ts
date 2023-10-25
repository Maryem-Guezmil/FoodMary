import { Router } from "express";
import { sample_users } from "../data";
import asyncHandler from "express-async-handler";
import jwt from "jsonwebtoken";
import { User, userModel } from "../models/user.model";
import bcrypt from "bcrypt";

const router = Router();

router.get(
  "/seed",
  asyncHandler(async (req, res) => {
    const userCount = await userModel.countDocuments();
    if (userCount > 0) {
      res.send("seed already done!");
      return;
    }
    await userModel.create(sample_users);
    res.send("seed is done!");
  })
);

router.post(
  "/login",
  asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    const user = await userModel.findOne({ email });
    // 10=> saltRounds determines how many rounds of hashing should be applied to the password
    const hashedPassword = await bcrypt.hash(password, 10);
    //comparing a plain text password entered by a user with a hashed password stored in a database
    const passwordMatch = await bcrypt.compare(password, hashedPassword);
    console.log(passwordMatch);
    if (passwordMatch) {
      res.send(generateTokenReponse(user!));
    } else {
      res.status(400).send("Username or password is invalid!");
    }
  })
);
/*send successful response to the client that contains the user + the token value
(an encrypted text that will be sent to the client and need to be saved there so the client 
should send it with each req and the server could decrypt it and understand which user is doin
that req AKA authorization&authentifaction*/
const generateTokenReponse = (user: User) => {
  const token = jwt.sign(
    {
      id: user.id,
      email: user.email,
      isAdmin: user.isAdmin,
    },
    process.env.JWT_SECRET!,
    {
      expiresIn: "30d",
    }
  );

  return {
    id: user.id,
    email: user.email,
    name: user.name,
    address: user.address,
    isAdmin: user.isAdmin,
    token: token,
  };
};

router.post(
  "/register",
  asyncHandler(async (req, res) => {
    const { name, email, address, password } = req.body;
    const user = await userModel.findOne({email});
    if (user) {
      res.status(400).send("user already exist");
      return;
    } else {
      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = new userModel({
        name,
        email: email.toLowerCase(),
        password: hashedPassword,
        address,
        isAdmin: false,
      });

      const savedUser = await newUser.save();
      res.send(generateTokenReponse(savedUser));
    }
  })
);

export default router;
