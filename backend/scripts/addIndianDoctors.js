import mongoose from "mongoose";
import doctorModel from "../models/doctorModel.js";
import dotenv from "dotenv";

dotenv.config();

const indianDoctors = [
    {
        name: "Dr. Rajesh Kumar",
        email: "rajesh.kumar@hospital.com",
        password: "doctor123",
        image: "https://res.cloudinary.com/dkdgdabxr/image/upload/v1/doc1.png",
        speciality: "General physician",
        degree: "MBBS, MD",
        experience: "15 years",
        about: "Experienced general physician specializing in preventive care and chronic disease management.",
        available: true,
        fees: 500,
        address: { line1: "Apollo Hospital", line2: "Delhi" },
        date: Date.now()
    },
    {
        name: "Dr. Priya Sharma",
        email: "priya.sharma@hospital.com",
        password: "doctor123",
        image: "https://res.cloudinary.com/dkdgdabxr/image/upload/v1/doc2.png",
        speciality: "Dermatologist",
        degree: "MBBS, MD Dermatology",
        experience: "12 years",
        about: "Specialized in skin treatments, cosmetic procedures, and hair care.",
        available: true,
        fees: 800,
        address: { line1: "Fortis Hospital", line2: "Mumbai" },
        date: Date.now()
    },
    {
        name: "Dr. Amit Patel",
        email: "amit.patel@hospital.com",
        password: "doctor123",
        image: "https://res.cloudinary.com/dkdgdabxr/image/upload/v1/doc3.png",
        speciality: "Neurologist",
        degree: "MBBS, DM Neurology",
        experience: "18 years",
        about: "Expert in treating neurological disorders including stroke, epilepsy, and Parkinson's disease.",
        available: true,
        fees: 1200,
        address: { line1: "AIIMS", line2: "New Delhi" },
        date: Date.now()
    },
    {
        name: "Dr. Sunita Reddy",
        email: "sunita.reddy@hospital.com",
        password: "doctor123",
        image: "https://res.cloudinary.com/dkdgdabxr/image/upload/v1/doc4.png",
        speciality: "Gynecologist",
        degree: "MBBS, MD OBG",
        experience: "14 years",
        about: "Specialized in women's health, pregnancy care, and reproductive medicine.",
        available: true,
        fees: 700,
        address: { line1: "Apollo Hospital", line2: "Hyderabad" },
        date: Date.now()
    },
    {
        name: "Dr. Vikram Singh",
        email: "vikram.singh@hospital.com",
        password: "doctor123",
        image: "https://res.cloudinary.com/dkdgdabxr/image/upload/v1/doc5.png",
        speciality: "Pediatricians",
        degree: "MBBS, MD Pediatrics",
        experience: "10 years",
        about: "Dedicated to child healthcare, immunization, and developmental pediatrics.",
        available: true,
        fees: 600,
        address: { line1: "Max Hospital", line2: "Bangalore" },
        date: Date.now()
    },
    {
        name: "Dr. Anjali Gupta",
        email: "anjali.gupta@hospital.com",
        password: "doctor123",
        image: "https://res.cloudinary.com/dkdgdabxr/image/upload/v1/doc6.png",
        speciality: "Dermatologist",
        degree: "MBBS, MD Dermatology",
        experience: "8 years",
        about: "Expert in skin rejuvenation, acne treatment, and anti-aging procedures.",
        available: true,
        fees: 900,
        address: { line1: "Medanta Hospital", line2: "Gurgaon" },
        date: Date.now()
    },
    {
        name: "Dr. Sanjay Mishra",
        email: "sanjay.mishra@hospital.com",
        password: "doctor123",
        image: "https://res.cloudinary.com/dkdgdabxr/image/upload/v1/doc7.png",
        speciality: "Gastroenterologist",
        degree: "MBBS, DM Gastroenterology",
        experience: "16 years",
        about: "Specialized in digestive disorders, liver diseases, and endoscopic procedures.",
        available: true,
        fees: 1000,
        address: { line1: "Lilavati Hospital", line2: "Mumbai" },
        date: Date.now()
    },
    {
        name: "Dr. Meera Nair",
        email: "meera.nair@hospital.com",
        password: "doctor123",
        image: "https://res.cloudinary.com/dkdgdabxr/image/upload/v1/doc8.png",
        speciality: "General physician",
        degree: "MBBS, MD Internal Medicine",
        experience: "11 years",
        about: "Focuses on diabetes management, hypertension, and preventive healthcare.",
        available: true,
        fees: 550,
        address: { line1: "Aster Hospital", line2: "Kochi" },
        date: Date.now()
    },
    {
        name: "Dr. Raj Malhotra",
        email: "raj.malhotra@hospital.com",
        password: "doctor123",
        image: "https://res.cloudinary.com/dkdgdabxr/image/upload/v1/doc9.png",
        speciality: "Neurologist",
        degree: "MBBS, DM Neurology",
        experience: "20 years",
        about: "Leading neurologist specializing in complex neurological conditions.",
        available: true,
        fees: 1500,
        address: { line1: "Narayana Hospital", line2: "Chennai" },
        date: Date.now()
    },
    {
        name: "Dr. Kavita Iyer",
        email: "kavita.iyer@hospital.com",
        password: "doctor123",
        image: "https://res.cloudinary.com/dkdgdabxr/image/upload/v1/doc10.png",
        speciality: "Gynecologist",
        degree: "MBBS, MD OBG, Fellowship in IVF",
        experience: "13 years",
        about: "Expert in infertility treatment, high-risk pregnancy, and laparoscopic surgery.",
        available: true,
        fees: 850,
        address: { line1: "Cloudnine Hospital", line2: "Bangalore" },
        date: Date.now()
    },
    {
        name: "Dr. Deepak Kumar",
        email: "deepak.kumar@hospital.com",
        password: "doctor123",
        image: "https://res.cloudinary.com/dkdgdabxr/image/upload/v1/doc11.png",
        speciality: "Pediatricians",
        degree: "MBBS, MD Pediatrics, Fellowship in Neonatology",
        experience: "9 years",
        about: "Specialized in neonatal care, childhood asthma, and nutrition.",
        available: true,
        fees: 650,
        address: { line1: "Manipal Hospital", line2: "Bangalore" },
        date: Date.now()
    },
    {
        name: "Dr. Radhika Shah",
        email: "radhika.shah@hospital.com",
        password: "doctor123",
        image: "https://res.cloudinary.com/dkdgdabxr/image/upload/v1/doc12.png",
        speciality: "Dermatologist",
        degree: "MBBS, MD Dermatology, Cosmetology Fellowship",
        experience: "7 years",
        about: "Specialized in laser treatments, hair transplant, and cosmetic dermatology.",
        available: true,
        fees: 1000,
        address: { line1: "Kaya Skin Clinic", line2: "Mumbai" },
        date: Date.now()
    },
    {
        name: "Dr. Arvind Joshi",
        email: "arvind.joshi@hospital.com",
        password: "doctor123",
        image: "https://res.cloudinary.com/dkdgdabxr/image/upload/v1/doc13.png",
        speciality: "Gastroenterologist",
        degree: "MBBS, DM Gastroenterology, Fellowship in Hepatology",
        experience: "17 years",
        about: "Expert in liver diseases, pancreatitis, and advanced endoscopy.",
        available: true,
        fees: 1100,
        address: { line1: "Global Hospital", line2: "Hyderabad" },
        date: Date.now()
    },
    {
        name: "Dr. Lakshmi Menon",
        email: "lakshmi.menon@hospital.com",
        password: "doctor123",
        image: "https://res.cloudinary.com/dkdgdabxr/image/upload/v1/doc14.png",
        speciality: "General physician",
        degree: "MBBS, MD General Medicine",
        experience: "12 years",
        about: "Focus on preventive medicine, wellness programs, and geriatric care.",
        available: true,
        fees: 520,
        address: { line1: "Amrita Hospital", line2: "Kochi" },
        date: Date.now()
    },
    {
        name: "Dr. Chandrashekar",
        email: "chandrashekar@hospital.com",
        password: "doctor123",
        image: "https://res.cloudinary.com/dkdgdabxr/image/upload/v1/doc15.png",
        speciality: "Neurologist",
        degree: "MBBS, DM Neurology",
        experience: "19 years",
        about: "Specialized in migraine treatment, multiple sclerosis, and neuro-rehabilitation.",
        available: true,
        fees: 1300,
        address: { line1: "NIMHANS", line2: "Bangalore" },
        date: Date.now()
    }
];

const addIndianDoctors = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log("Connected to MongoDB");

        for (const doctor of indianDoctors) {
            const existingDoctor = await doctorModel.findOne({ email: doctor.email });
            if (existingDoctor) {
                console.log(`Doctor already exists: ${doctor.email}`);
            } else {
                await doctorModel.create(doctor);
                console.log(`Added doctor: ${doctor.name} (${doctor.speciality})`);
            }
        }

        console.log("All doctors added successfully!");
        process.exit();
    } catch (error) {
        console.error("Error adding doctors:", error);
        process.exit(1);
    }
};

addIndianDoctors();
