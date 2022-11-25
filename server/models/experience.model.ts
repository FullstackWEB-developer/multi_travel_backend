import mongoose, { Schema, Model, Document, Date } from "mongoose";

type ExperienceType = {
  authorId: number;
  date:  string;
  href: string;
  listingCategoryId: number;
  title: string;
  featuredImage?: string;
  galleryImgs?:  Array<string>;
  commentCount?: number;
  viewCount?: number;
  like? : boolean;
  address?: string;
  reviewStart?: number; 
  reviewCount?: number;
  price?: number;
  maxGuests?: number;
  saleOff?: string;
  isAds?: string;
  map?: any;
};

const ExperienceSchema = new Schema(
  {
    authorId: {
      type: Number,
      required: true,
    },
    date: {
      type: String,
      required :  true
    },
    href: {
      type: String,
      required: true,
    },
    listingCategoryId : {
      type: Number,
      required:  true,
    },
    title: {
      type: String,
      required: true,
    },
    featuredImage: {
      type: String,
    },
    galleryImgs:  {
      type: Array<string>,
    },
    commentCount: {
      type: Number,
    },
    viewCount: {
      type: Number,
    },
    like: {
      type: Boolean,
    },
    address: {
      type: String,
    },
    reviewStart : {
      type: Number,
    },
    reviewCount : {
      type: Number,
    },
    price: {
      type: Number,
    },
    maxGuests: {
      type: Number,
    },
    saleOff:  {
      type: String,
    },
    isAds: {
      type: String,
    },
    map : {
      lat : {
        type: Number,
      },
      lng : {
        type: Number,
      },
    },
  },
  { collection: "experiences", timestamps: true }
);


const Experience = mongoose.model<ExperienceType & Document>('experience', ExperienceSchema);

export { Experience,  ExperienceType };
