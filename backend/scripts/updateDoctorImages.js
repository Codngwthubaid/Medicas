import mongoose from "mongoose";
import doctorModel from "../models/doctorModel.js";
import dotenv from "dotenv";

dotenv.config();

const newImageUrl = "https://res.cloudinary.com/dkdgdabxr/image/upload/v1776315569/WhatsApp_Image_2026-04-16_at_12.26.06_AM_cbwm3y.jpg";

const updateDoctorImages = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log("Connected to MongoDB");

        const result = await doctorModel.updateMany(
            {},
            { $set: { image: newImageUrl } }
        );

        console.log(`Updated ${result.modifiedCount} doctors with new image`);

        const doctors = await doctorModel.find({});
        doctors.forEach(doc => {
            console.log(`- ${doc.name}: ${doc.image}`);
        });

        process.exit();
    } catch (error) {
        console.error("Error updating doctors:", error);
        process.exit(1);
    }
};

updateDoctorImages();
