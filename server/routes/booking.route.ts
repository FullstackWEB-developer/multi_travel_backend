import { Router, Request, Response } from "express";
import { check, validationResult } from "express-validator";
import bcrypt, { compareSync } from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
// user defined
import { User } from "../models/user.model";
import { Experience, ExperienceType } from "../models/experience.model";
import auth from "../middleware/auth.middleware";
import { Document, Types } from "mongoose";


dotenv.config();

const bookingRoutes = () => {
  const router = Router();

  // @route    POST api/users
  // @desc     Register user
  // @access   Public
  router.post("/experienceSearch", auth, async (req, res) => {
    const { locationInputValue, dateValue, guestValue } = req.body;

    var date = new Date(dateValue).getTime();
    var guests = guestValue.guestAdults + guestValue.guestChildren + guestValue.guestInfants;
    var allData = await Experience.find({address : locationInputValue})
    
    var resData: (ExperienceType & Document<any, any, any> & { _id: Types.ObjectId; })[] = [];
    
    allData.forEach((data) => {
      var dbDate = new Date(data.date).getTime();
      var dbGuests = data.maxGuests;
      if (dbDate >= date && dbGuests >= guests) {
        resData.push(data);
      }
    });
    res.json(resData)
  });

  // router.post("/experience", auth, async (req, res) => {
    
  //   const {authorId , date, href, listingCategoryId, title, featuredImage, galleryImgs, 
  //           commentCount, viewCount, like, address, reviewStart, reviewCount, price, maxGuests, saleOff, isAds, map} = req.body
    
    
  //   const experience = new Experience({
  //     authorId,
  //     date,
  //     href,
  //     listingCategoryId,
  //     title,
  //     featuredImage,
  //     galleryImgs,
  //     commentCount,
  //     viewCount,
  //     like,
  //     address,
  //     reviewStart,
  //     reviewCount,
  //     price,
  //     maxGuests,
  //     saleOff,
  //     isAds,
  //     map      
  //   });

  //   console.log(experience)
  //   experience.save();

  // })
  return router;
};

export default bookingRoutes;
