import { Router, Request, Response } from "express";
import { check, validationResult } from "express-validator";
import bcrypt, { compareSync } from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
// user defined
import { User } from "../models/user.model";
import auth from "../middleware/auth.middleware";
const path = require("path");



dotenv.config();

const userRoutes = () => {
  const router = Router();

  // @route    POST api/users
  // @desc     Register user
  // @access   Public
  router.post(
    "/",
    check("first_name", "Fist Name is required").notEmpty(),
    check("last_name", "Last Name is required").notEmpty(),
    check("email", "Please include a valid email").isEmail(),
    check(
      "password",
      "Please enter a password with 6 or more characters"
    ).isLength({ min: 6 }),
    async (req, res) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const { first_name, last_name,gender, email, password, country, city, phone_number } = req.body;

      try {
        let user = await User.findOne({ email });
        if (user) {
          return res
            .status(400)
            .json({ errors: [{ msg: "User already exists" }] });
        }

        user = new User({
          first_name,
          last_name,
          email,
          gender,
          password,
          country,
          city,
          phone_number,
        });

        const salt = await bcrypt.genSalt(10);

        user.password = await bcrypt.hash(password, salt);

        await user.save();

        const payload = {
          user: {
            id: user.id,
          },
        };

        // console.log(payload);        
        
        jwt.sign(
          payload,
          process.env.JWT,
          { expiresIn: "5 days" },
          (err, token) => {
            if (err) throw err;
            res.json({ token });
          }
        );
      } catch (err) {
        console.error(err.message);
        res.status(500).send("Server error");
      }
    }
  );

  router.post("/update", auth, async (req, res) => {
    try {
      const {first_name, last_name, gender, email, country, city, birthday, about_me, phone_number, credit_card_number, holder_name, client_address} = req.body

      await User.findByIdAndUpdate(
        {
          _id: req.body.user.id
        },
        {
          $set: {
            first_name: first_name,
            last_name:  last_name,
            gender: gender,
            email:  email,
            country:  country,
            city: city,
            birthday: birthday,
            about_me: about_me,
            phone_number: phone_number,
            billing_data : {
              credit_card_number: credit_card_number,
              holder_name: holder_name,
              client_address: client_address,
            } 
          },
        }
      );
      const user = await User.findById(req.body.user.id);
      res.status(200).json(user);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  });

  router.post("/upload", auth, async (req, res) => {
    console.log(req.files);    
  });


  return router;
};

export default userRoutes;
