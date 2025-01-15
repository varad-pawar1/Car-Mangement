import { Schema, model } from "mongoose";

// Admin Schema
const adminSchema = new Schema({
  name: { type: String },
  email: { type: String },
  password: { type: String },
  address: { type: String },
  phone: { type: String },
  gender: { type: String },
  car: [
    {
      carImageUrl: {
        type: String
      },
      title: { type: String },
      kmsOnOdometer: { type: Number },
      majorScratches: { type: Boolean },
      originalPaint: { type: Boolean },
      numberOfAccidents: { type: Number },
      numberOfPreviousBuyers: { type: Number },
      registrationPlace: { type: String },
      color: { type: String },
      price: { type: Number },
      mileage: { type: Number },
      OEM_Specs: {
        modelName: { type: String },
        yearOfModel: { type: Number },
        listPrice: { type: Number },
        availableColors: [{ type: String }],
        powerBhp: { type: Number },
        maxSpeed: { type: Number },
      },
    },
  ],
  refreshToken: { type: String },
  resetPassExpires: { type: Date },
}, { timestamps: true }); // Automatically adds createdAt and updatedAt fields

const adminData = model("Admin", adminSchema);

export { adminData };
