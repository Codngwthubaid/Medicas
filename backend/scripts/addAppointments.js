import mongoose from "mongoose";
import userModel from "../models/userModel.js";
import doctorModel from "../models/doctorModel.js";
import appointmentModel from "../models/appointmentModel.js";
import dotenv from "dotenv";

dotenv.config();

const addAppointments = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log("Connected to MongoDB");

        const user = await userModel.findOne({ email: "usbasedtestingchannel@gmail.com" });
        if (!user) {
            console.error("User not found: usbasedtestingchannel@gmail.com");
            process.exit(1);
        }
        console.log(`Found user: ${user.name} (${user._id})`);

        const doctors = await doctorModel.find().limit(10);
        if (doctors.length === 0) {
            console.error("No doctors found. Please run addIndianDoctors.js first.");
            process.exit(1);
        }

        const appointments = [
            {
                userId: user._id.toString(),
                docId: doctors[0]._id.toString(),
                slotDate: "20,2026",
                slotTime: "10:00 AM",
                userData: {
                    name: user.name,
                    email: user.email,
                    image: user.image,
                    phone: user.phone || "000000000",
                    address: user.address || { line1: "", line2: "" },
                    gender: user.gender || "Not Selected",
                    dob: user.dob || "Not Selected"
                },
                docData: {
                    name: doctors[0].name,
                    email: doctors[0].email,
                    image: doctors[0].image,
                    speciality: doctors[0].speciality,
                    degree: doctors[0].degree,
                    experience: doctors[0].experience,
                    about: doctors[0].about,
                    available: doctors[0].available,
                    fees: doctors[0].fees,
                    address: doctors[0].address
                },
                amount: doctors[0].fees,
                date: Date.now(),
                cancelled: false,
                payment: true,
                isCompleted: false
            },
            {
                userId: user._id.toString(),
                docId: doctors[1]._id.toString(),
                slotDate: "21,2026",
                slotTime: "2:00 PM",
                userData: {
                    name: user.name,
                    email: user.email,
                    image: user.image,
                    phone: user.phone || "000000000",
                    address: user.address || { line1: "", line2: "" },
                    gender: user.gender || "Not Selected",
                    dob: user.dob || "Not Selected"
                },
                docData: {
                    name: doctors[1].name,
                    email: doctors[1].email,
                    image: doctors[1].image,
                    speciality: doctors[1].speciality,
                    degree: doctors[1].degree,
                    experience: doctors[1].experience,
                    about: doctors[1].about,
                    available: doctors[1].available,
                    fees: doctors[1].fees,
                    address: doctors[1].address
                },
                amount: doctors[1].fees,
                date: Date.now(),
                cancelled: false,
                payment: false,
                isCompleted: false
            },
            {
                userId: user._id.toString(),
                docId: doctors[2]._id.toString(),
                slotDate: "22,2026",
                slotTime: "11:00 AM",
                userData: {
                    name: user.name,
                    email: user.email,
                    image: user.image,
                    phone: user.phone || "000000000",
                    address: user.address || { line1: "", line2: "" },
                    gender: user.gender || "Not Selected",
                    dob: user.dob || "Not Selected"
                },
                docData: {
                    name: doctors[2].name,
                    email: doctors[2].email,
                    image: doctors[2].image,
                    speciality: doctors[2].speciality,
                    degree: doctors[2].degree,
                    experience: doctors[2].experience,
                    about: doctors[2].about,
                    available: doctors[2].available,
                    fees: doctors[2].fees,
                    address: doctors[2].address
                },
                amount: doctors[2].fees,
                date: Date.now(),
                cancelled: true,
                payment: false,
                isCompleted: false
            },
            {
                userId: user._id.toString(),
                docId: doctors[3]._id.toString(),
                slotDate: "18,2026",
                slotTime: "4:00 PM",
                userData: {
                    name: user.name,
                    email: user.email,
                    image: user.image,
                    phone: user.phone || "000000000",
                    address: user.address || { line1: "", line2: "" },
                    gender: user.gender || "Not Selected",
                    dob: user.dob || "Not Selected"
                },
                docData: {
                    name: doctors[3].name,
                    email: doctors[3].email,
                    image: doctors[3].image,
                    speciality: doctors[3].speciality,
                    degree: doctors[3].degree,
                    experience: doctors[3].experience,
                    about: doctors[3].about,
                    available: doctors[3].available,
                    fees: doctors[3].fees,
                    address: doctors[3].address
                },
                amount: doctors[3].fees,
                date: Date.now() - 7 * 24 * 60 * 60 * 1000,
                cancelled: false,
                payment: true,
                isCompleted: true
            },
            {
                userId: user._id.toString(),
                docId: doctors[4]._id.toString(),
                slotDate: "23,2026",
                slotTime: "9:00 AM",
                userData: {
                    name: user.name,
                    email: user.email,
                    image: user.image,
                    phone: user.phone || "000000000",
                    address: user.address || { line1: "", line2: "" },
                    gender: user.gender || "Not Selected",
                    dob: user.dob || "Not Selected"
                },
                docData: {
                    name: doctors[4].name,
                    email: doctors[4].email,
                    image: doctors[4].image,
                    speciality: doctors[4].speciality,
                    degree: doctors[4].degree,
                    experience: doctors[4].experience,
                    about: doctors[4].about,
                    available: doctors[4].available,
                    fees: doctors[4].fees,
                    address: doctors[4].address
                },
                amount: doctors[4].fees,
                date: Date.now(),
                cancelled: false,
                payment: true,
                isCompleted: false
            }
        ];

        for (const appointment of appointments) {
            const newAppointment = await appointmentModel.create(appointment);
            console.log(`Added appointment: ${appointment.slotDate} with ${appointment.docData.name} - ${appointment.cancelled ? 'Cancelled' : appointment.isCompleted ? 'Completed' : 'Pending'}`);
        }

        console.log("All appointments added successfully!");
        process.exit();
    } catch (error) {
        console.error("Error adding appointments:", error);
        process.exit(1);
    }
};

addAppointments();
